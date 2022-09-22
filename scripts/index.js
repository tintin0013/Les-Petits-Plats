import { recipes } from "./recipes.js";

// DOM
const searchbarInput = document.getElementById("search"); // Input de la barre de recherche
const chevron = document.querySelectorAll(".fa-chevron-down"); // Chevrons des boutons
const searchCard = document.querySelectorAll(".search-card"); // Search-cards Ingrédients, Appareil, Ustensiles
const filters = document.getElementById("filters"); // Div dans laquelle s'affichent les items filtrés
const ingredientsInput = document.getElementById("ingredients"); // Input de la search-card "Ingredients"
const appliancesInput = document.getElementById("appareil"); // Input de la search-card "Appareil"
const ustensilsInput = document.getElementById("ustensiles"); // Input de la search-card "Ustensiles"
const ingredientsUl = document.getElementById("ingredients-ul"); // Container des ingrédients
const appliancesUl = document.getElementById("appliances-ul"); // Container des appareils
const ustensilsUl = document.getElementById("ustensils-ul"); // Container des ustensiles
const recipesContainer = document.getElementById("recipes-container"); // Container des recettes

// Variables
let recipeArray = []; // Tableau contenant toutes les recettes
let recipeHTMLString = ""; // Contenu de la liste des recettes
let ingredientsHTMLString = ""; // Contenu de la liste d'ingrédients
let appliancesHTMLString = ""; // Contenu de la liste d'appareils
let ustensilsHTMLString = ""; // Contenu de la liste d'ustensiles
let ingredientsArray = []; // Tableau contenant la liste des ingrédients
let appliancesArray = []; // Tableau contenant la liste des appareils
let ustensilsArray = []; // Tableau contenant la liste des ustensiles
let selectedTags = []; // Tableau contenant tous les items cliqués
let ingredientsTags = []; // Tableau contenant les ingrédients cliqués
let appliancesTags = []; // Tableau contenant les appareils cliqués
let ustensilsTags = []; // Tableau contenant les ustensiles cliqués
let tagArray = []; // Tableau contenant la recherche par tags
let tagRecipes = []; // Tableau contenant la recherche par tags correspondant aux recettes sélectionnées
let newRecipeArray = []; // Taleau remplaçant recipeArray après recherche par tags

// ************************* RECETTES

//Affichage des recettes sur la page
function getRecipes(recipes) {
  recipeArray = recipes.map((recipe) => {
    // Remplit recipeArray avec toutes les données nécessaires
    return {
      recipe: recipe,
      ingredients: recipe.ingredients.map((item) => item.ingredient),
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
      html: `
                <div class="recipe-card" data-id="${recipe.id}">
                    <div class="recipe-img"></div>
                    <div class="recipe-text">
                        <div class="recipe-head">
                            <h1>${recipe.name}</h1>
                            <span class="time"><i class="far fa-clock"></i> ${
                              recipe.time
                            } min</span>
                        </div>
                        <div class="recipe-instructions">
                            <aside>${recipe.ingredients
                              .map(getIngredients)
                              .join(" ")}</aside>
                            <article class="description">${
                              recipe.description
                            }</article> 
                        </div>
                    </div>
                </div>
                `,
    };
  });
  tagArray = []; // Vide le taleau pour éviter les doublons à chaque appel de la fonction
  tagRecipes = []; // Vide le taleau pour éviter les doublons à chaque appel de la fonction
  recipeArray.forEach((element) => {
    // Itère sur chaque recette
    tagArray.push(element.html); // Remplit tagArray avec l'HTML de la recette
    tagRecipes.push(element.recipe); // Remplit tagRecipes la recette
    recipeHTMLString += element.html; // Insère l'HTML de la recette dans recipeHTMLString
  });
  recipesContainer.innerHTML = recipeHTMLString; // l'HTML de toutes les recettes figure dans recipesContainer

  return tagArray, tagRecipes;
}

// // Affichage chaque ingrédient dans recipe.ingredient
// function ingredientConstructor(item) {
//   return `${item.ingredient}`;
// }

