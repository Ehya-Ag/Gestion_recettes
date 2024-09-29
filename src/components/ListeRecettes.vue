<template>
  <div class="background-container py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-primary text-center mb-5">{{ $t('RecipeList') }}</h1>
        <button @click="ajouter" class="btn btn-primary">{{ $t('AddRecipe') }}</button>
      </div>
      <div v-if="categories.length">
        <div v-for="category in categories" :key="category.id" class="mb-5">
          <h2 class="text-secondary display-5 text-center mb-4">{{ category.nom }}</h2>
          <div class="row">
            <div v-for="recipe in category.recettes" :key="recipe.id" class="col-md-4 mb-4">
              <div class="card shadow-lg border-light" style="height: 100%">
                <div class="card-body">
                  <h5 class="card-title fs-4">{{ recipe.titre }}</h5>
                  <p class="card-text">{{ recipe.ingredient || 'Ingrédient non disponible' }}</p>
                  <p class="text-muted">{{ recipe.type }}</p>
                  <div class="d-flex justify-content-between mt-auto">
                    <button
                      @click="openModal(recipe)"
                      class="btn btn-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#recipeModal"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <router-link :to="`/edit/${recipe.id}`" class="btn btn-warning btn-sm">
                      <i class="fas fa-edit"></i>
                    </router-link>
                    <button @click="confirmDelete(recipe.id)" class="btn btn-danger btn-sm">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p>{{ $t('noRecipes') }}</p>
      </div>
    </div>

    <!-- Modal for Recipe Details -->
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
              <strong>{{ $t('ingredient') }} :</strong>
              {{ selectedRecipe?.ingredient || 'Non disponible' }}
            </p>
            <p>
              <strong>{{ $t('categorie') }} :</strong>
              {{ getCategoryName(selectedRecipe?.id_categorie) }}
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useCategoryStore } from '../stores/gestion'
import { useRouter } from 'vue-router'

const store = useRecipeStore()
const recipes = store.recipes
const categories = computed(() => store.categories)
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
  // await store.loadRecipesFromApi()
}

const openModal = (recipe) => {
  selectedRecipe.value = recipe
}

const getCategoryName = (id) => {
  const category = storeC.categories.find((cat) => cat.id === id)
  return category ? category.nom : 'Catégorie inconnue'
}

onMounted(async () => {
  await store.loadRecipesAndGroupeByCategory()
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
  border-radius: 15px;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  font-weight: bold;
}

h2.display-5 {
  font-size: 2.5rem;
  text-transform: uppercase;
}

.text-primary {
  font-size: 2.5rem;
  font-weight: bold;
}
.text-secondary {
  font-size: 2rem;
  font-weight: bold;
}
</style>
