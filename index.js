'use strict';

var wind = ' ';
var wall = 'X';

function new_map(width, height) {
  var map = [];
  for (var y=0; y<height; ++y) {
    var row = '';
    for (var x=0; x<width; ++x) {
      row += Math.random() < 0.25 ? wind : wall;
    }
    map.push(row);
  }
  return map;
}

function map_str(map) {
  return map.join('\n');
}

function next_generation(last, strategy) {
  var width  = last[0].length;
  var height = last.length;

  // convenience functions
  function last_at(x, y) {
    if (strategy == 'wrap') {
      // wrap around
      x = (x + width) % width;
      y = (y + height) % height;
      return last[y][x];
    } else {
      // assume wall
      if (x < 0 || y < 0 || x >= width || y >= height) {
        return wall;
      }
      return last[y][x];
    }
  }
  function last_window(x, y) {
    return last_at(x, y) == wind ? 1 : 0;
  }
  function neigh_windows(x, y) {
    // neighboring windows, including self
    return                         last_window(x, y - 1) +
           last_window(x - 1, y) + last_window(x, y    ) + last_window(x + 1, y) +
                                   last_window(x, y + 1);
  }

  var next = [];
  for (var y=0; y<height; ++y) {
    var row = '';
    for (var x=0; x<width; ++x) {
      var nw = neigh_windows(x, y);
      row += (nw == 2 || nw == 3) ? wind : wall;
    }
    next.push(row);
  }
  return next;
}

function browser_main(canvas) {
  const width = 10;
  const height = 5;
  const pixel = 20; // how many pixels wide/tall is a wall/window
  var m = new_map(width, height);

  // set the layout box to be `pixel` times as big in each dimention for big pixels
  canvas.style.width = (width * pixel) + 'px';
  canvas.style.height = (height * pixel) + 'px';
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  //ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
  ctx.fillStyle = "brown";

  function draw() {
    for (let y in m) {
      var row = m[y];
      for (let x in row) {
        ctx.fillStyle = row[x] == wall ? "brown" : "lightblue";
        ctx.fillRect(x, y, 1, 1);
      }
    }

    m = next_generation(m);
  }

  return draw;
}

function cli_main() {
  var m = new_map(10, 5);
  for (var i=0; i<10; ++i) {
    console.log('\ngeneration ' + i + ':');
    console.log(map_str(m));
    m = next_generation(m);
  }
}

cli_main();
