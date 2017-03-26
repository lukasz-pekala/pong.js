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

function Player(score) {
    return {
        score: score,
        setScore: function(newScore) {
            score = newScore;
        }
    };
}

function CollisionManager(screenWidth, screenHeight, paddle1, paddle2, ball) {
    var paddle1 = paddle1;
    var paddle2 = paddle2;
    var ball = ball;
    var screenWidth = screenWidth;
    var screenHeight = screenHeight;

    var changeBallMovementIfItReachesTopOrBottom = function() {
            if(ball.y + ball.r >= screenHeight) {
                ball.dy = -ball.dy;
            } 
            else if(ball.y <= 0) {
                ball.dy = -ball.dy;
            }
    }

    var changeBallMovementIfItCollidesWithPaddle1 = function() {
        if(ball.y >= paddle1.y && ball.y <= paddle1.y + paddle1.height) {
            if(ball.x <= paddle1.x + paddle1.width) {
                ball.dx = -ball.dx;
            }
        }
    }

    var changeBallMovementIfItCollidesWithPaddle2 = function() {
        if(ball.y >= paddle2.y && ball.y <= paddle2.y + paddle2.height) {
            if(ball.x + ball.r >= paddle2.x) {
                ball.dx = -ball.dx;
            }
        }
    }

    return {
        detectAndManageCollisions: function() {
            changeBallMovementIfItReachesTopOrBottom();
            changeBallMovementIfItCollidesWithPaddle1();
            changeBallMovementIfItCollidesWithPaddle2();
        }
    };
}

(function() {

    var player1;
    var player2;
    var paddle1;
    var paddle2;
    var ball;
    var collisionManager;

    window.onload = function() {
        canvas = document.getElementById("gameCanvas");
        canvasContext = canvas.getContext('2d');

        player1 = new Player(0);
        player2 = new Player(0);

        var paddleWidth = 10;
        paddle1 = new Paddle(10, 100, 0, 0);
        paddle2 = new Paddle(paddleWidth, 100, canvas.width - paddleWidth, 0);
        ball = new Ball(canvas.width / 2, canvas.height / 2, 5, -1, -1);
        collisionManager = new CollisionManager(canvas.width, canvas.height, paddle1, paddle2, ball);
    
        canvas.addEventListener("mousemove", function(e) {
            paddle1.y = e.clientY - paddle1.height;
        });

        canvas.addEventListener("mousemove", function(e) {
            paddle2.y = e.clientY - paddle2.height;
        });
        
        setInterval(update, 1000/60);
    };

    function update() {
        drawBackground();
        drawPaddle();
        drawPaddle2();

        ball.move();
        ball.draw(canvasContext);
        collisionManager.detectAndManageCollisions();
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
        canvasContext.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    }

})();