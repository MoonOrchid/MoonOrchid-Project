var table = document.getElementById('table');
var input = document.getElementById('btn');

var dif = document.getElementById('dif');

input.setAttribute('type', 'hidden');
var go = document.getElementById('go');
go.onclick = function () {
    var gameOver = false;
    var enemyNumber = dif.value;
    function createTable() {
        for (var i = 0; i < 13; i++) {
            var row = document.createElement('tr');
            table.appendChild(row);
            for (var j = 0; j < 25; j++) {
                var cell = document.createElement('td');
                if (i != 0 && i != 12 && (j != 0 && j != 24)) {
                    cell.style.color = 'white';
                    cell.innerText = '0';
                    cell.style.background = 'url(images/grass.jpg)';
                }
                else {
                    cell.style.color = 'black';
                    cell.innerText = '+';
                    cell.style.background = 'url(images/stump100.png),url(images/grass.jpg)';
                }
                if (i == 0 && j == 0) {
                    cell.style.color = 'green';
                    cell.innerText = 'X';
                    cell.style.background = 'url(images/Nakov50.png),url(images/grass.jpg)';
                }
                cell.style.width = 50 + 'px';
                cell.style.height = 50 + 'px';
                row.appendChild(cell);
            }
        }
    }
    createTable();
    var playerX = 0;
    var playerY = 0;
    var queue = [];
    window.onkeydown = function (e) {
        if (!gameOver) {
            var code = e.keyCode ? e.keyCode : e.which;
            if (code === 39) { //right key
                if (playerX < 24) {
                    move(1, 0, 'x');
                    playerX += 1;
                }

            } else if (code === 37) { //left key
                if (playerX > 0) {
                    move(-1, 0, 'x');
                    playerX -= 1;
                }
            } else if (code === 38) { //up key
                if (playerY > 0) {
                    move(0, -1, 'y');
                    playerY -= 1;
                }
            } else if (code === 40) { //down key
                if (playerY < 12) {
                    move(0, +1, 'y');
                    playerY += 1;
                }
            }
        }
    };
    var canMove = true;
    function move(x, y, dir) {

        var player = table.childNodes[playerY + 1 + y].childNodes[playerX + x];
        var prev = player.style.color;
        var prevText = player.innerText;
        player.style.color = 'green';
        player.innerText = 'X';
        player.style.background = 'url(images/Nakov50.png),url(images/grass.jpg)';
        var lastPosition = null;

        lastPosition = table.childNodes[playerY + 1].childNodes[playerX];
        if (prev == 'white') {
            queue.push(lastPosition);
            lastPosition.style.color = 'yellow';
            lastPosition.style.background = 'url(images/stump75.png),url(images/grass.jpg)';
        }
        else if (prev == 'yellow') {
            gameOver = true;
        }
        else {
            if (queue.length > 0) {
                for (var i = 0; i < queue.length; i++) {
                    queue[i].style.color = 'black';
                    queue[i].style.background = 'url(images/stump100.png),url(images/grass.jpg)';
                }
            }
            queue = [];
            lastPosition.style.color = 'black';
            lastPosition.style.background = 'url(images/stump100.png),url(images/grass.jpg)';
        }
        if (lastPosition.innerText == '+') {
            lastPosition.style.color = 'black';
            lastPosition.style.background = 'url(images/stump100.png),url(images/grass.jpg)';
        }
        lastPosition.innerText = '+';
    }

    var enemyList = [];
    function randGen() {
        var randY = 0;
        while (randY < 2 || randY > 12) {
            randY = Math.floor(Math.random() * 100);
        }
        var randX = 0;
        while (randX < 1 || randX > 23) {
            randX = Math.floor(Math.random() * 100);
        }
        return [randX, randY];
    }
    function createEnemy() {
        for (var i = 0; i < enemyNumber; i++) {
            var p = randGen();
            var enemy = table.childNodes[p[1]].childNodes[p[0]];
            enemy.innerText = 'H';
            enemy.style.background = 'url(images/sheepcopy.png),url(images/grass.jpg)';
            enemy.style.color = 'blue';
            var dir = randGen();
            if (dir[0] < 12) {
                dir[0] = -1;
            }
            else {
                dir[0] = 1;
            }
            if (dir[1] < 6) {
                dir[1] = -1;
            }
            else {
                dir[1] = 1;
            }
            enemyList.push([enemy, dir[0], dir[1], p[0], p[1]]);
        }
    }
    createEnemy();
    enemyMove();


    function enemyMove() {
        if (!gameOver) {
            var isFree = true;
            for (var i = 0; i < enemyList.length; i++) {
                var y = enemyList[i][4];
                var x = enemyList[i][3];
                if (table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]].innerText == '+'
                    || table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]] == undefined
                    || table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]].innerText == 'X') {

                    if (table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]].style.color == 'yellow') {
                        gameOver = true;
                    } else {
                        var count = 0;
                        while (table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]].innerText == '+'
                            || table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]] == undefined
                            || table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]].innerText == 'X') {
                            var dir2 = randGen();
                            if (dir2[0] < 12) {
                                dir2[0] = -1;
                            }
                            else {
                                dir2[0] = 1;
                            }
                            if (dir2[1] < 6) {
                                dir2[1] = -1;
                            }
                            else {
                                dir2[1] = 1;
                            }
                            console.log(enemyList[i][2]);
                            enemyList[i][2] = dir2[1];
                            enemyList[i][1] = dir2[0];
                            console.log(enemyList[i][2]);
                            count++;
                            if (count > 30) {
                                isFree = false;
                                break;
                            }
                        }
                    }

                }

                if (isFree && enemyList[i][0].innerText != 'F') {
                    enemyList[i][0].innerText = '0';
                    enemyList[i][0].style.color = 'white';
                    enemyList[i][0].style.background = 'url(images/grass.jpg)';
                    enemyList[i][0] = table.childNodes[y + enemyList[i][2]].childNodes[x + enemyList[i][1]];
                    enemyList[i][0].innerText = 'H';
                    enemyList[i][0].style.background = 'url(images/sheepcopy.png),url(images/grass.jpg)';
                    enemyList[i][0].style.color = 'blue';
                    enemyList[i][4] = y + enemyList[i][2];
                    enemyList[i][3] = x + enemyList[i][1];
                }
                else if (!isFree) {
                    enemyList[i][0].innerText = 'F';
                    enemyList[i][0].style.color = 'pink';
                    isFree = true;
                }
            }

        }
    }

    var abc = input.onclick = function () {
        window.location.reload();
        enemyNumber = 2;
        gameOver = false;
    }
    setInterval(function () { enemyMove(); }, 1000);

}


 
