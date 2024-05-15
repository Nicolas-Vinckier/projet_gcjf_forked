# Débuter le SSL avec Vite & React

## 1. Création du projet

```bash
npm create vite@latest
```

## 2. Création des clés SSL

### Avec un site web

```url
https://regery.com/en/security/ssl-tools/self-signed-certificate-generator
```

### Avec OpenSSL

Avec le logiciel `OpenSSL`, on peut générer une clé privée et un certificat auto-signé.

```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate.crt
```

## 4. Initialisation du projet

```bash
npm install
```

## 5. Configuration du serveur

Dans le fichier `vite.config.js`, on ajoute la configuration du serveur.

### Clé générée par le site

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: "./beginssl-privateKey.key",
      cert: "./beginssl.crt",
    },
  },
  plugins: [react()],
});
```

### Clé générée par OpenSSL

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
        key: "./private.key",
        cert: "./certificate.crt",
        },
    },
    plugins: [react()],
});
```

## 6. Lancement du serveur

Pour lancer le serveur en utilisant toutes les cartes réseaux :

```bash
npm run dev -- --host
```
