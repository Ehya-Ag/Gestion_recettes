<template>
  <h1>Liste des recettes</h1>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h1>Liste des recettes</h1>
    <button @click="ajouter" class="btn btn-primary">Ajouter une recette</button>
  </div>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Titre</th>
        <th scope="col">Type</th>
        <th scope="col">Ingrédients</th>
        <th scope="col" class="text-end">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe in recipes" :key="recipe.id">
        <td>{{ recipe.titre }}</td>
        <td>{{ recipe.type }}</td>
        <td>{{ recipe.ingredients }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useRouter } from 'vue-router'

const store = useRecipeStore()
const recipes = store.recipes

const router = useRouter()
const ajouter = () => {
  router.push('/ajout')
}
</script>