// Affichage des ingrédients dans la card recette
function getIngredients(item) {
  return `<span class="ingredient">${item.ingredient}</span>: ${
    item.quantity || ""
  } ${item.unit || ""} <br>`;
}

// ************************* INGRÉDIENTS

// Affichage des ingrédients pour la search-card "Ingrédients"
function addIngredientsList(array) {
  ingredientsUl.innerHTML = "";
  ingredientsArray = array.reduce((ingredientsArray, recipe) => {
    return [...ingredientsArray, ...recipe.ingredients.map(getIngredientsList)];
  }, []);
  ingredientsArray = ingredientsArray.filter(
    (e, i) => ingredientsArray.indexOf(e) == i
  ); // Supprime les doublons
  ingredientsHTMLString = ingredientsArray.join(""); // Renvoie une chaîne de caractères à partir du tableau
  ingredientsUl.innerHTML = ingredientsHTMLString || "";
  addFilteredIngredient(); // Affiche un ingrédient lorsque l'on clique dessus
  return ingredientsArray;
}

function newIngredientsList(array) {
  ingredientsUl.innerHTML = "";
  let ingredientsArray = array.reduce((ingredientsArray, recipe) => {
    return [...ingredientsArray, ...recipe.ingredients];
  }, []);
  ingredientsArray = ingredientsArray.filter(
    (e, i) => ingredientsArray.indexOf(e) == i
  ); // Supprime les doublons
  createIngredientsList(ingredientsArray);
  return ingredientsArray;
}

function createIngredientsList(array) {
  ingredientsHTMLString = array
    .map((item) => {
      return `<li class="ingredients-result">${item}</li>`;
    })
    .join(" ");
  ingredientsUl.innerHTML = ingredientsHTMLString || "";
  addFilteredIngredient();
  return array;
}

function getIngredientsList(item) {
  return `<li class="ingredients-result">${item.ingredient}</li>`;
}

//Filtrage des ingredients
function ingredientsFilter() {
  if (ingredientsInput.value.length >= 3) {
    // À partir de 3 caractères
    if (!searchCard[0].classList.contains("active")) {
      // Si la liste n'est pas affichée
      searchCard[0].classList.add("active"); // Ouvre la liste
    }
    let research = ingredientsInput.value.toLowerCase(); // Récupère le résultat de la recherche
    ingredientsArray = ingredientsArray.filter((ingredient) =>
      ingredient.toLowerCase().includes(research)
    );
    createIngredientsList(ingredientsArray);
  } else {
    // Si la recherche comprend moins de 3 caractères
    addIngredientsList(tagRecipes);
    ingredientsUl.innerHTML = ingredientsHTMLString || ""; // Affichage complet de la liste
  }
  addFilteredIngredient();
}

// Affichage de l'ingrédient sélectionné
function addFilteredIngredient() {
  const ingredientsResult = document.querySelectorAll(".ingredients-result"); // Ingrédients de la liste
  ingredientsResult.forEach((element) => {
    element.removeEventListener("click", addIngredient);
    element.addEventListener("click", addIngredient);
  });
}

function addIngredient(eventIngredient) {
  let itemString = eventIngredient.target.innerText; // Crée une variable contenant le texte de l'item cliqué
  let ingredientsFilter = document.createElement("div"); // Crée la div du filtre
  ingredientsFilter.classList.add("item-filters"); // Ajoute les classes
  ingredientsFilter.classList.add("ingredients-filter");
  ingredientsFilter.classList.add("active");
  ingredientsFilter.innerHTML = `
            <div class="filtered-item">${itemString}</div>
            <i class="far fa-times-circle close-button"></i>
            `;
  filters.appendChild(ingredientsFilter); // Insère le filtre dans sa div
  selectedTags.push(itemString); // Insère l'élément dans le tableau "selectedTags"
  ingredientsTags.push(itemString); // Insère l'élément dans le tableau "ingredientsTags"
  recipeFilter(eventIngredient, "tag");
  ingredientsArray = ingredientsArray.filter(
    (ingredient) => ingredient != itemString
  ); // Supprime l'item de la liste des ingrédients
  createIngredientsList(ingredientsArray);
  addAppliancesList(tagRecipes); // Actualise la liste des appareils
  addUstensilslist(tagRecipes); // Actualise la liste des ustensiles
  closeFilter();
  closeCard(searchCard[0]); // Ferme la searchcard
  ingredientsInput.placeholder = `Ingrédients`;
  return itemString;
}

