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
            <label for="ingredients" class="form-label">{{ $t('recipeIngredients') }}</label>
            <textarea
              v-model="recipe.ingredients"
              class="form-control"
              id="ingredients"
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
            <label for="type" class="form-label">{{ $t('categoryType') }}</label>
            <select v-model="categorie.type" class="form-select" id="type" required>
              <option value="entrée">{{ $t('typeOptions.appetizer') }}</option>
              <option value="boisson">{{ $t('typeOptions.drink') }}</option>
              <option value="dessert">{{ $t('typeOptions.dessert') }}</option>
              <option value="plat principale">{{ $t('typeOptions.platPrincipale') }}</option>
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
import { ref } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useRoute, useRouter } from 'vue-router'

const store = useRecipeStore()
const router = useRouter()
const route = useRoute()

const recipe = ref({
  titre: '',
  ingredients: '',
  type: 'entrée'
})
const categorie = ref({
  nom: ''
})

const isEditing = !!route.params.id
if (isEditing) {
  const existingRecipe = store.recipes.find((r) => r.id === parseInt(route.params.id))
  if (existingRecipe) {
    Object.assign(recipe.value, existingRecipe)
  } else {
    router.push('/liste')
  }
}

const submitRecipe = () => {
  if (isEditing) {
    store.updateRecipe(parseInt(route.params.id), recipe.value)
  } else {
    store.ajoutRecette({ ...recipe.value, id: Date.now() })
  }
  router.push('/liste')
}
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
