<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Algorithms Visualized</title>
    <link rel="stylesheet" href="Styles/Main.css">
    <link rel="stylesheet" href="Styles/font-awesome-4.7.0/css/font-awesome.min.css">
    <script type="text/javascript" src="Scripts/Menu.js"></script>
    <script type="text/javascript" src="Scripts/TravelingSalesMan.js"></script>
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
        <div class="dropdown-content" style="display: none" id="currentOpen">
            <form action="TravelingSalesMan.php" method="get">
                <h4>No Cities:</h4>
                <input type="number" min="2" max="100" value="15" name="nocities" id="noCities"><br>
                <h4>Population Size:</h4>
                <input type="number" min="2" max="1000" value="250" name="popsize" id="popSize"><br>
                <h4>Mutation Rate:</h4>
                <input type="number" min="0" max="1" value="0.1" step="0.1" name="mutationrate" id="mutationRate"><br>
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
                <input id="presetSelector" type="radio" name="preset" value="2,6,3,1,7,9,4,5,8" checked onclick="presetChanged(this, 'selectionInput')">Random<br>
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
        <div class="dropdown-content" style="display: none">
            <form action="MergeSorting.php" method="get">
                <h4>Array:</h4>
                <input id="mergeInput" type="text" name="array" value="2,6,3,1,7,9,4,5,8" pattern="([0-9],)*[0-9]" title="Format: int,int,int,..."><br>
                <input type="radio" name="preset" value="2,6,3,1,7,9,4,5,8" checked onclick="presetChanged(this, 'mergeInput')">Random<br>
                <input type="radio" name="preset" value="1,2,3,4,5,6,7,8,9" onclick="presetChanged(this, 'mergeInput')">Ascending<br>
                <input type="radio" name="preset" value="9,8,7,6,5,4,3,2,1" onclick="presetChanged(this, 'mergeInput')">Descending<br>
                <div><input type="submit"><input type="reset"></div>
            </form>
        </div>
    </div>
</nav>
<span id="openbtn" onclick="openNav()">☰ Menu</span>

<h1>Traveling Salesman Genetic Algorithm</h1>
<h4 id='currentBest'></h4>
<div class="content-canvas">
<canvas id="myCanvas" height="500" width="500">Canvas</canvas>
<canvas id="alphaCanvas" height="500" width="500">Alpha Canvas</canvas>
</div>
<div class="controls">
    <button onclick='makeStep()'>Step</button>
    <button onclick='play()' id='playbutton'>Play</button>
</div>
<div class="controls">
    (fast)<input type='range' min='1' max='1000' oninput='updateInterval(this)' id='interval' value='1' title="Pace">(slow)
</div>
<div class="explanation">
    <h3>Idea:</h3>
    <ul>
        <li><b>Step 1:</b> Generate Population of random Arrays</li>
        <li><b>Step 2:</b> Evaluate their Genes and give each a Fitness Value</li>
        <li><b>Step 3:</b> Use the Fitness Value to select Parents for a new Generation</li>
        <li><b>Step 4:</b> Select at random Individuals for Mutation</li>
        <li><b>Step 5:</b> Replace old Generation with new one</li>
        <li><b>Repeat</b> 2-5</li><br><br>
        <b>Travelling Salesman Problem (TSP):</b><br>
        Given a set of cities and distance between every pair of cities, the problem is to find the shortest possible route that visits every city
        exactly once and returns back to the starting point....<br>
        <a href="https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-implementation/" target="_blank">read more</a>
    </ul>
</div>

<?php
if(isset($_GET['nocities'])) {
    $noCities = $_GET['nocities'];
} else {
    $noCities = 15;
}

if(isset($_GET['popsize'])) {
    $popSize = $_GET['popsize'];
} else {
    $popSize = 250;
}

if(isset($_GET['mutationrate'])) {
    $mutationRate = $_GET['mutationrate'];
} else {
    $mutationRate = 0.1;
}

echo "<script>main(" . $noCities . "," . $popSize . "," . $mutationRate . ")</script>";
?>
</body>
</html>
