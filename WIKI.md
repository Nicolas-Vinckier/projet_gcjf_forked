# Documentation de l'API

## Dossiers

- **controller** : contient les classes qui gèrent les requêtes HTTP
- **models** : contient les classes qui représentent les entités de la base de données
- **repository** : contient les classes qui gèrent les requêtes SQL
- **security** : contient les classes qui gèrent la sécurité de l'application
- **services** : contient les classes qui gèrent la logique métier

## Nommage des classes

- Les classes sont nommées en anglais et en CamelCase
- En cas d'implémentation de classe, on ajoute `Impl` à la fin du nom de la classe

### Exemple

Pour la classe 'Utilisateur', on aura `User` suivi du type de classe (Controller, Service, Repository)
Exemple : `UserController`

Implémentation de la classe `User` : `UserServiceImpl`

Sauf pour les classes de modèle qui sont nommées en anglais mais sans suffixe.
Exemple : `User`

## Import dans les classes

- Nous allons utiliser `jakarta.persistence`

Exemple

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
```
