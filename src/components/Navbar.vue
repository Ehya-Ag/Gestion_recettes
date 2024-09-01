<template>
  <router-link to="/" class="navbar-brand d-flex align-items-center">
    <i class="fas fa-book me-2"></i>
    <strong>Accueil</strong>
  </router-link>

  <router-link to="/liste" class="nav-link" active-class="active" aria-current="page">
    <i class="fas fa-tasks me-2"></i> Liste Recette
  </router-link>

  <router-link to="/ajout" class="nav-link" active-class="active">
    <i class="fas fa-project-diagram me-2"></i> Ajout des recettes
  </router-link>
</template>

<script setup>
import { useRouter } from 'vue-router'
</script>

<style scoped></style>
