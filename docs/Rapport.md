# TaskTimer — Structure obligatoire du rapport
Kiril Bormin CID3B

25.11.2026 - 23.12.2026

Dimitrios Lymberis

Version de travail du 25.11.2026 · Séquence 1

## 1. Introduction et contexte

**DevFactory** m’a demandé de tester **TaskTimer**, une application web de gestion de tâches.

Pour cette première séquence, j’ai installé le projet, découvert l’interface et l’API, puis vérifié les premiers problèmes sur la version de départ.

## 2. Mise en place de l’environnement

### 2.1 Matériel et outils

J’ai utilisé un Dell OptiPlex Tower Plus 7010 avec Windows 11 Éducation 64 bits, Node.js 24.18.0, npm 11.16.0 et Chrome 157. Le frontend utilise Vue 3 et Vite. Le backend utilise Express et Mongoose. La version de MongoDB utilisée est la 8.2.6.

### 2.2 Installation et lancement

Pour refaire le lancement, démarrer MongoDB en local, puis ouvrir deux terminaux PowerShell à la racine du projet. La commande `npm.cmd` permet de lancer npm sur ce poste, où PowerShell bloque le script `npm.ps1`.

Dans le premier terminal, préparer le backend. Copier le fichier d’exemple si le fichier `.env` manque.

```powershell
cd backend
npm.cmd install
if (!(Test-Path .env)) { Copy-Item .env.example .env }
$env:MONGODB_URI = 'mongodb://127.0.0.1:27017/tasktimer_test'
$env:PORT = '3000'
npm.cmd run dev
```

Dans le deuxième terminal, lancer le frontend.

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

### 2.3 Configuration et base de test

`MONGODB_URI` indique au backend où se trouve la base. `PORT` fixe le port de l’API. J’ai utilisé une base locale vide appelée `tasktimer_test`. Pour l’exploration, j’ai lancé MongoDB avec `mongodb-memory-server`, depuis un dossier temporaire. L’outil a choisi un port libre et les données de travail ont été créées dans cette base.

### 2.4 Vérification du démarrage

Le backend a démarré sur le port 3000. L’appel `GET http://127.0.0.1:3000/api/tasks` a répondu `200` avec un tableau vide `[]`. J’ai ouvert l’interface dans Chrome sur le port 5174, car le port 5173 était déjà occupé. La page a aussi répondu `200`. [Trace du démarrage et des échanges (P-00)](preuves/P-00-exploration.txt)

### 2.5 Difficultés et solutions

Au premier essai, le backend n’a pas démarré. La connexion à MongoDB sur le port 27017 était refusée (`ECONNREFUSED`). Le lancement d’une instance temporaire a permis de reprendre l’exploration. Pour relancer Vite sur le même port, la commande est `npm.cmd run dev -- --host 127.0.0.1 --port 5174 --strictPort`.

## 3. Analyse initiale de l’application

### 3.1 Description des composants et exploration de l’UI et de l’API

TaskTimer affiche un formulaire et une liste de tâches. Une tâche a un titre, une priorité et une description facultative. L’interface Vue appelle l’API sous `/api/tasks`. Express reçoit les requêtes et Mongoose lit ou écrit les tâches dans MongoDB.

J’ai regardé ce que l’interface affiche, puis comparé les requêtes et les réponses de l’API avec les données retournées par `GET /api/tasks`. Pour explorer la liste et les actions sur une tâche enregistrée, j’ai créé par l’API une tâche appelée `Tache de reference` avec la priorité numérique `2`, acceptée par la version de départ. Le cahier des charges prévoit les valeurs `low`, `medium` et `high`.

### 3.2 Anomalies observées avant les tests automatisés

Observations du 25.11.2026 sur la version `da87f4c`, dans l’environnement décrit en section 2. Les identifiants CR renvoient aux critères du cahier des charges.

