var characters = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

var popSize;
var mutationRate;
var completeMutationRate = 0.1;
var goal;

var population;
var generationCount = 0;

function Population() {
    this.population = [];
    this.totalFitness = 0;
    this.alpha;

    for(var i = 0; i<popSize; i++ ) {
        var e = new Entity();
        e.generate();
        this.population.push(e);
    }

    this.calcFitness = function () {
        this.totalFitness = 0;
        var maxFitness = 0;

        for(var i = 0; i < popSize; i++) {
            this.population[i].calcFitness();
            this.totalFitness += this.population[i].fitness;

            if(this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
                this.alpha = this.population[i];
            }
        }
    };

    this.crossOver = function () {
        var children = [];
        for(var i = 0; i< popSize; i++) {
            var parent1 = selectParent(this.totalFitness, this.population);
            var parent2 = selectParent(this.totalFitness, this.population);

            var mid =  Math.floor(Math.random() * (goal.length+1));

            children.push(new Entity(parent1.dna.substring(0, mid) + parent2.dna.substring(mid)));
        }

        this.population = children;
    };

    this.mutation = function () {
        for(var i = 0; i< popSize; i++) {
            if(Math.random() < mutationRate) {
                this.population[i].mutate();
            }
        }
    }

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
}

function Entity(genes) {
    this.dna = genes;
    this.fitness = 0;

    this.generate = function () {
        this.dna = "";
        for(var i = 0; i<goal.length; i++) {
            this.dna += randString();
        }
    };

    this.calcFitness = function () {
        var fitness = 0;
        for(var i = 0; i<goal.length; i++) {
            fitness += goal.charAt(i) === this.dna.charAt(i) ? 1 : 0;
        }

        this.fitness = Math.pow(fitness/goal.length,2);
    };

    this.mutate = function () {
        if(Math.random() < completeMutationRate) {
            this.generate();
        }else {
            var index = Math.floor(Math.random() * goal.length);
            this.dna = this.dna.substring(0, index) +
                randString() + this.dna.substring(index+1);
        }
    };
}

function randString() {
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

function main(target, populationSize, mutRate) {
    goal = target;
    popSize = populationSize;
    mutationRate = mutRate;

    document.getElementById("target").value = target;
    document.getElementById("popSize").value = popSize;
    document.getElementById("mutationRate").value = mutRate;

    document.getElementById("currentOpen").style.display = 'block';

    population = new Population();
    population.calcFitness();
    document.getElementById("currentBest").innerHTML = "Gen " + generationCount++ + ": " + population.alpha.dna + "(" + (Math.sqrt(population.alpha.fitness)*100) + "%)";
    makeChart(population.population.map(function (e) {return e.dna;}));
}

function makeStep() {
    population.crossOver();
    population.mutation();
    population.calcFitness();
    document.getElementById("currentBest").innerHTML = "Gen " + generationCount++ + ": " + population.alpha.dna + "(" + (Math.sqrt(population.alpha.fitness)*100) + "%)";
    makeChart(population.population.map(function (e) {return e.dna;}));
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
        if(population.alpha.fitness < 1 && playing) {
            loop();
        }else {
            document.getElementById("playbutton").innerHTML = "Play";
            playing = false;
        }
    }, interval);
}

var interval = 1;

function updateInterval(range) {
    interval = range.value;
}