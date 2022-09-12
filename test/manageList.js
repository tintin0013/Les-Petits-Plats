const ingredientsUl = document.getElementById("ingredients-ul"),
  blue = document.getElementById("blue"),
  red = document.getElementById("red"),
  green = document.getElementById("green"),
  filters = document.getElementById("filters"), // Div dans laquelle s'affichent les items filtrés
  appliancesUl = document.getElementById("appliances-ul"),
  ustensilsUl = document.getElementById("ustensils-ul"),
  ingredientsInput = document.getElementById("ingredients"),
  appliancesInput = document.getElementById("appareil"),
  ustensilsInput = document.getElementById("ustensiles"),
  //   chevron = document.querySelectorAll(".fa-chevron-down"),
  searchCard = document.querySelectorAll(".search-card");
// class ManageUlList {
//     constructor() {
let ingredientsArray = [],
  appliancesArray = [],
  ustensilsArray = [],
  selectedTags = [], // Tableau contenant tous les items cliqués
  ingredientsTags = [], // Tableau contenant les ingrédients cliqués
  appliancesTags = [], // Tableau contenant les appareils cliqués
  ustensilsTags = [], // Tableau contenant les ustensiles cliqués
  ingredientsHTMLString = "",
  appliancesHTMLString = "",
  ustensilsHTMLString = "";

function displayList(array, string) {
  switch (string) {
    case "ingredients":
      Ul = ingredientsUl;
      addFiltered("ingredients");
      break;
    case "appliances":
      Ul = appliancesUl;
      break;
    case "ustensils":
      Ul = ustensilsUl;
      break;
  }

  HTMLString = array
    .map((item) => {
      return `<li class="` + string + `-result">${item}</li>`;
    })
    .join("");
  Ul.innerHTML = HTMLString || "";
  // addFiltered(string);
  // console.log (HTMLString)
  return array, HTMLString;
}

blue.addEventListener("click", () => {
  showList("ingredients");
});
green.addEventListener("click", () => {
  showList("appliances");
});
red.addEventListener("click", () => {
  showList("ustensils");
});

function showList(string) {
  closeCard(searchCard);
  let input;
  switch (string) {
    case "ingredients":
      input = ingredientsInput;
      console.log(string);
      if (!searchCard[0].classList.contains("active")) {
        searchCard[0].classList.add("active");
        openCard(searchCard[0]);
        input.placeholder = "Rechercher un ingrédient";
      } else {
        input.placeholder = "Ingrédients";
      }

      break;
    case "appliances":
      input = appliancesInput;
      console.log(string);

      searchCard[1].classList.add("active");
      input.placeholder = "Rechercher un appareil";
      openCard(searchCard[1]);
      break;
    case "ustensils":
      input = ustensilsInput;
      console.log(string);
      searchCard[2].classList.add("active");
      input.placeholder = "Rechercher un ustencile";
      openCard(searchCard[2]);
      break;
  }

  // console.log(input);
}

// Ouverture de la searchCard + retournement chevron
function openCard(searchCard) {
  searchCard.classList.add("active");
}

function newIngredientsList(array) {
  ingredientsUl.innerHTML = "";
  let ingredientsArray = array.reduce((ingredientsArray, recipe) => {
    return [...ingredientsArray];
  }, []);
  ingredientsArray = ingredientsArray.filter(
    (e, i) => ingredientsArray.indexOf(e) == i
  ); // Supprime les doublons
  displayList(ingredientsArray, "ingredients");
  return ingredientsArray;
}

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
    displayList(ingredientsArray, "ingredients"); // Affiche la liste
  } else {
    // Si la recherche comprend moins de 3 caractères
    addIngredientsList(tagRecipes);
    ingredientsUl.innerHTML = ingredientsHTMLString || ""; // Affichage complet de la liste
  }
  addFiltered("ingredients");
}

function addFiltered(string) {
  let result = document.querySelectorAll(`.` + string + `-result`);
  switch (string) {
    case "ingredients":
      result.forEach((element) => {
        element.removeEventListener("click", addTags("ingredients"));
        element.addEventListener("click", addTags("ingredients"));
      });
      break;
    case "appliances":
      result.forEach((element) => {
        element.removeEventListener("click", addTags("appliances"));
        element.addEventListener("click", addTags("appliances"));
      });
      break;
    case "ustensils":
      result.forEach((element) => {
        element.removeEventListener("click", addTags("ustensils"));
        element.addEventListener("click", addTags("ustensils"));
      });
  }
}

