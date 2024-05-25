# How to setup a new Typescript Express project

1. npm init -y
2. npm install -D typescript
3. tsc --init
4. > tsc
   > Note: to run tsc you need single .ts file in directory
   >
5. npm i express
6. npm i @types/express
7. ```
     "scripts": {
       "build": "npx tsc",
       "watch": "npx tsc -w",
       "prestart": "npm run build",
       "start": "npx nodemon dist/index.js",
       "dev": "npx concurrently --kill-others \"npm run watch\" \"npm start\""
     }
   ```
8. npm i concurrently
