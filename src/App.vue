<template>
  <section class="bg-white dark:bg-gray-900 py-8">
    <div class="max-w-2xl mx-auto px-4">
    <BookDetails :book="book" />
    <CommentForm />
    <CommentList :comments="comments" />
  </div>
  </section>
</template>

<script>
import BookDetails from './components/BookDetails.vue';
import CommentList from './components/CommentList.vue';
import CommentForm from './components/CommentForm.vue';
import axios from 'axios';


export default {
  components: {
    BookDetails,
    CommentList,
    CommentForm
  },
  data() {
    return {
      book: {},
      comments: []
    };
  },
  mounted() {
    const bookId = this.$route.params.bookId;
    this.fetchBook(bookId);
    this.fetchComments(bookId);
  },
  watch: {
    '$route.params.bookId': {
      immediate: true,
      handler(newBookId) {
        this.fetchBook(newBookId);
        this.fetchComments(newBookId);
      }
    }
  },
  methods: {
    fetchBook(bookId) {
      axios
        .get(`http://localhost:3000/books/${bookId}`)
        .then((response) => {
          this.book = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchComments(bookId) {
      axios
        .get(`http://localhost:3000/books/comments/${bookId}`)
        .then((response) => {
          this.comments = response.data.map((comment) => {
            const { _id } = comment;
            const { name, text, replies } = comment._source;
            return { _id, name, text, replies };
          });
          console.log("comments response: ", this.comments);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
