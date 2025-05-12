# 🧠 Taskator.io

![Vercel](https://img.shields.io/badge/deploy-vercel-blue?logo=vercel)
![MIT License](https://img.shields.io/badge/license-MIT-green)
![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg?logo=react)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)

Taskator.io est une application Trello-like pour organiser vos tâches par colonnes. Interface fluide, animations modernes, persistance via une API REST et base MySQL. 🧩

🔗 **Démo live :** [taskator.vercel.app](https://taskator.vercel.app) _(exemple, à remplacer par ton vrai lien)_

---

## 🚀 Fonctionnalités

- 📝 Ajouter, modifier, supprimer des tâches
- 📁 Créer et supprimer des colonnes (catégories)
- 🔄 Glisser-déposer (drag & drop) fluide entre colonnes
- ✅ Cocher une tâche comme terminée
- 💾 Persistance complète via API REST + MySQL
- 📱 Interface responsive et moderne (TailwindCSS)

---

## 🧑‍💻 Stack technique

### Frontend

- [React (Vite)](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [@dnd-kit/core](https://docs.dndkit.com/)
- API calls avec `fetch` + `useEffect`

### Backend

- [Express](https://expressjs.com/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- Structure MVC (routes, controllers, services)
- Middlewares : `cors`, `express.json()`

---

## 📦 Modèle de données

### Tâches (`Task`)

```ts
{
  id: number;
  name: string;
  checked: boolean;
  categoryId: number;
}
```

### Catégories (`Category`)

```ts
{
  id: number;
  name: string;
}
```

---

## 📌 API Endpoints

| Méthode | Route             | Action                                |
| ------- | ----------------- | ------------------------------------- |
| GET     | `/tasks`          | Récupérer toutes les tâches           |
| POST    | `/tasks`          | Créer une nouvelle tâche              |
| PATCH   | `/tasks/:id`      | Modifier `checked` ou `categoryId`    |
| DELETE  | `/tasks/:id`      | Supprimer une tâche                   |
| GET     | `/categories`     | Récupérer toutes les catégories       |
| POST    | `/categories`     | Créer une nouvelle catégorie          |
| DELETE  | `/categories/:id` | Supprimer une catégorie et ses tâches |

---

## 🛠️ Installation locale

### 1. Cloner le projet

```bash
git clone https://github.com/ton-pseudo/taskator.io.git
cd taskator.io
```

### 2. Backend

```bash
cd server
npm install
npm run dev
```

Configurer `.env` avec tes infos MySQL :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=taskator
PORT=yourport (3000 as default)
```

### 3. Frontend

```bash
npm install
npm run dev
```

---

## 🧱 Roadmap

- [x] Drag & drop par colonnes
- [x] API REST avec persistance MySQL
- [ ] Authentification (JWT)
- [ ] Validation serveur (`express-validator`)
- [ ] Multi-utilisateurs
- [ ] Mode hors-ligne (localStorage)
- [ ] Déploiement via Docker

---

## 📜 Licence

MIT — [Slycex13](https://github.com/Slycex13)

---

## 🧠 À propos

Taskator.io est un projet personnel pour apprendre et maîtriser React, les bases de données, et la conception d’interface interactive.
