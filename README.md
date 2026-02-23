
# KanbanFlow — Application de Gestion de Tâches

Une application Kanban complète avec Drag & Drop, construite avec React, Redux Toolkit et JSON Server.

##  Fonctionnalités

- **Tableau Kanban** avec 3 colonnes : To Do, In Progress, Done
- **Drag & Drop** pour déplacer les tâches entre colonnes
- **Gestion complète des tâches** : créer, modifier, supprimer, voir les détails
- **Gestion des utilisateurs** : ajouter, supprimer, assigner aux tâches
- **Filtres bonus** : par utilisateur et par priorité

## Technologies

- React 18
- Redux Toolkit
- React Router v6
- JSON Server (API simulée)
- Axios
- @hello-pangea/dnd (Drag & Drop)

##  Installation

```bash

npm install


npm install -g json-server
```

## Lancement

Ouvrir **deux terminaux** :

```bash

json-server --watch db.json --port 3001


npm start
```

- App React : http://localhost:3000
- API JSON Server : http://localhost:3001

##  Structure du projet

```
src/
├── store/
│   ├── index.js          # Configuration du store Redux
│   ├── tasksSlice.js     # Reducer + actions async des tâches
│   └── usersSlice.js     # Reducer + actions async des utilisateurs
├── selectors/
│   ├── tasksSelectors.js # Sélecteurs Redux (tâches)
│   └── usersSelectors.js # Sélecteurs Redux (utilisateurs)
├── components/
│   ├── Navbar.jsx        # Barre de navigation
│   ├── KanbanColumn.jsx  # Colonne du tableau Kanban
│   └── TaskCard.jsx      # Carte de tâche (draggable)
├── pages/
│   ├── KanbanBoard.jsx   # Page principale (/)
│   ├── TaskNew.jsx       # Nouvelle tâche (/tasks/new)
│   ├── TaskDetail.jsx    # Détails tâche (/task/:id)
│   ├── TaskEdit.jsx      # Modifier tâche (/task/:id/edit)
│   └── UsersPage.jsx     # Utilisateurs (/users)
└── App.js                # Routes principales
```

##  Membres de l'équipe

- [Badia AAD]
- [Maryem LAFRIKI]
- [chaimae jouiga ]










# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