| ID et composant | Préconditions, données et étapes | Attendu | Observé | Preuve | Gravité, priorité et statut |
| --- | --- | --- | --- | --- | --- |
| B-01 · Liste (CR-1) | Avec `Tache de reference` en base, recharger la page, puis cliquer sur « Create task ». | La tâche apparaît dès l’ouverture. | La liste est vide et aucun appel API ne part au chargement. La tâche apparaît au clic. | [P-01](preuves/P-01-liste-au-demarrage.png) et [P-00](preuves/P-00-exploration.txt) | Élevée, haute. Les tâches existantes restent cachées à l’ouverture. Ouvert. |
| B-02 · Formulaire (CR-2, CR-4) | Charger la liste, laisser le titre vide et la priorité sur « Moyenne », puis cliquer sur « Create ». | Le formulaire signale le titre vide et la liste ne bouge pas. | Une ligne vide apparaît sans message. L’API répond `500` et la ligne est absente des données enregistrées. | [P-02](preuves/P-02-tache-vide.png) et [P-00](preuves/P-00-exploration.txt) | Moyenne, haute. L’affichage laisse croire que la saisie vide a été acceptée. Ouvert. |
| B-03 · Ajout (CR-1, CR-2, CR-4) | Avec l’API disponible, saisir `Preparer le rapport`, choisir « Moyenne », puis cliquer sur « Create ». Vérifier la liste de l’API. | L’API répond `201` et la tâche enregistrée apparaît. En cas d’erreur, le formulaire garde la saisie et affiche un message. | La priorité `medium` donne `500`. La ligne apparaît sans message et le formulaire se vide. La tâche manque dans la liste de l’API. | [P-03](preuves/P-03-ajout-affiche.png) et [P-00](preuves/P-00-exploration.txt) | Élevée, haute. Un ajout valable est perdu alors que l’écran indique un succès. Ouvert. |
| B-04 · Modification (CR-1, CR-4) | Après les essais B-02 et B-03, cliquer sur « Edit » pour `Tache de reference`, saisir `Titre modifie` et choisir « Élevée ». Cliquer sur « Save », puis relire la liste de l’API. | La modification se fait avec l’identifiant MongoDB et le résultat enregistré s’affiche. | L’interface envoie l’index de la ligne (`PUT /api/tasks/2` dans cet essai). L’API répond `400`. Le nouveau titre s’affiche, mais l’API renvoie toujours l’ancien. | [P-04](preuves/P-04-modification-affichee.png) et [P-00](preuves/P-00-exploration.txt) | Élevée, haute. L’utilisateur peut perdre ses modifications. Ouvert. |
| B-05 · Suppression (CR-1, CR-4) | Sur la même tâche enregistrée, cliquer sur « Delete », puis sur « Create task » pour recharger la liste. | L’interface envoie `DELETE` et retire la ligne après la réponse `204`. | L’interface envoie `GET`. La ligne disparaît, puis revient au rechargement de la liste. | [P-05](preuves/P-05-suppression-affichee.png) et [P-00](preuves/P-00-exploration.txt) | Élevée, haute. La suppression affichée ne se fait pas en base. Ouvert. |
| B-06 · Dates (CR-5) | Avec l’identifiant de la tâche de référence, envoyer un `PUT` avec le titre `Titre modifie par API` et la priorité numérique `3`. Comparer les dates avant et après. | Après une modification acceptée, `createdAt` reste identique et `updatedAt` change. | Le `PUT` répond `200`. `createdAt` prend l’heure de modification et `updatedAt` garde l’heure de création. | [P-00](preuves/P-00-exploration.txt) | Moyenne, moyenne. L’historique devient trompeur. Ouvert. |
| B-07 · Charte (CR-3, CR-6) | Ouvrir la page et vérifier le bouton principal et la police dans Chrome. | « + Ajouter une tâche », fond bleu `#007BFF`, Arial ou Roboto en 14 px. | « Create task », fond vert `#2ecc71`, Times New Roman en 12 px. | [P-01](preuves/P-01-liste-au-demarrage.png) et [P-00](preuves/P-00-exploration.txt) | Faible, basse. Les libellés et le style compliquent la lecture. Ouvert. |
| B-08 · Validation API (CR-2) | Avec la base de test vide, envoyer `POST /api/tasks` avec `{"title":"","priority":2}`, puis relire la liste. | Réponse `400` et base vide, car les deux champs sont invalides. | Réponse `201`. La liste de l’API contient la tâche avec un titre vide et la priorité `2`. | [P-00](preuves/P-00-exploration.txt) | Élevée, haute. L’API enregistre des données invalides. Ouvert. |

### 3.3 Hypothèses issues de la lecture de code, distinguées des anomalies reproduites

Les pistes A-01 à A-07 de ma première lecture ont été vérifiées. A-01 correspond à B-01, A-02 à B-08 et A-03 à A-07 correspondent à B-03 jusqu’à B-07.

| ID | Point repéré dans le code | Risque à vérifier |
| --- | --- | --- |
| A-08 | Les routes de modification et de suppression semblent accepter un identifiant bien formé qui ne correspond à aucune tâche. [Routes Express](../backend/src/routes/tasks.js) | L’API pourrait donner une réponse de succès alors que la tâche est introuvable. |
| A-09 | Le gestionnaire général des erreurs renvoie parfois un statut `200` avec un message d’erreur. [Serveur Express](../backend/src/server.js) | Un outil qui se fie au statut HTTP pourrait prendre une erreur pour un succès. |

## 4. Concept de test

Je veux vérifier que les tâches sont bien enregistrées et que les données invalides sont refusées. Les tests porteront sur la validation, l’API et l’interface, avec une base MongoDB séparée.

## 5. Stratégie et plan de test

Je commencerai par créer une tâche valide et vérifier qu’elle reste dans la liste après rechargement. Je testerai ensuite un titre vide, puis la modification et la suppression. Les vérifications de performance et de sécurité viendront plus tard.

## 6. Implémentation et exécution des tests

Les tests automatisés restent à écrire. Je commencerai par la validation du titre et de la priorité.

## 7. Résultats et analyse

L’interface et l’API démarrent avec la base isolée. L’exploration a confirmé huit anomalies. Les défauts d’ajout, de modification et de suppression sont prioritaires, car ils peuvent faire croire que des changements sont enregistrés. Les résultats détaillés sont dans le tableau de la section 3.2.

## 8. Corrections et vérification

Je vérifierai d’abord les anomalies sur la version de départ. Après chaque correction, je referai le test concerné.

## 9. Conclusion et bilan

Cette première séquence m’a permis de comprendre comment l’interface, l’API et MongoDB travaillent ensemble. En comparant ce que je voyais à l’écran avec ce que renvoyait l’API, j’ai compris pourquoi une modification visible pouvait disparaître plus tard. Les anomalies relevées serviront à préparer les prochains tests.

## 10. Annexes et fichiers remis

- [Journal de travail](Journal-de-Travail_BorminKiril.xlsx)
- [P-00 · Démarrage, requêtes et réponses de l’API](preuves/P-00-exploration.txt)
- [P-01 · Liste à l’ouverture](preuves/P-01-liste-au-demarrage.png)
- [P-02 · Ligne sans titre](preuves/P-02-tache-vide.png)
- [P-03 · Ajout affiché](preuves/P-03-ajout-affiche.png)
- [P-04 · Modification affichée](preuves/P-04-modification-affichee.png)
- [P-05 · Ligne retirée de l’écran](preuves/P-05-suppression-affichee.png)

Référence utilisée pour les critères et la charte graphique · Cahier des charges TaskTimer, version du 24.11.2026, sections 3 et 4 et annexe A.
