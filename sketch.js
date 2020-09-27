var flappyBird,flappyBirdImage;

var background1, backgroundImage;

var ground1, groundImage;

var pillar1, pillar2, pillarImage1, pillarImage2, pillar1Short, pillar1Medium, pillar2Short, pillar2Medium,pillar1ShortImage, pillar1MediumImage, pillar2ShortImage, pillar2MediumImage;

var coinImage, coin;

var PLAY = 1;

var END = 1;

var gameState = PLAY;

var PillarGroup1, PillarGroup2, coinGroup, birdGroup;

var score = 0;

function preload(){
  flappyBirdImage = loadImage("images/Flappy Bird image.png");

  backgroundImage = loadImage("images/Flappy bird background.png");

  groundImage = loadImage("images/Flappy Bird ground.png");

  pillarImage1 = loadImage("images/Flappy bird top pillar image.png");

  pillarImage2 = loadImage("images/Flappy bird bottom pillar image.png");

  pillar1shortImage = loadImage("images/Flappy bird top pillar image2.png");

  pillar1MediumImage = loadImage("images/Flappy bird top pillar image1.png");

  pillar2shortImage = loadImage("images/Flappy bird bottom pillar image1 - Copy.png");

  pillar2MediumImage = loadImage("images/Flappy bird bottom pillar image2 - Copy.png");

  coinImage = loadImage("images/Flappy bird coin1.png")
}
function setup() {
  createCanvas(800,400);

  PillarGroup1 = new Group();

  PillarGroup2 = new Group();

  coinGroup = new Group();

  birdGroup = new Group();

  //flappyBird.debug = true;
  background1 = createSprite(400,0,200,200);
  background1.addImage("background",backgroundImage);
  background1.scale = 1

  ground1 = createSprite(400,665,800,20);
  ground1.addImage("ground",groundImage);
  ground1.scale = 1.2

  flappyBird = createSprite(150, 200, 50, 50);
  flappyBird.addImage("bird",flappyBirdImage);
  flappyBird.scale = 0.3;

  flappyBird.setCollider("circle",0,0,55)

  birdGroup.add(flappyBird);
    
}

function draw() {
  background("red");

  text("Score: ", 700, 30);

  

  if(gameState === PLAY){
    if(keyWentDown("space")){
      flappyBird.velocityY = -10;
      flappyBird.velocityX = 0;
    }

      flappyBird.velocityY = flappyBird.velocityY + 0.9;

      background1.velocityX = -7;
    
      ground1.velocityX = -7;
    
      if(background1.x < 0){
        background1.x = background1.width/2;
      }
        pillarSpawn1();

        pillarSpawn2();
      
        coinSpawn();
      
    
      if(ground1.x < 0){
        ground1.x = ground1.width/2;
      }
    if(PillarGroup1.isTouching(birdGroup)){
      gameState = END;
      console.log("hello");
    }
    if(birdGroup.isTouching(coinGroup)){
      //score + 1;
      coinGroup.destroyEach();
    }
  }
  else if(gameState === END){
      background1.velocityX = 0;
      ground1.velocityX = 0;
      //console.log("hello");
  }

  flappyBird.collide(ground1);
  
  

  

  drawSprites();

  //text(mouseX + "," + mouseY, 200,20)
}

function pillarSpawn1(){
  if(frameCount%60 === 0){
  pillar1 = createSprite(800,55,100,100)
  pillar1.velocityX = -5;
  pillar1.scale = 0.5;
  pillar1.lifetime = 180;

  PillarGroup1.add(pillar1);

  var rand = Math.round(random(1,3));
  switch(rand){
    case 1: pillar1.addImage("pillar1", pillarImage1);
    break;
    case 2: pillar1.addImage("pillar1Short", pillar1shortImage)
    pillar1.y = 40
    break;
    case 3: pillar1.addImage("pillar1Medium", pillar1MediumImage)
    break;
  }
  }
}

function pillarSpawn2(){
  if(frameCount%60 === 0){
    pillar2 = createSprite(800,325,10,10)
    pillar2.velocityX = -5;
    pillar2.scale = 0.5;
    pillar2.lifetime = 180;

    PillarGroup2.add(pillar2);

    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: pillar2.addImage("pillar2", pillarImage2);
      break;
      case 2: pillar2.addImage("pillar2shortImage", pillar2shortImage)
      pillar2.y = 350
      break;
      case 3: pillar2.addImage("pillar2MediumImage", pillar2MediumImage)
      break;
    }
  }
}

function coinSpawn(){
  if(frameCount%300 === 0 ){
    coin = createSprite(800,random(100,300),50,50)
    coin.addImage("coin", coinImage);
    coin.velocityX = -5
    coin.scale = 0.1
    coin.lifetime = 180

    coinGroup.add(coin);
  }
}