<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="d-flex justify-content-end">
      <select @change="changeLanguage">
        <option value="fr">Fr</option>
        <option value="en">En</option>
      </select>
      <h1>{{ $t('home') }}</h1>
    </div>
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <i class="fas fa-book me-2"></i>
        <strong>{{ $t('Home') }}</strong>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- Liens existants -->
          <li class="nav-item">
            <router-link to="/liste" class="nav-link" active-class="active" aria-current="page">
              <i class="fas fa-list me-2"></i> {{ $t('RecipeList') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ajout" class="nav-link" active-class="active">
              <i class="fas fa-plus me-2"></i> {{ $t('AddRecipe') }}
            </router-link>
          </li>

          <!-- Ajout de la gestion des catégories -->
          <li class="nav-item">
            <router-link to="/liste-categorie" class="nav-link" active-class="active">
              <i class="fas fa-list-alt me-2"></i> {{ $t('CategoryList') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ajout-categorie" class="nav-link" active-class="active">
              <i class="fas fa-plus-circle me-2"></i> {{ $t('AddCategory') }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function changeLanguage(event) {
  locale.value = event.target.value
}
</script>

<style scoped>
/* Styles pour la barre de navigation */
.navbar {
  border-bottom: 1px solid #ddd;
}

.nav-link {
  color: #fff !important;
}

.nav-link.active {
  font-weight: bold;
  color: #f8f9fa !important;
}

.navbar-brand {
  font-size: 1.25rem;
}

.navbar-toggler {
  border-color: #fff;
}

.navbar-toggler-icon {
  background-image: url('data:image/svg+xml;base64,...');
}

.navbar-nav .nav-item .nav-link:hover {
  color: #ddd !important;
}

.navbar-nav .nav-item .nav-link i {
  font-size: 1.2rem;
}
</style>
