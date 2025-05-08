export class GameUIHandler {
    createGameCard(game) {
        return `
          <div class="col">
             <div data-id="${game.id}" class="card h-100 bg-transparent" role="button">
                <div class="card-body">
                   <figure class="position-relative">
                      <img class="card-img-top object-fit-cover h-100" src="${game.thumbnail}" />
                   </figure>
                   <figcaption>
                      <div class="hstack justify-content-between">
                         <h3 class="h6 small">${game.title}</h3>
                         <span class="badge text-bg-primary p-2">Free</span>
                      </div>
                      <p class="card-text small text-center opacity-50">
                         ${game.short_description.split(" ", 8)}
                      </p>
                   </figcaption>
                </div>
                <footer class="card-footer small hstack justify-content-between">
                   <span class="badge badge-color">${game.genre}</span>
                   <span class="badge badge-color">${game.platform}</span>
                </footer>
             </div>
          </div>
       `;
    }

    renderGamesList(gameList) {
        const cardsHTML = gameList.map(this.createGameCard).join('');
        document.getElementById("gameData").innerHTML = cardsHTML;
    }

    showGameDetails(gameInfo) {
        const detailHTML = `
          <div class="col-md-4">
             <img src="${gameInfo.thumbnail}" class="w-100" alt="game thumbnail" />
          </div>
          <div class="col-md-8">
             <h3>Title: ${gameInfo.title}</h3>
             <p>Category: <span class="badge text-bg-info">${gameInfo.genre}</span></p>
             <p>Platform: <span class="badge text-bg-info">${gameInfo.platform}</span></p>
             <p>Status: <span class="badge text-bg-info">${gameInfo.status}</span></p>
             <p class="small">${gameInfo.description}</p>
             <a class="btn btn-outline-warning" target="_blank" href="${gameInfo.game_url}">Show Game</a>
          </div>
       `;
        document.getElementById("detailsContent").innerHTML = detailHTML;
    }
}