function addTags(event, string) {
  switch (string) {
    case "ingredients":
      let ingrString = eventIngredient.target.innerText; // Crée une variable contenant le texte de l'item cliqué
      let ingredientsFilter = document.createElement("div"); // Crée la div du filtre
      ingredientsFilter.classList.add("item-filters"); // Ajoute les classes
      ingredientsFilter.classList.add("ingredients-filter");
      ingredientsFilter.classList.add("active");
      ingredientsFilter.innerHTML = `
				  <div class="filtered-item">${ingrString}</div>
				  <i class="far fa-times-circle close-button"></i>
				  `;
      filters.appendChild(ingredientsFilter); // Insère le filtre dans sa div
      selectedTags.push(ingrString); // Insère l'élément dans le tableau "selectedTags"
      ingredientsTags.push(ingrString); // Insère l'élément dans le tableau "ingredientsTags"
      recipeFilter(eventIngredient, "tag");
      ingredientsArray = ingredientsArray.filter(
        (ingredient) => ingredient != ingrString
      ); // Supprime l'item de la liste des ingrédients
      displayList(ingredientsArray, "ingredients"); // Affiche la liste des ingrédients
      addAppliancesList(tagRecipes); // Actualise la liste des appareils
      addUstensilslist(tagRecipes); // Actualise la liste des ustensiles
      closeFilter();
      closeCard(searchCard[0]); // Ferme la searchcard
      ingredientsInput.placeholder = `Ingrédients`;
      // return ingrString;
      break;
    case "appliances":
      let appString = eventAppliance.target.innerText; // Crée une variable contenant le texte de l'item cliqué
      let appliancesFilter = document.createElement("div"); // Crée la div du filtre
      appliancesFilter.classList.add("item-filters"); // Ajoute les classes
      appliancesFilter.classList.add("appliances-filter");
      appliancesFilter.classList.add("active");
      appliancesFilter.innerHTML = `
				  <div class="filtered-item">${appString}</div>
				  <i class="far fa-times-circle close-button"></i>
				  `;
      filters.appendChild(appliancesFilter); // Insère le filtre dans sa div
      selectedTags.push(appString); // Insère l'élément dans le tableau "selectedTags"
      appliancesTags.push(appString); // Insère l'élément dans le tableau "appliancesTags"
      recipeFilter(eventAppliance, "tag");
      appliancesArray = appliancesArray.filter(
        (appliance) => appliance != appString
      ); // Supprime l'item de la liste des appareils
      displayList(appliancesArray, "appliances"); // Affiche la liste des appareils
      addIngredientsList(tagRecipes); // Actualise la liste des ingrédients
      addUstensilslist(tagRecipes); // Actualise la liste des ustensiles
      closeFilter();
      closeCard(searchCard[1]); // Ferme la searchcard
      appliancesInput.placeholder = `Appareils`;
      break;
    case "ustensils":
      let ustString = eventUstensil.target.innerText; // Crée une variable contenant le texte de l'item cliqué
      let ustensilsFilter = document.createElement("div"); // Crée la div du filtre
      ustensilsFilter.classList.add("item-filters"); // Ajoute les classes
      ustensilsFilter.classList.add("ustensils-filter");
      ustensilsFilter.classList.add("active");
      ustensilsFilter.innerHTML = `
				  <div class="filtered-item">${ustString}</div>
				  <i class="far fa-times-circle close-button"></i>
				  `;
      filters.appendChild(ustensilsFilter); // Insère le filtre dans sa div
      selectedTags.push(ustString); // Insère l'élément dans le tableau "selectedTags"
      ustensilsTags.push(ustString); // Insère l'élément dans le tableau "ustensilsTags"
      recipeFilter(eventUstensil, "tag");
      ustensilsArray = ustensilsArray.filter(
        (ustensil) => ustensil != ustString
      ); // Supprime l'item de la liste des ustensiles
      displayList(ustensilsArray, "ustensils"); // Affiche la liste des ustensiles
      addIngredientsList(tagRecipes); // Actualise la liste des ingrédients
      addAppliancesList(tagRecipes); // Actualise la liste des appareils
      closeFilter();
      closeCard(searchCard[2]); // Ferme la searchcard
      ustensilsInput.placeholder = `Ustensiles`;
      break;
  }

  //   console.log(selectedTags);
}
// function addTags(event, string) {
//   let itemString;
//   let filter;
//   let tags;

