# Pull code
cd /home/ubuntu/clickmedicus-api/
git checkout development
git pull origin development

# Build and deploy
npm install
npm run build
npm run start:dev
# pm2 restart server