<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-primary">{{ $t('RecipeList') }}</h1>
        <button @click="ajouter" class="btn btn-primary">{{ $t('AddRecipe') }}</button>
      </div>
      <div v-if="recipes.length">
        <table class="table table-striped table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">{{ $t('title') }}</th>
              <th scope="col">{{ $t('type') }}</th>
              <th scope="col">{{ $t('ingredients') }}</th>
              <th scope="col">{{ $t('categorie') }}</th>
              <th scope="col" class="text-end">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipe in recipes" :key="recipe.id">
              <td>{{ recipe.titre }}</td>
              <td>{{ recipe.type }}</td>
              <td>
                {{
                  Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.join(', ')
                    : 'Ingrédients non disponibles'
                }}
              </td>
              <td>{{ getCategoryName(recipe.categorieId) }}</td>
              <td class="text-end">
                <button
                  @click="openModal(recipe)"
                  class="btn btn-info btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#recipeModal"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <router-link :to="`/edit/${recipe.id}`" class="btn btn-warning btn-sm me-2">
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
      <div
        class="modal fade"
        id="recipeModal"
        tabindex="-1"
        aria-labelledby="recipeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="recipeModalLabel">{{ selectedRecipe?.titre }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                <strong>{{ $t('type') }} :</strong> {{ selectedRecipe?.type }}
              </p>
              <p>
                <strong>{{ $t('ingredients') }} :</strong>
                {{ selectedRecipe?.ingredients.join(', ') }}
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                {{ $t('close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useCategoryStore } from '../stores/gestion'

import { useRouter } from 'vue-router'

const store = useRecipeStore()
const recipes = store.recipes
const storeC = useCategoryStore()
const categories = storeC.categories
const selectedRecipe = ref(null)
const router = useRouter()

const ajouter = () => {
  router.push('/ajout')
}

const confirmDelete = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    deleteRecipe(id)
  }
}

const deleteRecipe = (id) => {
  store.deleteRecette(id)
}

const openModal = (recipe) => {
  selectedRecipe.value = recipe
}

const getCategoryName = (id) => {
  const category = categories.find((cat) => cat.id === id)
  return category ? category.nom : 'Inconnue'
}

onMounted(async () => {
  await store.loadRecipesFromApi()
  await storeC.loadCategoriesFromApi() // Charger les catégories
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

.modal-content {
  border-radius: 15px;
}

.modal-header {
  background-color: #007bff;
  color: #fff;
  border-bottom: 1px solid #dee2e6;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}
</style>
