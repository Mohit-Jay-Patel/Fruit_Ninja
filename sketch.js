//Game States
var knife_img,knife;
var fruit1_img,fruit;
var fruit2_img;
var fruit3_img;
var fruit4_img;
var alien_img,alien;
var fruit_group;
var alien_group;
var score=0;
var knife_sound,gameOver_sound;
var gameover_img,game_over;
var gameState = "play";

function preload(){
  knife_img = loadImage('knife.png');
  fruit1_img = loadImage('fruit1.png');
  fruit2_img = loadImage('fruit2.png');
  fruit3_img = loadImage('fruit3.png');
  fruit4_img = loadImage('fruit4.png');
  alien_img = loadAnimation('alien1.png','alien2.png');
  knife_sound = loadSound('knifeSwoosh.mp3');
  gameOver_sound = loadSound('gameover.mp3');
  gameover_img = loadImage('gameover.png');

  


}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife = createSprite(200,200,10,10);
   knife.addImage(knife_img)
   knife.scale = 0.7;
  
  fruit_group = createGroup();
  alien_group = createGroup();
  //set collider for sword
  
  // Score variables and Groups
 
  
}

function draw() {
  background("lightblue");

  if(gameState == "play"){
    knife.x = World.mouseX;
    knife.y = World.mouseY;
    spawn_fruit();
    spawn_alien();
    
  if(fruit_group.isTouching(knife)){
    score+=1;
    fruit_group.destroyEach();
    knife_sound.play();
 }
  
  if(alien_group.isTouching(knife)){
    console.log("Touching");
    
    gameState = "over"; 
    game_over = createSprite(300,300);
  game_over.addImage(gameover_img);
  game_over.scale = 2;
  alien_group.destroyEach();
  alien_group.setVelocityXEach(0);
  fruit_group.destroyEach();
  fruit_group.setVelocityXEach(0);
  knife.destroy();
  gameOver_sound.play();

  }
 
}

  
  textSize(25);
  fill('red');
  text("Score : "+score,460,35);


  
  
  drawSprites();
  //Display score
 
}
function spawn_fruit(){  
  if(frameCount % 150 == 0){
    var ran_num = Math.round(random(1,4));
    fruit = createSprite(450,200);
    fruit.scale = 0.25;
    switch(ran_num){
      case 1 :
        fruit.addImage(fruit1_img);
        break;
      case 2 :
        fruit.addImage(fruit2_img);
        break;
      case 3 :
        fruit.addImage(fruit3_img);
        break;
      case 4 :
        fruit.addImage(fruit4_img);
        break;        
    }
    fruit.y = Math.round(random(50,550))
    var fruit_position = Math.round(random(1,2));
    switch(fruit_position){
      case 1 :
        fruit.x = 600;
        fruit.velocityX = -(5+(score/4));
        break; 
      case 2 :
        fruit.x = 0;
        fruit.velocityX = (5+(score/4));
        break;
    }
    fruit_group.add(fruit);
    fruit.setLifetime = 100;
  }
}

function spawn_alien(){
  if(frameCount % 200 == 0){
    alien = createSprite(100,100);
    alien.addAnimation("alien",alien_img);
    alien.scale = 1;

    alien.y = Math.round(random(50,550));

    var alien_position = Math.round(random(1,2));
    switch (alien_position){
      case 1 :
        alien.x = 600;
        alien.velocityX = -(5+(score/3));
        break;
      case 2:
        alien.X = 0;
        alien.velocityX= (5+(score/3));
        break;
    }
    alien_group.add(alien);
    alien.setLifetime = 100;
  }

}
