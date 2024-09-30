import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// Store pour les recettes
export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref([])
  const categories = ref([])
  const loadRecipesAndGroupeByCategory = async () => {
    axios
      .all([
        axios.get('https://api-recette-10ac8e64034c.herokuapp.com/recettes/'),
        axios.get('https://api-recette-10ac8e64034c.herokuapp.com/categories/')
      ])
      .then(
        axios.spread((resp1, resp2) => {
          const recettes = resp1.data
          const cats = resp2.data
          for (let i = 0; i < cats.length; i++) {
            const categorieRecettes = recettes.filter((r) => r.id_categorie === cats[i].id)
            console.log(categorieRecettes)
            cats[i].recettes = categorieRecettes
          }
          categories.value = cats
          console.log(categories.value)
        })
      )
  }
  const ajoutRecette = async (recipe) => {
    try {
      await axios.post('https://api-recette-10ac8e64034c.herokuapp.com/recettes/', recipe)
      await loadRecipesAndGroupeByCategory()
    } catch (error) {
      console.error("Erreur lors de l'ajout de la recette :", error)
    }
  }

  const updateRecipe = async (id, updatedRecipe) => {
    try {
      await axios.put(
        `https://api-recette-10ac8e64034c.herokuapp.com/recettes/${id}`,
        updatedRecipe
      )
      const index = recipes.value.findIndex((r) => r.id === id)
      console.log('index')
      if (index !== -1) {
        recipes.value[index] = { ...recipes.value[index], ...updatedRecipe }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette :', error)
    }
  }

  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`https://api-recette-10ac8e64034c.herokuapp.com/recettes/${id}`)
      const resp = await loadRecipesAndGroupeByCategory()
      console.log(resp)
    } catch (error) {}
  }

  return {
    recipes,
    categories,
    ajoutRecette,
    updateRecipe,
    deleteRecipe,
    loadRecipesAndGroupeByCategory
  }
})

// Store pour les catégories
export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])

  const loadCategoriesFromApi = async () => {
    try {
      const response = await axios.get('https://api-recette-10ac8e64034c.herokuapp.com/categories/')
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
      const response = await axios.post(
        'https://api-recette-10ac8e64034c.herokuapp.com/categories/',
        nom
      )
      categories.value.push(response.data)
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie :", error)
    }
  }

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`https://api-recette-10ac8e64034c.herokuapp.com/categorie/${id}`)
      await this.loadCategoriesFromApi()
    } catch (error) {}
  }

  const updateCategory = async (id, newNom) => {
    try {
      const response = await axios.put(
        `https://api-recette-10ac8e64034c.herokuapp.com/categorie/${id}`,
        { nom: newNom }
      )
      const index = categories.value.findIndex((category) => category.id === id)
      if (index !== -1) {
        categories.value[index] = response.data
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie :', error)
    }
  }
  const getCategoryNameById = (id) => {
    const category = categories.value.find((cat) => cat.id === id)
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
