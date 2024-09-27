<template>
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
              <th scope="col">{{ $t('ingredient') }}</th>
              <th scope="col">{{ $t('categorie') }}</th>
              <th scope="col" class="text-end">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipe in recipes" :key="recipe.id">
              <td>{{ recipe.titre }}</td>
              <td>{{ recipe.type }}</td>
              <td>{{ recipe.ingredient || 'Ingrédient non disponible' }}</td>
              <td>{{ getCategoryName(recipe.id_categorie) }}</td>
              <!-- Utilisation de id_categorie -->
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
const selectedRecipe = ref(null)
const router = useRouter()

const ajouter = () => {
  router.push('/ajout')
}

const confirmDelete = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    await deleteRecipe(id)
  }
}

const deleteRecipe = async (id) => {
  await store.deleteRecipe(id)
  await store.loadRecipesFromApi()
}

const openModal = (recipe) => {
  selectedRecipe.value = recipe
}

const getCategoryName = (id) => {
  const category = storeC.categories.find((cat) => cat.id === id)
  return category ? category.nom : 'Catégorie inconnue'
}

onMounted(async () => {
  await store.loadRecipesFromApi()
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
