#!/bin/bash

# Configuration - Modifie ces valeurs
VPS_USER="your-username"
VPS_HOST="your-vps-ip"
VPS_PATH="~/site-bae"
APP_NAME="site-bae"

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Déploiement de site-bae en cours...${NC}\n"

# 1. Vérifier que tout est commité
if [[ -n $(git status -s) ]]; then
  echo -e "${RED}❌ Tu as des changements non commités. Commit-les d'abord.${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Pas de changements non commités"

# 2. Push vers le repo distant
echo -e "\n${YELLOW}📤 Push vers le repo distant...${NC}"
git push origin main

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Erreur lors du push${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Push réussi"

# 3. Déploiement sur le VPS
echo -e "\n${YELLOW}📦 Déploiement sur le VPS...${NC}"

ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
set -e

cd ~/site-bae

echo "📥 Pull des derniers changements..."
git pull origin main

echo "📦 Installation des dépendances..."
npm install --production=false

echo "🔨 Build de l'application..."
npm run build

echo "♻️  Redémarrage de l'application..."
pm2 restart site-bae || pm2 start npm --name "site-bae" -- start

echo "💾 Sauvegarde de la config PM2..."
pm2 save

echo "✅ Déploiement terminé !"
ENDSSH

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Erreur lors du déploiement${NC}"
  exit 1
fi

echo -e "\n${GREEN}✅ Déploiement réussi !${NC}"
echo -e "${GREEN}🌐 Ton site est en ligne${NC}\n"
