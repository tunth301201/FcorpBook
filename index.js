const fastify = require('fastify')();
const { Client } = require('@elastic/elasticsearch');
const fastifyCors = require('@fastify/cors');

// Enable CORS
fastify.register(fastifyCors, {
  origin: 'http://localhost:8080',
});

// Create an Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });


// API retrieve all books from Elasticsearch
fastify.get('/books', async (request, reply) => {
    try {
        const response = await client.search({
          index: 'books',
          size: 1000, // Retrieve a maximum of 1000 books (adjust as needed)
          body: {
            query: {
              match_all: {},
            },
          },
        });
    
        const books = response.hits.hits.map((hit) => hit._source);
        reply.send(books);
      } catch (error) {
        console.error(error);
        reply.status(500).send('Internal Server Error');
    }
});


// API retrieve a specific book by ID from Elasticsearch
fastify.get('/books/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const response = await client.get({
        index: 'books',
        id,
      });
  
      if (!response.found) {
        reply.status(404).send('Book not found');
      } else {
        const book = response._source;
        reply.send(book);
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send('Internal Server Error');
    }
});


// API create a new book in Elasticsearch
fastify.post('/books', async (request, reply) => {
    const { title, author, publishedDate, description, price } = request.body;

    // Validate incoming data
    if (!title || !author || !publishedDate || !description || !price) {
      reply.status(400).send('Missing required fields');
      return;
    }
  
    try {
      const response = await client.index({
        index: 'books',
        body: {
          title,
          author,
          publishedDate,
          description,
          price,
        },
      });
  
      reply.send("Created a new book with id "+ response._id);
    } catch (error) {
      console.error(error);
      reply.status(500).send('Internal Server Error');
    }
});


// API update an existing book by ID in Elasticsearch
fastify.put('/books/:id', async (request, reply) => {
    const { id } = request.params;
    const { title, author, publishedDate, description, price } = request.body;
  
    // Validate incoming data
    if (!title && !author && !publishedDate && !description && !price) {
      reply.status(400).send('At least one field must be provided for update');
      return;
    }
  
    try {
      const response = await client.update({
        index: 'books',
        id,
        body: {
          doc: {
            title,
            author,
            publishedDate,
            description,
            price,
          },
        },
      });
  
      if (!response.result) {
        reply.status(404).send('Book not found');
      } else {
        reply.send("The book with id "+ id +" has been updated");
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send('Internal Server Error');
    }
});


// API retrieve all comments of a specific book from Elasticsearch
fastify.get('/books/comments/:bookId', async (request, reply) => {
  const { bookId } = request.params;

  try {
    const response = await client.search({
      index: 'comments',
      size: 1000, // Retrieve a maximum of 1000 comments (adjust as needed)
      body: {
        query: {
          match: {
            bookId,
          },
        },
      },
    });

    const comments = response.hits.hits;
    reply.send(comments);
  } catch (error) {
    console.error(error);
    reply.status(500).send('Internal Server Error');
  }


  // await client.indices.delete({ index: 'comments' });
});


// API add a comment for a specific book in Elasticsearch
fastify.post('/books/comments/:bookId', async (request, reply) => {
  const { bookId } = request.params;
  const { name, text } = request.body;

  // Validate incoming data
  if (!name || !text) {
    reply.status(400).send('Missing required fields');
    return;
  }

  try {
    const response = await client.index({
      index: 'comments',
      body: {
        bookId,
        name,
        text,
        replies: [], 
      },
    });

    reply.send("Created a new comment with id " + response._id);
  } catch (error) {
    console.error(error);
    reply.status(500).send('Internal Server Error');
  }
});


// API reply to a comment of a specific book in Elasticsearch
fastify.post('/books/comments/:bookId/replies/:commentId', async (request, reply) => {
  const { bookId, commentId } = request.params;
  const { name, text } = request.body;

  // Validate incoming data
  if (!name || !text) {
    reply.status(400).send('Missing required fields');
    return;
  }

  try {
    const commentResponse = await client.get({
      index: 'comments',
      id: commentId,
    });

    console.log("commentResponse", commentResponse)

    const comment = commentResponse._source;
    const replyComment = {
      replyId: generateUniqueReplyId(), 
      name,
      text,
    };

    // Add the new reply comment to the 'replies' array
    comment.replies.push(replyComment);

    // Update the comment in Elasticsearch with the new 'replies' array
    const updateResponse = await client.update({
      index: 'comments',
      id: commentId,
      body: {
        doc: {
          replies: comment.replies,
        },
      },
    });

    reply.send("Created a new reply with id " + replyComment.replyId);
  } catch (error) {
    console.error(error);
    reply.status(500).send('Internal Server Error');
  }
});

function generateUniqueReplyId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);

  return `${timestamp}-${randomNum}`;
}






// API edit a comment of a specific book in Elasticsearch
fastify.put('/books/comments/:bookId/:commentId', async (request, reply) => {
  const { bookId, commentId } = request.params;
  const { text } = request.body;

  try {
    const response = await client.update({
      index: 'comments',
      id: commentId,
      body: {
        doc: {
          text,
        },
      },
    });

    if (!response.result) {
      reply.status(404).send('Comment not found');
    } else {
      reply.send("The comment with id " + commentId + " has been updated");
    }
  } catch (error) {
    console.error(error);
    reply.status(500).send('Internal Server Error');
  }
});


// API delete a comment of a specific book in Elasticsearch
fastify.delete('/books/comments/:bookId/:commentId', async (request, reply) => {
  const { commentId } = request.params;

  try {
    const response = await client.delete({
      index: 'comments',
      id: commentId,
    });

    if (response.result === 'deleted') {
      reply.send("The comment with id " + commentId + " has been deleted");
    } else {
      reply.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error(error);
    reply.status(500).send('Internal Server Error');
  }
});


// Start the server
fastify.listen({ port: 3000 }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Server is running on port 3000');
  });