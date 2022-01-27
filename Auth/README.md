# CHALLENGE BACKEND - NodeJs

## Descripcion del proyecto

Este proyecto desarrola una API para explorar el mundo de Disney, permite conocer, crear y modificar personajes, peliculas y series de Disney.

## Tecnologias

- Node JS
- Express
- Sequelize
- JsonWebToken
- Bcrypt
- Nodemailer
- Dotenv

## Paso a paso para acceder al proyecto

- clonar proyecto y ejecutar npm install en la consola;

- modificar el nombre de .envexample a .env e ingresar los datos de base de datos;

- ingresar los siguientes comandos en la consola para crear y poblar la base de datos:

    * sequelize db:create
    * sequelize db:migrate
    * sequelize db:seed:all

- escribir en consola npm start

- ingresar en .env la informacion de la cuenta de email que queremos utilizar para el envío de email de bienvenida

## Documentacion

En la carpeta "documentación" podemos encontrar un archivo que se puede visualizar abriendo el mismo desde POSTMAN. 
En este están registradas todas las rutas y sus acciones, con ejemplos y diferentes errores que podemos disparar al ingresar información incorrecta.

