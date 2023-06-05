const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");
const newgameBtn = document.querySelector("#new");
const boardEl = document.querySelector("#board");
const victoryDialog = document.querySelector("#victory-dialog")

let icons = [];
let selectedCards = [];
let difficulty;

let correctCardCount = 0;

const difficulties = {
  "easy" : 16,
  "medium": 24,
  "hard": 32
}

const setIcon = () => {
  icons = [
  '<img src="./assets/aftershock.svg" class="valorant-logo"/>',
  '<img src="./assets/barrier-orb.svg" class="valorant-logo"/>',
  '<img src="./assets/blade-storm.svg" class="valorant-logo"/>',
  '<img src="./assets/blast-pack.svg" class="valorant-logo"/>',
  '<img src="./assets/blaze.svg" class="valorant-logo"/>',
  '<img src="./assets/boom-bot.svg" class="valorant-logo"/>',
  '<img src="./assets/cloudburst.svg" class="valorant-logo"/>',
  '<img src="./assets/curveball.svg" class="valorant-logo"/>',
  '<img src="./assets/cyber-cage.svg" class="valorant-logo"/>',
  '<img src="./assets/dark-cover.svg" class="valorant-logo"/>',
  '<img src="./assets/fault-line.svg" class="valorant-logo"/>',
  '<img src="./assets/flashpoint.svg" class="valorant-logo"/>',
  ];
}
const memotestTile = (icon, i) => {
  return `
  <div class="card-area" onclick="selectCard(${i})">
      <div class="card" id="card${i}">
          <div class="front-face back-face" id="back-face${i}">
              ${icon}
          </div>
          <div class="front-face superior">
            ?
          </div>
      </div>
  </div>        
  `
}

const generateBoard = (level) => {
  setIcon();
  selectedCards = [];
  let cards = [];
  for (let i = 0; i < level; i++) {
    cards.push(memotestTile(icons[0], i));
        
    if (i % 2 == 1) {
      icons.splice(0, 1);
    }
  }

  cards.sort(() => Math.random() - 0.5);
  boardEl.innerHTML = cards.join(" ");

  boardEl.addEventListener('animationstart', () => {
  boardEl.classList.add('no-click');
  });

  boardEl.addEventListener('animationend', () => {
    boardEl.classList.remove('no-click');
  });
}

const selectCard = (i) => {
  const card = document.getElementById("card" + i);
  if (card.style.transform != "rotateY(180deg)") {
    card.style.transform = "rotateY(180deg)";
    selectedCards.push(i);
  }
  if (selectedCards.length == 2) {
    unselect(selectedCards);
    selectedCards = [];
  }
}

newgameBtn.addEventListener("click", () => {
  easyBtn.style.display = "block" 
  mediumBtn.style.display = "block";
  hardBtn.style.display = "block";
  newgameBtn.style.display = "none";

})

easyBtn.addEventListener("click", (event) => {
  difficulty = difficulties[event.target.id];
  generateBoard(difficulty);
  easyBtn.style.display = "none" 
  mediumBtn.style.display = "none";
  hardBtn.style.display = "none";
  newgameBtn.style.display = "block";

})

mediumBtn.addEventListener("click", (event) => {
  difficulty = difficulties[event.target.id]
  generateBoard(difficulty);
  easyBtn.style.display = "none" 
  mediumBtn.style.display = "none";
  hardBtn.style.display = "none";
  newgameBtn.style.display = "block";

})

hardBtn.addEventListener("click", (event) => {
  difficulty = difficulties[event.target.id]
  generateBoard(difficulty);
  easyBtn.style.display = "none" 
  mediumBtn.style.display = "none";
  hardBtn.style.display = "none";
  newgameBtn.style.display = "block";
})

function unselect(select) {
  setTimeout(() => {
    const firstBackface = document.getElementById("back-face" + select[0]);
    const secondBackface = document.getElementById("back-face" + select[1]);
    if (firstBackface.innerHTML != secondBackface.innerHTML) {
      const firstCard = document.getElementById("card" + select[0]);
      const secondCard = document.getElementById("card" + select[1]);
      firstCard.style.transform = "rotateY(0deg)";
      secondCard.style.transform = "rotateY(0deg)";
    } else {
      firstBackface.style.background = "#10b981";
      secondBackface.style.background = "#10b981";
      correctCardCount++
    }
   
    if(correctCardCount === difficulty / 2) {
      let clicked = false
      victoryDialog.showModal();
      window.addEventListener("click", () => {
        victoryDialog.close();
        clicked = true
      })

      if(clicked) {
        window.removeEventListener("click", () => {
          victoryDialog.close();
          clicked = true
        })
      }
      
    }
  
  }, 1000);
}
