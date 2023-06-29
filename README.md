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

xpack.security.enabled: true
xpack.security.authc:
anonymous:
    username: anonymous_user
    roles: superuser
    authz_exception: false


xpack.security.http.ssl:
  enabled: false
  keystore.path: certs/http.p12


xpack.security.transport.ssl:
  enabled: false
  verification_mode: certificate
  keystore.path: certs/transport.p12
  truststore.path: certs/transport.p12

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

`npm start`

The API will start running on http://localhost:3000.

## API Endpoints
The API exposes the following endpoints:

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


2. **GET /books/:id**


3. **POST /books**


4. **PUT /books/:id**
