var sizeX = 10
var sizeY = 15
var world = new Array()

var lives = 3

var worldDict = {
    0: 'black',
    1: 'wall',
    2: 'sushi',
    3: 'onigiri',
}

var ninjaman = {
    x: 1,
    y: 1,
    points: 0
}

var ghosts = {
    bluey: {
        name: "bluey",
        x: 7,
        y: 2,
    },
    pumpky : {
        name: "pumpky",
        x: 8,
        y: 6,  
    },
    scaredy: {
        name: "scaredy",
        x: 5,
        y: 6,         
    },
    pinky: {
        name: "pinky",
        x: 2,
        y: 4,        
    },
    red: {
        name: "red",
        x: 3,
        y: 12,      
    }
}

function ranElements () {
    var max = Object.keys(worldDict).length - 1
    var min = 0
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createWorld () {
    for(var y = 0; y < sizeY; y++) {
        world[y] = new Array()
        for(var x = 0; x < sizeX; x++){
            world[y][x] = ranElements()
            if(x == 0) {
                world[y][0] = 1
            }
            if(y == 0) {
                world[0][x] = 1
            }
            if(x == sizeX-1) {
                world[y][sizeX] = 1
            }
            if (y == sizeY-1) {
                world[sizeY-1][x] = 1
            }
        }
    }
    return world
}

function drawWorld () {
    output = ""
    for(var row = 0; row < world.length; row++) {
        output += "<div class='row'>"
        for(var x = 0; x < world[row].length; x++) {
            output += "<div class='" + worldDict[world[row][x]] + "'></div>"
        }
        output += "</div>"
    }
    document.getElementById('world').innerHTML = output;
}

function eat() {
    if (world[ninjaman.y][ninjaman.x] == 2) { // sushi
        world[ninjaman.y][ninjaman.x] = 0
        ninjaman.points = ninjaman.points + 10
    } 
    if (world[ninjaman.y][ninjaman.x] == 3) { // origini
        world[ninjaman.y][ninjaman.x] = 0
        ninjaman.points = ninjaman.points + 5
    } 
    document.getElementById('score_value').innerHTML = ninjaman.points;
}

document.onkeydown = function(e) {
    switch(e.keyCode) {
        case 37: // LEFT
            if (world[ninjaman.y][ninjaman.x - 1] != 1) {
                ninjaman.x--
                eat()
            } 

            break
        case 39 :  // RIGHT
            if (world[ninjaman.y][ninjaman.x + 1] != 1) {
                ninjaman.x++
                eat()
            }
            break
        case 38 : // UP
            if (world[ninjaman.y - 1][ninjaman.x] != 1) {
                ninjaman.y--
                eat()                
            }
            break
        case 40 : // DOWN
            if (world[ninjaman.y + 1][ninjaman.x] != 1) {
                ninjaman.y++
                eat()   
            }        
            break
    }
    world[ninjaman.y][ninjaman.x] = 0
    drawNinjaMan()
    drawWorld()
}

function drawNinjaMan () {
    document.getElementById('ninjaman').style.top = ninjaman.y * 40 + "px"
    document.getElementById('ninjaman').style.left = ninjaman.x * 40 + "px"
}

function drawGhosts () {
    
    document.getElementById('bluey').style.top = ghosts.bluey.y * 40 + "px"
    document.getElementById('bluey').style.left = ghosts.bluey.x * 40 + "px"

    document.getElementById('pumpky').style.top = ghosts.pumpky.y * 40 + "px"
    document.getElementById('pumpky').style.left = ghosts.pumpky.x * 40 + "px"

    document.getElementById('scaredy').style.top = ghosts.scaredy.y * 40 + "px"
    document.getElementById('scaredy').style.left = ghosts.scaredy.x * 40 + "px"

    document.getElementById('pinky').style.top = ghosts.pinky.y * 40 + "px"
    document.getElementById('pinky').style.left = ghosts.pinky.x * 40 + "px"

    document.getElementById('red').style.top = ghosts.red.y * 40 + "px"
    document.getElementById('red').style.left = ghosts.red.x * 40 + "px"
}

function drawLives () {
    if(lives < 0) {
        document.getElementById('lives_value').innerText = 0
    }
    document.getElementById('lives_value').innerText = lives
}

var counter = 0
ghostsList = Object.keys(ghosts)

function movingGhosts() {

    currentGhost = ghosts[ghostsList[counter++]]
    console.log(currentGhost.x, currentGhost.y, currentGhost.name)
    if(counter == 5) {
        counter = 0
    }

    if(currentGhost.y > ninjaman.y) {
        if (world[currentGhost.y - 1][currentGhost.x] != 1) {
            currentGhost.y--
        }
    }
    if(currentGhost.y < ninjaman.y) {
        if (world[currentGhost.y + 1][currentGhost.x] != 1) { 
            currentGhost.y++
        }
    }
    if(currentGhost.x > ninjaman.x) {
        if (world[currentGhost.y][currentGhost.x - 1] != 1) {
            currentGhost.x--
        }
    }
    if(currentGhost.x < ninjaman.x) {
        if (world[currentGhost.y][currentGhost.x + 1] != 1) {
            currentGhost.x++
        }
    }
    if(currentGhost.x == ninjaman.x && currentGhost.y == ninjaman.y) {
        lives--
    }

    drawGhosts()
    drawLives()
    var t = setTimeout(movingGhosts, 500)

    if (lives == 0) {
        clearTimeout(t)
        gameOver()
        return
    }

}

function gameOver() {
    drawLives()
    lives = 0
}

createWorld()
drawWorld()
drawNinjaMan()
drawGhosts()
drawLives()
movingGhosts()
