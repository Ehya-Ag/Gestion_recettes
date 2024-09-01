<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Liste des recettes</h1>
      <button @click="ajouter" class="btn btn-primary">Ajouter une recette</button>
    </div>
    <div v-if="recipes.length">
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
            <td class="text-end">
              <button
                @click="openModal(recipe)"
                class="btn btn-info btn-sm me-2"
                data-bs-toggle="modal"
                data-bs-target="#recipeModal"
              >
                <i class="fas fa-eye"></i>
                Détails
              </button>
              <router-link :to="`/edit/${recipe.id}`" class="btn btn-warning btn-sm me-2"
                ><i class="fas fa-edit"></i
              ></router-link>
              <button @click="confirmDelete(recipe.id)" class="btn btn-danger btn-sm">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Aucune recette disponible.</p>
    </div>
    <div
      class="modal fade"
      id="recipeModal"
      tabindex="-1"
      aria-labelledby="recipeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
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
            <p><strong>Type :</strong> {{ selectedRecipe?.type }}</p>
            <p><strong>Ingrédients :</strong> {{ selectedRecipe?.ingredients }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRecipeStore } from '../stores/gestion'
import { useRouter } from 'vue-router'

const store = useRecipeStore()
const recipes = store.recipes
const selectedRecipe = ref(null)

const router = useRouter()
const ajouter = () => {
  router.push('/ajout')
}
const confirmDelete = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    deleteRecipe(id)
  }
}

const deleteRecipe = (id) => {
  store.deleteRecipe(id)
}
const openModal = (recipe) => {
  selectedRecipe.value = recipe
}
</script>

<style scoped></style>
