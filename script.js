//setup + initiating variables
const c = document.getElementById("myCanvas");
const myCanvas = c.getContext("2d");

var frameNumDisplay = document.getElementById("frameNumDisplay");
var forwardBtn = document.getElementById("forwardBtn");

myCanvas.lineWidth = 5;
myCanvas.lineJoin = 'round';
myCanvas.lineCap = 'round';

let mouseX = 0;
let mouseY = 0;

let frames = [];

let dragging = false;
let editMode = true;
let currentFrameNum = 0;
let f = 0;


//functions and classes
class Point {
	constructor(x, y) {
  	this.x = x;
    this.y = y;
  }
}

class StickFigure {

  constructor() {
    this.headr = 25;
  	this.p = [];
    this.p[0] = new Point(200, 100);
    this.p[1] = new Point(200, 150);
    this.p[2] = new Point(178, 178);
		this.p[3] = new Point(150, 200);
		this.p[4] = new Point(222, 178);
    this.p[5] = new Point(250, 200);
    this.p[6] = new Point(200, 240);
    this.p[7] = new Point(175, 275);
    this.p[8] = new Point(150, 300);
    this.p[9] = new Point(225, 275);
    this.p[10] = new Point(250, 300);
    this.movingPoint = this.p[0];
  }

  changeHead(x, y) {
    this.p[0].x += x;
    this.p[0].y += y;
    return;
  }

  change1(x, y) {
    this.p[1].x += x;
    this.p[1].y += y;
    return;
  }

  change2(x, y) {
    this.p[2].x += x;
    this.p[2].y += y;
    return;
  }

  change3(x, y) {
    this.p[3].x += x;
    this.p[3].y += y;
    return;
  }

  change4(x, y) {
    this.p[4].x += x;
    this.p[4].y += y;
    return;
  }

  change5(x, y) {
    this.p[5].x += x;
    this.p[5].y += y;
    return;
  }

  change6(x, y) {
    this.p[6].x += x;
    this.p[6].y += y;
    return;
  }

  change7(x, y) {
    this.p[7].x += x;
    this.p[7].y += y;
    return;
  }

  change8(x, y) {
    this.p[8].x += x;
    this.p[8].y += y;
    return;
  }

  change9(x, y) {
    this.p[9].x += x;
    this.p[9].y += y;
    return;
  }

  change10(x, y) {
    this.p[10].x += x;
    this.p[10].y += y;
    return;
  }

  draw() {
    line(this.p[1].x, this.p[1].y, this.p[2].x, this.p[2].y);
    line(this.p[2].x, this.p[2].y, this.p[3].x, this.p[3].y);
    line(this.p[1].x, this.p[1].y, this.p[4].x, this.p[4].y);
    line(this.p[4].x, this.p[4].y, this.p[5].x, this.p[5].y);
    line(this.p[1].x, this.p[1].y, this.p[6].x, this.p[6].y);
    line(this.p[6].x, this.p[6].y, this.p[7].x, this.p[7].y);
    line(this.p[7].x, this.p[7].y, this.p[8].x, this.p[8].y);
    line(this.p[6].x, this.p[6].y, this.p[9].x, this.p[9].y);
    line(this.p[9].x, this.p[9].y, this.p[10].x, this.p[10].y);
    circle(this.p[0].x, this.p[0].y, this.headr);
  }
  
  findPoint() {
  	let tempDist = dist(this.p[0].x, this.p[0].y, mouseX, mouseY);
    let tempP = this.p[0];
    for (let i = 0; i < 11; i++) {
    	if (dist(this.p[i].x, this.p[i].y, mouseX, mouseY) < tempDist) {
      	tempP = this.p[i];
        tempDist = dist(this.p[i].x, this.p[i].y, mouseX, mouseY);
      }
    }
    this.movingPoint = tempP;
    
  }
  
  movePoint() {
  	this.movingPoint.x = mouseX;
    this.movingPoint.y = mouseY;
  }

}

function line(x1, y1, x2, y2) {
  myCanvas.beginPath();
  myCanvas.moveTo(x1, y1);
  myCanvas.lineTo(x2, y2);
  myCanvas.stroke();
}

function circle(x, y, r) {
  myCanvas.beginPath();
  myCanvas.arc(x, y, r, 0, 2 * Math.PI);
  myCanvas.stroke();
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

//toggles drag mode and gets point that is being dragged
function mouseDown() {
	if (editMode == true) {
		if (dragging == true) {
 		 	dragging = false;
	  } else {
 		 	frames[currentFrameNum].findPoint();
 		 	dragging = true;
    }
  }
}

//goes to previous frame
function back() {
	if (0 < currentFrameNum && currentFrameNum <= (frames.length - 1)) {
		currentFrameNum --;
    frameNumDisplay.innerText = currentFrameNum + 1;
    if (currentFrameNum != frames.length - 1) {
      forwardBtn.innerText = "next frame";
    }
  }
}

//goes to next frame or adds new frame
function forward() {
	if (0 <= currentFrameNum && currentFrameNum < (frames.length - 1)) {
		currentFrameNum ++;
    frameNumDisplay.innerText = currentFrameNum + 1;
    if (currentFrameNum == frames.length - 1) {
        forwardBtn.innerText = "add frame";
    }
  }
  else if (currentFrameNum == frames.length - 1) {
    addFrame();
    currentFrameNum ++;
    frameNumDisplay.innerText = currentFrameNum + 1;
  }
}

//draws drag mode animation
function doStuff() {
	myCanvas.clearRect(0, 0, 400, 400);
  if (currentFrameNum > 0) {
  	myCanvas.strokeStyle = "blue";
    myCanvas.globalAlpha = 0.5;
    frames[currentFrameNum - 1].draw();
    myCanvas.strokeStyle = "black";
    myCanvas.globalAlpha = 1;
  }
  frames[currentFrameNum].draw();
  
}

//animates drag mode
function startDragMode() {
	draginterval = setInterval(doStuff, 100);
}

function stopDragMode() {
	clearInterval(draginterval);
}

function play() {
	stopDragMode();
	editMode = false;
  a = setInterval(animate, 100);
}

function animate() {
	myCanvas.clearRect(0, 0, 400, 400);
  frames[f].draw();
  f++;
  if (f >= frames.length) {
  	clearInterval(a);
  	startDragMode();
 	 	editMode = true;
    f = 0;
  }
}

function addFrame() {
  let frame = new StickFigure();
  frames[frames.length] = frame;
}


//body of code i guess?

//makes frames
for (var i = 0; i < 10; i++) {
	let frame = new StickFigure();
  frames[i] = frame;
}

//watches for mouse moved and moves points if dragging
c.addEventListener("mousemove", function(e) { 
    var cRect = c.getBoundingClientRect();
    mouseX = Math.round(e.clientX - cRect.left);
    mouseY = Math.round(e.clientY - cRect.top);
    if (dragging == true && editMode == true) {
    	frames[currentFrameNum].movePoint();
    }
});

startDragMode();