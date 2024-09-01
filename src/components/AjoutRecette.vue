<template>
  <div class="card p-3">
    <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} une recette</h2>
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
</template>

<script setup>
import { ref } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useRoute, useRouter } from 'vue-router'
const store = useRecipeStore()
const router = useRouter()
const route = useRoute()
const recipe = ref({
  title: '',
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
