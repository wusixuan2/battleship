function instructionMsg() {
    alert("Each player then takes turns picking a tile on the opposing player's grid, taking a shot at that tile. If the tile contains a ship, the shot is a HIT. If the tile does not contain a ship, the shot is a MISS. A ship is sunk if all the tiles for that ship have been marked as a HIT. The game ends when one player has sunk all of the opposing players ships.");
}
function createTenByTenBoard(num) {
  var rowOpen = "<tr>\n";
  var rowClose = "</tr>\n";
  var cellOpen = "<td class='cell' id='";
  var cellClose = "'></td>\n";
  var tableContent = `<table class='table${num}'>\n`; //
  for(var i = 1; i < 11; i++) {
    tableContent += rowOpen;
    for(var j = 0; j < 10; j++) {
      var row = cellOpen;
      row += i;
      var letter = String.fromCharCode(65+j);
      row += letter;
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
var board1 = htmlToElement(createTenByTenBoard(1));
var board2 = htmlToElement(createTenByTenBoard(2));
document.getElementById("board1").appendChild(board1);
document.getElementById("board2").appendChild(board2);
const cells = document.querySelectorAll('.cell');

var myShip = {
  shipFive: {
    length: 5,
    location:[] //array of coordinate 5 string
  },
  shipFour: {
    length: 4,
    location:[] //array of 4 string
  },
  shipThree1: {
    length: 3,
    location:[]
  },
  shipThree2: {
    length: 3,
    location:[]
  },
  shipTwo: {
    length: 2,
    location:[]
  }
};

var opShip = {
  shipFive: {
    length: 5,
    location:[] //array of coordinate 5 string
  },
  shipFour: {
    length: 4,
    location:[] //array of 4 string
  },
  shipThree1: {
    length: 3,
    location:[]
  },
  shipThree2: {
    length: 3,
    location:[]
  },
  shipTwo: {
    length: 2,
    location:[]
  }
};

const hit = 'H';
const miss = 'O';

function getRandomInt(max) {
  return Math.floor(Math.random() * max + 1);
}

function createShip(ship) {
  var HorV = getRandomInt(2); //1->horizontal 2->vertical
  var rowcol = getRandomInt(10);
  if (HorV === 2) { //2->v get col A-F
    var index = rowcol + 65;
    rowcol = String.fromCharCode(index);
  }  //now I know which row or col my ship is
  var first = getRandomInt(ship.length+1);
  if (HorV === 1) {
    var index = 65 + first - 1;
    for (var i = 0; i < ship.length; i++) {
      var col = String.fromCharCode(index + i);
      var coordinate = rowcol + col;
      ship.location.push(coordinate);
    }
  } else {
    for (var i = 0; i < ship.length; i++) {
      var row = first + i;
      var coordinate = row + rowcol;
      ship.location.push(coordinate);
    }
  }
  return ship;
}

function overlap(occupied, location) {
  for (var i in location) {
    for (var j in occupied) {
      if (location[i] === occupied[i]) {
        return false;
      }
    }
  }
  return true; //false if overlap
}

function setup(shipList) {
  var occupied = [];
  for (var ship in shipList) {
    while (true) {
      var newShip = createShip(shipList[ship]);
      if (overlap(occupied, shipList[ship].location)) {
        break;
      }
    }
    occupied.concat(newShip.location);
  }
  return shipList;
}

function startGame() {
  setup(myShip);
  setup(opShip);


  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
 //   cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

function turnClick(grid) {
  console.log(grid.target.id);
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}
