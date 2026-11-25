# TaskTimer — Structure obligatoire du rapport
Kiril Bormin CID3B

25.11.2026 - 23.12.2026

Dimitrios Lymberis

## 1. Introduction et contexte

Entreprise **DevFactory** me mandante d'évaluer l'application **TaskTimer**, une application de gestion de tâches web. 

Objectifs : 
- Analyser le code et l’interface
- Élaborer un concept et un plan de test
- Identifier et prioriser les risques et anomalies
- Automatiser et exécuter des tests
- Documenter les résultats et vérifier les corrections

## 2. Mise en place de l’environnement

Backend : JavaScript sur **Node.js**, **Express**, **Mongoose** et **MongoDB**.

Frontend : **Vue 3** et **Vite**, avec accès à l’API par /api.

Prérequis : **Node.js** et **npm**, **MongoDB** accessible localement, navigateur et éditeur de code.

Le backend et le frontend s’installent séparément avec **npm install**.
Copier **backend/.env.example** vers **backend/.env**, **démarrer MongoDB**, puis lancer **npm run dev** dans backend et frontend.

L’API est accessible par défaut sur le port **3000** et l’interface sur le port **5173**.

## 3. Analyse initiale de l’application

### 3.1 Description des composants 

TaskTimer affiche un formulaire et une liste de tâches. On peut créer, modifier et supprimer une tâche. On peut aussi lui donner un titre, une priorité et une description.

L’interface Vue passe par l’API `/api/tasks` pour lire et modifier les tâches dans MongoDB. J’ai exploré l’interface et l’API en lisant le code, car les serveurs locaux ne répondaient pas.
### 3.2 Anomalies observées avant les tests automatisés
- On peut créer une tâche vide
- On ne peut pas sauvegarder les changements en modifiant

### 3.3 Hypothèses issues de la lecture de code, distinguées des anomalies reproduites

En lisant le code, j’ai relevé quelques points à vérifier dans l’application.

- A-01 La liste pourrait rester vide au démarrage.
- A-02 L’API pourrait accepter une tâche sans titre.
- A-03 à A-05 Un ajout, une modification ou une suppression pourrait s’afficher sans être enregistré.
- A-06 Modifier une tâche pourrait changer sa date de création.
- A-07 Certains boutons sont en anglais et leur style semble s’écarter de la charte.

## 4. Concept de test

## 5. Stratégie et plan de test

## 6. Implémentation et exécution des tests

## 7. Résultats et analyse

## 8. Corrections et vérification

## 9. Conclusion et bilan

## 10. Annexes et fichiers remis
