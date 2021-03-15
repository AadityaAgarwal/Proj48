var runner,runnerImg,runnerUpImg,collidedImg;
var ground;
var bgImg,bg;

var PLAY=1;
var END=0;
var gameState=PLAY;

var powerGroup,powerImg,Img,powerUp;

var gameOverImg,gameOver;

var edges;

var jumpSound;

var score;

var restart,restartImg;

var obs1,obs2;

var obstacleGroup;

var rocketImg,rocketGroup;

var coin,coinImg;

var coinGroup;

function preload(){
bgImg=loadImage("bg1.jpg");
runnerImg=loadAnimation("-1.png","-2.png","-3.png","-4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png");
runnerUpImg=loadAnimation("upRunner.png");
collidedImg=loadAnimation("-2.png")
powerImg=loadImage("power.png");

powerUpImg=loadAnimation("powerUp.png");

gameOverImg=loadImage("gameOver.png");

jumpSound=loadSound("jump.mp3");

restartImg=loadImage("restart.png");

obs1=loadImage("Untitled.png");

obs2=loadImage("Untitled1.png");

rocketImg=loadImage("rocketImg.png");

coinImg=loadImage("coin.png");
}

function setup(){
 createCanvas(1200,400);
 
 bg=createSprite(100,190,1200,400);
 bg.addImage(bgImg);
 bg.scale=1.3;
 bg.x = bg.width /2;

 runner=createSprite(70,360,20,50);
 runner.addAnimation("running",runnerImg);
 runner.addAnimation("up",runnerUpImg);
 runner.addAnimation("collided",collidedImg);
 runner.addAnimation("powerUp",powerUpImg);
 runner.scale=0.7;
 
 ground=createSprite(200,390,400,10);
 ground.visible=false; 

 powerGroup=createGroup();

 obstacleGroup=createGroup();

 rocketGroup=createGroup();

 coinGroup=createGroup();
 gameOver=createSprite(600,200);
 gameOver.addImage(gameOverImg);
 
 //powerUp.debug=true;

 gameOver.scale=0.7;

 gameOver.visible=false;

 restart=createSprite(600,250);
 restart.addImage(restartImg);
 restart.scale=0.7;
 restart.visible=false;

 runner.setCollider("circle",0,0,80);
 //runner.debug = true;

   

 score=0;
}

function draw(){
background(180);

edges=createEdgeSprites();

if(gameState===PLAY){

    bg.velocityX=-(4 + 3* score/100);
    score = score + Math.round(getFrameRate()/60);
    
    console.log(score);

    if(keyDown("space")){
        runner.velocityY=-12;
        runner.changeAnimation("up",runnerUpImg);
    }
    runner.changeAnimation("running",runnerImg);
    runner.velocityY=runner.velocityY+0.8;

if (bg.x < 0){
    bg.x = bg.width /2;
  }
  

  group();
  rocketG();
  spawnObstacle();

  spawnCoins();

  if(coinGroup.isTouching(runner)){
    coinGroup.destroyEach();
  }

  if(powerGroup.isTouching(runner)){
    
     score=score-score;

      powerGroup.destroyEach();
      
  }
  
  if(obstacleGroup.isTouching(runner)|| rocketGroup.isTouching(runner)){
    obstacleGroup.destroyEach();
    rocketGroup.destroyEach();
    runner.changeAnimation("collided",collidedImg);
    gameState=END;
  }
}

if(gameState===END){
gameOver.visible=true;
restart.visible=true;

bg.velocityX=0;
runner.velocityY=0;

if(mousePressedOver(restart)){
  reset();
}
}

runner.collide(ground);

runner.collide(edges[2]);

    drawSprites();
}

function reset(){
  
  gameState=PLAY;
  gameOver.visible = false;
   restart.visible = false;
  obstacleGroup.destroyEach();
  rocketGroup.destroyEach();
  //powerUp.destroy();
  runner.visible=true;
  score=0;
}

function group(){

    if(frameCount%500===0){
    var p=createSprite(1200,random(10,390),10,40);
    p.velocityX=-(4 + 3* score/100);

    p.setCollider("circle",0,0,40);
    //p.debug=true;

    p.addImage(powerImg);

    p.scale = 0.4;
    p.lifetime = 300;

    powerGroup.add(p);
 }
  }

function spawnObstacle(){

  if(frameCount%500===0){
   
    var x=random(10,390);
    var o=createSprite(1200,x);
    var r=Math.round(random(1,2));
    
    if(r==1){
      o.addImage(obs1);
      o.scale=0.3;
     }
     else if(r==2){
      o.addImage(obs2);
      o.scale=0.3;
     }

    o.velocityX=-(4 + 3* score/100);;
    obstacleGroup.add(o);
  }
}

function rocketG(){
if(score>500){
  if(frameCount%300===0){

    var rocket=createSprite(1200,random(50,200));
    rocket.addImage(rocketImg);
    rocket.scale=0.5;
    rocket.lifetime=300;

    rocket.velocityX=-(4 + 3* score/100);

    rocket.setCollider("circle",0,0,50);
    //rocket.debug=true;
    rocketGroup.add(rocket);
  }
}
}

function spawnCoins(){

  if(frameCount%10===0){

    coin=createSprite(400,random(10,390));
    coin.addImage(coinImg);
    coin.scale=0.2;
 
    coin.velocityX=-(4 + 3* score/100);
    
    coinGroup.add(coin);
  }
}