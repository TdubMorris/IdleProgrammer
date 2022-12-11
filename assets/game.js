var Game = function () {
    this.lines = 0;
    this.perClick = 1;
    this.perSec = 0;

    this.maxvaluelines = this.lines;

    this.websiteupgrades = {
        0: "stage0",
        100: "stage1",
        1000: "stage2",
    };

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
        "stackoverflow": 2,
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
    setInterval(function() {
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

    for (var i in this.websiteupgrades) {
        if (this.maxvaluelines >= i) {
            // Hide all stages, then show the current one
            for (var j in this.websiteupgrades) {
                document.getElementById(this.websiteupgrades[j]).style.display = "none";
            }
            document.getElementById(this.websiteupgrades[i]).style.display = "block";
        }
    }

    if (this.lines > this.maxvaluelines) {
        this.maxvaluelines = this.lines;
    }
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