<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="card p-4 shadow-lg">
        <h2 class="mb-4">{{ $t('addCategory') }}</h2> <!-- Utilisation de la clé de traduction -->
        <form @submit.prevent="submitCategory">
          <div class="mb-3">
            <label for="nom" class="form-label">{{ $t('name') }}</label> <!-- Utilisation de la clé de traduction -->
            <input 
              v-model="category.nom" 
              type="text" 
              class="form-control" 
              id="nom" 
              required 
              placeholder="Entrez le nom de la catégorie"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            {{ $t('add') }} <!-- Utilisation de la clé de traduction -->
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '../stores/gestion'; // Assurez-vous d'importer le store

const router = useRouter();
const categoryStore = useCategoryStore(); // Initialisation du store
const category = ref({ nom: '' });

const submitCategory = async () => {
  try {
    const response = await axios.post('/api/categories', category.value);
    categoryStore.addCategory(response.data); // Ajoutez la catégorie au store
    alert('Catégorie ajoutée avec succès !');
    category.value.nom = '';  // Réinitialisation du formulaire
    router.push('/ListeCategories'); // Redirection vers la liste des catégories
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie :", error);
    alert('Une erreur est survenue lors de l\'ajout de la catégorie.');
  }
};
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

.form-control {
  border-radius: 5px; /* Coins arrondis pour les champs de formulaire */
}

.btn-primary {
  background-color: #007bff; /* Couleur de fond du bouton */
  border: none; /* Pas de bordure */
}

.btn-primary:hover {
  background-color: #0056b3; /* Couleur du bouton au survol */
}
</style>
