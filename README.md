# Description

teslo shop e-commerce made with nextjs14


## run the project (development)

### before to start
make sure you have these programs installed in your machine
- docker 
- node v20.13
- yarn (package manager)

### run app

1. Clone the repo
2. copy the file __.env.template__ and rename it as __.env__
3. fill all the field in the __.env__ file
4. install dependencies ```yarn install```
5. run database ```docker compose up -d```
6. run db migrations ```yarn prisma migrate dev```
7. run db migrations ```yarn prisma generate```
8. execute seed ```yarn seed```
9. run de project ```yarn dev```
10. clean local storage in the browser
11. go to link __http://localhost:3000__


## run the project (production)