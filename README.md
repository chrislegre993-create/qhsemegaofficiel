# QHSE MEGA Cloud ☁️

**Système de Management QHSE** avec données cloud — accédez à vos informations depuis n'importe quel appareil.

## Architecture

```
GitHub Pages (interface) ←→ Supabase (base de données cloud)
```

- **GitHub Pages** : héberge le fichier HTML (gratuit)
- **Supabase** : stocke vos données dans une vraie base PostgreSQL (gratuit jusqu'à 500MB)
- **Connexion sécurisée** : email/password, JWT tokens
- **Multi-appareils** : PC, mobile, tablette — même compte, mêmes données

## Déploiement en 3 étapes

### 1. Créer le projet Supabase (5 min)
1. Aller sur [supabase.com](https://supabase.com) → créer un compte gratuit
2. **New project** → nommer "qhse-mega" → choisir une région
3. Dans **SQL Editor** → coller et exécuter le SQL fourni dans l'application au premier démarrage
4. Dans **Settings → API** → noter l'URL et la clé `anon`

### 2. Déployer sur GitHub Pages (5 min)
1. Créer un dépôt GitHub (public)
2. Uploader `index.html`, `sw.js`, `manifest.json`, `README.md`
3. **Settings → Pages** → Source: main → Save
4. URL: `https://votre-username.github.io/qhse-mega/`

### 3. Configurer au premier démarrage
1. Ouvrir l'URL GitHub Pages
2. Un assistant de configuration s'affiche
3. Saisir l'URL Supabase et la clé API
4. Cliquer **Connecter** → créer votre compte → c'est parti!

## Sécurité

- Chaque utilisateur ne voit que ses propres données (Row Level Security)
- Authentification JWT via Supabase Auth
- Les clés API sont publiques (anon key) — conçu pour être utilisé côté client
- HTTPS obligatoire via GitHub Pages

## Modules disponibles

14 modules QHSE: Incidents, Audits, Risques/DUER, Non-Conformités, Plan d'Actions, Environnement, Formations, Documents, EPI, Sécurité Incendie, Véhicules, Employés, Réunions, Import PDF

## Limites plan gratuit Supabase

- 500 MB de base de données
- 1 GB de fichiers
- 50 000 utilisateurs actifs/mois
- Mise en veille après 1 semaine d'inactivité (réactivation automatique au prochain accès)

---
*QHSE MEGA Cloud v5.0 — Conçu pour le management QHSE en Côte d'Ivoire et Afrique*
