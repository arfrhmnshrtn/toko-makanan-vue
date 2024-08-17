<script setup>
import { ref, watch } from "vue";
import Navbar from "../components/Navbar.vue";
import db from "../data/db.json";
import Banner from "@/components/Banner.vue";
import BestProduct from "@/components/BestProduct.vue";
import AllProducts from "@/components/AllProducts.vue";

// Initialize the products state
const products = ref(db.products); // Access db.products directly
const bestSeler = ref(db.best_products);
const search = ref("");

function cari(event) {
  search.value = event.target.value;
}

// Watch for changes in the search input and filter products
watch(
  search,
  (newSearch) => {
    const filteredProducts = db.products.filter((product) => {
      return product.nama.toLowerCase().includes(newSearch.toLowerCase());
    });
    products.value = filteredProducts;
  },
  { immediate: true } // Apply filter on initialization
);
</script>

<template>
  <Navbar @search="search = $event" />

  <Banner v-if="!search" />
  <BestProduct v-if="!search" :bestSeler="bestSeler" />
  <AllProducts :class="search ? 'mt-40' : ''" :products="products" />
</template>
