<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Algorithms Visualized</title>
    <link rel="stylesheet" href="Styles/Main.css">
    <link rel="stylesheet" href="Styles/font-awesome-4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="Scripts/Menu.js"></script>
    <script type="text/javascript" src="Scripts/MergeSorting.js"></script>
</head>
<body>
<nav id="mySideNav">
    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <a href="index.html">Home</a>
    <div class="dropdown">
        <button class="dropbtn" onclick="toggleDropDown(this)">
            String Genetic Algorithm
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" style="display: none">
            <form action="StringGA.php" method="get">
                <h4>Target:</h4>
                <input type="text" value="Hello World" name="target" pattern="[a-zA-Z\s]*" title="No special characters allowed"><br>
                <h4>Population Size:</h4>
                <input type="number" min="2" max="1000" value="250" name="popsize"><br>
                <h4>Mutation Rate:</h4>
                <input type="number" min="0" max="1" value="0.1" step="0.1" name="mutationrate"><br>
                <div><input type="submit"><input type="reset"></div>
            </form>
        </div>
    </div>
    <div class="dropdown">
        <button class="dropbtn" onclick="toggleDropDown(this)">
            Traveling Salesman Genetic Algorithm
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" style="display: none">
            <form action="TravelingSalesMan.php" method="get">
                <h4>Array:</h4>
                <input type="number" min="2" max="100" value="15" name="nocities"><br>
                <h4>Population Size:</h4>
                <input type="number" min="2" max="1000" value="250" name="popsize"><br>
                <h4>Mutation Rate:</h4>
                <input type="number" min="0" max="1" value="0.1" step="0.1" name="mutationrate"><br>
                <div><input type="submit"><input type="reset"></div>
            </form>
        </div>
    </div>
    <div class="dropdown">
        <button class="dropbtn" onclick="toggleDropDown(this)">
            Insertion Sort
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" style="display: none">
            <form action="InsertionSorting.php" method="get">
                <h4>Array:</h4>
                <input id="insertionInput" type="text" name="array" value="2,6,3,1,7,9,4,5,8" pattern="([0-9],)*[0-9]" title="Format: int,int,int,..."><br>
                <input type="radio" name="preset" value="2,6,3,1,7,9,4,5,8" checked onclick="presetChanged(this, 'insertionInput')">Random<br>
                <input type="radio" name="preset" value="1,2,3,4,5,6,7,8,9" onclick="presetChanged(this, 'insertionInput')">Ascending<br>
                <input type="radio" name="preset" value="9,8,7,6,5,4,3,2,1" onclick="presetChanged(this, 'insertionInput')">Descending<br>
                <div><input type="submit"><input type="reset"></div>
            </form>
        </div>
    </div>
    <div class="dropdown">
        <button class="dropbtn" onclick="toggleDropDown(this)">
            Selection Sort
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" style="display: none">
            <form action="SelectionSorting.php" method="get">
                <h4>Array:</h4>
                <input id="selectionInput" type="text" name="array" value="2,6,3,1,7,9,4,5,8" pattern="([0-9],)*[0-9]" title="Format: int,int,int,..."><br>
                <input type="radio" name="preset" value="2,6,3,1,7,9,4,5,8" checked onclick="presetChanged(this, 'selectionInput')">Random<br>
                <input type="radio" name="preset" value="1,2,3,4,5,6,7,8,9" onclick="presetChanged(this, 'selectionInput')">Ascending<br>
                <input type="radio" name="preset" value="9,8,7,6,5,4,3,2,1" onclick="presetChanged(this, 'selectionInput')">Descending<br>
                <div><input type="submit"><input type="reset"></div>
            </form>
        </div>
    </div>
    <div class="dropdown">
        <button class="dropbtn" onclick="toggleDropDown(this)">
            Merge Sort
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content" style="display: none" id="currentOpen">
            <form action="MergeSorting.php" method="get">
                <h4>Array:</h4>
                <input id="mergeInput" type="text" name="array" value="2,6,3,1,7,9,4,5,8" pattern="([0-9],)*[0-9]" title="Format: int,int,int,..."><br>
                <input id="presetSelector" type="radio" name="preset" value="2,6,3,1,7,9,4,5,8" checked onclick="presetChanged(this, 'mergeInput')">Random<br>
                <input type="radio" name="preset" value="1,2,3,4,5,6,7,8,9" onclick="presetChanged(this, 'mergeInput')">Ascending<br>
                <input type="radio" name="preset" value="9,8,7,6,5,4,3,2,1" onclick="presetChanged(this, 'mergeInput')">Descending<br>
                <div><input type="submit"><input type="reset"></div>
            </form>
        </div>
    </div>
</nav>
<span id="openbtn" onclick="openNav()">☰ Menu</span>
<h1>Merge Sort</h1>
<div class="controls">
    <button class="controlButtons" onclick='makeStep()'>Step</button>
    <button class="controlButtons" onclick='play()' id='playbutton'>Play</button>
</div>
<div class="controls">
    (fast)<input class="controlButtons" type='range' min='1' max='1000' oninput='updateInterval(this)' id='interval' value='500' title="Pace">(slow)
</div>
<div class="content">
    <div id="container"></div>
</div>
<div class="explanation">
    <h3>Pseudo Code:</h3>
    <ul>
        <li><b>MergeSort</b>(A,l,r)</li>
        <li><ul>
                <li><b>if</b> l < r <b>then</b></li>
                <li><ul>
                        <li>m := (l+r)/2</li>
                        <li><b>MergeSort</b>(A,l,m)</li>
                        <li><b>MergeSort</b>(a,m+1,r)</li>
                        <li><b>Merge</b>(A,l,m,r)</li>
                    </ul></li>
            </ul></li>
    </ul>
    <ul>
        <li><b>Merge</b>(A,l,m,r)</li>
        <li><ul>
                <li>Take the smallest of the two first elements of the segments A[l..m] and A[m+1..r] and put it into an auxiliary array. Repeat this, until both segments are empty. Copy the auxiliary array into A[l..r].</li>
            </ul></li><br><br>
        <li><b>Merge Sort:</b><br>
            Like QuickSort, Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves. ...<br>
            <a href="https://www.geeksforgeeks.org/merge-sort/" target="_blank">read more</a></li>
    </ul>

</div>
<?php
if (isset($_GET['array'])) {
    $arr = $_GET['array'];
} else {
    $arr = "2,6,3,1,7,9,4,5,8";
}
echo "<script>main([" . $arr . "])</script>";
?>
</body>
</html>