//   let array;
//   switch (string) {
//     case "ingredients":
//       array = ingredientsArray;
//       tags = ingredientsTags;
//       filter = ingredientsFilter;
//       ingredientsTags.push(itemString);
//       itemString = eventIngredient.target.innerText; // Crée une variable contenant le texte de l'item cliqué
//       filter.classList.add("ingredients-filter");
//       recipeFilter(eventIngredient, "tag");
//       ingredientsArray = ingredientsArray.filter(
//         (ingredient) => ingredient != itemString
//       ); // Supprime l'item de la liste des ingrédients
//       ingredientsInput.placeholder = `Ingrédients`;
//       displayList(ingredientsArray, string);
//       addAppliancesList(tagRecipes); // Actualise la liste des appareils
//       addUstensilslist(tagRecipes); // Actualise la liste des ustensiles
//       closeCard(searchCard[0]);
//       //   filter = document.createElement("div"); // Crée un élément div
//       //   filter.classList.add("item-filters"); // Ajoute les classes
//       //   filter.classList.add("active");
//       //   filter.innerHTML = `
//       //         <div class="filtered-item">${itemString}</div>
//       //         <i class="far fa-times-circle close-button"></i>
//       //         `; // Ajoute le texte de l'item cliqué dans le div
//       break;
//     case "appliances":
//       array = appliancesArray;
//       tags = appliancesTags;
//       filter = appliancesFilter;
//       appliancesTags.push(itemString);
//       itemString = eventAppliance.target.innerText; // Crée une variable contenant le texte de l'item cliqué filter = document.createElement("div"); // Crée un élément div
//       filter.classList.add("appliances-filter");
//       recipeFilter(eventAppliance, "tag");
//       appliancesArray = appliancesArray.filter(
//         (appliance) => appliance != itemString
//       ); // Supprime l'item de la liste des appareils
//       appliancesInput.placeholder = `Appareils`;
//       displayList(appliancesArray, string);
//       addIngredientsList(tagRecipes);
//       addUstensilslist(tagRecipes);
//       closeCard(searchCard[1]);
//       //   filter = document.createElement("div"); // Crée un élément div
//       //   filter.classList.add("item-filters"); // Ajoute les classes
//       //   filter.classList.add("active");
//       //   filter.innerHTML = `
//       // 		<div class="filtered-item">${itemString}</div>
//       // 		<i class="far fa-times-circle close-button"></i>
//       // 		`; // Ajoute le texte de l'item cliqué dans le div
//       break;
//     case "ustensils":
//       array = ustensilsArray;
//       tags = ustensilsTags;
//       filter = ustensilsFilter;
//       ustensilsTags.push(itemString);
//       itemString = eventUstensil.target.innerText; // Crée une variable contenant le texte de l'item cliqué filter = document.createElement("div"); // Crée un élément div
//       filter.classList.add("ustensils-filter");
//       recipeFilter(eventUstensil, "tag");
//       ustensilsArray = ustensilsArray.filter(
//         (ustensil) => ustensil != itemString
//       ); // Supprime l'item de la liste des ustensiles
//       ustensilsInput.placeholder = `Ustensiles`;
//       displayList(ustensilsArray, string);
//       addIngredientsList(tagRecipes);
//       addAppliancesList(tagRecipes);
//       closeCard(searchCard[2]);
//       //   filter = document.createElement("div"); // Crée un élément div
//       //   filter.classList.add("item-filters"); // Ajoute les classes
//       //   filter.classList.add("active");
//       //   filter.innerHTML = `
//       // 		<div class="filtered-item">${itemString}</div>
//       // 		<i class="far fa-times-circle close-button"></i>
//       // 		`; // Ajoute le texte de l'item cliqué dans le div
//       break;
//   }
//   filter = document.createElement("div"); // Crée un élément div
//   filter.classList.add("item-filters"); // Ajoute les classes
//   filter.classList.add("active");
//   filter.innerHTML = `
// 			<div class="filtered-item">${itemString}</div>
// 			<i class="far fa-times-circle close-button"></i>
// 			`; // Ajoute le texte de l'item cliqué dans le div

