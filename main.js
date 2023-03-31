status1 = "";
input = "";
objects = [];
function setup() {
canvas = createCanvas(480, 300);
canvas.center();
video = createCapture(VIDEO);
video.size(480,300);
video.hide()
}
function start() {
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status1").innerHTML = "Status - Detecting Objects";
input = document.getElementById("object_name_input").value;
}
function modelLoaded() {
console.log("CoCoSSD Is Initialised");
status1= true;
}
function draw() {
image(video, 0, 0, 480, 300);
if (status1 != "") {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
    document.getElementById("status1").innerHTML = "Status - Objects Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected Are -" + objects.length;
    fill("#FF0000");
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent  + "%", objects[i].x + 10, objects[i].y + 10);
    noFill();
    stroke("#FF0000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if (objects[i].label == input) {
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("status1").innerHTML = input + "found";
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance(input + "found");
    synth.speak(utterThis);
    }
}
    else {
    document.getElementById("status1").innerHTML = input + "not found";
    }
}
}
function gotResult(error, results) {
    if (error) {
    console.log(error);
    }
    else {
    console.log(results);
    objects = results;
    }
    }
    