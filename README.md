# PoC - Chat (Angular + TalkJS)

Ce projet est une preuve de concept d'une application Angular intégrant un système de chat via **TalkJS**. Il permet de tester un échange client-conseiller dans une interface simple.

## ▶️ Lancement rapide

### Prérequis
- Node.js
- Angular CLI

### Installation & exécution

```bash
git clone https://github.com/FHLabarbe/poc-chat.git
cd poc-chat
npm install
ng serve
```

Accès à l’application : http://localhost:4200

## 🔐 Identifiants de test

- **Client**  
  - Login : `client`  
  - Mot de passe : `client`

- **Conseiller**  
  - Login : `conseiller`  
  - Mot de passe : `conseiller`

## ⚠️ Remarques

- Aucune base de données n’est utilisée. 
- Les identifiants sont stockés en clair dans un fichier JSON côté frontend (usage test uniquement).
- Le système de chat est entièrement géré via **TalkJS**, aucune logique serveur.
