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
  console.log(tableContent);
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
const hit = 'H';
const miss = 'O';
var myShip = {
  shipFive: {
    length: 5,
    location:[[],[],[],[],[]] //array of coordinate
  },
  shipFour: {
    length: 4,
    location:[[],[],[],[]]
  },
  shipThree1: {
    length: 3,
    location:[[],[],[]]
  },
  shipThree2: {
    length: 3,
    location:[[],[],[]]
  },
  shipTwo: {
    length: 2,
    location:[[],[]]
  }
};


function startGame() {

}
function turnClick(square) {
  turn(square.target.id, huPlayer)
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
}
cells[1].innerText = '';
cells[1].addEventListener('click', turnClick, false);