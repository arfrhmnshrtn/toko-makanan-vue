<script setup>
import { useRoute, RouterLink } from "vue-router";
import { defineProps, ref, watch, computed } from "vue";

const emit = defineEmits(["search"]);

const route = useRoute();
const id = route.params.id;

const getCart = JSON.parse(localStorage.getItem("cart"));

const groupedCart = computed(() => {
  const cartMap = {};

  getCart.forEach((item) => {
    if (cartMap[item.id]) {
      cartMap[item.id].quantity++;
    } else {
      cartMap[item.id] = { ...item, quantity: 1 };
    }
  });

  return Object.values(cartMap);
});

function onSearch(event) {
  emit("search", event.target.value);
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>

<template>
  <main>
    <div
      class="navbar z-50 fixed top-0 left-0 right-0 bg-red-900 text-white shadow-md py-2 sm:py-5"
    >
      <div class="navbar max-w-screen-lg mx-auto">
        <div class="flex-1">
          <RouterLink to="/" class="btn text-2xl btn-ghost font-bold italic lg:text-3xl"
            >Foods</RouterLink
          >
        </div>
        <div class="flex-none">
          <!-- input search -->
          <div class="mr-3 text-black" v-if="!id">
            <label class="input input-sm input-bordered flex items-center sm:input-sm lg:input-md">
              <input
                type="text"
                class="grow"
                placeholder="Search"
                @input="onSearch"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </div>
          <!-- end input search -->

          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="badge badge-sm indicator-item">{{
                  getCart.length
                }}</span>
              </div>
            </div>

            <div
              tabindex="0"
              class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-96 shadow"
            >
              <div class="card-body text-black">
                <div class="overflow-x-auto">
                  <table class="table table-zebra">
                    
                    <tbody>
                      <!-- row 1 -->
                      <tr v-for="cart in groupedCart" :key="cart.id">
                        <!-- <th>{{cart.quantity }}</th> -->
                        <td class="w-24"><img :src="cart.gambar" alt=""></td>
                        <td>{{ cart.nama }}</td>
                        <td class="text-red-900">{{ `Rp. ${formatPrice(cart.harga)}` }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-if="getCart.length == 0">
                    <p class="italic">Keranjang Masih Kosong!!</p>
                  </div>
                </div>
              </div>
              <div class="" v-if="getCart.length > 0">
                <RouterLink
                  to="/keranjang"
                  class="btn btn-block text-white h-10 bg-red-900 hover:bg-red-800"
                  >Tampilkan Keranjang Belanja</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
