##  How to run CM BE

- Make sure docker-compose.dev.yaml is up-to-date
- Make sure .env.development is up-to-date

 1. `npm install`

 2. `npm run docker-compose:dev-build`

If you need to run **BE** locally you will need to stop the **clickmedicus-webapi-dev** container
change **REDIS_HOST** to localhost and run command  

 1. `npm run start:dev`
 
## If you need to generate new migrations, use these commands
 1.`npm run db:migration:generate`

 2.`npm run db:migration:run`

 