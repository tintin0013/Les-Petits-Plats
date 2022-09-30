import recipesData from "../data/recipesData.js";
import Recipe from "../factorie/recipe.js";
import templateFilter from "../templates/templateFilter.js";

const TYPE_FILTER = ["ingredients", "appliances", "ustensils"];
class Main {
  constructor() {
    // on initialise les variables
    this.recipes = recipesData.map((recipeData) => new Recipe(recipeData)); // on crée une liste de recettes
    this.filtreredRecipes = [...this.recipes]; // on crée une liste de recettes filtrées qui est une copie de la liste de recettes
    this.filters = {}; // objet contenant la liste des filtres
    this.selectedItems = {}; // objet contenant la liste des éléments sélectionnés
    this.elementSearch = {}; // objet contenant la  liste des éléments recherchés

    // pour chaque type de filtre
    // on initialise la liste des filtres
    // on initialise la liste des éléments sélectionnés
    // on initialise la liste des éléments recherchés
    // on initialise la recherche des listes de filtres
    TYPE_FILTER.forEach((element) => {
      this.filters[element] = [];
      this.selectedItems[element] = [];
      this.elementSearch[element] = "";
      // // console.log(element);
      this.initSearchElement(element);
      // // let test = `.${element}-search-icon`;
      // // console.log(test);
      //  // console.log(document.querySelector(test));
      // on récupère l'icône de recherche et on ajoute un écouteur d'événement
      document
        .querySelector(`.${element}-search-icon`)
        .addEventListener("click", (e) => {
          // si la carte de filtre contient la classe active, on supprime la classe active
          if (
            document
              .querySelector(`.${element}-card`)
              .classList.contains("active")
          ) {
            document
              .querySelector(`.${element}-card`)
              .classList.remove("active");
          }
          // sinon on ajoute la classe active et on affiche la liste des filtres
          else {
            document.querySelector(`.${element}-card`).classList.add("active");
            this.displayFilters(element);
          }
        });
    });

    //  ** EventListener search bar **

    // on récupère la valeur de la barre de recherche et si la recherche fait moins de 3 caractères, on ne filtre pas
    document.getElementById("search").addEventListener("input", (e) => {
      this.searchIput = e.target.value.length >= 3 ? e.target.value : "";
      this.filterRecipes(); // on filtre les recettes
      TYPE_FILTER.forEach((element) => this.displayFilters(element)); // on affiche la liste des filtres
    });

    this.displayRecipes(); // on affiche les recettes
  }

  // ** afichage des cartes de recettes **

  // on récupère le conteneur des recettes
  // on vide le conteneur
  // pour chaque recette filtrée
  // on ajoute la carte de recette au conteneur
  displayRecipes() {
    const recipesContainer = document.querySelector(".recipes");
    recipesContainer.innerHTML = "";
    this.filtreredRecipes.forEach((recipe) => {
      recipesContainer.appendChild(recipe.getCard());
    });
  }

  // ** filtre des recettes **

