function Invader(x,y){
  this.x = x;
  this.y = y;
  this.r = 25
  this.dir = 1;
  this.speed = 0;
  this.colour = {r:random(255), g:random(255), b:random(255)}
  
  this.toDel = false;
  
  this.show = function(){
    fill(this.colour.r, this.colour.g, this.colour.b);
    noStroke();
    ellipse(this.x, this.y, this.r);
  }
  
  this.shiftDown = function(){
    this.y += 5;
    this.dir = this.dir * -1;
  }
  
  this.move = function(){
    this.speed = map(invaders.length, 50, 0, 0, 4) - 2;
    this.speed = exp(this.speed);
    this.x += this.dir * this.speed;
  }
}

function bonusInvader(){
  var x = 0
  this.move = function(){
    x += 3;
    ellipse(x,20,50,30);
  }
}