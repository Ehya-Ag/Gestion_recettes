<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="card p-4 shadow-lg">
        <h2 class="mb-4">{{ isEditing ? 'Modifier' : 'Ajouter' }} une recette</h2>
        <form @submit.prevent="submitRecipe">
          <div class="mb-3">
            <label for="title" class="form-label">Titre</label>
            <input v-model="recipe.titre" type="text" class="form-control" id="title" required />
          </div>
          <div class="mb-3">
            <label for="ingredients" class="form-label">Ingrédients</label>
            <textarea
              v-model="recipe.ingredients"
              class="form-control"
              id="ingredients"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="type" class="form-label">Type de recette</label>
            <select v-model="recipe.type" class="form-select" id="type" required>
              <option value="entrée">Entrée</option>
              <option value="plat">Plat</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Modifier' : 'Ajouter' }}
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
  min-height: 100vh;
}
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-label {
  font-weight: bold;
}

.form-control,
.form-select {
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

textarea.form-control {
  resize: vertical;
}
</style>
