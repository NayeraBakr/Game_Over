import { Details } from "./details.js";
import { GameUIHandler } from "./ui.js";

export class Games {
    constructor() {
        this.userInterface = new GameUIHandler();

        this.setUpCategoryNavigation();
        this.loadGamesByCategory("mmorpg");
    }

    setUpCategoryNavigation() {
        const menuLinks = document.querySelectorAll(".menu a");

        menuLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                this.updateActiveCategory(event.target);
                const selectedCategory = event.target.dataset.category;
                this.loadGamesByCategory(selectedCategory);
            });
        });
    }

    updateActiveCategory(selectedLink) {
        const currentActive = document.querySelector(".menu .active");
        if (currentActive) {
            currentActive.classList.remove("active");
        }

        selectedLink.classList.add("active");
    }

    async loadGamesByCategory(categoryName) {
        this.toggleLoading(true);

        const apiSettings = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '933fcc043emsh49e8ff6c11b8a80p10535bjsnd6f5ff101a99',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const apiURL = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`;
            const response = await fetch(apiURL, apiSettings);
            const gamesData = await response.json();

            this.userInterface.renderGamesList(gamesData);
            this.enableGameSelection();
        } catch (error) {
            console.error("Failed to load games:", error);
            alert("An error occurred while retrieving the games. Please try again later.");
        } finally {
            this.toggleLoading(false);
        }
    }

    enableGameSelection() {
        const gamesContainer = document.querySelector(".games");

        gamesContainer.addEventListener("click", (event) => {
            const clickedCard = event.target.closest(".card");

            if (clickedCard) {
                const gameId = clickedCard.dataset.id;
                this.displayGameDetails(gameId);
            }
        });
    }

    displayGameDetails(gameId) {
        document.querySelector(".games").classList.add("d-none");
        document.querySelector(".details").classList.remove("d-none");

        new Details(gameId);
    }

    toggleLoading(show) {
        const loadingElement = document.querySelector(".loading");
        if (loadingElement) {
            loadingElement.classList.toggle("d-none", !show);
        }
    }
}
