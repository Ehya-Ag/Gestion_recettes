<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="card p-4 shadow-lg">
        <h2 class="mb-4">{{ isEditing ? $t('Edit') : $t('Add') }} {{ $t('recipe') }}</h2>
        <form @submit.prevent="submitRecipe">
          <div class="mb-3">
            <label for="title" class="form-label">{{ $t('recipeTitle') }}</label>
            <input v-model="recipe.titre" type="text" class="form-control" id="title" required />
          </div>
          <div class="mb-3">
            <label for="ingredient" class="form-label">{{ $t('recipeIngredient') }}</label>
            <textarea
              v-model="recipe.ingredient"
              class="form-control"
              id="ingredient"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="type" class="form-label">{{ $t('recipeType') }}</label>
            <select v-model="recipe.type" class="form-select" id="type" required>
              <option value="entrée">{{ $t('typeOptions.appetizer') }}</option>
              <option value="plat">{{ $t('typeOptions.dish') }}</option>
              <option value="dessert">{{ $t('typeOptions.dessert') }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">{{ $t('categoryType') }}</label>
            <select
              v-model="selectedCategory"
              @change="updateCategoryId"
              class="form-select"
              id="category"
              required
            >
              <option v-for="cat in categories" :key="cat.id" :value="cat.nom">
                {{ cat.nom }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? $t('editButton') : $t('submitButton') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useCategoryStore } from '../stores/gestion'
import { useRoute, useRouter } from 'vue-router'

const recipeStore = useRecipeStore()
const categoryStore = useCategoryStore()
const router = useRouter()
const route = useRoute()

const recipe = ref({
  titre: '',
  ingredient: '', // Utiliser "ingredient" au singulier
  type: 'entrée',
  id_categorie: null // ID de la catégorie sélectionnée
})

const selectedCategory = ref(null)
const categories = ref([])

const isEditing = !!route.params.id
if (isEditing) {
  const existingRecipe = recipeStore.recipes.find((r) => r.id === parseInt(route.params.id))
  if (existingRecipe) {
    Object.assign(recipe.value, existingRecipe)
    selectedCategory.value = existingRecipe.categorieNom // Remplir la catégorie existante
    recipe.value.id_categorie = existingRecipe.id_categorie // Mettre à jour l'ID de la catégorie
  } else {
    router.push('/liste')
  }
}

const updateCategoryId = () => {
  const selectedCat = categories.value.find((cat) => cat.nom === selectedCategory.value)
  if (selectedCat) {
    recipe.value.id_categorie = selectedCat.id // Mettre à jour l'ID de la catégorie dans l'objet recette
  }
}

const submitRecipe = async () => {
  console.log('Submitting recipe:', recipe.value) // Debugging
  if (isEditing) {
    await recipeStore.updateRecipe(parseInt(route.params.id), recipe.value)
  } else {
    await recipeStore.ajoutRecette({ ...recipe.value }) // Vérifiez que l'ingrédient est inclus ici
  }
  router.push('/liste')
}

onMounted(async () => {
  await categoryStore.loadCategoriesFromApi()
  categories.value = categoryStore.categories
})
</script>

<style scoped>
.background-container {
  background-image: url('https://image.shutterstock.com/image-photo/blur-coffee-shop-cafe-restaurant-260nw-364151948.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Hauteur minimale pour occuper l'écran */
}
.card {
  background-color: #fff; /* Couleur de fond blanche */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre autour de la carte */
}

.form-label {
  font-weight: bold; /* Texte en gras pour les étiquettes */
}

.form-control,
.form-select {
  border-radius: 5px; /* Coins arrondis pour les champs de formulaire */
}

.btn-primary {
  background-color: #007bff; /* Couleur de fond du bouton */
  border: none; /* Pas de bordure */
}

.btn-primary:hover {
  background-color: #0056b3; /* Couleur du bouton au survol */
}

textarea.form-control {
  resize: vertical; /* Permet de redimensionner la zone de texte verticalement */
}
</style>
