// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// variable for counting clicks
let clicksCount = 0;
const movesCount = document.getElementsByClassName('moves')[0];


// variable for counting the number of correct pairs
let correctPairs = 0;

// initial array with Font Awesome icons
const initialArray = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle'];

// suffle initialArray
let finalArray = shuffle(initialArray);

// array for storing cards that were clicked
let openCards = [];

// create ul list and add 'deck' class
const list = document.createElement('ul');
list.classList.add('deck');

// create li elements and add 'card' class
for (let i = 0; i <= initialArray.length - 1; i++) {
    const newElement = document.createElement('li');
    newElement.classList.add('card');

    // create i element inside each li and assign class from finalArray
    const newIcon = document.createElement('i');
    newIcon.classList.add('fa', finalArray[i]);

    // add i element to li
    newElement.appendChild(newIcon);

    // add li element to ul
    list.appendChild(newElement);
}

// select div and add ul list to it
const main = document.getElementById('game');
main.appendChild(list);

// reload page and/or reset game when reset icon is clicked
function reloadPage() {
    window.location.reload(true);
}

// get all cards
const listOfCards = document.getElementsByClassName('card');

// show cards when clicked
const onCardClick = function () {

	// check if card was already clicked or matched
	if (this.classList.contains('open') || this.classList.contains('match')) {
		return; // jump out of the function if class 'open' or 'match' are present
	}

	// if card was not clicked or matched, show card
    this.classList.add('open', 'show');

    // if array already contains 2 items and unmatch them
    if (openCards.length == 2) {
    	cardsUnmatch();
    }

    // put clicked card in openCards array
    openCards.push(this);
    countMoves();

    // evaluate cards in openCards array and check for match
    if (openCards.length == 2) {
	    if (openCards[0].firstElementChild.classList.toString() === openCards[1].firstElementChild.classList.toString() ) {
	    	cardsMatch();
	    } else {
	    	// add no-match animation
	    	openCards[0].classList.add('no-match');
    		openCards[1].classList.add('no-match');

    		// run cardsUnmatch function after 0.7s
    		setTimeout(function() {
    			cardsUnmatch();
    		}, 700);
	    }
	}
};

// add event listener to each card
for (let i = 0; i < listOfCards.length; i++) {
    listOfCards[i].addEventListener('click', onCardClick, false);
}

// if clicked cards are a match, this function is run
function cardsMatch() {

	// add match class & remove 'open', 'show' classes
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');

    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');

    // empty openCards array
    openCards = [];

    // count the number of card pairs matched
    correctPairs++

    // if all cards are matched, show this success message
    if (correctPairs == initialArray.length / 2) {
    	congratulations();
    }
}

// if clicked cards don't match, this function runs
function cardsUnmatch() {

	// hide cards that were clicked
	openCards[0].classList.remove('open', 'show', 'no-match');
	openCards[1].classList.remove('open', 'show', 'no-match');

	// empty openCards array
	openCards = [];
}

const modalCloseIcon = document.getElementById('modal');

// display modal
function congratulations() {
	const newModalRow = document.getElementsByClassName('row')[0];

	// create p element, add the styling ID and display text + total number of moves
	const modalParagrahText = document.createElement('p');
    modalParagrahText.setAttribute('id', 'modal-text');
    modalParagrahText.innerHTML = "It took you " + clicksCount + " moves to finish the game.";

    // add p element to the div with class 'row'
    newModalRow.appendChild(modalParagrahText);

    //display modal window
    modalCloseIcon.style.display = 'block';
}

// close modal when clicking X icon
function closeModal() {
	modalCloseIcon.style.display = 'none';
}

// count the number of moves
function countMoves() {
    clicksCount++;
    movesCount.innerHTML = clicksCount;
}