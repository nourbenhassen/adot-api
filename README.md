Objectif
Le but est de construire une API REST pour relier des impressions publicitaires et clics à une liste de
points d'intérêts.

Fonctionnement
L'API doit exposer une route sur laquelle nous enverrons un objet JSON décrivant les points
d'intérêts.
Exemple
[
{
"lat": 48.86,
"lon": 2.35,
"name": "Chatelet"
},
{
"lat": 48.8759992,
"lon": 2.3481253,
"name": "Arc de triomphe"
},
{
"lat": 70.8759992,
"lon": 90.3481253,
"name": "Christ Redempteur"
}
]
L'API doit relier chacune des impressions et clics présents dans le fichier events.csv au point
d'intérêt le plus proche, et retourner un résultat sous la forme suivante :
{
"Chatelet": {
"lat": 42.86,
"lon": 2.35,
"name": "Chatelet",
"impressions": 136407,
"clicks": 16350
},
"Arc de triomphe": {
"lat": 48.8759992,
"lon": 2.3481253,
"name": "Arc de triomphe",
"impressions": 63593,
"clicks": 7646
}
}
Données à disposition
events.csv
Ce fichier CSV représente les données de géolocalisation d'une campagne. Sur chaque ligne sont
représentés latitude, longitude et type d'un évènement (impression ou clic) de la campagne.
points-of-interest.json
Un exemple de body d'une requête avec des points d'intérêts.
