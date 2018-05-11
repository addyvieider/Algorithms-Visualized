var c;
var context;
var alphac;
var alphaContext;

var numCities;
var popSize;
var mutationRate;
var completeMutationRate = 0.1;

var myCities;
var myPopulation;

var generationCount = 0;

function main(noCities, populationSize, mutRate) {
    c = document.getElementById("myCanvas");
    context = c.getContext("2d");
    alphac = document.getElementById("alphaCanvas");
    alphaContext = alphac.getContext("2d");

    numCities = noCities;
    popSize = populationSize;
    mutationRate = mutRate;

    document.getElementById("noCities").value = noCities;
    document.getElementById("popSize").value = popSize;
    document.getElementById("mutationRate").value = mutRate;

    document.getElementById("currentOpen").style.display = 'block';

    myCities = new Cities();
    myCities.drawCities(context);
    myPopulation = new Population(myCities.cities);
    myPopulation.drawPopulation();
    var a = myPopulation.calcFitness();
    document.getElementById("currentBest").innerHTML = "Gen " + generationCount++ + ": " + a.distance +" distance (lower is better)";
    drawAlpha(a);
}

function makeStep() {
    myPopulation.crossOver();
    myPopulation.mutation();
    myCities.drawCities(context);
    myPopulation.drawPopulation();
    var a = myPopulation.calcFitness();
    document.getElementById("currentBest").innerHTML = "Gen " + generationCount++ + ": " + a.distance +" distance (lower is better)";
    drawAlpha(a);
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
        if(playing) {
            loop();
        }
    }, interval);
}

var interval = 1;

function updateInterval(range) {
    interval = range.value;
}

function Cities() {
    this.cities = [];
    for (var i = 0; i<numCities; i++) {
        var x = Math.floor(Math.random() * c.width);
        var y = Math.floor(Math.random() * c.height);
        this.cities.push({x:x, y:y});
    }

    this.drawCities = function(currContext) {
        currContext.clearRect(0,0,c.width,c.height);

        this.cities.forEach(function (point){
            currContext.fillRect(point.x, point.y, 5,5);
        });
    }
}

function Population(cities) {
    this.population = [];
    for (var i = 0; i < popSize; i++) {
        this.population.push(new Individual(shuffle(cities.slice(0))));
    }

    this.drawPopulation = function() {
        this.population.forEach(function (individual) {
           individual.drawIndividual(context);
        });
    };

    this.calcFitness = function (){
        var maxFitness = -1;
        var alpha;

        this.population.forEach(function (individual) {
            individual.calcFitness();

            if (maxFitness < individual.fitness){
                maxFitness = individual.fitness;
                alpha = individual;
            }
        });

        this.totalFitness = this.normalizeFitness(maxFitness);
        return alpha;
    };

    this.normalizeFitness = function (maxFitness) {
        var totalFitness = 0;
        var ratio = maxFitness/100;
        this.population.forEach(function (individual) {
            individual.fitness /= ratio;
            totalFitness += individual.fitness;
        });

        return totalFitness;
    };

    this.crossOver = function () {
        var children = [];
        for(var i = 0; i< this.population.length; i++) {
            var parent1 = selectParent(this.totalFitness, this.population);
            var parent2 = selectParent(this.totalFitness, this.population);

            var genes = new Array(parent1.genes.length);
            var start = Math.floor(Math.random() * (genes.length+1));
            var end = Math.floor(Math.random() * (genes.length-start+1)) + start;

            for (var j = start; j<end; j++) {
                genes[j] = parent1.genes[j];
            }

            var already = parent1.genes.slice(start,end+1);
            var k = 0;
            for (var j = 0; j < genes.length; j++) {
                while(parent2.genes[k] in already) {
                    k++;
                }
                genes[j] = parent2.genes[k];
                var alreadyIndex = already.indexOf(parent2.genes[k]);
                if (alreadyIndex >= 0) {
                    already.splice(alreadyIndex, 1);
                }
                k++;
            }

            children.push(new Individual(genes));
        }

        this.population = children;

    };

    var selectParent = function (totalFitness, population) {
        var r = Math.random() * totalFitness;
        var upTo = 0;
        for (var i = 0; i < population.length; i++) {
            if(upTo + population[i].fitness >= r) {
                return population[i];
            }
            upTo += population[i].fitness;
        }
    };

    this.mutation = function () {
        this.population.forEach(function (individual) {
            if(Math.random() < mutationRate) {
                if(Math.random() < completeMutationRate) {
                    individual.genes = shuffle(individual.genes);
                }else {
                    individual.mutate();
                }
            }
        });
    }
}

function Individual(genes) {
    this.genes = genes;

    this.drawIndividual = function (currContext) {
        //currContext.strokeStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        currContext.beginPath();
        currContext.moveTo(this.genes[0].x, this.genes[0].y);
        this.genes.forEach(function (gene) {
            currContext.lineTo(gene.x, gene.y);
        });
        currContext.lineTo(genes[0].x, genes[0].y);
        currContext.stroke();
    }

    this.calcFitness = function () {
        this.distance = 0;
        for (var i = 0; i<this.genes.length-1; i++) {
            var pointA = this.genes[i];
            var pointB = this.genes[i+1];

            this.distance += calcDist(pointA,pointB);
        }

        this.distance += calcDist(this.genes[0], this.genes[this.genes.length -1]);

        this.fitness = 1/(Math.pow(this.distance,4));
    }

    this.mutate = function () {

        var times = Math.random() * this.genes.length;

        for(var t = 0; t<times; t++) {
            var i = Math.floor(Math.random() * this.genes.length);
            var j = Math.floor(Math.random() * this.genes.length);

            var temp = this.genes[i];
            this.genes[i] = this.genes[j];
            this.genes[j] = temp;
        }

    }
}

function calcDist(pointA, pointB) {
    var distX = Math.abs(pointA.x - pointB.x);
    var distY = Math.abs(pointA.y - pointB.y);

    return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
}

function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

function drawAlpha(alpha) {
    alphaContext.clearRect(0,0,c.width,c.height);
    myCities.drawCities(alphaContext);
    alpha.drawIndividual(alphaContext);

}