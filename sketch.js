function Snake(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.dir = function(x, y){
        this.xSpeed = x;
        this.ySpeed = y;
    }

    this.show = function(){
        fill(255);

        for (var j = 0; j < this.total; j++){
            rect(this.tail[j].x, this.tail[j].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    this.eat = function(pos){
        var distance = dist(this.x, this.y, pos.x, pos.y);
        if (distance < 1){
            this.total++;
            return true;
        }
        else{
            return false;
        }
    }

    this.dead = function(pos){
        
    }

    this.update = function(){
        for (var i = 0; i < this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];    
        }

        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x = this.x + this.xSpeed * scl;
        this.y = this.y + this.ySpeed * scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }
}

var snake;
var scl = 20;

function setup(){
    createCanvas(600,600);
    snake = new Snake();
    frameRate(10);

    pickLocation();
}

function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw(){
    background("black");
    snake.update();
    snake.show();

    if (snake.eat(food)){
        pickLocation();
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed(){
    if (keyCode === UP_ARROW){
        snake.dir(0, -1);
    }
    else if (keyCode === DOWN_ARROW){
        snake.dir(0, 1);
    }
    else if (keyCode === RIGHT_ARROW){
        snake.dir(1, 0)
    }
    else if (keyCode === LEFT_ARROW){
        snake.dir(-1, 0);
    }
}
