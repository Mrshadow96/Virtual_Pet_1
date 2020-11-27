//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg, gardenImg;
var Score = 20;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  gardenImg = loadImage("garden1.jpg");

}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  console.log(database);

  dog = createSprite(250,350,70,70);
  dog.addImage(dogImg);
  dog.scale = 0.18;

  foodStock = database.ref('Food');
  foodStock.on('value',readStock);
  foodStock.set(20);
}


function draw() {  
  // background(46, 139, 87);
  background(gardenImg);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);

}

if(keyWentUp(UP_ARROW)){
  
  dog.addImage(dogImg);

}

if(foodS === 0){
  foodS = 20;
}
  dog.display();
  drawSprites();
  //add styles here

fill("white");
stroke("white");
textSize(20);
text("Note : " + "Press 'UP ARROW KEY' to Feed Drago Milk!",20, 50);

fill("white");
stroke("white");
textSize(20);
text("Food Remaining"+ " : " + foodS, 160, 460);
}

function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
}



