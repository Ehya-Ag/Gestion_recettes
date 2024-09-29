# Gestion de Recettes

## Description

Ce projet est une application de gestion de recettes de cuisine, développée en Vue.js 3 en utilisant la Composition API. L'application permet aux utilisateurs de gérer leurs recettes de manière simple et intuitive. Elle utilise également Axios pour effectuer des appels API afin de gérer les données des recettes et des catégories.



## Technologies Utilisées

- **Vue.js** : Framework JavaScript pour construire l'interface utilisateur.
- **Axios** : Bibliothèque utilisée pour effectuer des appels API HTTP.
- **Bootstrap 5** : Framework CSS pour le style et la mise en page.
- **Vercel** : Plateforme de déploiement pour héberger l'application.
- **Uruku** : Autre plateforme de déploiement utilisée pour héberger l'application.



Vous aurez également besoin d'un accès à une API pour gérer les recettes et les catégories, ou vous pouvez configurer une API locale en suivant les instructions fournies avec le projet.



## Fonctionnalités

- **Ajout de Recettes** : Permet aux utilisateurs d'ajouter de nouvelles recettes.

- **Modification de Recettes** : Les utilisateurs peuvent modifier les recettes existantes.

- **Suppression de Recettes** : Les utilisateurs ont la possibilité de supprimer des recettes.

- **Affichage de la Liste des Recettes** : Une page dédiée affiche toutes les recettes disponibles avec la possibilité de voir les détails d'une recette.

- **Gestion des Catégories** : Les utilisateurs peuvent ajouter, modifier, et supprimer des catégories de recettes.

- **Appels API avec Axios** : L'application utilise Axios pour interagir avec une API afin de récupérer, créer, modifier et supprimer des recettes et des catégories.


## Installation

1. **Cloner le projet**

   ```bash
   git clone https://github.com/Ehya-Ag/Gestion_recettes.git
   cd gestion_recettes

2. **Installer les dépendances**

    ```bash
    npm install


3. **Lancer l'application en mode dévéloppement**

    ```bash
    npm run dev
    ```

## Routes API

- `GET /recettes` : Récupérer toutes les recettes
- `POST /recettes` : Ajouter une nouvelle recette
- `PUT /recettes/:id` : Modifier une recette existante
- `DELETE /recettes/:id` : Supprimer une recette


## Auteur

Ce projet est un projet collaboratif développé par :
- [Ehya Agg](https://github.com/Ehya-Ag) 
- [Ethman Ly](https://github.com/OusmaneLyDev).