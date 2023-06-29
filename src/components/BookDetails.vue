<template>
    <a href="#" class="mb-6 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://images-eu.ssl-images-amazon.com/images/I/41rkMKTQ7TL._AC_SX368_.jpg" alt="">
      <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ book.title }}</h5>
          <p><strong class="font-bold">Author:</strong> {{ book.author }}</p>
          <p><strong class="font-bold">Published Date:</strong> {{ book.publishedDate }}</p>
          <p><strong class="font-bold">Description:</strong> {{ book.description }}</p>
          <p><strong class="font-bold">Price:</strong> {{ book.price }}</p>
      </div>
  </a>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  }
};
</script>