// ************************* APPAREILS

// Affichage des appareils dans la search-card "Appareils"
function addAppliancesList(recipes) {
  appliancesUl.innerHTML = "";
  appliancesArray = recipes.map((recipe) => {
    return recipe.appliance;
  });
  appliancesArray = appliancesArray.filter(
    (e, i) => appliancesArray.indexOf(e) == i
  );
  createAppliancesList(appliancesArray);
  return appliancesArray;
}

function createAppliancesList(array) {
  appliancesHTMLString = array.map((item) => {
    return `<li class="appliances-result">${item}</li>`;
  });
  appliancesUl.innerHTML = appliancesHTMLString.join(" ") || "";
  addFilteredAppliance();
  return array;
}

//Filtrage des appareils
function appliancesFilter() {
  if (appliancesInput.value.length >= 3) {
    // À partir de 3 caractères
    if (!searchCard[1].classList.contains("active")) {
      // Si la liste n'est pas affichée
      searchCard[1].classList.add("active"); // Ouvre la liste
    }
    let research = appliancesInput.value.toLowerCase(); // Mot-clé de la recherche
    appliancesArray = appliancesArray.filter((appliance) =>
      appliance.toLowerCase().includes(research)
    );
    createAppliancesList(appliancesArray);
  } else {
    // Si la recherche comprend moins de 3 caractères
    addAppliancesList(tagRecipes);
    appliancesUl.innerHTML = appliancesHTMLString.join(" ") || ""; // Affichage complet de la liste
  }
  addFilteredAppliance();
}

// Affichage de l'appareil sélectionné
function addFilteredAppliance() {
  const appliancesResult = document.querySelectorAll(".appliances-result"); // Appareils de la liste
  appliancesResult.forEach((element) => {
    element.removeEventListener("click", addAppliance);
    element.addEventListener("click", addAppliance);
  });
}

function addAppliance(eventAppliance) {
  let itemString = eventAppliance.target.innerText; // Crée une variable contenant le texte de l'item cliqué
  let appliancesFilter = document.createElement("div"); // Crée la div du filtre
  appliancesFilter.classList.add("item-filters"); // Ajoute les classes
  appliancesFilter.classList.add("appliances-filter");
  appliancesFilter.classList.add("active");
  appliancesFilter.innerHTML = `
            <div class="filtered-item">${itemString}</div>
            <i class="far fa-times-circle close-button"></i>
            `;
  filters.appendChild(appliancesFilter); // Insère le filtre dans sa div
  selectedTags.push(itemString);
  appliancesTags.push(itemString);
  recipeFilter(eventAppliance, "tag");
  let appliancesArray = addAppliancesList(tagRecipes);
  appliancesArray = appliancesArray.filter(
    (appliance) => appliance != itemString
  ); // Supprime l'item de la liste des appareils
  addIngredientsList(tagRecipes);
  createAppliancesList(appliancesArray);
  addUstensilslist(tagRecipes);
  closeFilter();
  closeCard(searchCard[1]);
  appliancesInput.placeholder = `Appareils`;
}

// ************************* USTENSILES

// Affichage des ustensiles dans la search-card "Ustensiles"
function addUstensilslist(array) {
  ustensilsUl.innerHTML = "";
  ustensilsArray = array.reduce((ustensilsArray, recipe) => {
    return [...ustensilsArray, ...recipe.ustensils];
  }, []);
  ustensilsArray = ustensilsArray.filter(
    (e, i) => ustensilsArray.indexOf(e) == i
  );
  createUstensilsList(ustensilsArray);
  return ustensilsArray;
}

