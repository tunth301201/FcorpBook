<template>
  <h2 class="mb-4 text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments</h2>
    <div class="max-w-2xl mx-auto">
      <form @submit.prevent="addComment">
          <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="name" class="sr-only">Name</label>
            <input id="name" type="text" v-model="name" class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Your name" required>
          </div>

          <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="text" class="sr-only">Your comment</label>
              <textarea id="text" v-model="text" rows="6"
                  class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..." required></textarea>
          </div>
          <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>

      </form>
    </div>
</template>
  
  <script>
  import axios from 'axios';
  import bus from './event-bus.js';


  export default {
    data() {
      return {
        name: '',
        text: ''
      };
    },
    methods: {
      addComment() {
        const bookId = this.$route.params.bookId;
        const { name, text } = this;

        const comment = {
          name,
          text
        };

        axios
          .post(`http://localhost:3000/books/comments/${bookId}`, comment)
          .then((response) => {
            
            console.log(response.data);
            const newCmt = {
              _id: response.data,
              name: this.name,
              text: this.text,
              replies: [],
            };

            this.name = '';
            this.text= '';
            

            // Emit the event to notify CommentList.vue
            bus.emit('new-comment', newCmt);
          })
          .catch((error) => {
            console.error(error);
          });
        },
    }
  };
  </script>


<style scoped>
button {
  background-color: #1d4ed8;
}
</style>
  