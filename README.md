# Projet 7 : Les petits plats


Vous êtes freelance et vous venez d’être missionné par l’entreprise “Les petits plats” en temps que Développeur Front-end pour une mission de 3 mois. 

## **La mission:**
- Implémenter la fonctionnalité de recherche
L’utilisateur doit pouvoir filtrer les recettes selon deux axes : <br>
1- Une barre principale permettant de rechercher des mots ou
groupes de lettres dans le titre, les ingrédients ou la
description. <br>
2 – Recherche par mots clés dans les ingrédients, les ustensiles ou les appareils.
<br> <br>
- Réaliser une fiche d'investigation en comparant sur la recherche principale l'utilisation d'une boucle native (for) et les méthodes de l'objet Array (filter, forEach).
<br>

- Utilisation des technologies HTML / CSS / JS
<br> 

- Validation du code HTML et CSS par les validateurs W3C.
<br> <br>
## **La description des cas d'utilisation de recherche**

### **Scénario nominal** :

1. Le cas d’utilisation commence lorsque l’utilisateur entre au moins 3 caractères dans la
barre de recherche principale.
2. Le système recherche des recettes correspondant à l’entrée utilisateur dans : le titre de
la recette, la liste des ingrédients de la recette, la description de la recette.
3. L’interface est actualisée avec les résultats de recherche
4. Les champs de recherche avancée sont actualisés avec les informations ingrédients,
ustensiles, appareil des différentes recettes restantes
5. L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles,
appareil.
6. Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le
champ disparaissent. Par exemple, si l’utilisateur entre “coco” dans la liste d’ingrédients,
seuls vont rester “noix de coco” et “lait de coco”.
7. L’utilisateur choisit un mot clé dans le champ
8. Le mot clé apparaît sous forme de tag sous la recherche principale
9. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les
champs de recherche avancée
10. L’utilisateur sélectionne une recette

### **Scénario alternatif A1 :**

A1. Aucune recette correspondante à la recherche
L'enchaînement A1 commence au point 3 du scénario nominal
3. L’interface affiche « Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.
<br>

### **Scénario alternatif A2 :**
A2. L’utilisateur commence sa recherche par un tag
L'enchaînement A2 commence au point 1 du scénario nominal et reprend au point 9 du scénario nominal.
1. L’utilisateur commence la recherche par un tag.
2. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les
champs de recherche avancée (9 du cas principal).
<br>

### **Scénario alternatif A3 :**
A3. L’utilisateur ajoute d’autres tags pour la recherche avancée
L'enchaînement A3 commence au point 9 du scénario nominal. Cet enchaînement peut se répéter autant que nécessaire. <br>

10. L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles,appareil. 
11. Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le champ disparaissent.
12. L’utilisateur choisit un mot clé dans le champ
13. Le mot clé apparaît sous forme de tag sous la recherche principale
14. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les
champs de recherche avancée