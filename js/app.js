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

// modal window
const modalCloseIcon = document.getElementById('modal');

// star rating
const starRating = document.getElementsByClassName('stars')[0].children;
const starRatingModal = document.getElementsByClassName('stars')[1].children;

// variables for game timer
let initialTime;
let finalTime;
let displayTime = document.getElementsByClassName('timer')[0];
let timer;

// variable for counting clicks
let clicksCount = "";
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

    // put clicked card in openCards array
    openCards.push(this);
    countMoves();

    // evaluate cards in openCards array and check for match
    if (openCards.length == 2) {

        // disable clicks on all cards until match / unmatch function runs
        for (let i = 0; i <= initialArray.length - 1; i++) {
           listOfCards[i].classList.add('no-click');
        }

        // evaluate open cards for match / no match
        if (openCards[0].firstElementChild.classList.toString() === openCards[1].firstElementChild.classList.toString() ) {
	    	cardsMatch();
	    } else {
            // add no-match animation
	    	openCards[0].classList.add('no-match');
    		openCards[1].classList.add('no-match');

    		// run cardsUnmatch function after 0.5s
    		setTimeout(function() {
    			cardsUnmatch();
    		}, 500);
	    }
    }
};

// add event listener to each card
for (let i = 0; i < listOfCards.length; i++) {
    listOfCards[i].addEventListener('click', onCardClick, false);
}

// if clicked cards are a match, this function is run
function cardsMatch() {

    // add match class
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');

    // allow clicks again & remove 'open', 'show' classes
    for (let i = 0; i <= initialArray.length - 1; i++) {
    	listOfCards[i].classList.remove('no-click', 'open', 'show');
    }

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

    // allow clicks again & hide unmatched cards
    for (let i = 0; i <= initialArray.length - 1; i++) {
    	listOfCards[i].classList.remove('no-click', 'open', 'show', 'no-match');
    }

    // empty openCards array
    openCards = [];
}

// close modal when clicking X icon
function closeModal() {
	modalCloseIcon.style.display = 'none';
}

// count the number of moves
function countMoves() {
    clicksCount++;
    movesCount.innerHTML = clicksCount;

    // when game starts, get initial time
    if (clicksCount == 1) {
        gameTimer();
    }

    // hide stars if clicks go beyond a certain value
    if (clicksCount > 25 && clicksCount < 35) {
        starRating[0].style.display = 'none';
        starRatingModal[0].style.display = 'none';
    } else if (clicksCount >= 35) {
        starRating[0].style.display = 'none';
        starRating[1].style.display = 'none';
        starRatingModal[0].style.display = 'none';
        starRatingModal[1].style.display = 'none';
    }
}

// game timer
function gameTimer() {
    initialTime = new Date().getTime();

    timer = setInterval(function() {
        finalTime = new Date().getTime();
        timeDiff = finalTime - initialTime;

        let mins = Math.floor((timeDiff % (1000 * 60 *60)) / (1000 * 60));
        let secs = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // display time value in modal
        modalTime = mins + ' mins ' + secs + ' secs ';

        // format time if values are single digit
        if (secs < 10) {
            secs = '0' + secs;
        }

        if (mins < 10) {
            mins = '0' + mins;
        }

        displayTime.innerHTML = mins + ':' + secs;;
    }, 500);
}

// display modal
function congratulations() {
    const newModalRow = document.getElementsByClassName('row')[0];

    // create p element, add styling, display text, number of moves and time
    const modalParagrahText = document.createElement('p');
    modalParagrahText.setAttribute('id', 'modal-text');

    modalParagrahText.innerHTML = "You finished the game in " + clicksCount + " moves. Your time is: " + modalTime;

    // add p element to the div with class 'row'
    newModalRow.appendChild(modalParagrahText);

    // stop timer
    clearTimeout(timer);

    //display modal window
    modalCloseIcon.style.display = 'block';
}
