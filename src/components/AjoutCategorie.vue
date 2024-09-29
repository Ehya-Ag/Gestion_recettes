<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <div class="background-container py-5">
    <div class="container">
      <div class="card p-4 shadow-lg">
        <h2 class="mb-4">{{ isEditing ? $t('Edit') : $t('Add') }} {{ $t('category') }}</h2>
        <form @submit.prevent="submitCategory">
          <div class="mb-3">
            <label for="nom" class="form-label">{{ $t('Name') }}</label>
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
            {{ isEditing ? $t('editButton') : $t('submitButton') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '../stores/gestion'
import { useRoute, useRouter } from 'vue-router'

const categoryStore = useCategoryStore()
const router = useRouter()
const route = useRoute()

const category = ref({ nom: '' })
const isEditing = !!route.params.id

if (isEditing) {
  const existingCategory = categoryStore.categories.find(
    (cat) => cat.id === parseInt(route.params.id)
  )
  if (existingCategory) {
    Object.assign(category.value, existingCategory)
  } else {
    router.push('/liste-categorie')
  }
}

const submitCategory = async () => {
  try {
    if (isEditing) {
      await categoryStore.updateCategory(parseInt(route.params.id), category.value.nom)
    } else {
      await categoryStore.addCategory({ nom: category.value.nom })
    }
    await categoryStore.loadCategoriesFromApi()
    router.push('/liste-categorie')
  } catch (error) {
    console.error('Erreur lors de la gestion de la catégorie :', error)
    alert('Une erreur est survenue lors de la gestion de la catégorie.')
  }
}
</script>

<style scoped>
.background-container {
  background-image: url('https://image.shutterstock.com/image-photo/blur-coffee-shop-cafe-restaurant-260nw-364151948.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.form-label {
  font-weight: bold;
}
.form-control {
  border-radius: 5px;
}
.btn-primary {
  background-color: #007bff;
  border: none;
}
.btn-primary:hover {
  background-color: #0056b3;
}
</style>
