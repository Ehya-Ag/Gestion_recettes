import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref([
    {
      id: 1,
      titre: 'Salade César',
      ingredients: ['Laitue romaine', 'Parmesan', 'Poulet grillé', 'Croutons', 'Sauce César'],
      type: 'entrée'
    },
    {
      id: 2,
      titre: 'Bœuf Bourguignon',
      ingredients: ['Bœuf', 'Vin rouge', 'Carottes', 'Oignons', 'Champignons'],
      type: 'plat'
    },
    {
      id: 3,
      titre: 'Tarte Tatin',
      ingredients: ['Pommes', 'Sucre', 'Beurre', 'Pâte brisée'],
      type: 'dessert'
    }
  ])
  const ajoutRecette = (recipe) => {
    const maxId = recipes.value.reduce((max, r) => (r.id > max ? r.id : max), 0)
    const newId = maxId + 1
    recipes.value.push({ id: newId, ...recipe })
  }
  const updateRecipe = (id, updatedRecipe) => {
    const index = recipes.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      recipes.value[index] = { ...recipes.value[index], ...updatedRecipe }
    }
  }
  const deleteRecipe = (id) => {
    const index = recipes.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      recipes.value.splice(index, 1)
    }
  }
  return { recipes, ajoutRecette, updateRecipe, deleteRecipe }
})