//   filters.appendChild(filter); // Ajoute le div dans la div filters
//   selectedTags.push(itemString); // Ajoute le texte de l'item cliqué dans le tableau selectedTags
//   //   tags.push(itemString); // Ajoute le texte de l'item cliqué dans le tableau tags
//   //   recipeFilter(event, "tag");
//   //   array = array.filter((item) => item !== itemString); // Supprime l'item cliqué du tableau array
//   //   displayList(array, string);
//   //   addAppliancesList(tagRecipes);
//   //   addUstensilsList(tagRecipes);
//   closeFilter();
//   //   closeCard(searchCard[0]);
//   //   closeCard(searchCard[1]);
//   closeCard(searchCard[2]);
// }

// Fermeture des cards ouvertes
function closeCard(searchCard) {
  searchCard[0].classList.remove("active");
  searchCard[1].classList.remove("active");
  searchCard[2].classList.remove("active");
}
// function addTags(event, string) {
//   let itemString;
//   let filter;
//   let tags;

//   let array;
//   switch (string) {
//     case "ingredients":
//       array = ingredientsArray;
//       tags = ingredientsTags;
//       filter = ingredientsFilter;
//       itemString = eventIngredient.target.innerText; // Crée une variable contenant le texte de l'item cliqué
//       filter.classList.add("ingredients-filter");
//       ingredientsInput.placeholder = `Ingrédients`;
//       //   filter = document.createElement("div"); // Crée un élément div
//       //   filter.classList.add("item-filters"); // Ajoute les classes
//       //   filter.classList.add("active");
//       //   filter.innerHTML = `
//       //         <div class="filtered-item">${itemString}</div>
//       //         <i class="far fa-times-circle close-button"></i>
//       //         `; // Ajoute le texte de l'item cliqué dans le div
//       break;
//     case "appliances":
//       array = appliancesArray;
//       tags = appliancesTags;
//       filter = appliancesFilter;
//       itemString = eventAppliance.target.innerText; // Crée une variable contenant le texte de l'item cliqué filter = document.createElement("div"); // Crée un élément div
//       filter.classList.add("appliances-filter");
//       appliancesInput.placeholder = `Appareils`;
//       //   filter = document.createElement("div"); // Crée un élément div
//       //   filter.classList.add("item-filters"); // Ajoute les classes
//       //   filter.classList.add("active");
//       //   filter.innerHTML = `
//       // 		<div class="filtered-item">${itemString}</div>
//       // 		<i class="far fa-times-circle close-button"></i>
//       // 		`; // Ajoute le texte de l'item cliqué dans le div
//       break;
//     case "ustensils":
//       array = ustensilsArray;
//       tags = ustensilsTags;
//       filter = ustensilsFilter;
//       itemString = eventUstensil.target.innerText; // Crée une variable contenant le texte de l'item cliqué filter = document.createElement("div"); // Crée un élément div
//       filter.classList.add("ustensils-filter");
//       ustensilsInput.placeholder = `Ustensiles`;
//       //   filter = document.createElement("div"); // Crée un élément div
//       //   filter.classList.add("item-filters"); // Ajoute les classes
//       //   filter.classList.add("active");
//       //   filter.innerHTML = `
//       // 		<div class="filtered-item">${itemString}</div>
//       // 		<i class="far fa-times-circle close-button"></i>
//       // 		`; // Ajoute le texte de l'item cliqué dans le div
//       break;
//   }
//   filter = document.createElement("div"); // Crée un élément div
//   filter.classList.add("item-filters"); // Ajoute les classes
//   filter.classList.add("active");
//   filter.innerHTML = `
// 		<div class="filtered-item">${itemString}</div>
// 		<i class="far fa-times-circle close-button"></i>
// 		`; // Ajoute le texte de l'item cliqué dans le div

