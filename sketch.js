var gameState; var gameTimer;
var invaders = []; var bullets = [];
var ship;

function setup() {
  createCanvas(400, 400);
  background(0);
  
  gameState = 0;
  gameTimer = 0;
  invadersRefresh(); //fill invaders array and init ship
  
  strokeCap(SQUARE);
  strokeJoin(MITER);
}

function draw() {
  //gameState change in keypressed function
  switch(gameState){
    case 0:
      titleScreen();
      break;
    case 1:
      main();
      break;
    case 2:
      gameWin();
      break;
    case 3:
      gameLose();
      break;
    default:
  }
}

function main(){
  background(0);
  ship.show();
  ship.move();
  
  //bullet functions
  for(var i = 0; i < bullets.length; i++){
    bullets[i].show();
    bullets[i].move();
    
    //check bullet collisions
    for(var j = 0; j < invaders.length; j++){
       if (bullets[i].hits(invaders[j]) == true){
         bullets[i].toDel = invaders[j].toDel = true; 
       }
    }
    if (bullets[i].toDel || bullets[i].y < 0){
      bullets.splice(i,1);
    }
  }
  
  //invader functions
  var edge;
  for(var i = invaders.length - 1; i >= 0; i--){
    invaders[i].show();
    invaders[i].move();
    
    if (invaders[i].x + invaders[i].r/2 >= width || invaders[i].x - invaders[i].r/2 <= 0){
      edge = true;
    }
    
    //lose condition
    if (invaders[i].y >= height - 35){
      gameState = 3;
      invadersRefresh();
      gameTimer = 0;
    }
    
    if (invaders[i].toDel){
      invaders.splice(i,1);
    } 
  }
  
  if (edge){
    for(var i = 0; i < invaders.length; i++){
      invaders[i].shiftDown();
    }
    edge = false;
  }
  
  //win condition
  if(invaders.length <= 0){
    gameState = 2;
    invadersRefresh();
    gameTimer = 0;
  }
}

function invadersRefresh(){
  invaders = [];
  ship = new Ship();
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 5; j++){
      invaders.push(new Invader(i*35+15, j*35+50));
    }
  }
}

function titleScreen(){
  background(0);
  stroke(255);
  strokeWeight(1);
  textSize(40);
  textAlign(CENTER,TOP);
  noFill();
  text("FLUORESCENT", width/2, 100);
  textSize(60);
  text("INVADERS", width/2, 130);
  line(50, 185, width-50, 185);
  textSize(25);
  fill(255);
  noStroke();
  text("Press any key to start", width/2, 200);
  
   //draw arrows
  let x = width/2 + 40;
  let y = 380;
  fill(255);
  stroke(255);
  textSize(15);
  strokeWeight(5);
  line(x,y-10,x-30,y-10);
  triangle(x,y,x+15,y-10,x,y-20);
  strokeWeight(1);
  text("MOVE LEFT",x-150,y-15);
  x = width/2 - 40;
  strokeWeight(5);
  line(x,y-10,x+30,y-10);
  triangle(x,y,x-15,y-10,x,y-20);
  strokeWeight(1);
  text("MOVE RIGHT",x + 155,y-15);
  strokeWeight(5);
  x = width/2;
  y = y - 20;
  line(x,y,x,y-30);
  triangle(x-10,y-30,x+10,y-30,x,y-45);
  strokeWeight(1);
  text("SHOOT",x,y-75);
}

function gameWin(){
  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();
  textAlign(CENTER,CENTER);
  textSize(60);
  if (gameTimer % 30 <= 20){text("YOU WIN",width/2,height/2);}
  if(gameTimer >= 200){gameState = 0;}
  gameTimer ++;
}

function gameLose(){
  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();
  textAlign(CENTER,CENTER);
  textSize(60);
  if (gameTimer % 30 <= 20){text("YOU DIED",width/2,height/2);}
  if(gameTimer >= 200){gameState = 0;}
  gameTimer ++;
}


function keyPressed(){
  if (keyCode == UP_ARROW){ship.shoot();}
  if (keyCode == RIGHT_ARROW){ship.dir = 1;}
  else if(keyCode == LEFT_ARROW){ship.dir = -1;}
  if(gameState == 0){gameState = 1;}
}

function keyReleased(){
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW){ship.dir = 0;}
}

