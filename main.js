status1 = "";
input = "";
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
}