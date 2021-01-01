var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, leftInvisibleSprite, rightInvisibleSprite;
var score = 0;
var scoreIncremented = false;
var keyDownPressed = false;
let helicopterFlySound;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
 helicopterIMG=loadImage("helicopter.png")
 packageIMG=loadImage("package.png")
}

function setup()
{
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6;
	helicopterSprite.velocityX = 10;
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);

	leftInvisibleSprite = createSprite(2.5, height/2, 5, height);
	rightInvisibleSprite = createSprite(797.5, height/2, 5, height);
	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {isStatic:true, restitution:0, friction: 0});
	World.add(world, packageBody);
	
	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100;
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 180,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxRightSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxRightSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);


	Engine.run(engine);
  
}


function draw() 
{
  rectMode(CENTER);
  background(0);
  if(keyDownPressed === false) 
  {
	  packageBody = Bodies.circle(helicopterSprite.x , 200 , 5 , {isStatic:true, restitution:0, friction: 0});
	  World.add(world, packageBody);
  }	  

  packageSprite.x= packageBody.position.x; 
  packageSprite.y= packageBody.position.y;
  
  if(helicopterSprite.isTouching(leftInvisibleSprite) || helicopterSprite.isTouching(rightInvisibleSprite))
  {
	  helicopterSprite.velocityX = - helicopterSprite.velocityX;
  }
  if(packageSprite.isTouching(boxBase))
  {
	if(scoreIncremented === false)  
	{
		score = score + 1;
		scoreIncremented = true;
	}		
  }
  if(packageSprite.isTouching(boxleftSprite) || packageSprite.isTouching(boxRightSprite))
  {
	packageBody = Bodies.circle(1000, 1000 , 5 , {isStatic:true, restitution:0, friction: 0});
	World.add(world, packageBody);
	packageSprite.x= packageBody.position.x; 
    packageSprite.y= packageBody.position.y; 
  }
  drawSprites();
  fill(rgb(188, 219, 48));
  textFont("Lucida Calligraphy");
  textSize(15);
  text("Packets Collected: " + score, 600, 25);
  text("Pressing DOWN Arrow will drop the food packet from the helicopter.", 100, 62.5);
  text("Pressing UP Arrow will create another food packet in the helicopter \nwhich can be dropped again by pressing the DOWN Arrow.", 100, 100);
}

function keyPressed() 
{
 /* Pressing "DOWN" Arrow will drop the box from the helicopter.
    Pressing "UP" Arrow will create another package body/sprite in the helicopter which can be dropped again
    by pressing the "DOWN" Arrow.	*/
 if (keyCode === DOWN_ARROW)	
 {
	 Matter.Body.setStatic(packageBody, false);
	 keyDownPressed = true;
 }
 if (keyCode === UP_ARROW)
 {
	 keyDownPressed = false; 
	 packageBody = Bodies.circle(helicopterSprite.x, 200 , 5 , {isStatic:true, restitution:0, friction: 0});
	 World.add(world, packageBody);
	 packageSprite.x = packageBody.position.x; 
	 packageSprite.y = packageBody.position.y;
	 scoreIncremented = false; 	  
 } 
}