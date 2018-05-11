var arr;
var currPos = 0;
var smallPos = 0;
var minPos = 0;
var interval  = 500;
var sorted = false;

function main(array) {

    arr = array;

    document.getElementById("selectionInput").value = arr.toString();
    document.getElementById("presetSelector").checked = false;
    document.getElementById("currentOpen").style.display = 'block';

    drawChart(arr, currPos);
}

function makeStep() {
    if (currPos < arr.length-1) {
        minPos = currPos;
        for (var j = currPos+1; j < arr.length; j++) {
            if(arr[j] < arr[minPos]) {
                minPos = j;
            }
        }
        swap(arr, currPos, minPos);
        currPos++;
        smallPos = currPos;
        minPos = currPos;
        drawChart(arr, currPos);
    }

    if (currPos >= arr.length-1) {
        sorted = true;
        drawChart(arr, currPos+1);
        disableControls();
    }
}

function makeSmallStep() {
    if (currPos < arr.length-1) {
        if (smallPos < arr.length-1) {
            smallPos++;
            if(arr[smallPos] < arr[minPos]) {
                minPos = smallPos
            }
        } else {
            swap(arr, currPos, minPos);
            currPos++;
            smallPos = currPos;
            minPos = currPos;
        }
        drawChart(arr, smallPos);
    }

    if (currPos >= arr.length-1) {
        sorted = true;
        drawChart(arr, currPos+1);
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

function disableControls() {
    var controls = document.getElementsByClassName("controlButtons");
    for (var i = 0; i<controls.length; i++) {
        controls[i].disabled = true;
    }
}

function updateInterval(range) {
    interval = range.value;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
