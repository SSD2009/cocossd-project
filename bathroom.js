img = "";
modelstatus = "";
objects = [];
detector="";

function preload() {
    img = loadImage("bathroom.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (modelstatus != "") {
        console.log(objects.length);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            console.log(i);

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    modelstatus = true;
    detector.detect(img, gotResults)
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        objects = result;
    }
}

function back(){
    window.location="index.html";
}