<<<<<<< HEAD
# Auth API Service

## What is it ?

*Auth API is a service to use in your application!*
It's common when starting maybe losing some time doing all authentication system, but with auth service you can include and **customize it** as you want!!

Auth API has an class controller system, that makes it easier for you to implement new functionalites integrated to the system, here I will be telling to you all about this service, but also teaching you how to implement new functionalities to the system, so yo ucan integrate it to your code.

## How it works ?

This service it's running on node.js + typescript, if you want to make some changes make sure you are creating a typescript file!

### Techs
  ![express-logo](https://github.com/rafaelrsi22/auth-service/assets/62354132/e30195c7-18ef-4a07-a130-02ab44cf6f71) ![communityIcon_4w7vh6c21f871](https://github.com/rafaelrsi22/auth-service/assets/62354132/1acbd1fb-436a-4708-b2a8-56b14a1026a7) ![images](https://github.com/rafaelrsi22/auth-service/assets/62354132/cf75f688-1ec7-4a0f-a071-3dcdd692a3b2) 
  ![1 hxgRJe0bU91JIhKo7zS-dQ](https://github.com/rafaelrsi22/auth-service/assets/62354132/5427ecaa-3a1b-4654-89c1-ec7e1f6ba866) ![images](https://github.com/rafaelrsi22/auth-service/assets/62354132/9008d906-8df5-4b30-b2b3-3fb3548feb65) ![68747470733a2f2f7374796c65732e7265646469746d656469612e636f6d2f74355f32716d366b2f7374796c65732f636f6d6d756e69747949636f6e5f64686a723667756330337835312e706e673f77696474683d32353626733d33653832356237323035633766343](https://github.com/rafaelrsi22/auth-service/assets/62354132/19028e72-dc3d-45c8-8ae8-c5337f952d15)

### Directories

**Basic Structure**

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/7ed565c7-15d5-4165-b027-55d1d9be3441)

First of all, we must understand what each of this folders mean, we first see we have a MySQL folder...

#### Setting up MySQL
If you already have a MySQL Server installed in your machine, you probally know already how it works, so then you can just start it in your machine and write down the database info.

Or else, you should have Docker installed in your computer, after initializing Docker Desktop, make your changes at Docker Compose file

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/69e5be2d-ff9c-4938-badd-72ef9dfb5158)

 > Make the changes that are marked down with the braces.

If you take a look at this folder you will see a SQL script, that is the Users table that we create, (USE IT AS A SECOND METHOD IF THE SEQUELIZE DOES NOT WORK).
So, after setting up the docker compose file, you should now start your database with the following command at the mysql folder:

```
docker compose up
```

obs: If you didn't make any change at the port, it will expose port 3307, so be aware of using it when connecting to database

#### Installing node modules

Ok, we have no secret on this, you should only run

```
npm install
```

at the root folder.

After it, take a look at the package.json file and change it as you want!!

#### Changing global variables

Take a look at the ".env" file, you will see that you need to setup some stuff

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/0bf8b312-063d-4329-b1e6-2e721afaaec7)

#### Done

You are done setting up your project, now you just need to start your database and after your express server.

## How to update it

First of all, we need to undestrand how this API works..

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/fccf56b7-defa-449e-83bf-7b5419d4a4f6)

Those are the folders that we need to care, we will be using it everytime when updating our app!

### Router

In the router, we have a authRoute, there is the "root" for all api calls
Basically it calls a controller function, but controllers are basically classes (We will get into it soon)

When we call a route, we can use a the *authorizedRoute*, it is used for protected routes where only when the user is logged in he can access it. (You can make any changes at the authorizedRoute folder)

### Controllers

This is the core of the application, here we will have a BaseController, it is a class that will be the parent of all the other controllers, it has the main functions for the requests, and all controllers should inherit it.

```ts
import { Request, Response } from "express";

import { BaseController } from "../BaseController";

class ModelController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {

    }
}

export default new ModelController();
```

This is the example that we need to follow in **all** controller classes, you basically inherit the BaseController, and then you can call any method you want using **this**.

OBS: When we create a route, we should use the "execute" function that we have in BaseController, as this example:

```ts
router.get('/', (req: Request, res: Response) => modelExample.execute(req, res));
```


## We are done!
So that is it, you now know basically what you should know about this, the services and models folder is for other porpouses (Model => The model for the database sequelize), (Services => Classes for general uses).
My recomendation is to use this service on a microservice based application, so you can make your app more flexible than this, this should be used as an external app, that is why I am assuming you will not care about the Models and Services folder.
=======
# Auth API Service

## What is it ?

