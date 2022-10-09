import recipesData from "../data/recipesData.js";
import Recipe from "../factorie/recipe.js";
import templateFilter from "../templates/templateFilter.js";

const TYPE_FILTER = ["ingredients", "appliances", "ustensils"];
class Main {
  constructor() {
    // on initialise les variables
    this.recipes = recipesData.map((recipeData) => new Recipe(recipeData)); // on crée une liste de recettes
    this.filteredRecipes = [...this.recipes]; // on crée une liste de recettes filtrées qui est une copie de la liste de recettes
    this.filters = {}; // objet contenant la liste des filtres
    this.selectedItems = {}; // objet contenant la liste des éléments sélectionnés
    this.elementSearch = {}; // objet contenant la  liste des éléments recherchés
    TYPE_FILTER.forEach((element) => {
      // pour chaque type de filtre
      this.filters[element] = []; // on initialise la liste des filtres
      this.selectedItems[element] = []; // on initialise la liste des éléments sélectionnés
      this.elementSearch[element] = ""; // on initialise la liste des éléments recherchés
      this.initSearchElement(element); // on initialise la recherche des listes de filtres
      // on récupère l'icône de recherche et on ajoute un écouteur d'événement
      let card = document.querySelector(`.${element}-card`);
      document
        .querySelector(`.${element}-search-icon`)
        .addEventListener("click", (e) => {
          // si la carte de filtre contient la classe active, on supprime la classe active
          card.classList.toggle("active");
          this.displayFilters(element);
        });
    });

    //  ** EventListener search bar **

    // on récupère la valeur de la barre de recherche et si la recherche fait moins de 3 caractères, on ne filtre pas
    document.getElementById("search").addEventListener("input", (e) => {
      this.searchInput = e.target.value.length >= 3 ? e.target.value : "";
      this.filterRecipes(); // on filtre les recettes
      TYPE_FILTER.forEach((element) => this.displayFilters(element)); // on affiche la liste des filtres
    });

    this.displayRecipes(); // on affiche les recettes
  }

  // ** afichage des cartes de recettes **

  displayRecipes() {
    const recipesContainer = document.querySelector(".recipes"); // on récupère le conteneur des recettes
    recipesContainer.innerHTML = ""; // on vide le conteneur
    this.filteredRecipes.forEach((recipe) => {
      // pour chaque recette filtrée
      recipesContainer.appendChild(recipe.getCard()); // on ajoute la carte de recette au conteneur
    });
  }

  // ** filtre des recettes **
  // ** Récupération des données + création de la liste de données du filtre

  displayFilters(typeFilter) {
    const filterUl = document.querySelector(`#${typeFilter}-ul`); // on récupère la liste des filtres
    this.filters[typeFilter] = []; // on vide la liste des filtres
    this.filteredRecipes.forEach((recipe) => {
      // pour chaque recette filtrée
      const elements = recipe.extractElements(typeFilter); // on récupère les éléments de la recette
      elements.forEach((element) => {
        // pour chaque élément de la recette
        if (!this.filters[typeFilter].includes(element)) {
          // si l'élément n'est pas dans la liste des filtres
          this.filters[typeFilter].push(element); // on ajoute l'élément à la liste des filtres
        }
      });
    });
    this.filters[typeFilter].sort(); // on trie la liste des filtres par ordre alphabétique
    this.filters[typeFilter] = this.filters[typeFilter].filter(
      // on filtre la liste des filtres en fonction de la recherche
      // on retourne l'élément en minuscule et on ajoute l'élément à la liste des filtres si l'élément n'est pas dans la liste des éléments sélectionnés
      (f) =>
        f
          .toLowerCase()
          .includes(this.elementSearch[typeFilter].toLowerCase()) &&
        !this.selectedItems[typeFilter].includes(f)
    );
    filterUl.innerHTML = ""; // on vide la liste des filtres
    this.filters[typeFilter].forEach((filter) => {
      // pour chaque élément de la liste des filtres
      const li = document.createElement("li"); // on crée un élément li
      li.innerHTML = filter; // on ajoute le nom de l'élément à l'élément li
      filterUl.appendChild(li); // on ajoute l'élément li à la liste des filtres
      li.addEventListener("click", (e) => {
        // on ajoute un écouteur d'événement sur chaque element de la liste des filtres (li)
        this.selectedItems[typeFilter].push(e.target.innerText); // on ajoute l'élément sélectionné à la liste des éléments sélectionnés
        this.createtag(typeFilter, e.target.innerText); // on crée un tag pour l'élément sélectionné
        this.filterRecipes(); // on filtre les recettes
        document
          .querySelector(`.${typeFilter}-card`) // on supprime la classe active de la carte de filtre
          .classList.remove("active");
      });
    });
  }
  // ** création des tags **

  createtag(typeFilter, data) {
    const div = document.createElement("div"); // on crée un élément div pour le tag
    const filters = document.querySelector(".filters"); // on récupère le conteneur des tags
    div.innerHTML = templateFilter; // on ajoute le template du tag à l'élément div
    div.classList.add(`${typeFilter}-filter`); // on ajoute la classe du filtre a la div
    div.querySelector(".filter-name").innerText = data; // on ajoute le nom de l'élément sélectionné a la div
    div.addEventListener("click", (e) => {
      // on ajoute un écouteur d'événement sur le tag qui au clic supprime l'élément sélectionné (le tag) ) de la liste des éléments sélectionnés
      filters.removeChild(div); // on supprime le tag
      this.selectedItems[typeFilter] = this.selectedItems[typeFilter].filter(
        // on supprime l'élément sélectionné de la liste des éléments sélectionnés
        (element) => element !== data
      );
      this.filterRecipes(); // on filtre les recettes
    });
    filters.appendChild(div); // on ajoute le tag au conteneur des tags
  }

  // ** filtrage des recettes **

  initSearchElement(typeFilter) {
    document
      .querySelector(`.${typeFilter}-research-bar`) // on récupère la barre de recherche
      .addEventListener("input", (e) => {
        // on ajoute un écouteur d'événement sur la barre de recherche
        this.elementSearch[typeFilter] = e.target.value; // on récupère la valeur de la barre de recherche
        this.displayFilters(typeFilter); // on affiche les filtres
      });
  }

  // ** Filtrage des recettes à l'activation d'un tag **

  // on récupère les éléments de la recette
  // on vérifie que les éléments de la recette correspondent aux éléments sélectionnés
  // on affiche les recettes filtrées
  filterRecipes() {
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.matchingAllFilters(
        ...Object.values(this.selectedItems),
        this.searchInput
      )
    );
    this.displayRecipes();
    if (this.filteredRecipes.length === 0) {
      // si il n'y a pas de recette filtrée
      // on affiche le message "pas de recette"
      // sinon on cache le message "pas de recette"
      document.querySelector(".no-recipe").classList.toggle("hidden");
    }
  }
}
new Main();
