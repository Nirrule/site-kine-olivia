#!/bin/bash

# Configuration
VPS_HOST="kine-vps"
DOMAIN="kineoliviajaumain.be"
APP_NAME="site-kine-olivia"
DEPLOY_PATH="/var/www/${APP_NAME}"
REPO_URL="git@github.com:Nirrule/site-kine-olivia.git"
NODE_PORT=3000

# Couleurs pour les logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Déploiement de ${APP_NAME} sur ${DOMAIN}${NC}"

# 1. Vérifier que tout est commité
if [[ -n $(git status -s) ]]; then
  echo -e "${RED}❌ Tu as des changements non commités. Commit-les d'abord.${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Pas de changements non commités"

# 2. Push vers le repo distant
echo -e "\n${YELLOW}📤 Push vers GitHub...${NC}"
git push origin main

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Erreur lors du push${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Push réussi"

# 3. Vérifier la connexion SSH
echo -e "\n${YELLOW}📡 Vérification de la connexion SSH...${NC}"
if ! ssh -o ConnectTimeout=10 ${VPS_HOST} "echo 'Connexion OK'" > /dev/null 2>&1; then
    echo -e "${RED}❌ Impossible de se connecter au serveur${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Connexion SSH OK"

# 4. Déploiement sur le VPS
echo -e "\n${YELLOW}📦 Déploiement sur le VPS...${NC}"

ssh ${VPS_HOST} bash << EOF
    set -e
    
    # Installer Node.js (v20 LTS) si pas installé
    if ! command -v node &> /dev/null; then
        echo "${YELLOW}Installation de Node.js...${NC}"
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    
    
    # Installer PM2 si pas installé
    if ! command -v pm2 &> /dev/null; then
        echo "${YELLOW}Installation de PM2...${NC}"
        sudo npm install -g pm2
    fi
    
    # Installer nginx si pas installé
    if ! command -v nginx &> /dev/null; then
        echo "${YELLOW}Installation de nginx...${NC}"
        sudo apt-get update
        sudo apt-get install -y nginx
    fi
    
    echo "${YELLOW}📂 Préparation du répertoire...${NC}"
    
    # Créer le répertoire si nécessaire
    if [ ! -d "${DEPLOY_PATH}" ]; then
        sudo mkdir -p ${DEPLOY_PATH}
        sudo chown -R ${SERVER_USER}:${SERVER_USER} ${DEPLOY_PATH}
    fi
    
    cd ${DEPLOY_PATH}
    
    # Clone ou pull du repo
    if [ -d ".git" ]; then
        echo "${YELLOW}📥 Mise à jour du code...${NC}"
        git fetch origin
        git reset --hard origin/main
    else
        echo "${YELLOW}📥 Clone du repository...${NC}"
        git clone ${REPO_URL} .
    fi
    
    echo "${YELLOW}📦 Installation des dépendances...${NC}"
    npm install
    
    echo "${YELLOW}🏗️  Build de l'application...${NC}"
    npm run build
    
    echo "${YELLOW}🔄 Redémarrage avec PM2...${NC}"
    
    # Arrêter l'ancienne instance si elle existe
    pm2 delete ${APP_NAME} 2>/dev/null || true
    
    # Démarrer l'application
    pm2 start npm --name "${APP_NAME}" -- start
    pm2 save
    
    # Configurer PM2 au démarrage
    sudo env PATH=\$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu 2>/dev/null || true
    
    echo "${YELLOW}🌐 Configuration nginx...${NC}"
    
    # Créer la configuration nginx
    sudo tee /etc/nginx/sites-available/${APP_NAME} > /dev/null <<NGINX
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://localhost:${NODE_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
        proxy_set_header X-Real-IP \\\$remote_addr;
        proxy_set_header X-Forwarded-For \\\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\\$scheme;
    }
}
NGINX
    
    # Activer le site
    sudo ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/
    
    # Supprimer le site par défaut si présent
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Tester et redémarrer nginx
    sudo nginx -t && sudo systemctl restart nginx
    
    echo "${GREEN}✅ Déploiement terminé !${NC}"
EOF

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Erreur lors du déploiement${NC}"
  exit 1
fi

echo -e "\n${GREEN}🎉 Déploiement terminé avec succès !${NC}"
echo -e "${GREEN}🌍 Site accessible sur: http://${DOMAIN}${NC}"
echo -e "\n${YELLOW}💡 Pour activer HTTPS, connectez-vous au serveur et exécutez:${NC}"
echo -e "${YELLOW}   sudo apt-get install certbot python3-certbot-nginx${NC}"
echo -e "${YELLOW}   sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}${NC}\n"
