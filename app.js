function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let obstacles = []
let bonus = []
let opponents = []
let frames =0


window.addEventListener("keydown", moveDetect)

const playerPoints = document.getElementById("player_points")
let points = 0
playerPoints.textContent = points


class Circle {
  constructor(){
    this.radius = 10
    this.x = Math.ceil(Math.random() * (canvas.width-20) + 1);
    this.y = -5
    this.speed = 1.2
  }
  update()
  {
      this.y += this.speed
  }
  draw()
  {
    ctx.fillStyle = "#666776"
    ctx.beginPath();
    ctx.arc(this.x,this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath()

  }
}


class BonusCircle{
    constructor(){
        this.radius = 10
        this.x = Math.ceil(Math.random() * canvas.width + 1);
        this.y = -5
        this.speed = 2.5
      }
      update()
      {
          this.y += this.speed
      }
      draw()
      {
        ctx.fillStyle = "#fee440"
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

      }
}

class Opponent{
    constructor(){
        this.radius = 10
        this.x = Math.ceil(Math.random() * canvas.width + 1);
        this.y = -5
        this.speed = 1
      }
      update()
      {
          this.y += this.speed
      }
      draw()
      {
        ctx.fillStyle = "#d90429"
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

      }
}


class Player{

    constructor()
    {
        this.x = 150
        this.y = 440
        this.width = 100
        this.height = 20
    }
    moveToRight()
    {
        this.x += 20
    }
    moveToLeft()
    {
        this.x -= 20
    }
    draw()
    {
        ctx.fillStyle = "#2b2d42";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function clear()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function moveDetect(event)
{
    switch (event.key) {
        case "ArrowLeft":
        case 'a':
          if(player.x > 0)
          {
            player.moveToLeft()
          }
          break;
        case "d":
        case "ArrowRight":
          if(player.x < canvas.width - 100)
          {
              player.moveToRight()
          }
          break;
      }
}

function handleBonuses()
{
    if(frames % 1000 == 0)
    {
        bonus.push(new BonusCircle())
    }

    for(let i=0;i<bonus.length;i++)
    {
        bonus[i].update()
        bonus[i].draw()
    }
    for(let i=0;i<bonus.length;i++)
    {
        if(bonus[i].y > 440)
        {
            if(bonus[i].x > player.x && bonus[i].x < player.x + 100)
            {
                bonus.shift()
                points+=2
                playerPoints.textContent = points
            }
        }
        
        else if(bonus[i].y > 520){
            bonus.shift()
        }
    }

}

function handleCricles()
{
    if(frames % 200 == 0)
    {
        obstacles.push(new Circle())
    }


    for(let i=0;i<obstacles.length;i++)
    {
        obstacles[i].update()
        obstacles[i].draw()
    }
    for(let i=0;i<obstacles.length;i++)
    {
        if(obstacles[i].y > 440)
        {
            if(obstacles[i].x > player.x && obstacles[i].x < player.x + 100)
            {
                obstacles.shift()
                points++
                playerPoints.textContent = points
            }
        
        }
        if(obstacles[i].y >= 500 + obstacles[i].radius)
        {
            obstacles.shift()
            points = 0
            playerPoints.textContent = points

            canvas.style.boxShadow = " 0px 0px 20px -1px rgba(217, 4, 41, 1)"
            setTimeout(function(){
                canvas.style.boxShadow = "0px 0px 0px 0px rgba(217, 4, 41, 1)" 
            }, 500)
     
        }
    }
}


function handleOpponents()
{
    if(frames % 400 == 0)
    {
        opponents.push(new Opponent())
    }


    for(let i=0;i<opponents.length;i++)
    {
        opponents[i].update()
        opponents[i].draw()
    }
    for(let i=0;i<opponents.length;i++)
    {
        if(opponents[i].y == 440)
        {
            if(opponents[i].x > player.x && opponents[i].x < player.x + 100)
            {
                opponents.shift()
                canvas.style.boxShadow = " 0px 0px 20px -1px rgba(217, 4, 41, 1)"
                setTimeout(function(){
                    canvas.style.boxShadow = "0px 0px 0px 0px rgba(217, 4, 41, 1)" 
                }, 500)
                points = 0
                playerPoints.textContent = points
            }
        }
        else if(opponents[i].y >= 500 + opponents[i].radius)
        {
            opponents.shift()
            playerPoints.textContent = points
        }
        }
  
}
const player = new Player()

function game()
{

    clear()
    player.draw()
    handleCricles()
    handleBonuses()
    handleOpponents()
    frames++
    requestAnimationFrame(game)
}

game()