function createUstensilsList(array) {
  ustensilsHTMLString = array.map((item) => {
    return `<li class="ustensils-result">${item}</li>`;
  });
  ustensilsUl.innerHTML = ustensilsHTMLString.join(" ") || "";
  addFilteredUstensil();
  return array;
}

//Filtrage des ustensiles
function ustensilsFilter() {
  if (ustensilsInput.value.length >= 3) {
    // À partir de 3 caractères
    if (!searchCard[2].classList.contains("active")) {
      // Si la liste n'est pas affichée
      searchCard[2].classList.add("active"); // Ouvre la liste
    }
    let research = ustensilsInput.value.toLowerCase(); // Mot-clé de la recherche
    ustensilsArray = ustensilsArray.filter((ustensil) =>
      ustensil.toLowerCase().includes(research)
    );
    createUstensilsList(ustensilsArray);
  } else {
    // Si la recherche comprend moins de 3 caractères
    addUstensilslist(tagRecipes);
    ustensilsUl.innerHTML = ustensilsHTMLString.join(" ") || ""; // Affichage complet de la liste
  }
  addFilteredUstensil();
}

// Affichage de l'ustensile sélectionné
function addFilteredUstensil() {
  const ustensilsResult = document.querySelectorAll(".ustensils-result"); //Ustensiles de la liste
  ustensilsResult.forEach((element) => {
    element.removeEventListener("click", addUstensil);
    element.addEventListener("click", addUstensil);
  });
}

function addUstensil(eventUstensil) {
  let itemString = eventUstensil.target.innerText; // Crée une variable contenant le texte de l'item cliqué
  let ustensilsFilter = document.createElement("div"); // Crée la div du filtre
  ustensilsFilter.classList.add("item-filters"); // Ajoute les classes
  ustensilsFilter.classList.add("ustensils-filter");
  ustensilsFilter.classList.add("active");
  ustensilsFilter.innerHTML = `
            <div class="filtered-item">${itemString}</div>
            <i class="far fa-times-circle close-button"></i>
            `;
  filters.appendChild(ustensilsFilter); // Insère le filtre dans sa div
  selectedTags.push(itemString);
  ustensilsTags.push(itemString);
  recipeFilter(eventUstensil, "tag");
  let ustensilsArray = addUstensilslist(tagRecipes);
  ustensilsArray = ustensilsArray.filter((ustensil) => ustensil != itemString); // Supprime l'item de la liste des ustensiles
  addIngredientsList(tagRecipes);
  addAppliancesList(tagRecipes);
  createUstensilsList(ustensilsArray);
  closeFilter();
  closeCard(searchCard[2]); // Ferme la searchcard
  ustensilsInput.placeholder = `Ustensiles`;
}

// ************************* RECHERCHE

// Filtrage des recettes avec la search-bar
function recipeFilter(event, mode = "search") {
  if (mode == "search") {
    // À partir de la barre de recherche
    searchbarResearch(searchbarInput);
  } else if (mode == "tag") {
    // À partir des tags
    if (selectedTags.length != 0) {
      // Si des tags ont été sélectionnés
      tagResearch(recipeArray); // Recherche à partir de toutes les recettes
      if (tagArray.length === 0) {
        // Si aucune recette n'a été mise dans le tableau
        recipesContainer.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
      } else {
        // Sinon (si au moins une recette correspond)
        recipesContainer.innerHTML = tagArray.join(" ");
      }
      addIngredientsList(tagRecipes); // Actualise la liste des ingrédients
      addAppliancesList(tagRecipes); // Actualise la liste des appareils
      addUstensilslist(tagRecipes); // Actualise la liste des ustensiles
    } else {
      // Si aucun tag n'a été sélectionné
      searchbarResearch(searchbarInput); // Recherche à partir de la barre de recherche
      newIngredientsList(recipeArray); // Actualise la liste des ingrédients
      addAppliancesList(recipeArray); // Actualise la liste des appareils
      addUstensilslist(recipeArray); // Actualise la liste des ustensiles
    }
  }
  ingredientsFilter();
  appliancesFilter();
  ustensilsFilter();
  addFilteredIngredient();
  addFilteredAppliance();
  addFilteredUstensil();
}

