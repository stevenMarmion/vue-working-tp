# TP NOTE VUE.JS

## Membres

- MARMION Steven
- SIMON Gael

## Branche

- develop, branche de versionnage du développement

## Lancement

### Frontend

Pour lancer le frontend, merci de vous render dans le dossier project-source avec la commande :

```bash
cd project-source
```

Puis exécuter cette commande :

```bash
npm install
```

Et

```bash
npm run dev
```

### Backend

Pour lancer le backend, merci de vous rendre dans le dossier project-source/quiz avec la commande suivante :


```bash
cd project-source/quiz
```

Puis entrez dans le venv, si il n'y a pas de venv dans l'arborescence, merci de suivre les commandes ci-dessous :

Création du venv : 

```bash
virtualenv -p python3 venv
```

Puis entrez dedans :

```bash
source venv/bin/activate
```

Une fois dans le venv, merci d'installer les dépendances utiles au projet :

```bash
pip install -r requirments.txt
```

Une fois toutes les dépendances installées, merci d'éxecuter la commande suivante :


```bash
flask run --debug
```

### Navigation

Une fois le frontend et la backend lancé, entrer sur l'url suivante suivante :

```text
http://localhost:5173
```
