# FcorpBook
This repository contains the backend code for a Node.js API that interacts with an Elasticsearch database to perform CRUD operations on books and comments. The API allows retrieving books, creating new books, updating existing books, retrieving comments, adding new comments, replying to comments, editing comments, and deleting comments.

## Prerequisites
Before running the API, make sure you have the following prerequisites installed:

- Node.js
- Elasticsearch

To configure Elasticsearch, follow these steps:

- Download the appropriate version of Elasticsearch for your operating system. In this case, I'm using the Windows version, which can be downloaded from the following link: https://www.elastic.co/downloads/elasticsearch.

- Once downloaded, extract the downloaded folder. For my source code, Elasticsearch is set to run at URL http://localhost:9200. To ensure that Elasticsearch runs on the correct port and is not blocked when using HTTP instead of HTTPS, we need to edit the config/elasticsearch.yml file and check the following lines:

`#network.host: 192.168.0.1`

`#http.port: 9200`

`xpack.security.enabled: true
xpack.security.authc:
anonymous:
    username: anonymous_user
    roles: superuser
    authz_exception: false`

`xpack.security.http.ssl:
  enabled: false
  keystore.path: certs/http.p12`

`xpack.security.transport.ssl:
  enabled: false
  verification_mode: certificate
  keystore.path: certs/transport.p12
  truststore.path: certs/transport.p12`

Ensure that you have the necessary conditions in place to easily access Elasticsearch.

Please note that the specific configuration steps may vary depending on your operating system and Elasticsearch version.

## Installation

1. Clone the repository - branch main (main: backend, frontend: interface):

`git clone -b main https://github.com/your/repository.git`

2. Install the dependencies:

`cd FcorpBook`
`yarn install`

3. Configure the Elasticsearch connection:

Open the index.js file and modify the node property of the Client object to match your Elasticsearch server's URL.

4. Start the API:

- Run Elasticsearch: `bin/elasticsearch.bat`
The Elasticsearch will start running on http://localhost:9200

- `npm start`
The API will start running on http://localhost:3000.

## API Endpoints
The API exposes the following endpoints. In this section, I only illustrate the CRUD API for the Book. The illustration for Comment will be presented in the Readme.md file of the frontend branch:

- **GET /books**

Retrieves all books from the Elasticsearch database.

- **GET /books/:id**

Retrieves a specific book by its ID from the Elasticsearch database.

- **POST /books**

Creates a new book in the Elasticsearch database.

- **PUT /books/:id**

Updates an existing book by its ID in the Elasticsearch database.

- **GET /books/comments/:bookId**

Retrieves all comments of a specific book from the Elasticsearch database.

- **POST /books/comments/:bookId**

Adds a new comment for a specific book in the Elasticsearch database.

- **POST /books/comments/:bookId/replies/:commentId**

Adds a new reply to a comment of a specific book in the Elasticsearch database.

- **PUT /books/comments/:bookId/:commentId**

Edits a comment of a specific book in the Elasticsearch database.

- **DELETE /books/comments/:bookId/:commentId**

Deletes a comment of a specific book from the Elasticsearch database.

Make sure to replace :id, :bookId, and :commentId with the appropriate values when making requests.

Please note that the API expects the request body to be in JSON format and follows the RESTful principles for the different CRUD operations.

## Illustration
Here are the API test illustrations use Thunder Client of Visual Studio (similar to Postman):

1. **GET /books**

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/645d4276-835c-4fb1-bcfb-b841c7be9034)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/bba83b65-e8e4-4bc5-bc54-75e0bf200016)


2. **GET /books/:id**

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/b8b0c7ee-0cb3-4602-b846-962581d72a17)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/09071324-962b-4775-b8ce-d8b75bc88fc0)


3. **POST /books**

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/83e9c6a1-2b5a-448d-9c03-1648409fb983)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/7fcdf3a5-2b99-4f8f-88eb-527cd2e1bec1)


4. **PUT /books/:id**

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/a6cc93e3-d0eb-43d4-83fa-5e5eba7b8e97)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/dde427e7-8e36-427a-9e36-168745b29796)

