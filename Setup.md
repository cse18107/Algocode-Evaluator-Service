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
9. to setup eslint refer [eslint](https://blog.tericcabrel.com/set-up-a-nodejs-project-with-typescript-eslint-and-prettier/ "https://blog.tericcabrel.com/set-up-a-nodejs-project-with-typescript-eslint-and-prettier/")
10. wsl --distribution `<Distribution Name>` --user `<User Name>`

2:01:10

before start

---

docker pull python

```
wsl --distribution Ubuntu --user `soumodeep`
```

redis-server

npm run dev

---

