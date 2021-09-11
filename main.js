smithereens = "";
semi_automatic = "";

function preload(){
    smithereens = loadSound("smithereens.mp3");
    semi_automatic = loadSound("semi-automatic.mp3");
}

function setup(){
    canvas = createCanvas(800,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,800,600);
    stroke(0,0,255);
    fill (0,0,255);
    song1status = smithereens.isPlaying();
    song2status = semi_automatic.isPlaying();
    if(rightWristScore >= 0.4){
        circle (rightWristX,rightWristY,30);
        semi_automatic.pause();
        if(song1status == false){
            smithereens.play();
            document.getElementById("song_name").innerHTML = "Smithereens";
        }
    }
    if(leftWristScore >= 0.4){
        circle (leftWristX,leftWristY,30);
        smithereens.pause();
        if(song2status == false){
            semi_automatic.play();
            document.getElementById("song_name").innerHTML = "Semi-Automatic";
        }
    }
}

rightWristX = "0";
rightWristY = "0";
leftWristX = "0";
leftWristY = "0";
leftWristScore = "0";
rightWristScore = "0";
song1status="";
song2status="";
function modelLoaded(){
    console.log("modelLoaded")
}

function gotPoses(results){
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
}