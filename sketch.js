var PLAY =1;
var END =0;
var monkey , monkey_running,ground,groundImage;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, invisibleground,gameover,gameoverimage;
var score =0;
var st = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.jpg");
  gameoverImage = loadImage("gamover.jpg");
}



function setup() {
  
  createCanvas(600,400);
  monkey = createSprite(100,140,40,80);
  monkey.addAnimation("mymonkey",monkey_running);
  monkey.scale = 0.2;
  monkey.setCollider("rectangle",100,0,300,600)
  ground = createSprite(200,320,300,20)
  ground.addAnimation("ground",groundImage);
  ground.scale= 2.5;
 // ground.debug = true;
  ground.setCollider("rectangle",0,0,530,80)
  
  invisibleground = createSprite(300,320,530,10);
  invisibleground.visible = false;
  
  FoodGroup  = new Group();
  obstacleGroup = new Group();
}


function draw() {
background("white ");
  fill("red");
  textSize(15);
  text("survival time: "+st,480,20);
  text("score: "+score,500,40)
  if(ground.x<0){
        ground.x =200;
      }
  
  if(gameState === PLAY){
    st = st + Math.round(getFrameRate()/60)
     
    if(keyDown("space") && monkey.y>253){
     monkey.velocityY = -12;
    }
    //make infinate ground
      ground.velocityX = -10;
    
      
      createBanana();
      createObstacles();
      if(monkey.isTouching(FoodGroup)){
        score= score+2;
        FoodGroup.destroyEach();
      }
     
    if(monkey.isTouching(obstacleGroup)){
      gameState =END;  
      
    }
  }
  if(gameState === END){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    ground.velocityX =0;
    gameover = createSprite(300,100,40,40);
    gameover.addImage("gameover",gameoverImage);
    gameover.scale = 0.5;
    monkey.visible = false;
    
  }
  //monkey.debug = true; 
 
  console.log(monkey.y)
  // add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  
 //console.log(ground.x)
  
  
  monkey.collide(invisibleground);
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
  //console.log(ground.depth)
  
  
  drawSprites();
}


function createBanana(){
  if(frameCount%80 == 0){
  banana = createSprite(500,Math.round(random(100,200)),40,20);
   //  banana.debug = true;
    banana.setCollider("circle",0,0, 150)
    banana.addAnimation("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 125;
    FoodGroup.add(banana);
}

}

function createObstacles(){
  if(frameCount%200 == 0){
   obstacle = createSprite(500,Math.round(random(100,200)),40,20);
   obstacle.addAnimation("obstacle",obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 125;
    obstacleGroup.add(obstacle);
}

}

