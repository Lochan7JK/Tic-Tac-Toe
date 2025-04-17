var board;
var playerO ="O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            // <div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");

            if(r == 0 || r == 1){
                tile.classList.add("horizontal-line");
            }
            if(c == 0 || c == 1){
                tile.classList.add("vertical-line");
            }
            
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }
}


function setTile(){
    if(gameOver)
        return;

    let coords = this.id.split("-"); //"0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if(board[r][c] != ' ') // important: if clicked then fix x/o, we don't wanna change/manipulate it again and again
        return; //once x/o gets fixed no one can change them
    

    board[r][c] = currPlayer; // in js
    this.innerText = currPlayer; // in html

    if(currPlayer == playerO){
        currPlayer = playerX;
    }
    else{
        currPlayer = playerO;
    }

    checkWinner();

}

function checkWinner(){
    // horizontally
    for(let r = 0; r < 3; r++){

        if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' '){
            for(let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");

                let victor = document.getElementById("victor");
                if(currPlayer == playerO){
                    currPlayer = playerX;
                }
                else{
                    currPlayer = playerO;
                }
                victor.innerText = "Player " + currPlayer + " wins!! 🎉🎊";
                
            }

            gameOver = true;
            return; // no need to check vertically diagonally or anti-diagonally further
        }

    }


    // vertically
    for(let c = 0; c < 3; c++){

        if(board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' '){
            for(let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");

                let victor = document.getElementById("victor");
                if(currPlayer == playerO){
                    currPlayer = playerX;
                }
                else{
                    currPlayer = playerO;
                }
                victor.innerText = "Player " + currPlayer + " wins!! 🎉🎊";
            }

            gameOver = true;
            return; // no need to check diagonally or anti-diagonally further
        }

    }


    // diagonally
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){
        for(let i = 0; i < 3; i++){
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");

            let victor = document.getElementById("victor");
                if(currPlayer == playerO){
                    currPlayer = playerX;
                }
                else{
                    currPlayer = playerO;
                }
                victor.innerText = "Player " + currPlayer + " wins!! 🎉🎊";
        }

        gameOver = true;
        return; // no need to check diagonally or anti-diagonally further
    }


    // anti-diagonally
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' '){
        // 0-2
        let tile = document.getElementById("0-2"); // remember to declare tile only once
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");
        tile.classList.add("winner");

        let victor = document.getElementById("victor");
        if(currPlayer == playerO){
            currPlayer = playerX;
        }
        else{
            currPlayer = playerO;
        }
        victor.innerText = "Player " + currPlayer + " wins!! 🎉🎊";

        gameOver = true;
        return; // no need to check diagonally or anti-diagonally further
    }


}