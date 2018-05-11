var arr;
var currPos = 1;
var smallPos = 1;
var interval  = 500;
var sorted = false;

function main(array) {

    arr = array;

    document.getElementById("insertionInput").value = arr.toString();
    document.getElementById("presetSelector").checked = false;
    document.getElementById("currentOpen").style.display = 'block';

    drawChart(arr, currPos);
}

function makeStep() {
    if (currPos < arr.length) {
        for (var j = currPos; j > 0 && arr[j - 1] > arr[j]; j--) {
            swap(arr, j, j - 1);
        }
        currPos++;
        smallPos = currPos;
        drawChart(arr, currPos);
    }

    if (currPos >= arr.length) {
        sorted = true;
        disableControls();
    }
}

function makeSmallStep() {
    if (currPos < arr.length) {
        if (smallPos > 0 && arr[smallPos - 1] > arr[smallPos]) {
            toggleSteps(true);
            swap(arr, smallPos, smallPos - 1);
            smallPos--;
        } else {
            toggleSteps(false);
            currPos++;
            smallPos = currPos;
        }
        drawChart(arr, smallPos);
    }

    if (currPos >= arr.length) {
        sorted = true;
        disableControls();
    }
}

var playing = false;

function play() {
    playing = !playing;
    if(playing) {
        document.getElementById("playbutton").innerHTML = "Pause";
        loop();
    }else {
        document.getElementById("playbutton").innerHTML = "Play";
    }
}

function loop() {
    setTimeout(function () {
        makeStep();
        if(playing && !sorted) {
            loop();
        } else {
            document.getElementById("playbutton").innerHTML = "Play";
            playing = false;
        }
    }, interval);
}

function updateInterval(range) {
    interval = range.value;
}

function disableControls() {
    var controls = document.getElementsByClassName("controlButtons");
    for (var i = 0; i<controls.length; i++) {
        controls[i].disabled = true;
    }
}

function toggleSteps(disabled) {
    document.getElementById("makestep").disabled = disabled;
    document.getElementById("playbutton").disabled = disabled;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
