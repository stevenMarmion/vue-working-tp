# Informations utiles

## INSTALLATION

### Création d'un virtual env

```bash
virtualenv -p python3 venv
```

### Activation du venv

```bash
source venv/bin/activate
```

### Installation des librairies utiles

```bash
pip install -r requirments.txt
```

### Lancement du serveur

```bash
flask run --debug
```

### Lancement du client

<http://127.0.0.1:5000/static/questionnaire.html>

## COMMANDES CURL

### Récupérer tous les questionnaires

```bash
curl http://127.0.0.1:5000/questionnaire/api/v1.0/questionnaires
```

### Récupérer un questionnaire spécifique (remplacez <questionnaire_id> par l'ID souhaité)

```bash
curl http://127.0.0.1:5000/questionnaire/api/v1.0/questionnaires/<questionnaire_id>
```

### Récupérer toutes les questions

```bash
curl http://127.0.0.1:5000/questionnaire/api/v1.0/questions
```

### Récupérer une question spécifique (remplacez <question_id> par l'ID souhaité)

```bash
curl http://127.0.0.1:5000/questionnaire/api/v1.0/question/<question_id>
```

### Créer un nouveau questionnaire

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "Nom_du_questionnaire"}' http://127.0.0.1:5000/questionnaire/api/v1.0/questionnaire
```

### Créer une nouvelle question

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Titre_de_la_question", "questionnaire_id": 1}' http://127.0.0.1:5000/questionnaire/api/v1.0/question
```

### Mettre à jour un questionnaire existant (remplacez <questionnaire_id> par l'ID du questionnaire à mettre à jour)

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Nouveau_nom"}' http://127.0.0.1:5000/questionnaire/api/v1.0/questionnaires/<questionnaire_id>
```

### Mettre à jour une question existante (remplacez <question_id> par l'ID de la question à mettre à jour)

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title": "Nouveau_titre", "questionnaire_id": 1}' http://127.0.0.1:5000/questionnaire/api/v1.0/questions/<question_id>
```

### Supprimer un questionnaire (remplacez <questionnaire_id> par l'ID du questionnaire à supprimer)

```bash
curl -X DELETE http://127.0.0.1:5000/questionnaire/api/v1.0/questionnaires/<questionnaire_id>
```

### Supprimer une question (remplacez <question_id> par l'ID de la question à supprimer)

```bash
curl -X DELETE http://127.0.0.1:5000/questionnaire/api/v1.0/questions/<question_id>
```

## FONCTIONNALITES IMPLEMENTEES

Pour chaque questionnaire et question, nous pouvons en créer, les modifier, les supprimer et les consulter. Il y a toutes les fonctionnalitées de rendering pour travailler cet aspect, c'est pour ça que nous faisons tout sur une page et l'affichage.  
Chaque ressource est inclut dans l'API REST donc toutes les routes ont été définit et tout est relié à la base de données ce qui permet de faire nos actions CRUD depuis l'interface et qui impactera la BDD.
Si nous supprimons un questionnaire avec plusieurs questions. Toutes les questions seront supprimées.  
Pour consulter une données, veuillez cliquer sur "tout questionnaire" ou "toutes questions" et ensuite vous pouvez modifier en cliquant sur "Modifier", vous pouvez supprimer en cliquant sur "Supprimer" et vous pouvez consulter le détail de la donnée en cliquant sur la donnée directement ( son titre avec un bouton en bleu )
