import { defineStore } from 'pinia';
import { ref } from 'vue';

// Store pour les recettes
export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref([]);

  const ajoutRecette = (recipe) => {
    const maxId = recipes.value.reduce((max, r) => (r.id > max ? r.id : max), 0);
    const newId = maxId + 1;
    recipes.value.push({ id: newId, ...recipe });
  };

  const updateRecipe = (id, updatedRecipe) => {
    const index = recipes.value.findIndex((r) => r.id === id);
    if (index !== -1) {
      recipes.value[index] = { ...recipes.value[index], ...updatedRecipe };
    }
  };

  const deleteRecipe = (id) => {
    const index = recipes.value.findIndex((r) => r.id === id);
    if (index !== -1) {
      recipes.value.splice(index, 1);
    }
  };

  return { recipes, ajoutRecette, updateRecipe, deleteRecipe };
});

// Store pour les catégories
export const useCategoryStore = defineStore('category', () => {
  const categories = ref([
    { id: 1, nom: 'Entrées' },
    { id: 2, nom: 'Plats Principaux' },
    { id: 3, nom: 'Desserts' },
  ]);

  let nextId = 4; // ID pour la prochaine catégorie à ajouter

  const getCategories = () => {
    return categories.value;
  };

  const addCategory = (nom) => {
    const newCategory = { id: nextId++, nom };
    categories.value.push(newCategory);
  };

  const deleteCategory = (id) => {
    const index = categories.value.findIndex((category) => category.id === id);
    if (index !== -1) {
      categories.value.splice(index, 1);
    }
  };

  const updateCategory = (id, newNom) => {
    const category = categories.value.find((category) => category.id === id);
    if (category) {
      category.nom = newNom;
    }
  };

  return {
    categories,
    getCategories,
    addCategory,
    deleteCategory,
    updateCategory,
  };
});
