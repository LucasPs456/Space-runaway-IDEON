import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/space.png"

const playerBulletController = new BulletController(canvas,10,"lime",true);
const enemyBulletController = new BulletController(canvas,4, "red", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;
let soundTrack = new Audio("sounds/POL-galactic-trek-short.wav");
let over =  new Audio("sounds/POL-sad-story-short.wav");


function game() {
    checkGameOver();
    ctx.drawImage(background, 0,0,canvas.width,canvas.height);
    displayGameOver();
    if(!isGameOver){
    soundTrack.play();
    
    soundTrack.volume = 0.5
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
    console.log(isGameOver)
    }
}


over.volume = 0.2;
function displayGameOver(){
    if(isGameOver){
        let win ="YOU WIN!!!";
        let lose ="GAME OVER";

        let text = didWin ? win : lose ;
        let textOffset = didWin ? 3.5 : 5;

        if(didWin === true){
            ctx.fillStyle = "white";
        } else{
            ctx.fillStyle = "purple";
            
        }
        
        ctx.font = "70px Ariel"
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver(){
    if(isGameOver){
        return ;
    }

    if(enemyBulletController.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.collideWith(player)){
        isGameOver = true;
    }

    if(enemyController.enemyRows.length ===0){
        didWin = true;
        isGameOver = true;
    }
}

setInterval(game, 1000 / 60);