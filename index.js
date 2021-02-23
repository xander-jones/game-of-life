var gol;

function initGameOfLife(x, y) {
  console.log("Initializing an {$x} by {$y} Game of Life board");
  gol = create2DArray(10);
  golDiv = document.getElementById("the_game");
}

function create2DArray(size) {
  var arr = [];
  for (var i=0;i<size;i++) {
     arr[i] = [];
  }
  return arr;
}
