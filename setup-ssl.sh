#!/bin/bash

# Configuration
VPS_HOST="kine-vps"
DOMAIN="kineoliviajaumain.be"
EMAIL="jaumainolivia1002@gmail.com" 

# Couleurs pour les logs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔒 Configuration HTTPS pour ${DOMAIN}${NC}"

# Vérifier la connexion SSH
echo -e "\n${YELLOW}📡 Vérification de la connexion SSH...${NC}"
if ! ssh -o ConnectTimeout=10 ${VPS_HOST} "echo 'Connexion OK'" > /dev/null 2>&1; then
    echo -e "${RED}❌ Impossible de se connecter au serveur${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Connexion SSH OK"

# Installation et configuration SSL
echo -e "\n${YELLOW}🔐 Installation de Certbot et configuration SSL...${NC}"

ssh ${VPS_HOST} bash << EOF
    set -e
    
    echo "${YELLOW}📦 Installation de Certbot...${NC}"
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
    
    echo "${YELLOW}🔒 Génération du certificat SSL...${NC}"
    sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} \
        --non-interactive \
        --agree-tos \
        --email ${EMAIL} \
        --redirect
    
    echo "${YELLOW}⏰ Configuration du renouvellement automatique...${NC}"
    # Le renouvellement automatique est déjà configuré par défaut avec systemd
    sudo systemctl enable certbot.timer
    sudo systemctl start certbot.timer
    
    # Tester le renouvellement
    sudo certbot renew --dry-run
    
    echo "${GREEN}✅ HTTPS activé avec succès !${NC}"
EOF

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Erreur lors de la configuration SSL${NC}"
  exit 1
fi

echo -e "\n${GREEN}🎉 Configuration SSL terminée avec succès !${NC}"
echo -e "${GREEN}🔒 Site accessible sur: https://${DOMAIN}${NC}"
echo -e "${GREEN}🔄 Le certificat se renouvellera automatiquement tous les 90 jours${NC}\n"
