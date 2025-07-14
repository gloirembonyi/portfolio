let step = 0;
let x = 0;

function setup() {
  createCanvas(800, 400);
  frameRate(60);
}

function draw() {
  background(200, 230, 255); // Sky blue background

  drawGround();
  drawSun();

  translate(x, 0);
  drawOldMan();

  x += 1.2;
  if (x > width + 100) x = -100;
}

function drawGround() {
  noStroke();
  fill(100, 200, 100);
  rect(0, height - 60, width, 60);
}

function drawSun() {
  fill(255, 204, 0);
  ellipse(700, 80, 60, 60);
}

function drawOldMan() {
  step += 0.05;

  let bodyX = 200;
  let bodyY = 250;

  let legSwing = sin(step) * 15;
  let armSwing = cos(step) * 15;

  stroke(0);
  strokeWeight(3);

  // Hat
  fill(50);
  rect(bodyX - 25, bodyY - 145, 50, 10); // brim
  fill(30);
  rect(bodyX - 15, bodyY - 165, 30, 25); // top of hat

  // Head
  fill(240, 200, 160);
  ellipse(bodyX, bodyY - 120, 40, 40);

  // Eyes and mouth
  fill(0);
  ellipse(bodyX - 8, bodyY - 125, 3, 3);
  ellipse(bodyX + 8, bodyY - 125, 3, 3);
  noFill();
  arc(bodyX, bodyY - 115, 10, 6, 0, PI);

  // Body
  strokeWeight(4);
  line(bodyX, bodyY - 100, bodyX, bodyY - 30);

  // Arms
  strokeWeight(3);
  // Left arm (swinging)
  line(bodyX, bodyY - 90, bodyX - 20 + armSwing, bodyY - 50);
  // Right arm (holding cane)
  let caneX = bodyX + 20 + armSwing;
  let caneY = bodyY - 50;
  line(bodyX, bodyY - 90, caneX, caneY);

  // Cane
  stroke(80, 50, 20);
  strokeWeight(4);
  line(caneX, caneY, caneX, caneY + 60);

  // Legs
  stroke(0);
  strokeWeight(3);
  // Left leg
  line(bodyX, bodyY - 30, bodyX - 15 + legSwing, bodyY + 40);
  // Right leg
  line(bodyX, bodyY - 30, bodyX + 15 - legSwing, bodyY + 40);
}
