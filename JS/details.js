import { GameUIHandler } from "./ui.js";

export class Details {
    constructor(gameId) {
        this.gameUIHandler = new GameUIHandler();
        this.apiKey = '933fcc043emsh49e8ff6c11b8a80p10535bjsnd6f5ff101a99';
        this.apiHost = 'free-to-play-games-database.p.rapidapi.com';

        this.initializeEventListeners();
        this.fetchAndDisplayGameDetails(gameId);
    }

    initializeEventListeners() {
        const detailsSection = document.querySelector(".details");

        if (detailsSection) {
            detailsSection.addEventListener("click", (event) => {
                if (event.target.id === "btnClose") {
                    this.toggleSectionVisibility(".games", true);
                    this.toggleSectionVisibility(".details", false);
                }
            });
        }
    }

    async fetchAndDisplayGameDetails(gameId) {
        this.toggleSectionVisibility(".loading", true);

        try {
            const gameData = await this.fetchGameDetailsFromAPI(gameId);
            this.gameUIHandler.showGameDetails(gameData);
        } catch (error) {
            console.error("Error while fetching game details:", error);
            alert("An error occurred while loading the details. Please try again later.");
        } finally {
            this.toggleSectionVisibility(".loading", false);
        }
    }

    async fetchGameDetailsFromAPI(gameId) {
        const apiURL = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;

        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.apiKey,
                'x-rapidapi-host': this.apiHost
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch game details. Status: ${response.status}`);
        }

        return await response.json();
    }

    toggleSectionVisibility(selector, shouldShow) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.toggle("d-none", !shouldShow);
        }
    }
}
