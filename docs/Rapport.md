# TaskTimer — Structure obligatoire du rapport
Kiril Bormin CID3B

25.11.2026 - 23.12.2026

Dimitrios Lymberis

## 1. Introduction et contexte

**DevFactory** m’a demandé de tester **TaskTimer**, une application web de gestion de tâches.

Pour cette première séquence, je découvre l’application, je vérifie son démarrage et je note les premiers problèmes à tester.

## 2. Mise en place de l’environnement

J’utilise Windows, **Node.js 24.18.0** et **npm 11.16.0**. Le frontend utilise Vue et Vite. Le backend utilise Express, Mongoose et MongoDB.

Pour lancer le projet, il faut faire `npm install` dans `backend` et `frontend`, copier `backend/.env.example` vers `backend/.env`, démarrer MongoDB, puis lancer `npm run dev` dans les deux dossiers. La base prévue pour les tests s’appelle `tasktimer_test`.

Le frontend a répondu avec un code **200** sur le port **5173**. Le backend, prévu sur le port **3000**, n’a pas démarré. La connexion à MongoDB sur le port **27017** a été refusée (`ECONNREFUSED`).

## 3. Analyse initiale de l’application

### 3.1 Description des composants et exploration de l’UI et de l’API

TaskTimer affiche un formulaire et une liste de tâches. On peut créer, modifier et supprimer une tâche. On peut aussi lui donner un titre, une priorité et une description.

L’interface Vue passe par l’API `/api/tasks` pour lire et modifier les tâches dans MongoDB. J’ai lu le code des routes pour comprendre les échanges entre les deux.

### 3.2 Anomalies observées avant les tests automatisés

- Une tâche vide peut apparaître dans la liste. Il reste à vérifier si elle est enregistrée.
- Les changements faits sur une tâche semblent ne pas être sauvegardés. Il reste à reproduire le problème avec l’API et la base de données.

### 3.3 Hypothèses issues de la lecture de code, distinguées des anomalies reproduites

En lisant le code, j’ai relevé quelques points à vérifier dans l’application.

- A-01 La liste pourrait rester vide au démarrage.
- A-02 L’API pourrait enregistrer une tâche sans titre.
- A-03 à A-05 Un ajout, une modification ou une suppression pourrait s’afficher sans être enregistré.
- A-06 Modifier une tâche pourrait changer sa date de création.
- A-07 Certains boutons sont en anglais et leur style semble s’écarter de la charte.

## 4. Concept de test

Je veux vérifier que les tâches sont bien enregistrées et que les données invalides sont refusées. Les tests porteront sur la validation, l’API et l’interface, avec une base MongoDB séparée.

## 5. Stratégie et plan de test

Je commencerai par créer une tâche valide et vérifier qu’elle reste dans la liste après rechargement. Je testerai ensuite un titre vide, puis la modification et la suppression. Les vérifications de performance et de sécurité viendront plus tard.

## 6. Implémentation et exécution des tests

Les tests automatisés restent à écrire. Je commencerai par la validation du titre et de la priorité.

## 7. Résultats et analyse

Le frontend démarre. Le problème de connexion à MongoDB empêche encore de vérifier les opérations sur les tâches de bout en bout.

## 8. Corrections et vérification

Je vérifierai d’abord les anomalies sur la version de départ. Après chaque correction, je referai le test concerné.

## 9. Conclusion et bilan

Cette première séquence m’a permis de comprendre le projet et de choisir les premiers points à tester. Il reste à démarrer MongoDB pour vérifier l’API.

## 10. Annexes et fichiers remis

Le journal de travail est dans `Journal-de-Travail_BorminKiril.xlsx`. Les preuves des tests seront ajoutées après leur exécution.
