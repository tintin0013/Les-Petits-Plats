const searchbarInput = document.getElementById("search");

// function ingredientsFilter() {
//   if (ingredientsInput.value.length >= 3) {
//     // À partir de 3 caractères
//     if (!searchCard[0].classList.contains("active")) {
//       // Si la liste n'est pas affichée
//       searchCard[0].classList.add("active"); // Ouvre la liste
//     }
//     let research = ingredientsInput.value.toLowerCase(); // Récupère le résultat de la recherche
//     ingredientsArray = ingredientsArray.filter((ingredient) =>
//       ingredient.toLowerCase().includes(research)
//     );
//     displayList(ingredientsArray, "ingredients"); // Affiche la liste
//   } else {
//     // Si la recherche comprend moins de 3 caractères
//     addIngredientsList(tagRecipes);
//     ingredientsUl.innerHTML = ingredientsHTMLString || ""; // Affichage complet de la liste
//   }
//   addFiltered("ingredients");
// }

// function addFiltered(string) {
//   let result = document.querySelectorAll(`.` + string + `-result`);
//   switch (string) {
//     case "ingredients":
//       result.forEach((element) => {
//         element.removeEventListener("click", addTags("ingredients"));
//         element.addEventListener("click", addTags("ingredients"));
//       });
//       break;
//     case "appliances":
//       result.forEach((element) => {
//         element.removeEventListener("click", addTags("appliances"));
//         element.addEventListener("click", addTags("appliances"));
//       });
//       break;
//     case "ustensils":
//       result.forEach((element) => {
//         element.removeEventListener("click", addTags("ustensils"));
//         element.addEventListener("click", addTags("ustensils"));
//       });
//   }
// }

// function recipeResearch(array, inputValue) {
//   array.forEach((element) => {
//     let research = inputValue.toLowerCase();
//     if (!element.html.toLowerCase().includes(research)) {
//       //   tagArray = tagArray.filter((item) => item != element.html);
//       tagRecipes = tagRecipes.filter((item) => item != element.recipe);
//     }
//   });
//   return array;
// }

// function recipeFilter(event, mode = "search") {
//   if (mode == "search") {
//     searchbarReseach(searchbarInput);
//   }
//   addFiltered("ingredient");
//   addFiltered("appliance");
//   addFiltered("ustensil");
// }

// function searchbarReseach(searchbarInput) {
//   let inputValue = searchbarInput.value;
//   //   console.log(inputValue);
//   if (inputValue.length >= 3) {
//     console.log("ok");
//     // À partir de 3 caractères
//     // if (selectedTags.length > 0) {
//     //   // Si une recherche par tag a été faite
//     //   recipeResearch(newRecipeArray, inputValue); // Recherche à partir des recettes filtrées par tag
//     // }
//     // else {
//     //
//     // Si aucun filtrage
//     recipeResearch(recipeArray, inputValue); // Recherche à partir de toutes les recettes
//     recipesContainer.innerHTML = tagRecipes.join(" ");
//     // }
//     // if (tagArray.length === 0) {
//     //   // Si aucune recette n'a été mise dans le tableau
//     //   recipesContainer.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
//     // } else {
//     //   // Sinon (si au moins une recette correspond)
//     //   recipesContainer.innerHTML = tagArray.join(" ");
//     // }
//     addIngredientsList(tagRecipes);
//     addAppliancesList(tagRecipes);
//     addUstensilslist(tagRecipes);
//   }
//   //    else {
//   //     // Si l'input comprend moins de 3 caractères
//   //     if (selectedTags.length > 0) {
//   //       tagResearch(recipeArray); // Recherche à partir de toutes les recettes
//   //       if (tagArray.length === 0) {
//   //         // Si aucune recette n'a été mise dans le tableau
//   //         recipesContainer.innerHTML = `Aucune recette ne correspond à votre critère... Vous pouvez chercher  « tarte aux pommes », « poisson », etc.`;
//   //       } else {
//   //         // Sinon (si au moins une recette correspond)
//   //         recipesContainer.innerHTML = tagArray.join(" ");
//   //       }
//   //       addIngredientsList(tagRecipes); // Actualise la liste des ingrédients
//   //       addAppliancesList(tagRecipes); // Actualise la liste des appareils
//   //       addUstensilslist(tagRecipes); // Actualise la liste des ustensiles
//   //     } else {
//   //       recipesContainer.innerHTML = recipeHTMLString; // Affichage de toutes les recettes
//   //     }

//   //     newIngredientsList(recipeArray);
//   //     addAppliancesList(recipeArray);
//   //     addUstensilslist(recipeArray);
//   //   }
// }

function closeFilter() {
  // Fermeture des div des items filtrés
  const closeButton = document.querySelectorAll(".close-button"); // Croix de fermeture des items filtrés
  closeButton.forEach((element) => {
    // Itère sur chaque croix
    element.addEventListener("click", removeActive); // Ferme le bouton
  });
}
