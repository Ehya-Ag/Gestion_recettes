import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListeRecettes from '../components/ListeRecettes.vue'
import AjoutRecette from '../components/AjoutRecette.vue'
import DetailsRecette from '../components/DetailRecette.vue'
import ListeCategories from '../components/ListeCategories.vue';
import AjoutCategorie from '../components/AjoutCategorie.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/categories',
      name: 'ListeCategories',
      component: ListeCategories,
    },
    {
      path: '/ajout-categorie',
      name: 'AjoutCategorie',
      component: AjoutCategorie,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/liste',
      name: 'liste',
      component: ListeRecettes
    },
    {
      path: '/ajout',
      name: 'ajout',
      component: AjoutRecette
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: AjoutRecette,
      props: true
    },
    {
      path: '/details/:id',
      name: 'details',
      component: DetailsRecette,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
  
})

export default router
