function Ship()
{
  this.x = width/2;
  this.y = height - 20;
  this.dir = 0;
  this.w = 30;
  this.bulletTimer = 0;
  
  this.show = function(){
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y,this.w,10);
    rect(this.x, this.y - 5, 4, -15);
  }
  
  this.move = function(){
    this.x += this.dir * 2;
    this.x = constrain(this.x, this.w/2, width - this.w/2);
    this.bulletTimer --;
  }
  
  this.shoot = function(){
    if(this.bulletTimer <= 0){
      bullets.push(new Bullet(this.x, this.y - 4));
      this.bulletTimer = 20;
    }
  }
}

function Bullet(x,y){
  this.x = x;
  this.y = y;
  this.r = 3;
  this.toDel = false;
  
  this.show = function(){
    stroke("yellow");
    strokeWeight(this.r);
    
    // ellipse(this.x, this.y, this.r);
    line(this.x, this.y, this.x, this.y + 8);
  }
  
  this.move = function(){
    this.y -= 12;
  }
  
  this.hits = function(invader){
    var distance = dist(this.x, this.y, invader.x, invader.y);
    if (distance < invader.r/2){
      return true;
    }
    else {return false}
  }
}