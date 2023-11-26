// créer une carte en html
function createCard(CardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;
    
    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = `${CardUrl}`;
    cardContent.style.borderRadius = "25px"
    
    card.appendChild(cardContent);
    card.addEventListener('click', onCardClick);
    return card;
}

//variable pour récupérer notre tableau de jeu
const gameBoard = document.getElementById('game-board-js');

// Créer un tableau regroupant les données : 8 cartes
const cards = [
    'https://picsum.photos/id/237/600/350?grayscale&blur=2', 
    'https://picsum.photos/id/238/600/350?grayscale&blur=2',
    'https://picsum.photos/id/239/600/350?grayscale&blur=2',
    'https://picsum.photos/id/240/600/350?grayscale&blur=2',
    'https://picsum.photos/id/241/600/350?grayscale&blur=2',
    'https://picsum.photos/id/242/600/350?grayscale&blur=2',
    'https://picsum.photos/id/243/600/350?grayscale&blur=2',
    'https://picsum.photos/id/244/600/350?grayscale&blur=2'
];

// créer une fonction qui va dupliquer les cartes
function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);
    return arrayDouble;
}

let allCards = duplicateArray(cards);

// créer une fonction qui va mélanger les cartes
function shuffleArray(arrayToshuffle){
    const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
    return arrayShuffled;
}

allCards = shuffleArray(allCards);

allCards.forEach(card => {
    const cardHtml = createCard(card);
    gameBoard.appendChild(cardHtml);
})

// lorsque l'on clique sur une carte, ça la retourne
// elle est conservée dans le tableau
// Lorsque l'on sélectionne 2  cartes :
// si elles sont identiques, elles sont conservées
// si elles sont différentes, elles sont retournées
let selectedCards = [];
function onCardClick(e){
    const card = e.target.parentElement;
    card.classList.add("flip");

    selectedCards.push(card);
    if (selectedCards.length === 2) {
        // rajouter un Timeout sinon les cartes disparaissent
        setTimeout(()=> {
            if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
                //on a trouvé une paire
                selectedCards[0].classList.add("matched");
                selectedCards[1].classList.add("matched");
                selectedCards[0].removeEventListener('click', onCardClick);
                selectedCards[1].removeEventListener('click', onCardClick);

                // Fin de partie
                // vérifier si ils restent des cartes "matched"
                const cardAllFind = document.querySelectorAll('.card:not(.matched)');
                if (cardAllFind.length == 0) {
                alert("Bravo, vous avez gagné!")
                }
            }
            else{
                //on s'est trompé
                selectedCards[0].classList.remove("flip");
                selectedCards[1].classList.remove("flip");
            }
            selectedCards = [];
        }, 1000
    
        )
    }    
}

