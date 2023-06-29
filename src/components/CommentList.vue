<template>

    <div v-for="comment in commentList" :key="comment._id" class="mt-6 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">

      <!-- Comments -->
      <article class="p-6 mb-0 text-base bg-white rounded-lg dark:bg-gray-900">
        <!-- Image, name -->
          <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                          class="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough">{{ comment.name }}</p>
              </div>
          </footer>
          <!-- Comment -->
          <p class="text-gray-500 dark:text-gray-400">{{ comment.text }}</p>
          <!-- Reply, Edit, Delete button -->
          <div class="flex items-center mt-4 space-x-4">
              <button @click="replyComment(comment._id)" type="button"
                  class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                  <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Reply
              </button>

              <button @click="editComment(comment._id)" type="button"
                  class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vector-pen" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/> <path fill-rule="evenodd" d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/> </svg>
                  Edit
              </button>

              <button @click="confirmDelete(comment._id)" type="button"
                  class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>                  Delete
              </button>
          </div>
      </article>

      <!-- Replies comment -->
      <article v-for="reply in comment.replies" :key="reply.replyId" class="pl-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
        <!-- Image, name -->
          <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                          class="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="Jese Leos">{{ reply.name }}</p>
                  
              </div>
          </footer>
          <!-- Reply comment -->
          <p class="text-gray-500 dark:text-gray-400">{{ reply.text }}</p>
      </article>
    </div>

</template>

<script>
import axios from 'axios';
import bus from './event-bus.js';

export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return { 
      commentList: []
    };
  },
  created() {
    this.updateCommentList();

    bus.on('new-comment', (comment) => {
    this.addNewComment(comment);
  });
  },
  watch: {
    comments: {
      immediate: true,
      handler() {
        this.updateCommentList();
      }
    }
  },
  methods: {
    updateCommentList() {
      this.commentList = [...this.comments];
    },
    editComment(commentId) {
      console.log("edit comment pass: ", commentId);
      const bookId = this.$route.params.bookId;
      const newText = prompt('Enter the new comment text:');
      if (newText === null) {
        return;
      }

      axios
        .put(`http://localhost:3000/books/comments/${bookId}/${commentId}`, { text: newText })
        .then(() => {
          const comment = this.commentList.find((c) => c._id === commentId);
          if (comment) {
            comment.text = newText;
          }
        })
        .catch((error) => {
          console.error(error);
        }); 
    },
    confirmDelete(commentId) {
      const confirmation = confirm('Are you sure you want to delete this comment?');
      if (confirmation) {
        this.deleteComment(commentId);
      }
    },
    deleteComment(commentId) {
      const bookId = this.$route.params.bookId;
      console.log("delete comment pass: ", commentId);
      axios
        .delete(`http://localhost:3000/books/comments/${bookId}/${commentId}`)
        .then(() => {
          this.commentList = this.commentList.filter((c) => c._id !== commentId);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addNewComment(comment) {
      this.commentList.push(comment);
    },
    replyComment(commentId) {
      const bookId = this.$route.params.bookId;
      const name = prompt('Enter your name:');
      const text = prompt('Enter your reply:');
      if (!name || !text) {
        return;
      }

      axios
        .post(`http://localhost:3000/books/comments/${bookId}/replies/${commentId}`, {
          name,
          text
        })
        .then(response => {
          const replyComment = {
            replyId: response.data,
            name,
            text
          };

          const comment = this.commentList.find(c => c._id === commentId);
          if (comment) {
            if (!comment.replies) {
              comment.replies = [];
            }
            comment.replies.push(replyComment);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>