//   filters.appendChild(filter); // Ajoute le div dans la div filters
//   selectedTags.push(itemString); // Ajoute le texte de l'item cliqué dans le tableau selectedTags
//   //   tags.push(itemString); // Ajoute le texte de l'item cliqué dans le tableau tags
//   recipeFilter(event, "tag");
//   array = array.filter((item) => item !== itemString); // Supprime l'item cliqué du tableau array
//   displayList(array, string);
//   addAppliancesList(tagRecipes);
//   addUstensilsList(tagRecipes);
//   closeFilter();
//   closeCard(searchCard[0]);
//   closeCard(searchCard[1]);
//   closeCard(searchCard[2]);
// }
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
// function addList(array ,string) {
//     let arraylist;
//     let Ul;
//     switch (string) {
//         case "ingredients":
//             arraylist = ingredientsArray;
//             Ul = ingredientsUl;
//             break;
//         case "appliances":
//             arraylist = appliancesArray;
//             Ul = appliancesUl;
//             break;
//         case "ustensils":
//             arraylist = ustensilsArray;
//             Ul = ustensilsUl;
//             break;
//     }
//     Ul.innerHTML = "";
//     arraylist = array.reduce((arraylist, recipe) => {
//         return [...arraylist, ...recipe[string]];
//     })
// }
// }
//  function newList(array, string) {
//     Ul.innerHTML = "";
//     let functionArray = array.reduce((functionArray, recipe) => {
//         return [...functionArray, ...recipe[string]];
//     }, []);
//     functionArray = functionArray.filter(
//         (e,i) => functionArray.indexOf(e) === i
//     );
//     createList(functionArray, string);
//     return functionArray;
// }

// function filter(array, string) {
//   switch (string) {
//     case "ingredients":
//       HTMLString = ingredientsHTMLString;
//       Ul = ingredientsUl;
//       input = ingredientsInput;
//       searchCard = searchCard[0];
//       listArray = ingredientsArray;
//       addList = addIngredientsList(recipes);
//       break;
//     case "appliances":
//       HTMLString = appliancesHTMLString;
//       Ul = appliancesUl;
//       input = appliancesInput;
//       searchCard = searchCard[1];
//       listArray = appliancesArray;
//       addList = addAppliancesList(recipes);
//       break;
//     case "ustensils":
//       HTMLString = ustensilsHTMLString;
//       Ul = ustensilsUl;
//       input = ustensilsInput;
//       searchCard = searchCard[2];
//       listArray = ustensilsArray;
//       addList = addUstensilslist(recipes);
//       break;
//   }
//   console.log(listArray);
//   console.log(HTMLString);

//   if (input.value.length >= 3) {
//     if (!searchCard.classList.contains("active")) {
//       searchCard.classList.add("active");
//     }
//     let research = input.value.toLowerCase();
//     listArray = listArray.toLowerCase.filter((item) =>
//       item.toLowerCase().includes(research)
//     );
//     displayList(listArray, string);
//   } else {
//     addList;
//     Ul.innerHTML = HTMLString.join("") || "";
//   }
//   addFiltered(string);
// }

// function addFiltered(string) {
//     let result = document.querySelectorAll(`.`+ string + `-result`);
//     result.forEach((element) => {
//         if (string === "ingredients") {
//             element.removeEventListener("click", addIngredient);
//             element.addEventListener("click", addIngredient);
//         }
//         if (string === "appliances") {
//             element.removeEventListener("click", addAppliance);
//             element.addEventListener("click", addAppliance);
//         }
//         if (string === "ustensils") {
//             element.removeEventListener("click", addUstensil);
//             element.addEventListener("click", addUstensil);
//         }
//     });
//}

// }

function inputFilter(string) {
  let input;
  let searchCard;
  let listArray;
  let addList;
  let Ul;
  switch (string) {
    case "ingredients":
      input = ingredientsInput;
      searchCard = searchCard[0];
      listArray = ingredientsArray;
      addList = addIngredientsList(recipes);
      Ul = ingredientsUl;
      break;
    case "appliances":
      input = appliancesInput;
      searchCard = searchCard[1];
      listArray = appliancesArray;
      addList = addAppliancesList(recipes);
      Ul = appliancesUl;
      break;
    case "ustensils":
      input = ustensilsInput;
      searchCard = searchCard[2];
      listArray = ustensilsArray;
      addList = addUstensilslist(recipes);
      Ul = ustensilsUl;
      break;
  }
  if (input.value.length >= 3) {
    if (!searchCard.classList.contains("active")) {
      searchCard.classList.add("active");
    }
    let research = input.value.toLowerCase();
    listArray = listArray.toLowerCase.filter((item) =>
      item.toLowerCase().includes(research)
    );
    displayList(listArray, string);
  } else {
    addList;
    Ul.innerHTML = HTMLString.join("") || "";
  }
  // addFiltered(string);
  addFilteredIngredient();
  addFilteredAppliance();
  addFilteredUstensil();
}
