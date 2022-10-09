import templateRecipes from "../templates/templateRecipes.js";
import templateIngredient from "../templates/templateIngredient.js";

export default class Recipe {
  constructor(data) {
    this.id = data.id; // id de la recette
    this.name = data.name; // nom de la recette
    this.servings = data.servings; // nombre de personnes
    this.ingredients = data.ingredients; // ingrédients  de la recette
    this.time = data.time; // temps de préparation de la recette
    this.description = data.description; // description de la recette
    this.appliance = data.appliance; // appareil utilisé pour la recette
    this.ustensils = data.ustensils; // ustensiles utilisés pour la recette
  }

  // ** creation des cartes de recettes **

  getCard() {
    // création de la carte de recette
    const card = document.createElement("article"); // création de l'article
    card.classList.add("recipe-card"); // ajout de la classe recipe-card
    card.innerHTML = templateRecipes; // ajout du template de la carte de recette
    card.querySelector("h1").innerText = this.name; // ajout du nom de la recette
    card.querySelector(".time").innerText = this.time + " min"; // ajout du temps de préparation
    card.querySelector(".description").innerText = this.description; // ajout de la description
    for (let i = 0; i < this.ingredients.length; i++) {
      // pour chaque ingrédient
      const li = document.createElement("li"); // création d'une liste
      li.innerHTML = templateIngredient; // ajout du template de l'ingrédient
      li.querySelector(".ingredient").innerText = // ajout de l'ingrédient
        this.ingredients[i].ingredient;
      li.querySelector(".quantity").innerText = // ajout de la quantité si elle existe
        this.ingredients[i].quantity !== undefined
          ? this.ingredients[i].quantity
          : "";
      li.querySelector(".unit").innerText = // ajout de l'unité si elle existe
        this.ingredients[i].unit !== undefined ? this.ingredients[i].unit : "";
      card.querySelector(".list-ingredients").appendChild(li); // ajout de la liste dans la carte de recette
    }
    return card; // retourne la carte de recette
  }

  // ** Extraction des les éléments passés en paramètre **

  extractElements(typeElement) {
    // typeElement = ingredients, appliance, ustensils
    let elements = []; // création d'un tableau vide
    switch (
      typeElement // switch pour les 3 types d'éléments
    ) {
      case "ingredients": // si typeElement = ingredients
        for (let i = 0; i < this.ingredients.length; i++) {
          // pour chaque ingrédient
          elements.push(this.ingredients[i].ingredient); // on ajoute l'ingrédient dans le tableau
        }
        break; // on sort du switch
      case "appliances": // si typeElement = appliances
        elements.push(this.appliance); // on ajoute l'appareil dans le tableau
        break; // on sort du switch
      case "ustensils": // si typeElement = ustensils
        elements = [...this.ustensils]; // on ajoute les ustensiles dans le tableau
        break; // on sort du switch
      default:
        break;
    }
    return elements; // on retourne les éléments
  }

  // ** filtrage des ingredients **

  filterIngredients(ingredients) {
    // création d'une variable qui vaut true
    // pour chaque ingrédient
    // on cherche l'ingrédient dans la recette
    // si l'ingrédient existe
    // on retourne true
    let ingredientsMatching = true;
    for (let i = 0; i < ingredients.length; i++) {
      let matchingCurrentIngredients = false;
      for (let j = 0; j < this.ingredients.length; j++) {
        if (this.ingredients[j].ingredient === ingredients[i]) {
          matchingCurrentIngredients = true;
        }
      }
      if (!matchingCurrentIngredients) {
        // si l'ingrédient n'existe pas
        ingredientsMatching = false; // on retourne false
      }
    }
    return ingredientsMatching;
  }

  // ** filtrage des appareils **

  filterAppliance(appliance) {
    // si appliance est vide ou si appliance est dans la recette on retourne true
    return !appliance.length || appliance.includes(this.appliance);
  }

  // ** filtrage des ustensiles **

  filterUstensils(ustensils) {
    // création d'une variable qui vaut true
    // pour chaque ustensile
    // on cherche l'ustensile dans la recette
    // si l'ustensile existe
    // on retourne true
    let ustensilsMatching = true;
    for (let i = 0; i < ustensils.length; i++) {
      let matchingCurrentUstensils = false;
      for (let j = 0; j < this.ustensils.length; j++) {
        if (this.ustensils[j] === ustensils[i]) {
          matchingCurrentUstensils = true;
        }
      }
      if (!matchingCurrentUstensils) {
        // si l'ustensile n'existe pas
        ustensilsMatching = false; // on retourne false
      }
    }
    return ustensilsMatching;
  }

  // ** Filtrage via la Search bar **
  // ** Recherche ingredients, description et nom de recette **

  inputResearch(inputSearch) {
    // filtre la recherche
    let matchingInput = true; // création d'une variable qui vaut true
    let matchingName = false; // création d'une variable qui vaut false
    let matchingDescription = false; // création d'une variable qui vaut false
    let matchingIngredients = false; // création d'une variable qui vaut false
    if (inputSearch) {
      // si il y a une recherche
      matchingName = this.name // on cherche le nom de la recette
        .toLowerCase() // en minuscule
        .includes(inputSearch.toLowerCase()); // qui contient la recherche
      matchingDescription = this.description // on cherche la description de la recette
        .toLowerCase()
        .includes(inputSearch.toLowerCase());
      for (let index = 0; index < this.ingredients.length; index++) {
        // pour chaque ingrédient
        if (
          // si l'ingrédient contient la recherche
          this.ingredients[index].ingredient // on cherche l'ingrédient
            .toLowerCase() // en minuscule
            .includes(inputSearch.toLowerCase()) // qui contient la recherche
        ) {
          matchingIngredients = true; // on retourne true
        }
      }
      matchingInput =
        matchingName || matchingDescription || matchingIngredients; // si le nom, la description ou l'ingrédient contient la recherche on retourne true
    }
    return matchingInput;
  }

  // si inputSearch est vide, on affiche toutes les recettes
  // sinon on affiche les recettes qui correspondent à la recherche
  matchingAllFilters(ingredients, appliance, ustensils, inputSearch) {
    // filtre les recettes
    const matchingIngredients = this.filterIngredients(ingredients); // on filtre les ingrédients
    const matchingAppliance = this.filterAppliance(appliance); // on filtre les appareils
    const matchingUstensils = this.filterUstensils(ustensils); // on filtre les ustensiles
    const matchingInput = this.inputResearch(inputSearch); // on filtre la recherche
    // si les ingrédients, les appareils, les ustensiles et la recherche correspondent on retourne true
    return (
      matchingIngredients &&
      matchingAppliance &&
      matchingUstensils &&
      matchingInput
    );
  }
}
