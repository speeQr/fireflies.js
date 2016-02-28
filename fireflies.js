(function() {
    var mainCanvas = document.getElementById("fireflyCanvas");
    var mainContext = mainCanvas.getContext('2d');
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var canvasWidth = mainCanvas.width;
    var canvasHeight = mainCanvas.height;
    var midX = canvasWidth / 2;
    var midY = canvasHeight / 2;
    var fireflies = [];

    var firefly = new Image();
    firefly.src = '/assets/img/firefly.png';

    firefly.onload = function() {
        createFireflies();
    };

    var fireflies = {},
        fireflyIndex = 0,
        numFireflies = 28;

    var Firefly = function() {

        var settings = {
            alpha: 0,
            maxAlpha: Math.random() * 1 + .25,
            radius: Math.random() * 250,
            speed: .1 + Math.random() * 1.2,
            size: Math.random() * 22 + 12,
            xPos: Math.round(Math.random() * canvasWidth),
            yPos: Math.round(Math.random() * canvasHeight - 200),
            maxLife: Math.round(Math.random() * 15000 + 1000),
            counter: 0,
            direction: Math.round(Math.random())
        };

        //apply settings to firefly
        for (var prop in settings) {
            if (settings.hasOwnProperty(prop)) {
                this[prop] = settings[prop];
            }
        }

        //set the direction of the circle motion
        if (this.direction === 0) {
            this.direction = -1;
        }

        // Add new particle to the index
        fireflyIndex++;
        fireflies[fireflyIndex] = this;
        this.id = fireflyIndex;

        //fade in
        TweenLite.to(this, 1, { alpha: this.maxAlpha });

        //if fly dies, fade to zero and generate a new one. 
        var that = this;
        setTimeout(function() {
            //fade out
            TweenLite.to(that, 1, {
                alpha: 0,
                onComplete: populateFly,
                onCompleteParams: [that.id],
                overwrite: "auto"
            });
        }, this.maxLife);
    }

    Firefly.prototype.update = function() {
        //movement
        this.counter += this.speed;

        var newX = this.xPos + (this.direction * (Math.cos(this.counter / 100) * this.radius));
        var newY = this.yPos + Math.sin(this.counter / 100) * this.radius;

        mainContext.globalAlpha = this.alpha;
        mainContext.drawImage(firefly, newX, newY, this.size, this.size);
    }

    function populateFly(id) {
        delete fireflies[id];

        var that = this;
        var randNum = Math.random() * 10000;

        setTimeout(function() {
            new Firefly();
        }, that.randNum);

    }

    var createFireflies = function() {

        //create flies based on numFireflies
        for (var i = 0; i < numFireflies; i++) {
            new Firefly();
        }

        draw();
    }

    var draw = function() {
        mainContext.clearRect(0, 0, canvasWidth, canvasHeight);

        //updates every item in object
        for (i in fireflies) {
            fireflies[i].update();
        }
        requestAnimationFrame(draw);
    }

})();
