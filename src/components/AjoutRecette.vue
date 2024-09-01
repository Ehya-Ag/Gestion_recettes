<template>
  <div class="card p-3">
    <h2>Ajouter une recette</h2>
    <form @submit.prevent="submitRecipe">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input v-model="recipe.titre" type="text" class="form-control" id="titre" required />
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
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useRouter } from 'vue-router'

const store = useRecipeStore()
const router = useRouter()

const recipe = ref({
  titre: '',
  ingredients: '',
  type: 'entrée'
})

const submitRecipe = () => {
  store.ajoutRecette(recipe.value)
  router.push('/liste')
}
</script>
