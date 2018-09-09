function instructionMsg() {
    alert("Each player then takes turns picking a tile on the opposing player's grid, taking a shot at that tile. If the tile contains a ship, the shot is a HIT. If the tile does not contain a ship, the shot is a MISS. A ship is sunk if all the tiles for that ship have been marked as a HIT. The game ends when one player has sunk all of the opposing players ships.");
}

function createTenByTenBoard(num, tittle) {
  var rowOpen = "<tr>\n";
  var rowClose = "</tr>\n";
  var cellOpen = "<td class='cell' id='";
  var cellClose = "'></td>\n";
  var tableContent = `<table class='table${num}' id='table${num}'>\n`;
  tableContent += tittle;
  for(var i = 1; i < 11; i++) {
    tableContent += rowOpen;
    for(var j = 0; j < 10; j++) {
      var row = cellOpen;
      var letter = String.fromCharCode(65+j);
      row += letter;
      row += i;
      row += cellClose;
      tableContent += row;
    }
    tableContent += rowClose;
  }
  tableContent += "</table>\n";
  return tableContent;
}
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild; //in memory representation of DOM element
}
const tittle1 = "<caption>My Board</caption>\n";
const tittle2 = "<caption>Opponent's Board</caption>\n";
var board1 = htmlToElement(createTenByTenBoard(1, tittle1));
var board2 = htmlToElement(createTenByTenBoard(2, tittle2));
document.getElementById("board1").appendChild(board1);
document.getElementById("board2").appendChild(board2);
const cells = document.querySelectorAll('.cell');

const templateShip = {
  Carrier: {
    length: 5
  },
  Battleship: {
    length: 4
  },
  Cruiser: {
    length: 3
  },
  Submarine: {
    length: 3
  },
  Destroyer: {
    length: 2
  }
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max + 1);
}

function createShip(ship) {

  let listCoordinate = [];
  var HorV = getRandomInt(2); //1->horizontal 2->vertical
  var rowcol = getRandomInt(10);
  if (HorV === 2) { //2->v get col A-F
    var index = rowcol + 64;  //A 65
    rowcol = String.fromCharCode(index);
  }  //now I know which row or col my ship is
  var first = getRandomInt(ship.length+1);
  if (HorV === 1) {
    var index = 64 + first;
    for (var i = 0; i < ship.length; i++) {
      var col = String.fromCharCode(index + i);
      var coordinate = col + rowcol;
      listCoordinate.push(coordinate);
    }
  } else {
    for (var i = 0; i < ship.length; i++) {
      var row = first + i;
      var coordinate = rowcol + row;
      listCoordinate.push(coordinate);
    }
  }
  return listCoordinate;
}

function overlap(occupied, listCoordinate) {
  for (var i in listCoordinate) {
    if (occupied.includes(listCoordinate[i])) return false;
  }
  return true; //false if overlap
}

function setup(shipList,tableid) {
  var occupied = [];
  for (var ship in shipList) {
    while (true) {
      var listCoordinate = createShip(shipList[ship]);
      if (overlap(occupied, listCoordinate)) {
        break;
      }
    }
    shipList[ship].location = listCoordinate;
    occupied = occupied.concat(listCoordinate);
    for (let i in listCoordinate) {
      var query = "#" + tableid + " #" + listCoordinate[i];
      document.querySelector(query).style.backgroundColor = "coral";
    }
  }
  addStatus(shipList);
  return shipList;
}

function addStatus(shipList) {
  for (let ship in shipList) {
    let location = shipList[ship].location;
    shipList[ship].status = {};
    location.forEach((element) => {
      shipList[ship].status[element] = false;
    });
  }
}

const hit = 'H';
const miss = 'O';
var myShip = JSON.parse(JSON.stringify(templateShip));
var opShip = JSON.parse(JSON.stringify(templateShip));

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  for (var i = 100; i < cells.length; i++) { //cells.length
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
  for (var i = 0; i < 100; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
  }
  setup(myShip,"table1");
  setup(opShip,"table2");
}

function turnClick(grid) {
  let query1 = '#table2 #' + grid.target.id;
  turn(grid.target.id, query1, opShip);
  let row = getRandomInt(10);
  let col = getRandomInt(10) + 64;
  col = String.fromCharCode(col);
  let id = col + row;
  let query = '#table1 #' + col + row;
  if (gameOver(myShip, opShip)) turn(id, query, myShip);
}

function turn(id, query, shipList) {
  if (hitormiss(id, shipList)) {
    document.querySelector(query).innerText = hit;
  } else {
    document.querySelector(query).innerText = miss;
  }
}

function hitormiss(coordinate, shipList) {
  for (let ship in shipList) {
    let status = shipList[ship].status;
    for (let i in status) {
      if (coordinate === i) {
        status[i] = true;
        return true;
      }
    }
  }
  return false;
}

function gameOver(my, op) {
  console.log(ifAllSink(my));
  if (ifAllSink(my)) {
    declareWinner("Opponent");
  } else if (ifAllSink(op)) {
    declareWinner("You");
  } else {
    return true;
  }
}

function ifAllSink(shipList) { //true if all sink
  for (let ship in shipList) {
    let status = shipList[ship].status;
    for (let i in status) {
      if (status[i] === false) return false;
    }
  }
  return true;
}

function declareWinner(player) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = player + " Won";
}


