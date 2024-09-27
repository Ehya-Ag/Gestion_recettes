<template>
  <div class="container py-5">
    <div v-if="category" class="card p-4 shadow-lg">
      <h2>{{ $t('categoryDetails') }}</h2>
      <p><strong>{{ $t('id') }}:</strong> {{ category.id }}</p>
      <p><strong>{{ $t('name') }}:</strong> {{ category.nom }}</p>
      <router-link to="/liste-categorie" class="btn btn-primary">
        {{ $t('backToList') }}
      </router-link>
    </div>
    <div v-else>
      <p>{{ $t('categoryNotFound') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '../stores/gestion';

const route = useRoute();
const categoryStore = useCategoryStore();
const category = ref(null);

onMounted(() => {
  const categoryId = parseInt(route.params.id);
  category.value = categoryStore.categories.find(cat => cat.id === categoryId);
});
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
