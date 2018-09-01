function instructionMsg() {
    alert("Each player then takes turns picking a tile on the opposing player's grid, taking a shot at that tile. If the tile contains a ship, the shot is a HIT. If the tile does not contain a ship, the shot is a MISS. A ship is sunk if all the tiles for that ship have been marked as a HIT. The game ends when one player has sunk all of the opposing players ships.");
}
function createTenByTenBoard(num) {
  var rowOpen = "<tr>\n";
  var rowClose = "</tr>\n";
  var cellOpen = "<td class='cell' row=";
  var cellClose = "'></td>\n";
  var tableContent = `<table class='table${num}'>\n`; //
  for(var i = 0; i < 10; i++) {
    tableContent += rowOpen;
    for(var j = 0; j < 10; j++) {
      var row = cellOpen;
      row += i;
      var col = " col='";
      var letter = String.fromCharCode(65+j);
      row += col += letter;
      row += cellClose;
      tableContent += row;
    }
    tableContent += rowClose;
  }
  tableContent += "</table>\n";
  return tableContent;
}
var board1 = htmlToElement(createTenByTenBoard(1));
var board2 = htmlToElement(createTenByTenBoard(2));
document.getElementById("board1").appendChild(board1);
document.getElementById("board2").appendChild(board2);
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild; //in memory representation of DOM element
}

const hit = 'H';
const miss = 'O';
const ship = [5, 4, 3, 3, 2];
const cells = document.querySelectorAll('.cell');

function startGame() {
}