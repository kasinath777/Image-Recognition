Webcam.set({
    width: 350,
    height: 350,
    image_format: "png",
    png_quality: 100
})

camera = document.getElementById("camera");
Webcam.attach("#camera")

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="pic" src="' + data_uri + '"/>'

    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/i20zHI_cw/model.json", modelLoaded);

function modelLoaded() {
    console.log(modelLoaded);
}

function identify_image() {
    img = document.getElementById("pic");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        document.getElementById("object").innerHTML = result[0].label;
        document.getElementById("accuracy").innerHTML = (result[0].confidence * 100).toFixed(3) + "%";
    }
}