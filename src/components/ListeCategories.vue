<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-primary">{{ $t('recipeList') }}</h1>
        <router-link to="/ajout-recette" class="btn btn-primary">{{ $t('addRecipe') }}</router-link>
      </div>
      <div v-if="recipes.length">
        <table class="table table-striped table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">{{ $t('id') }}</th>
              <th scope="col">{{ $t('title') }}</th>
              <th scope="col">{{ $t('ingredients') }}</th>
              <th scope="col">{{ $t('category') }}</th>
              <th scope="col" class="text-end">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipe in recipes" :key="recipe.id">
              <td>{{ recipe.id }}</td>
              <td>{{ recipe.titre }}</td>
              <td>{{ recipe.ingredients }}</td>
              <td>{{ getCategoryName(recipe.id_categorie) }}</td>
              <td class="text-end">
                <router-link :to="`/DetailsRecette/${recipe.id}`" class="btn btn-info btn-sm me-2">
                  <i class="fas fa-eye"></i>
                </router-link>
                <router-link :to="`/editRecette/${recipe.id}`" class="btn btn-warning btn-sm me-2">
                  <i class="fas fa-edit"></i>
                </router-link>
                <button @click="confirmDelete(recipe.id)" class="btn btn-danger btn-sm">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>{{ $t('noRecipes') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useCategoryStore } from '../stores/gestion'

const recipeStore = useRecipeStore()
const categoryStore = useCategoryStore()

const recipes = ref([])

const confirmDelete = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    await deleteRecipe(id)
  }
}

const deleteRecipe = async (id) => {
  await recipeStore.deleteRecipe(id)
  await loadRecipes()
}

const getCategoryName = (categoryId) => {
  const category = categoryStore.categories.find((cat) => cat.id === categoryId)
  return category ? category.nom : 'Inconnu'
}

const loadRecipes = async () => {
  recipes.value = await recipeStore.loadRecipesFromApi() // Récupérez les recettes à partir de l'API
}

onMounted(async () => {
  await categoryStore.loadCategoriesFromApi() // Charger les catégories
  await loadRecipes() // Charger les recettes
})
</script>

<style scoped>
.background-container {
  background-image: url('https://image.shutterstock.com/image-photo/blur-coffee-shop-cafe-restaurant-260nw-364151948.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
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