function searchbarResearch(searchbarInput) {
  let inputValue = searchbarInput.value;
  if (inputValue.length >= 3) {
    // À partir de 3 caractères
    if (selectedTags.length > 0) {
      // Si une recherche par tag a été faite
      recipeResearch(newRecipeArray, inputValue); // Recherche à partir des recettes filtrées par tag
    } else {
      // Si aucun filtrage
      recipeResearch(recipeArray, inputValue); // Recherche à partir de toutes les recettes
    }
    if (tagArray.length === 0) {
      // Si aucune recette n'a été mise dans le tableau
      recipesContainer.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
    } else {
      // Sinon (si au moins une recette correspond)
      recipesContainer.innerHTML = tagArray.join(" ");
    }
    addIngredientsList(tagRecipes);
    addAppliancesList(tagRecipes);
    addUstensilslist(tagRecipes);
  } else {
    // Si l'input comprend moins de 3 caractères
    if (selectedTags.length > 0) {
      tagResearch(recipeArray); // Recherche à partir de toutes les recettes
      if (tagArray.length === 0) {
        // Si aucune recette n'a été mise dans le tableau
        recipesContainer.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
      } else {
        // Sinon (si au moins une recette correspond)
        recipesContainer.innerHTML = tagArray.join(" ");
      }
      addIngredientsList(tagRecipes); // Actualise la liste des ingrédients
      addAppliancesList(tagRecipes); // Actualise la liste des appareils
      addUstensilslist(tagRecipes); // Actualise la liste des ustensiles
    } else {
      recipesContainer.innerHTML = recipeHTMLString; // Affichage de toutes les recettes
      getRecipes(recipes);
    }

    newIngredientsList(recipeArray);
    addAppliancesList(recipeArray);
    addUstensilslist(recipeArray);
  }
}

function recipeResearch(array, inputValue) {
  array.forEach((element) => {
    let research = inputValue.toLowerCase();
    if (!element.html.toLowerCase().includes(research)) {
      tagArray = tagArray.filter((item) => item != element.html);
      tagRecipes = tagRecipes.filter((item) => item != element.recipe);
    }
  });
  return array;
}

function tagResearch(array) {
  array.forEach((element) => {
    // Itère sur chaque élément du tableau en paramètre de la fonction
    if (element.recipe != undefined) {
      selectedTags.forEach((tag) => {
        // Itère sur chaque tag
        if (
          element.ingredients.indexOf(tag) === -1 &&
          element.appliance.indexOf(tag) === -1 &&
          element.ustensils.indexOf(tag) === -1
        ) {
          // Si tag introuvable
          tagArray = tagArray.filter((item) => item != element.html); // Supprime l'élément du tableau tagArray
          tagRecipes = tagRecipes.filter((item) => item != element.recipe); // Supprime l'élément du tableau tagRecipes
          newRecipeArray = array.filter((item) => item != element);
        } else {
          // Si on trouve l'élément, rien ne se passe
        }
      });
    }
  });
  return array;
}

// ************************* FILTRES ET BOUTONS

function closeFilter() {
  // Fermeture des div des items filtrés
  const closeButton = document.querySelectorAll(".close-button"); // Croix de fermeture des items filtrés
  closeButton.forEach((element) => {
    // Itère sur chaque croix
    element.addEventListener("click", removeActive); // Ferme le bouton
  });
}

function removeActive(button) {
  let icon = button.target; // Cible la croix
  icon.parentElement.classList.remove("active"); // Enlève le "display: inline-flex" de la div parent "item-filters"
  let item = icon.previousElementSibling.innerHTML; // Cible le nom de l'item cliqué
  selectedTags = selectedTags.filter((tag) => tag != item); // Enlève l'item du tableau selectedTags
  removeTag(icon.parentElement, item); // Enlève l'item du tableau des tags de sa catégorie
  getRecipes(recipes);
  recipeFilter(button, "tag"); // Appelle la fonction de recherche
}

