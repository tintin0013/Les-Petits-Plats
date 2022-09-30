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
      // création d'une liste
      // ajout du template de l'ingrédient
      // ajout de l'ingrédient
      // ajout de la quantité si elle existe
      // ajout de l'unité si elle existe
      // ajout de la liste dans la carte de recette
      const li = document.createElement("li");
      li.innerHTML = templateIngredient;
      li.querySelector(".ingredient").innerText = ingredient.ingredient;
      li.querySelector(".quantity").innerText =
        ingredient.quantity !== undefined ? `: ${ingredient.quantity}` : "";
      li.querySelector(".unit").innerText =
        ingredient.unit !== undefined ? ` ${ingredient.unit}` : "";
      card.querySelector(".list-ingredients").appendChild(li);
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
      // si typeElement = ingredients
      // on récupère les ingrédients
      // on sort du switch
      case "ingredients":
        elements = this.ingredients.map((ingredient) => ingredient.ingredient);
        break;
      // si typeElement = appliances
      // on récupère l'appareil
      // on sort du switch
      case "appliances":
        elements.push(this.appliance);
        break;
      // si typeElement = ustensils
      // pour chaque ustensile
      // on récupère l'ustensile
      // on sort du switch
      case "ustensils":
        // // console.log(this);
        this.ustensils.forEach((element) => {
          elements.push(element);
        });
        break;
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
    ingredients.forEach((ingredient) => {
      const matchingCurrentIngredient = this.ingredients.find(
        (i) => i.ingredient === ingredient
      );
      ingredientsMatching = !!matchingCurrentIngredient && ingredientsMatching;
    });
    return ingredientsMatching;
  }

  // ** filtrage des appareils **

  filterAppliance(appliance) {
    // création d'une variable qui vaut true
    // pour chaque appareil
    // on cherche l'appareil dans la recette
    // si l'appareil existe
    // on retourne true
    let applianceMatching = true;
    appliance.forEach((appli) => {
      const matchingCurrentAppliance = this.appliance.includes(appli);
      applianceMatching = !!matchingCurrentAppliance && applianceMatching;
    });
    return applianceMatching;
  }

  // ** filtrage des ustensiles **

  filterUstensils(ustensils) {
    // création d'une variable qui vaut true
    // pour chaque ustensile
    // on cherche l'ustensile dans la recette
    // si l'ustensile existe
    // on retourne true
    let ustensilsMatching = true;
    ustensils.forEach((ustensils) => {
      const matchingCurrentUstensils = this.ustensils.includes(ustensils);
      ustensilsMatching = !!matchingCurrentUstensils && ustensilsMatching;
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
    // on filtre les ingrédients
    // on filtre les appareils
    // on filtre les ustensiles
    // on filtre la recherche
    const matchingIngredients = this.filterIngredients(ingredients);
    const matchingAppliance = this.filterAppliance(appliance);
    const matchingUstensils = this.filterUstensils(ustensils);
    const matchingInput = this.inputResearch(inputSearch);
    // si les ingrédients, les appareils, les ustensiles et la recherche correspondent on retourne true
    return (
      matchingIngredients &&
      matchingAppliance &&
      matchingUstensils &&
      matchingInput
    );
  }
}
