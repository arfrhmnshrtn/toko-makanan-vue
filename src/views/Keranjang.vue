<script setup>
import Navbar from "@/components/Navbar.vue";
import { computed, ref, watch, onMounted } from "vue";

// Initialize the cart from localStorage or set it to an empty array if null
const getCart = ref(JSON.parse(localStorage.getItem("cart")) || []);
const selectedItem = ref(null);

const groupedCart = computed(() => {
  const cartMap = getCart.value.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity++;
    } else {
      acc[item.id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  return Object.values(cartMap);
});

function removeItem() {
  if (selectedItem.value) {
    getCart.value = getCart.value.filter(
      (item) => item.id !== selectedItem.value.id
    );
    selectedItem.value = null;
  }

  closeModal();
}

function openRemoveModal(item) {
  selectedItem.value = item;
  document.getElementById("my_modal_1").showModal();
}

// Close modal and reset selectedItem
function closeModal() {
  selectedItem.value = null;
  document.getElementById("my_modal_1").close();
}

const ceklistAll = ref(false);

function selectAll() {
  ceklistAll.value = !ceklistAll.value;
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function removeAll() {
  getCart.value = [];
  ceklistAll.value = false;
}

// Watch the getCart ref and update localStorage whenever it changes
watch(getCart, (newCart) => {
  localStorage.setItem("cart", JSON.stringify(newCart));
});

onMounted(() => {
  // Ensure modal is accessible via keyboard by focusing on the close button
  const modal = document.getElementById("my_modal_1");
  modal.addEventListener("close", () => {
    selectedItem.value = null;
  });
});
</script>

<template>
  <div class="mt-5">
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Konfirmasi Penghapusan</h3>
        <p class="py-4">Apakah anda yakin ingin menghapus item ini?</p>
        <div class="modal-action">
          <button @click="removeItem" class="btn mr-1">Oke</button>
          <button @click="closeModal" class="btn">Close</button>
        </div>
      </div>
    </dialog>

    <div class="bg-red-900 absolute left-0 right-0 top-0 p-5">
      <div class="flex justify-between max-w-screen-lg mx-auto">
        <h1 class="text-xl text-white font-bold italic">Keranjang</h1>
        <button class="text-md text-white" @click="removeAll">Hapus Semua</button>
      </div>
    </div>

    <div class="mt-24">
      <div
        v-for="item in groupedCart"
        :key="item.id"
        class="flex justify-between items-center bg-slate-50 p-5 mt-2"
      >
        <div class="flex items-center">
          <input type="checkbox" class="w-5 h-5 mr-2" :checked="ceklistAll" />
          <img :src="item.gambar" class="w-20 rounded-xl" alt="Product Image" />
          <div class="pl-5">
            <h1 class="text-base">{{ item.nama }}</h1>
          </div>
        </div>
        <p>{{ item.quantity }}</p>
        <div>
          <p class="text-sm italic text-slate-500">
            {{ `Rp. ${formatPrice(item.harga)}` }}
          </p>
          <button class="text-sm text-red-500" @click="openRemoveModal(item)">
            Remove
          </button>
        </div>
      </div>
    </div>

    <div
      class="flex w-full right-0 left-0 absolute bottom-0 items-center bg-slate-50 p-5"
    >
      <div class="max-w-screen-lg mx-auto flex w-full">
        <div class="flex items-center w-full">
          <input
            type="checkbox"
            class="w-5 h-5 mr-2 cursor-pointer"
            @click="selectAll"
          />
          <p>Pilih semua</p>
        </div>

        <button class="btn bg-red-900 text-white">Checkout</button>
      </div>
    </div>
  </div>
</template>
