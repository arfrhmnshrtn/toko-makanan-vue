<script setup>
import { defineProps, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["products"]); // Get props
const AllProducts = ref(props.products); // Initialize ref with the props value

const router = useRouter();

function goToProduct(id) {
  router.push({ name: "product", params: { id: id } });
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// Watch for changes in the products prop and update AllProducts
watch(
  () => props.products, // The value to watch
  (newProducts) => {
    AllProducts.value = newProducts; // Update AllProducts when products change
  },
  { immediate: true } // This makes sure it runs initially to set the value
);
</script>

<template>
  <div class="mt-8 bg-slate-50 p-5">
    <h1 v-if="AllProducts.length > 0" class="text-2xl font-bold italic">
      All Products :
    </h1>
    <div class="flex justify-center flex-wrap gap-5 hover:cursor-pointer">
      <div
        v-for="product in AllProducts"
        :key="product.id"
        class="card shadow-sm sm:basis-72 mt-5 ease-in-out duration-300 bg-white hover:scale-105"
        @click="goToProduct(product.id)"
      >
        <figure class="rounded-lg">
          <img :src="product.gambar" alt="Product Image" class="p-3 " />
        </figure>
        <div class="card-body" >
          <h2 class="card-title font-semibold">{{ product.nama }}</h2>
          <p class="text-red-900">{{ `Rp. ${formatPrice(product.harga)}` }}</p>
        </div>
      </div>
    </div>
    <div>
      <p v-if="AllProducts.length === 0" class="text-2xl font-bold italic">
        Product Yang Dicari Tidak ada Nih :(
      </p>
    </div>
  </div>
</template>
