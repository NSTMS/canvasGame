const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playerX = 150
let playerY = 440
let ballX = Math.ceil(Math.random() * canvas.width + 1);
let ballY = 10
const halfWidth = canvas.width / 2
const halfHeight = canvas.height / 2 




window.addEventListener("keydown", detectKey);

function detectKey(event)
{
    let speed = 20
    switch (event.key) {
        case "ArrowLeft":
        case 'a':
          if(playerX > 0)
          {
            playerX -= speed;
          }
          break;
        case "d":
        case "ArrowRight":
          if(playerX < canvas.width - 100)
          {
            playerX += speed;
          }
          break;
      }
    drawPlayer()
}


function generateObstacle()
{
        drawCircle()
        console.log(ballY)

}

function clear()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle()
{
    const ballSize = 20
    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.arc(ballX,ballY, ballSize, 0, 2 * Math.PI);
    ctx.fill();

}

function drawPlayer()
{
    clear()
    ctx.fillStyle = "darkslategray";
    ctx.fillRect(playerX, playerY, 100, 20);
    while(ballY < 510)
    {
        setTimeout(generateObstacle(),1000)
        ballY += 10
        
    }

}

function drawLastState()
{
    drawCircle()
}

drawPlayer()

