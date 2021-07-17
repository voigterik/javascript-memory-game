const cardsArray = [
    {
        'name': 'CSS',
        'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',
    },
    {
        'name': 'HTML',
        'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',
    },
    {
        'name': 'jQuery',
        'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',
    },
    {
        'name': 'JS',
        'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',
    },
    {
        'name': 'Node',
        'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',
    },
    {
        'name': 'Photo Shop',
        'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',
    },
    {
        'name': 'PHP',
        'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',
    },
    {
        'name': 'Python',
        'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',
    },
    {
        'name': 'Ruby',
        'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',
    },
    {
        'name': 'Sass',
        'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',
    },
    {
        'name': 'Sublime',
        'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',
    },
    {
        'name': 'Wordpress',
        'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',
    },
];

// click counter and storage for clicked elements
let clickCounter = 0;
let firstChoice = "";
let secondChoice = "";
const reset = document.querySelector(".js-reset-button");

const gameArray = cardsArray.concat(cardsArray);
gameArray.sort(() => Math.random() - 0.5);

const board = document.querySelector(".js-board");

// go through all objects in cardsArray
gameArray.forEach(function (item) {

    // create card
    const card = document.createElement("div");
    card.classList.add("js-card", "e-card");
    card.dataset.name = item.name;
    //    card.setAttribute("data-name", item.name);

    // create img and set src
    const logo = document.createElement("img");
    logo.src = item.img;
    logo.classList.add("e-logo");

    card.appendChild(logo);
    board.appendChild(card);
});

const cards = document.querySelectorAll(".js-card");
const compareCards = (card) => {
    
    clickCounter++;
    console.log("global counter", clickCounter);
    
    // limit to 2 clicks
    if(clickCounter <= 2){
        
        // first click/card
        if(clickCounter === 1){
            console.log("click one");
            firstChoice = card.currentTarget.getAttribute("data-name");
            card.currentTarget.classList.add("m-selected");        
        } else {
            // second click/card
            console.log("click two");
            secondChoice = card.currentTarget.getAttribute("data-name");
            card.currentTarget.classList.add("m-selected");
            
            // compare cards
            if (firstChoice !== "" && secondChoice !== "") {
                
                // if match
                if (firstChoice === secondChoice) {
                    setTimeout(function(){
                        matched(card);
                        clickCounter = 0;
                    }, 2000);
                    
                } else {
                    // no match - reset click counter & remove selected style
                    setTimeout(function(){
                        const selected = board.querySelectorAll(".m-selected");
                        noMatch(selected);
                        clickCounter = 0;
                    },2000);
                }
            } 
        }
    } else {        
        clickCounter = 0;
    }                    
}

// apply styles when match
const matched = (items) => {
    cards.forEach(item => {
        if (item.classList.contains("m-selected")) {
            item.classList.remove("m-selected");
            item.classList.add("m-match");            
        }

    });
}

// apply styles when no match
const noMatch = (items) => {
    cards.forEach(item => {
        if (item.classList.contains("m-selected")) {
            item.classList.remove("m-selected");
        }
    });
}

// compare clicked cards
cards.forEach(card => {
    card.addEventListener("click", compareCards);
});

// reset game
reset.addEventListener("click", function(){
    cards.forEach(card => {
        card.classList.remove("m-selected", "m-match");
        clickCounter = 0;
    });
});

