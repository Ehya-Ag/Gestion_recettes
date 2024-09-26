// Importation de Bootstrap (CSS et JS)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

// Importation de Vue et autres dépendances
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Importation des composants et du routeur
import App from './App.vue'
import router from './router'

// Importation de i18n (Assurez-vous que i18n.js est bien configuré dans le projet)
import i18n from './i18n'

// Création de l'application Vue
const app = createApp(App)

// Utilisation de Pinia pour la gestion d'état
app.use(createPinia())

// Utilisation du routeur Vue
app.use(router)

// Intégration de i18n pour la gestion des traductions
app.use(i18n)

// Montage de l'application sur l'élément #app
app.mount('#app')