*Auth API is a service to use in your application!*
It's common when starting maybe losing some time doing all authentication system, but with auth service you can include and **customize it** as you want!!

Auth API has an class controller system, that makes it easier for you to implement new functionalites integrated to the system, here I will be telling to you all about this service, but also teaching you how to implement new functionalities to the system, so yo ucan integrate it to your code.

## How it works ?

This service it's running on node.js + typescript, if you want to make some changes make sure you are creating a typescript file!

### Techs
  ![express-logo](https://github.com/rafaelrsi22/auth-service/assets/62354132/e30195c7-18ef-4a07-a130-02ab44cf6f71) ![communityIcon_4w7vh6c21f871](https://github.com/rafaelrsi22/auth-service/assets/62354132/1acbd1fb-436a-4708-b2a8-56b14a1026a7) ![images](https://github.com/rafaelrsi22/auth-service/assets/62354132/cf75f688-1ec7-4a0f-a071-3dcdd692a3b2) 
  ![1 hxgRJe0bU91JIhKo7zS-dQ](https://github.com/rafaelrsi22/auth-service/assets/62354132/5427ecaa-3a1b-4654-89c1-ec7e1f6ba866) ![images](https://github.com/rafaelrsi22/auth-service/assets/62354132/9008d906-8df5-4b30-b2b3-3fb3548feb65) ![68747470733a2f2f7374796c65732e7265646469746d656469612e636f6d2f74355f32716d366b2f7374796c65732f636f6d6d756e69747949636f6e5f64686a723667756330337835312e706e673f77696474683d32353626733d33653832356237323035633766343](https://github.com/rafaelrsi22/auth-service/assets/62354132/19028e72-dc3d-45c8-8ae8-c5337f952d15)

### Directories

**Basic Structure**

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/7ed565c7-15d5-4165-b027-55d1d9be3441)

First of all, we must understand what each of this folders mean, we first see we have a MySQL folder...

#### Setting up MySQL
If you already have a MySQL Server installed in your machine, you probally know already how it works, so then you can just start it in your machine and write down the database info.

Or else, you should have Docker installed in your computer, after initializing Docker Desktop, make your changes at Docker Compose file

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/69e5be2d-ff9c-4938-badd-72ef9dfb5158)

 > Make the changes that are marked down with the braces.

If you take a look at this folder you will see a SQL script, that is the Users table that we create, (USE IT AS A SECOND METHOD IF THE SEQUELIZE DOES NOT WORK).
So, after setting up the docker compose file, you should now start your database with the following command at the mysql folder:

```
docker compose up
```

obs: If you didn't make any change at the port, it will expose port 3307, so be aware of using it when connecting to database

#### Installing node modules

Ok, we have no secret on this, you should only run

```
npm install
```

at the root folder.

After it, take a look at the package.json file and change it as you want!!

#### Changing global variables

Take a look at the ".env" file, you will see that you need to setup some stuff

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/0bf8b312-063d-4329-b1e6-2e721afaaec7)

#### Done

You are done setting up your project, now you just need to start your database and after your express server.

## How to update it

First of all, we need to undestrand how this API works..

![image](https://github.com/rafaelrsi22/auth-service/assets/62354132/fccf56b7-defa-449e-83bf-7b5419d4a4f6)

Those are the folders that we need to care, we will be using it everytime when updating our app!

### Router

In the router, we have a authRoute, there is the "root" for all api calls
Basically it calls a controller function, but controllers are basically classes (We will get into it soon)

When we call a route, we can use a the *authorizedRoute*, it is used for protected routes where only when the user is logged in he can access it. (You can make any changes at the authorizedRoute folder)

### Controllers

This is the core of the application, here we will have a BaseController, it is a class that will be the parent of all the other controllers, it has the main functions for the requests, and all controllers should inherit it.

```ts
import { Request, Response } from "express";

import { BaseController } from "../BaseController";

class ModelController extends BaseController { 
    protected async executeImplement(req: Request, res: Response) {

    }
}

export default new ModelController();
```

This is the example that we need to follow in **all** controller classes, you basically inherit the BaseController, and then you can call any method you want using **this**.

OBS: When we create a route, we should use the "execute" function that we have in BaseController, as this example:

```ts
router.get('/', (req: Request, res: Response) => modelExample.execute(req, res));
```


## We are done!
So that is it, you now know basically what you should know about this, the services and models folder is for other porpouses (Model => The model for the database sequelize), (Services => Classes for general uses).
My recomendation is to use this service on a microservice based application, so you can make your app more flexible than this, this should be used as an external app, that is why I am assuming you will not care about the Models and Services folder.
>>>>>>> 54c524b8b99c259eaaa865ac45055d0e7d308ae5
