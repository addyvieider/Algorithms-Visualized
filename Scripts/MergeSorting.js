var arr;
var tempArr;
var interval  = 500;
var sorted = false;
var divided = false;

function main(array) {

    arr = array;
    tempArr = [arr.slice()];

    document.getElementById("mergeInput").value = arr.toString();
    document.getElementById("presetSelector").checked = false;
    document.getElementById("currentOpen").style.display = 'block';

    drawElements(tempArr, []);
}

function makeStep() {

    if(!divided) {
        var newSplitArr = [];
        for (var x = 0; x < tempArr.length; x++) {
            var currArr = tempArr[x];
            if (currArr.length > 1) {
                var mid = Math.ceil(currArr.length / 2);
                var left = currArr.slice(0, mid);
                var right = currArr.slice(mid);

                if(left.length > 0) {
                    newSplitArr.push(left);
                }
                if(right.length > 0) {
                    newSplitArr.push(right);
                }
            }else {
                newSplitArr.push(currArr);
            }
        }

        drawElements(newSplitArr, tempArr);
        tempArr = newSplitArr;
        divided = tempArr.length === arr.length;
    } else {
        var mergeArr = [];
        for (var y = 0; y < tempArr.length; y+=2) {
            var l = tempArr[y];
            var r = y+1 < tempArr.length ? tempArr[y+1] : [];

            var i = 0;
            var j = 0;
            var combined = [];

            while (i<l.length && j<r.length) {
                if(l[i]<r[j]) {
                    combined.push(l[i]);
                    i++;
                }else{
                    combined.push(r[j]);
                    j++;
                }
            }

            while (i<l.length){
                combined.push(l[i]);
                i++;
            }

            while (j<r.length) {
                combined.push(r[j]);
                j++;
            }

            mergeArr.push(combined);
        }

        drawElements(mergeArr, tempArr);
        tempArr = mergeArr;
        if( tempArr.length === 1){
            sorted = true;
            disableControls();
        }
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

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function drawElements(elem, prev) {

    var container = document.getElementById("container");
    var outer = document.createElement("div");
    outer.style.display = "flex";
    outer.style.justifyContent = "center";

    for(var i=0; i<elem.length; i++) {
        var table = document.createElement("table");
        var tr = table.appendChild(document.createElement("tr"));
        var td = document.createElement("td");
        td.style.border = "solid 1px black";
        td.innerHTML = elem[i];
        tr.appendChild(td);

        var delay = playing ? interval + "ms" : "2s";

        if(prev.length > 0) {
            if (prev[Math.floor(i / 2)].length > 1 && !divided) {
                if (i % 2 === 0) {
                    table.style.animation = "divisionToLeft " + delay;
                } else {
                    table.style.animation = "divisionToRight " + delay;
                }
                table.style.animationFillMode = "forwards";
            } else {
                table.style.margin = "5px auto 5px auto";
            }
        }
        else {
            table.style.margin = "5px auto 5px auto";
        }

        outer.appendChild(table);
    }

    container.appendChild(outer);

}