function removeTag(icon, item) {
  if (icon.classList.contains("ingredients-filter")) {
    // Si l'item est un ingrédient
    ingredientsTags = ingredientsTags.filter(
      (ingredient) => ingredient != item
    ); // Enlève l'item de ingredientsTags
  } else if (icon.classList.contains("appliances-filter")) {
    // Si l'item est un appareil
    appliancesTags = appliancesTags.filter((appliance) => appliance != item); // Enlève l'item de appliancesTags
  } else if (icon.classList.contains("ustensils-filter")) {
    // Si l'item est un ustensile
    ustensilsTags = ustensilsTags.filter((ustensil) => ustensil != item); // Enlève l'item de ustensilsTags
  }
}

// Affichage des ingrédients au clic sur le bouton
function showIngredientsList() {
  if (searchCard[0].classList.contains("active")) {
    ingredientsInput.placeholder = `Ingrédients`;
  } else {
    ingredientsInput.placeholder = `Rechercher un ingrédient`;
  }
  openCard(searchCard[0]);
  closeCard(searchCard[1]);
  appliancesInput.placeholder = `Appareil`;
  closeCard(searchCard[2]);
  ustensilsInput.placeholder = `Ustensiles`;
}

// Affichage des appareils au clic sur le bouton
function showAppliancesList() {
  if (searchCard[1].classList.contains("active")) {
    appliancesInput.placeholder = `Appareil`;
  } else {
    appliancesInput.placeholder = `Rechercher un appareil`;
  }
  openCard(searchCard[1]);
  closeCard(searchCard[0]);
  ingredientsInput.placeholder = `Ingrédients`;
  closeCard(searchCard[2]);
  ustensilsInput.placeholder = `Ustensiles`;
}

// Affichage des ustensiles au clic sur le bouton
function showUstensilsList() {
  if (searchCard[2].classList.contains("active")) {
    ustensilsInput.placeholder = `Ustensiles`;
  } else {
    ustensilsInput.placeholder = `Rechercher un ustensile`;
  }
  openCard(searchCard[2]);
  closeCard(searchCard[0]);
  ingredientsInput.placeholder = `Ingrédients`;
  closeCard(searchCard[1]);
  appliancesInput.placeholder = `Appareil`;
}

// Ouverture de la searchCard + retournement chevron
function openCard(searchCard) {
  searchCard.classList.toggle("active");
}

// Fermeture des cards ouvertes
function closeCard(searchCard) {
  if (searchCard.classList.contains("active")) {
    searchCard.classList.remove("active");
  }
}

// ************************* FONCTIONS

getRecipes(recipes); // Affichage des recettes sur la page
addIngredientsList(recipes); // Affichage des ingrédients pour la search-card "Ingrédients"
addAppliancesList(recipes); // Affichage des appareils dans la search-card "Appareils"
addUstensilslist(recipes); // Affichage des ustensiles dans la search-card "Ustensiles"

searchbarInput.addEventListener("input", (event) => recipeFilter(event)); // Filtrage des recettes avec la search-bar

ingredientsInput.addEventListener("input", ingredientsFilter); //Filtrage des ingredients au remplissage de la search-card
addFilteredIngredient(); // Affichage de l'ingrédient sélectionné

addFilteredAppliance(); // Affichage de l'appareil sélectionné
appliancesInput.addEventListener("input", appliancesFilter); //Filtrage des appareils au remplissage de la search-card

addFilteredUstensil(); // Affichage de l'ustensile sélectionné
ustensilsInput.addEventListener("input", ustensilsFilter); //Filtrage des ustensiles au remplissage de la search-card

chevron[0].addEventListener("click", showIngredientsList); // Affichage des ingrédients au clic sur le bouton
chevron[1].addEventListener("click", showAppliancesList); // Affichage des appareils au clic sur le bouton
chevron[2].addEventListener("click", showUstensilsList); // Affichage des ustensiles au clic sur le bouton
ingredientsInput.addEventListener("click", showIngredientsList); // Affichage des ingrédients au clic sur le bouton
