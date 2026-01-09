# Site-V

Site internet statique moderne et responsive, prêt pour GitHub Pages.

## 🚀 Déploiement sur GitHub Pages

### 1. Initialiser le dépôt Git
```bash
git init
git add .
git commit -m "Premier commit - site statique"
```

### 2. Créer un dépôt GitHub
- Allez sur [GitHub](https://github.com) et créez un nouveau dépôt
- Ne cochez PAS "Initialize with README" (vous en avez déjà un)

### 3. Pousser votre code
```bash
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
git branch -M main
git push -u origin main
```

### 4. Activer GitHub Pages
1. Allez dans les **Settings** de votre dépôt
2. Cliquez sur **Pages** dans le menu latéral
3. Sous "Source", sélectionnez **main** (branche)
4. Cliquez sur **Save**
5. Votre site sera disponible à : `https://VOTRE-USERNAME.github.io/VOTRE-REPO/`

⏰ **Attention** : La première publication peut prendre 5-10 minutes

## 📁 Structure du projet

```
Site-V/
├── index.html         # Page d'accueil
├── public/
│   ├── css/
│   │   └── style.css  # Styles CSS
│   ├── js/
│   │   └── script.js  # JavaScript interactif
│   └── images/        # Vos images ici
├── .nojekyll          # Pour GitHub Pages
└── README.md          # Documentation
```

## 🎨 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans [public/css/style.css](public/css/style.css) :
```css
:root {
    --primary-color: #3498db;    /* Couleur principale */
    --secondary-color: #2c3e50;  /* Couleur secondaire */
}
```

### Ajouter des images
Placez vos images dans `public/images/` et référencez-les :
```html
<img src="public/images/votre-image.jpg" alt="Description">
```

### Modifier le contenu
Tout le contenu se trouve dans [index.html](index.html)

## 🌐 Technologies utilisées

- HTML5
- CSS3 (avec animations et responsive design)
- JavaScript vanilla (pas de frameworks)

## 📝 Notes

- Site 100% statique, pas besoin de serveur
- Optimisé pour GitHub Pages
- Responsive (mobile, tablette, desktop)
- Animations au scroll incluses
