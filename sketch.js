var bg
var bgImg

var ground

var hotAirBalloon
var hotAirBalloonImg

var obstacleBottom1
var obstacleBottom1Img

var obstacleBottom2
var obstacleBottom2Img

var obstacleBottom3
var obstacleBottom3Img

var obstacleTop1
var obstacleTop1Img

var obstacleTop2
var obstacleTop2Img

var gameOver
var gameOverImg

var restart
var restartImg

var bottomObstaclesGroup;
var topObstaclesGroup;

var score = 0;

var gameState = 0;

function preload(){

bgImg = loadImage("assets/bg.png")
hotAirBalloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")


obstacleBottom1Img = loadImage("assets/obsBottom1.png");
obstacleBottom2Img = loadImage("assets/obsBottom2.png");
obstacleBottom3Img = loadImage("assets/obsBottom3.png");

obstacleTop1Img = loadImage("assets/obsTop1.png");
obstacleTop2Img = loadImage("assets/obsTop2.png");

gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");

}


function setup(){
    createCanvas(1000, 600)

    bg = createSprite(500, 400, 50, 50)
    bg.addImage(bgImg);
    bg.scale = 1.3

    gameOver = createSprite(500,100,50,50)
    gameOver.addImage(gameOverImg)
    gameOver.visible = false;

    restart = createSprite(600, 200, 50, 50)
    restart.addImage(restartImg)
    restart.visible = false;

    
    ground = createSprite(0, 800, 2000, 100)
    ground.visible = false

    hotAirBalloon = createSprite(200, 200, 20, 50)
    hotAirBalloon.addAnimation("hotAirBalloon", hotAirBalloonImg)
    hotAirBalloon.scale = 0.25

    bottomObstaclesGroup = new Group();
    topObstaclesGroup = new Group();

}

function spawnObstaclesBottom(){

if(World.frameCount % 100 == 0){

    obstacleBottom = createSprite(1000, 600, 50, 50)
    obstacleBottom.scale = 0.18
    obstacleBottom.velocityX = -4
    obstacleBottom.lifetime = 300;

    var randomNumberBottom = Math.round(random(1, 3))

    switch(randomNumberBottom){

        case 1: obstacleBottom.addImage(obstacleBottom1Img);
                break;

        case 2: obstacleBottom.addImage(obstacleBottom2Img);
                break;

        case 3: obstacleBottom.addImage(obstacleBottom3Img);
                break;

    }

    bottomObstaclesGroup.add(obstacleBottom)

}   

}



function draw(){
background("red")

if(gameState === 0){

    if(keyDown("space")){
    
    console.log("working")
    hotAirBalloon.velocityY = -4
    
        }

    hotAirBalloon.velocityY += 1

    spawnObstaclesBottom();
    
    spawnObstaclesTop();
    
    if(hotAirBalloon.isTouching(topObstaclesGroup) || hotAirBalloon.isTouching(bottomObstaclesGroup)
        || ground.isTouching(hotAirBalloon)){
        gameState = 1

    }

    if(frameCount % 30){

        score += 1

    }

}

if(gameState === 1){

gameOver.visible = true;
restart.visible = true;

hotAirBalloon.velocityY = 0;
hotAirBalloon.x = 200;
hotAirBalloon.y = 200;

if(mousePressedOver(restart)){

    reset();

}


}

    text("Score: ", 300, 500) //Please check bug with the text

    drawSprites()

}

function spawnObstaclesTop(){

    if(World.frameCount % 110 == 0){
    
        obstacleTop = createSprite(1000, 60, 50, 50);
        obstacleTop.y = Math.round(random(50, 200))
        obstacleTop.velocityX = -4;
        obstacleTop.scale = 0.1;
        obstacleTop.lifetime = 300;
    
        var randomNumberTop = Math.round(random(1, 2))
    
        switch(randomNumberTop){
    
            case 1: obstacleTop.addImage(obstacleTop1Img);
                    break;
    
            case 2: obstacleTop.addImage(obstacleTop2Img);
                    break;
    
        }

        topObstaclesGroup.add(obstacleTop);
    
    }
    
}

function reset(){

    gameState = 0;

    gameOver.visible = false;
    restart.visible = false;

}