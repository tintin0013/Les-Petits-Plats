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
    this.ingredients.forEach((ingredient) => {
      // pour chaque ingrédient
      const li = document.createElement("li"); // création de la liste
      li.innerHTML = templateIngredient; // ajout du template de l'ingrédient
      li.querySelector(".ingredient").innerText = ingredient.ingredient; // ajout de l'ingrédient
      li.querySelector(".quantity").innerText =
        ingredient.quantity !== undefined ? `: ${ingredient.quantity}` : ""; // ajout de la quantité si elle existe
      li.querySelector(".unit").innerText =
        ingredient.unit !== undefined ? ` ${ingredient.unit}` : ""; // ajout de l'unité si elle existe
      card.querySelector(".list-ingredients").appendChild(li); // ajout de la liste dans la carte de recette
    });
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
        elements = this.ingredients.map((ingredient) => ingredient.ingredient); // on récupère les ingrédients
        break; // on sort du switch
      case "appliances": // si typeElement = appliances
        elements.push(this.appliance); // on récupère l'appareil
        break; // on sort du switch
      case "ustensils": // si typeElement = ustensils
        elements = [...this.ustensils]; // on récupère les ustensiles
        break; // on sort du switch
      default:
        break;
    }
    return elements; // on retourne les éléments
  }

  // ** filtrage des ingredients **

  filterIngredients(ingredients) {
    let ingredientsMatching = true; // création d'une variable qui vaut true
    ingredients.forEach((ingredient) => {
      // pour chaque ingrédient
      const matchingCurrentIngredient = this.ingredients.find(
        // on cherche l'ingrédient dans la recette
        (i) => i.ingredient === ingredient // si l'ingrédient existe
      );
      ingredientsMatching = !!matchingCurrentIngredient && ingredientsMatching; // on retourne true
    });
    return ingredientsMatching;
  }

  // ** filtrage des appareils **

  filterAppliance(appliance) {
    // si appliance est vide ou si appliance est dans la recette on retourne true
    return !appliance.length || appliance.includes(this.appliance);
  }

  // ** filtrage des ustensiles **

  filterUstensils(ustensils) {
    let ustensilsMatching = true; // création d'une variable qui vaut true
    ustensils.forEach((ustensils) => {
      // pour chaque ustensile
      const matchingCurrentUstensils = this.ustensils.includes(ustensils); // on cherche l'ustensile dans la recette
      ustensilsMatching = !!matchingCurrentUstensils && ustensilsMatching; // si l'ustensile existe on retourne true
    });
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
      matchingIngredients = this.ingredients.find((ing) =>
        ing.ingredient.toLowerCase().includes(inputSearch.toLowerCase())
      );
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
