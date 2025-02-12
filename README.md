# Système de Cache en Node.js

Ce projet implémente un système de cache simple accessible via une API REST avec Express. Le cache permet de stocker des valeurs temporairement avec une durée de vie (TTL) et de les récupérer avant expiration.

## Prérequis
- Node.js installé

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone <URL_DU_DEPOT>
   cd <NOM_DU_REPERTOIRE>
   ```

2. **Installer les dépendances**
   ```bash
   npm install express
   ```

## Démarrer le serveur

Lance le serveur avec la commande suivante :
```bash
node index.js
```

Le serveur écoute sur `http://localhost:3000`.

## Utilisation de l'API

### Ajouter une valeur au cache
```bash
curl -X POST http://localhost:3000/cache -H "Content-Type: application/json" -d '{"key": "test", "value": "hello", "ttl": 30000}'
```

**Paramètres JSON:**
- `key` : Clé unique de stockage
- `value` : Valeur à stocker
- `ttl` : Durée de vie en millisecondes

**Réponse attendue :**
```json
{"message":"Cached successfully"}
```

### Récupérer une valeur du cache
```bash
curl -X GET http://localhost:3000/cache/test
```

**Réponse si la clé existe et n'est pas expirée :**
```json
{"value":"hello"}
```

**Réponse si la clé est expirée ou inexistante :**
```json
{"error":"Key not found or expired"}
```

## Tests

1. **Test unitaire** : Ajouter une valeur et vérifier qu'on la récupère avant expiration.
2. **Test d'intégration** : Ajouter plusieurs valeurs avec différents TTL et vérifier leur expiration correcte.

## Améliorations possibles
- Ajouter un stockage persistant (ex: Redis, base de données).
- Implémenter une stratégie de remplacement (ex: LRU).
- Ajouter une interface utilisateur pour gérer le cache.

---

**Auteur :** WANNASI MALIKA

