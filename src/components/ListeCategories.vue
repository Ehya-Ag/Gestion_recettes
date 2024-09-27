<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-primary">{{ $t('categoryList') }}</h1>
        <router-link to="/ajout-Categorie" class="btn btn-primary">{{ $t('addCategory') }}</router-link>
      </div>
      <div v-if="categories.length">
        <table class="table table-striped table-bordered table-hover">
  <thead class="table-dark">
    <tr>
      <th scope="col">{{ $t('id') }}</th>
      <th scope="col">{{ $t('name') }}</th>
      <th scope="col" class="text-end">{{ $t('actions') }}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="category in categories" :key="category.id">
      <td>{{ category.id }}</td>
      <td>{{ category.nom }}</td>
      <td class="text-end">
        <!-- Bouton de visualisation avec l'icône d'œil -->
        <router-link :to="`/DetailsCategorie/${category.id}`" class="btn btn-info btn-sm me-2">
          <i class="fas fa-eye"></i> <!-- Icône en forme d'œil pour "view" -->
        </router-link>

        <!-- Bouton pour éditer la catégorie -->
        <router-link :to="`/edit/${category.id}`" class="btn btn-warning btn-sm me-2">
          <i class="fas fa-edit"></i>
        </router-link>

        <!-- Bouton pour supprimer la catégorie -->
        <button @click="confirmDelete(category.id)" class="btn btn-danger btn-sm">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  </tbody>
</table>

      </div>
      <div v-else>
        <p>{{ $t('noCategories') }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCategoryStore } from '../stores/gestion';

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.getCategories());

onMounted(() => {
  // Vous pouvez ajouter ici une méthode pour charger les catégories depuis une API si nécessaire.
});
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

.table {
  border-radius: 10px;
  overflow: hidden;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-bordered {
  border: 2px solid #dee2e6;
}

.table-hover tbody tr:hover {
  background-color: #e9ecef;
}

.table-dark {
  background-color: #343a40;
  color: #fff;
}

.table-dark th {
  color: #fff;
}

.table-dark td,
.table-dark th {
  border-color: #454d55;
}
</style>
