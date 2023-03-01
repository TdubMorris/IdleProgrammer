var Game = function () {
    this.lines = 0;
    this.perClick = 1;
    this.perSec = 0;

    this.maxvaluelines = this.lines;
    this.currentWebLevel = 0

    this.websiteupgrades = [
        {"cost" : 0, "name" : "stage0"},
        {"cost" : 100, "name" : "stage1"},
        {"cost" : 1000, "name" : "stage2"},
    ];

    this.basecosts = {
        "water": 100,
        "tea": 500,
        "coffee": 1000,
        "stackoverflow": 1500,
    }

    this.upgradeAmounts = {
        "water": 1,
        "tea": 2,
        "coffee": 3,
        "stackoverflow": 3,
    }

    this.priceMultipliers = {
        "water": 1.1,
        "tea": 1.1,
        "coffee": 1.2,
        "stackoverflow": 1.2,
    }

    this.currentCosts = {
        "water": this.basecosts.water,
        "tea": this.basecosts.tea,
        "coffee": this.basecosts.coffee,
        "stackoverflow": this.basecosts.stackoverflow,
    }

    this.syncedClasses = {
        "lineOutput": "this.lines",
        "perClickOut": "this.perClick",
        "perSecOut": "this.perSec",
        "waterCost": "this.currentCosts.water",
        "teaCost": "this.currentCosts.tea",
        "coffeeCost": "this.currentCosts.coffee",
        "stackoverflowCost": "this.currentCosts.stackoverflow",
    }

    let _this = this;
    setInterval(function () {
        _this.lines += _this.perSec;
        _this.update();
    }, 1000);

    this.update();
}

Game.prototype.increment = function () {
    this.lines += this.perClick;
    this.update();
}

Game.prototype.update = function () {
    // Update synced classes
    for (var i in this.syncedClasses) {
        var elements = document.getElementsByClassName(i);
        for (var j = 0; j < elements.length; j++) { // This is basically the same as saying "for each element in elements" but it's what github copilot suggested so i guess ill go with it
            elements[j].innerHTML = eval(this.syncedClasses[i]);
        }
    }

    if (this.lines > this.maxvaluelines) {
        this.maxvaluelines = this.lines;
    }

    // Check if the user is on the last level
    if (this.currentWebLevel == Object.keys(this.websiteupgrades).length - 1) {
        document.getElementById("WebUpgrade").style.display = "none";
    } else {
        if (this.lines >= this.websiteupgrades[this.currentWebLevel + 1]["cost"]) {
            document.getElementById("WebUpgrade").style.display = "block"; 
        } else {
            document.getElementById("WebUpgrade").style.display = "none"; 
        }
    }
}

Game.prototype.upgradeWeb = function () {
    for (var i in this.websiteupgrades) {
        if (this.maxvaluelines >= this.websiteupgrades[i]["cost"]) {
            // Hide all stages, then show the current one
            for (var j in this.websiteupgrades) {
                document.getElementById(this.websiteupgrades[j]["name"]).style.display = "none";
            }
            document.getElementById(this.websiteupgrades[i]["name"]).style.display = "block";
            this.currentWebLevel = parseInt(i);
        }
    }
    this.update();
}

Game.prototype.purchasePerClick = function (item) {
    if (this.lines >= this.currentCosts[item]) {
        this.lines -= this.currentCosts[item];
        this.perClick += this.upgradeAmounts[item];
        this.currentCosts[item] *= this.priceMultipliers[item];
        this.currentCosts[item] = Math.round(this.currentCosts[item]); // Round it
        this.update();
    }
}

Game.prototype.purchasePerSec = function (item) {
    if (this.lines >= this.currentCosts[item]) {
        this.lines -= this.currentCosts[item];
        this.perSec += this.upgradeAmounts[item];
        this.currentCosts[item] *= this.priceMultipliers[item];
        this.currentCosts[item] = Math.round(this.currentCosts[item]); // Round it
        this.update();
    }
}