  // Récupération des données + création de la liste de données du filtre
  // on récupère la liste des filtres
  // on vide la liste des filtres
  // pour chaque recette filtrée
  // on récupère les éléments de la recette
  // pour chaque élément de la recette
  // si l'élément n'est pas dans la liste des filtres
  // on ajoute l'élément à la liste des filtres
  displayFilters(typeFilter) {
    //  // console.log(`.${typeFilter}-ul`);
    //  // console.log(document.querySelector(`#${typeFilter}-ul`));
    let filterUl = document.querySelector(`#${typeFilter}-ul`);
    this.filters[typeFilter] = [];
    this.filtreredRecipes.forEach((recipe) => {
      const elements = recipe.extractElements(typeFilter);
      elements.forEach((element) => {
        if (!this.filters[typeFilter].includes(element)) {
          this.filters[typeFilter].push(element);
        }
      });
    });
    // on trie la liste des filtres par ordre alphabétique
    // on filtre la liste des filtres en fonction de la recherche
    // on retourne l'élément en minuscule et  on ajoute l'élément à la liste des filtres si l'élément n'est pas dans la liste des éléments sélectionnés
    this.filters[typeFilter].sort();
    this.filters[typeFilter] = this.filters[typeFilter].filter((f) => {
      return (
        f
          .toLowerCase()
          .includes(this.elementSearch[typeFilter].toLowerCase()) &&
        !this.selectedItems[typeFilter].includes(f)
      );
    });
    //  // console.log(filterUl);
    // on vide la liste des filtres
    // pour chaque élément de la liste des filtres
    // on crée un élément li
    // on ajoute le nom de l'élément à l'élément li
    // on ajoute l'élément li à la liste des filtres
    // on ajoute un écouteur d'événement sur chaque element de la liste des filtres (li)
    // on ajoute l'élément sélectionné à la liste des éléments sélectionnés
    // on crée un tag pour l'élément sélectionné
    // on filtre les recettes
    // on supprime la classe active de la carte de filtre
    filterUl.innerHTML = "";
    this.filters[typeFilter].forEach((filter) => {
      const li = document.createElement("li");
      li.innerHTML = filter;
      filterUl.appendChild(li);
      li.addEventListener("click", (e) => {
        this.selectedItems[typeFilter].push(e.target.innerText);
        this.createtag(typeFilter, e.target.innerText);
        this.filterRecipes();
        document
          .querySelector(`.${typeFilter}-card`)
          .classList.remove("active");
      });
    });
  }
  // ** création des tags **

  // on crée un élément div pour le tag
  // on ajoute le template du tag a la div
  // on ajoute la classe du filtre a la div
  // on ajoute le nom de l'élément sélectionné a la div
  // on ajoute un écouteur d'événement sur le tag qui au clic supprime l'élément sélectionné (le tag) ) de la liste des éléments sélectionnés
  // on filtre les recettes
  // on ajoute le tag au conteneur des tags

  createtag(typeFilter, data) {
    //  // const data_class = data.replaceAll(" ", "-");
    const div = document.createElement("div");
    div.innerHTML = templateFilter;
    div.classList.add(`${typeFilter}-filter`);
    div.querySelector(".filter-name").innerText = data;
    div.addEventListener("click", (e) => {
      document.querySelector(`.filters`).removeChild(div);
      this.selectedItems[typeFilter] = this.selectedItems[typeFilter].filter(
        (element) => element !== data
      );
      this.filterRecipes();
    });
    document.querySelector(`.filters`).appendChild(div);
  }

  // ** filtrage des recettes **

  // on récupère la barre de recherche
  // on ajoute un écouteur d'événement sur la barre de recherche
  // on récupère la valeur de la barre de recherche
  // on affiche les filtres
  initSearchElement(typeFilter) {
    //  // console.log(`.${typeFilter}-research-bar`);
    //  // console.log(document.querySelector(`.${typeFilter}-research-bar`));
    document
      .querySelector(`.${typeFilter}-research-bar`)
      .addEventListener("input", (e) => {
        this.elementSearch[typeFilter] = e.target.value;
        this.displayFilters(typeFilter);
      });
  }

  // ** Filtrage des recettes à l'activation d'un tag **

  // on récupère les éléments de la recette
  // on vérifie que les éléments de la recette correspondent aux éléments sélectionnés
  // on affiche les recettes filtrées
  // si il n'y a pas de recette filtrée
  // on affiche le message "pas de recette"
  // sinon on cache le message "pas de recette"
  filterRecipes() {
    this.filtreredRecipes = this.recipes.filter((recipe) =>
      recipe.matchingAllFilters(
        ...Object.values(this.selectedItems),
        this.searchIput
      )
    );
    this.displayRecipes();

    if (this.filtreredRecipes.length === 0) {
      document.querySelector(".no-recipe").classList.remove("hidden");
    } else {
      document.querySelector(".no-recipe").classList.add("hidden");
    }
  }
}

new Main();
