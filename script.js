let boxes = document.querySelectorAll(".box");
 let resetBtn = document.querySelector("#reset-btn");
 let newGameBtn = document.querySelector("#new-btn");
 let winTie = document.querySelector("#winTie");
 let status = document.querySelector("#status");
 
 let turnO = true; //playerX, playerO
 let count = 0; //To Track Draw
 
 const winPatterns = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
 ];

 const resetGame = () => {
   turnO = true;
   count = 0;
   enableBoxes();
  document.getElementById('popupOverlay').style.display = 'none';
 };
 
 boxes.forEach((box) => {
   box.addEventListener("click", () => {
     if (turnO) {
       //playerO
       box.innerText = "O";
       box.style.color = '#000';
       turnO = false;
       status.innerText = "Player X's Turn";
     } else {
       //playerX
       box.innerText = "X";
       box.style.color = 'red';
       turnO = true;
       status.innerText = "Player O's Turn";
     }
     box.disabled = true;
     count++;
 
     let isWinner = checkWinner();
 
     if (count === 9 && !isWinner) {
        const gameTie = `🤝 Game was a Draw. 🤝`; 
        gameResult(gameTie);
     }
   });
 });

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const gameResult = (para) => {
  document.getElementById('popupOverlay').style.display = 'flex';
  winTie.innerText = para; 
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern);
    let pos1Val = boxes[pattern[0]].innerText;
    // console.log("pos1Val - "  , pos1Val);
    let pos2Val = boxes[pattern[1]].innerText;
    // console.log("pos2Val - "  , pos2Val);
    let pos3Val = boxes[pattern[2]].innerText;
    // console.log("pos3Val - "  , pos3Val); 

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // showWinner(pos1Val);
        const winner = ` 🏆🎉🥳 \n\n Congratulations, \n Winner is ${pos1Val}`;
        gameResult(winner);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);