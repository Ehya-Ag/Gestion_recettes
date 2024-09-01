<template>
  <div class="container mt-5">
    <h1>Détails de la Recette</h1>
    <div v-if="recipe" class="card">
      <div class="card-body">
        <h2 class="card-title">{{ recipe.titre }}</h2>
        <p class="card-text"><strong>Type :</strong> {{ recipe.type }}</p>
        <p class="card-text"><strong>Ingrédients :</strong> {{ recipe.ingredients }}</p>
        <router-link to="/" class="btn btn-primary mt-3">Retour à la liste</router-link>
      </div>
    </div>
    <div v-else>
      <p class="text-danger">Recette non trouvée.</p>
      <router-link to="/" class="btn btn-primary">Retour à la liste</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/gestion'

const route = useRoute()
const store = useRecipeStore()
const recipe = ref(null)

onMounted(() => {
  const recipeId = parseInt(route.params.id)
  recipe.value = store.recipes.find((r) => r.id === recipeId)
})
</script>
