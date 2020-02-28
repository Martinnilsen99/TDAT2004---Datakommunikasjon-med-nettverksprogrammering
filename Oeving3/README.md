This project contains two folders, consisting of:
- React application running the frontend server.
- NodeJS backend server intended to be ran in docker.

## For starting up the application you will have to

Requirements:
You will have to have docker desktop downloaded

<hr/>

### `Run the backend server`

Run the following commands:

`cd server`

`docker build -t cppcompilator .`

`docker run -p 49160:8080 -d cppcompilator`

This will run the docker image in a container and map the port 8080 on the server to the port 49160 on your machine.

If you want to check if the server runs or not, you can open up a browser and type
http://localhost:49160/test and you should se the text "Testen fungerer".

<hr/>

### `Run the frontend application`

`cd cppkompilator`

`npm start`

This will run the frontend application locally on your machine.
You can acces it by opening your browser and type in the url:
http://localhost:3000/

<hr/>

### `Run without docker`

You may also want to run everything on your desktop without docker. 
If so, you'll have to run npm start in one terminal window for the frontend-application, and the backend server in another new terminal window.

If you want to run the project without docker, you will also have to edit the ports in the http-requests in server.js:app.post() (server) and app.js:kompiler() (cppkompilator). This is because the program uses one port in docker and maps the port to another one on your machine as of now. Change the ports here to 8080 and you should be good to go.
<br/>

#### Window 1:

`cd cppkompilator`

`npm start`

#### Window 2:

`cd server`

`nodemon server.js` or `node server.js`

<br/>

And you should be able to run the application by accessing:
http://localhost:3000/

If you want to check if the server runs or not, you can open up a browser and type
http://localhost:8080/test and you should se the text "Testen fungerer".
