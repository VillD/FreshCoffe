<template>
    <div class="col-span-full" v-for="(size, index) in store.sizes" :key="index">
        <label :for="index" class="block text-sm font-medium leading-6 text-gray-900">
            Precio: {{ size.size }}
        </label>
        <div class="mt-2">
            <input
                :id="index"
                :name="index"
                type="number"
                :value="size.price > 0 ? size.price : ''"
                class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :placeholder="`Precio del tamaño ${size.size}`"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import {usePriceStore, appStore} from '@/stores/price'
const store = usePriceStore(appStore)
</script>

<style scoped></style>
