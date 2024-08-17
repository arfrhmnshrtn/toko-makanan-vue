<script setup>
import db from "../data/db.json";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { faHouse } from "@awesome.me/kit-KIT_CODE/icons/classic/solid";
// import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { ref } from "vue";

const route = useRoute();
const { id } = route.params;

const product = db.products.find((p) => p.id == id);

const cekStatus = ref(false);

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

function sendToCart() {
  cart.value.push(product);
  localStorage.setItem("cart", JSON.stringify(cart.value));

  cekStatus.value = true;

  setTimeout(() => {
    cekStatus.value = false;
  }, 3000);
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>

<template>
  <Navbar />
  <div class="h-screen flex-col flex justify-center items-center">
    <input type="checkbox" id="my_modal_7" class="modal-toggle" />
    <div class="modal" role="dialog">
      <div class="modal-box">
        <h3 class="text-2xl text-green-800 font-bold text-center">Succces</h3>
        <p class="py-4 text-center">Produk Telah ditambahkan ke keranjang</p>
      </div>
      <label class="modal-backdrop" for="my_modal_7">Close</label>
    </div>
    <div class="bg-slate-50 p-10 mt-5">
      <h1 class="text-2xl font-bold italic underline mb-5">Detail Product :</h1>
      <div class="flex flex-col md:flex-row">
        <img
          :src="product.gambar"
          class="shadow-xl rounded-md md:w-1/2"
          alt="Product Image"
        />
        <div class="flex flex-col justify-center md:ml-10 md:w-full">
          <h1 class="text-2xl font-bold mt-5">{{ product.nama }}</h1>
          <p class="text-md text-red-900 italic ">
            {{ `Rp. ${formatPrice(product.harga)}` }}
          </p>
          <p>{{ product.deskripsi }}</p>
          <div class="mt-10 md:flex">
            <label
              for="my_modal_7"
              class="btn w-1/2 bg-red-900 hover:bg-red-800 text-white"
              @click="sendToCart"
            >
              Add To Cart
            </label>
            <button class="btn w-1/2  bg-red-900  text-white hover:bg-red-800">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
