<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-primary">{{ $t('categoryList') }}</h1>
        <router-link to="/ajout-Categorie" class="btn btn-primary">
          {{ $t('addCategory') }}
        </router-link>
      </div>
      <div class="row" v-if="categories.length">
        <div class="col-md-4 mb-4" v-for="category in categories" :key="category.id">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title">{{ category.nom }}</h5>
              <div class="d-flex justify-content-end">
                <router-link
                  :to="`/edit-categorie/${category.id}`"
                  class="btn btn-warning btn-sm me-2"
                >
                  <i class="fas fa-edit"></i> Modifier
                </router-link>
                <button @click="confirmDelete(category.id)" class="btn btn-danger btn-sm">
                  <i class="fas fa-trash"></i> Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>{{ $t('noCategories') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useCategoryStore } from '../stores/gestion'

const storeC = useCategoryStore()
const categories = computed(() => storeC.categories)

const confirmDelete = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
    await deleteCategory(id)
    await storeC.loadCategoriesFromApi()
  }
}

const deleteCategory = async (id) => {
  await storeC.deleteCategory(id)
}

onMounted(async () => {
  await storeC.loadCategoriesFromApi()
})
</script>

<style scoped>
.background-container {
  background-image: url('https://image.shutterstock.com/image-photo/blur-coffee-shop-cafe-restaurant-260nw-364151948.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.card {
  border-radius: 10px; /* Coins arrondis */
}

.card-title {
  font-size: 1.25rem; /* Taille de police pour le titre de la carte */
}
</style>
