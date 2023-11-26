// créer une carte en html
function createCard(CardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = `${CardUrl}`;
    card.appendChild(cardContent);
    card.addEventListener('click', onCardClick);
    return card;
}

//variable pour récupérer notre tableau de jeu
const gameBoard = document.getElementById('game-board-js');

// Créer un tableau regroupant les données : 8 cartes
const cards = [
    'https://picsum.photos/id/237/600/350', 
    'https://picsum.photos/id/238/600/350',
    'https://picsum.photos/id/239/600/350',
    'https://picsum.photos/id/240/600/350',
    'https://picsum.photos/id/241/600/350',
    'https://picsum.photos/id/242/600/350',
    'https://picsum.photos/id/243/600/350',
    'https://picsum.photos/id/244/600/350'
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
function onCardClick(e){
    const card = e.target.parentElement;
    card.classList.add("flip");
}

