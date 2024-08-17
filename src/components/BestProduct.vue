<script setup>
import { defineProps } from "vue"; // import defineProps from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goToProduct(id) {
  router.push({name: 'product', params: {id: id}});
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const { bestSeler } = defineProps(["bestSeler"]);
const bestProducts = bestSeler;
</script>

<template>
  <div class="mt-8 bg-slate-50 p-5">
    <h1 class="text-2xl font-bold italic">Best Products :</h1>
    <div class="flex justify-around flex-wrap hover:cursor-pointer">
      <div
        v-for="product in bestProducts"
        :key="product.id"
        @click="goToProduct(product.id)"
        class="card shadow-sm sm:w-72 mt-5 ease-in-out duration-300 bg-white hover:scale-105"
      >
        <figure>
          <img :src="product.gambar" :alt="product.nama" class="p-3" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ product.nama }}</h2>
          <p class="text-red-900">{{ `Rp. ${formatPrice(product.harga)}` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
