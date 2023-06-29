# BookStore

The project build a simple web page using VueJS to display book data (`main` branch). A book page includes a `title`, `author`, `publishedDate`, `description`, `price` and a `comment` area. Users can comment and reply to other comments with a maximum of one level of nesting. Style the web page using Tailwind CSS to make it visually appealing. Implement validation to ensure that comments cannot be empty. Add features like editing and deleting comments.

## Prerequisites

Before running the Vue project, make sure you have the backend running at URL http://localhost:3000 (refer to the README.md in the `main` branch).

## Installation

1. Clone the repository - `frontend` branch

  `git clone -b frontend https://github.com/your/repository.git`

2. Install the dependencies

  `cd FcorpBook`
  `yarn install`

3. Start the Vue project

   `npm run serve`
  The project will start running on http://localhost:8080

4. Access the page of the specific book

   Go to http://localhost:8080/{bookId} to view the book page

## Features

I use Vue components to create modular and reusable components, including:

- `BookDetails` component: displays detailed information about a book. The information includes the title, author, publishedDate, description, and price of a book.
- `CommentList` component: displays individual comments. This component shows all comments and replies to each comment. Users can edit/delete comments.
- `CommentForm` component: handles adding new comments.

Comment after being added/edited/deleted, the comment will be displayed/edited/disappeared from the Comments section without reloading the page.

## Illustration

1. The page of a specific book (In this case, display book with bookId: 5X1r7YgB__nR_A6aHABM)

`http://localhost:8080/5X1r7YgB__nR_A6aHABM`

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/476c8348-820d-45f3-84e9-54345d8f63a6)

2. Add a new comment (the name and text fields are required)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/0de277ad-932b-4dc8-a775-65a7d42115d3)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/f8b59665-520a-4019-a72c-1836c582f154)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/8c693f6d-ab90-4871-b8a1-b990e68c088a)

3. Reply to a comment

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/13d7d08b-b48d-485f-a3c0-0f5a2e1d273e)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/06328d71-e8a2-4886-9608-c113b5297cf0)

4. Edit a comment

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/364da947-c6ab-43a7-bf12-7c485ec51fc9)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/7ad260de-5ed8-469e-8f48-96907a4ce603)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/ec2e2ecf-fc10-48d5-a6c5-cd055f9775c6)

5. Delete a comment

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/c94ffa58-438a-45a9-9245-1e2dbec00253)

![image](https://github.com/tunth301201/FcorpBook/assets/92015206/4047c8a4-4ea2-456e-bfd8-48338f854290)
