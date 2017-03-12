function Paddle(width, height, x, y) {
    return {
        width: width,
        height: height,
        // getThickness: function() {
        //     return this.width / 2;
        // },
        x: x,
        y: y
    };
}

function Ball(x, y, r, dx, dy) {
    return {
        x: x,
        y: y,
        r: r,
        dx: dx,
        dy: dy,
        move: function() {
            this.x += this.dx;
            this.y += this.dy;
        },
        draw: function(canvasContext) {
            canvasContext.fillStyle = 'white';
            canvasContext.fillRect(this.x, this.y, r, r);
        }
    };
}

(function() {

    var paddle1;
    var paddle2;
    var ball;

    window.onload = function() {
        canvas = document.getElementById("gameCanvas");
        canvasContext = canvas.getContext('2d');

        paddle1 = new Paddle(10, 100, 0, 0);
        paddle2 = new Paddle(10, 100, 0, 0); // 3rd parameter will be soon overriden by setInterval()
        ball = new Ball(canvas.width / 2, canvas.height / 2, 5, 2, 2);

        setInterval(update, 1000/30);
    };

    function update() {
        drawBackground();
        drawPaddle();
        drawPaddle2();

        ball.move();
        ball.draw(canvasContext);
    };

    function drawBackground() {
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0,0, canvas.width, canvas.height);
    };

    function drawPaddle() {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    }

    function drawPaddle2() {
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(canvas.width - paddle2.width, paddle1.y, paddle2.width, paddle2.height);
    }

})();