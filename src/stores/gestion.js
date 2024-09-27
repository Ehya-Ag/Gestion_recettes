import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// Store pour les recettes
export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref([])

  const loadRecipesFromApi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recettes/')
      recipes.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement des recettes :', error)
    }
  }

  const ajoutRecette = async (recipe) => {
    try {
      const response = await axios.post('http://localhost:3000/recettes', recipe)
      recipes.value.push(response.data)
    } catch (error) {
      console.error("Erreur lors de l'ajout de la recette :", error)
    }
  }

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      await axios.put(`http://localhost:3000/recettes/${id}`, updatedRecipe)
      const index = recipes.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        recipes.value[index] = { ...recipes.value[index], ...updatedRecipe }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette :', error)
    }
  }

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/recipes/${id}`)
      await this.loadRecipesFromApi()
    } catch (error) {}
  }

  return { recipes, loadRecipesFromApi, ajoutRecette, updateRecipe, deleteRecipe }
})

// Store pour les catégories
export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])

  const loadCategoriesFromApi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories')
      categories.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement des catégories :', error)
    }
  }

  const getCategories = () => {
    return categories.value
  }

  const addCategory = async (nom) => {
    try {
      const response = await axios.post('http://localhost:3000/categories', nom)
      categories.value.push(response.data)
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie :", error)
    }
  }

  // const deleteCategory = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/categories/${id}`)
  //     const index = categories.value.findIndex((category) => category.id === id)
  //     if (index !== -1) {
  //       categories.value.splice(index, 1)
  //     }
  //   } catch (error) {
  //     console.error('Erreur lors de la suppression de la catégorie :', error)
  //   }
  // }
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/categorie/${id}`)
      await this.loadCategoriesFromApi()
    } catch (error) {}
  }

  const updateCategory = async (id, newNom) => {
    try {
      const response = await axios.put(`http://localhost:3000/categorie/${id}`, { nom: newNom })
      const index = categories.value.findIndex((category) => category.id === id)
      if (index !== -1) {
        categories.value[index] = response.data
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error)
    }
  }
  const getCategoryNameById = async (id) => {
    const category = categories.find((cat) => cat.id === id)
    return category ? category.nom : 'Catégorie inconnue'
  }

  return {
    categories,
    loadCategoriesFromApi,
    getCategories,
    addCategory,
    deleteCategory,
    updateCategory,
    getCategoryNameById
  }
})
