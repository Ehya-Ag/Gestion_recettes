<template>
    <div class="container mt-5">
      <h1>Détails de la Catégorie</h1>
      <div v-if="category" class="card">
        <div class="card-body">
          <h2 class="card-title">{{ category.nom }}</h2>
          <p class="card-text"><strong>Description :</strong> {{ category.description || 'Aucune description disponible.' }}</p>
          <router-link to="/liste-categories" class="btn btn-primary mt-3">Retour à la liste</router-link>
        </div>
      </div>
      <div v-else>
        <p class="text-danger">Catégorie non trouvée.</p>
        <router-link to="/liste-categories" class="btn btn-primary">Retour à la liste</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCategoryStore } from '../stores/gestion'
  
  // Initialisation du store et des routes
  const route = useRoute()
  const router = useRouter()
  const categoryStore = useCategoryStore()
  
  // La catégorie à afficher
  const category = ref(null)
  
  onMounted(() => {
    const categoryId = parseInt(route.params.id)
    
    // Trouver la catégorie par ID
    category.value = categoryStore.categories.find((cat) => cat.id === categoryId)
  
    // Si la catégorie n'existe pas, rediriger vers la liste
    if (!category.value) {
      router.push('/liste-categories')
    }
  })
  </script>
  
  <style scoped>
  .container {
    margin-top: 50px;
  }
  
  .card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-title {
    font-size: 24px;
  }
  
  .card-text {
    font-size: 16px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
  }
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  