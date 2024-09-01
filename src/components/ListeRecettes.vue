<template>
  <h1>Liste recette</h1>
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

const store = useRecipeStore()
const recipes = store.recipes
</script>
