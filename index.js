console.log( process.argv );

var fs = require('fs');

var contents = fs.readFileSync(process.argv[2], 'utf8');

contents.split('\n').map( ( line, index)  => {
  console.log( `\nProcessing ${index} "${line}" ${line.length}` );
  let p = line.split('')
  .map( ch => {
    if ( ch === '.' ) return 0;
    return parseInt(ch);
  });
  let puzzle = [];
  while ( p.length > 0 ){
    puzzle.push( p.splice(0,9));
  }
  solve( puzzle );
});

function possible(p, x, y, n) {
  for (i = 0; i < 9; i++) {
    if (p[x][i] === n) {
      return false;
    }
    if (p[i][y] === n) {
      return false;
    }
  }

  let x0 = Math.floor(x / 3) * 3;
  let y0 = Math.floor(y / 3) * 3;

  for (let i of [0, 1, 2]) {
    for (let j of [0, 1, 2]) {
      if (p[x0 + i][y0 + j] === n) {
        return false;
      }
    }
  }
  return true;
}

function show(p) {
  for (let row of p) {
    console.log(JSON.stringify(row));
  }
}

function solve(p) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (p[x][y] == 0) {
        for (let n = 1; n <= 9; n++) {
          if (possible(p, x, y, n)) {
            p[x][y] = n;
            solve(p);
            p[x][y] = 0;
          }
        }
        return;
      }
    }
  }
  show(p);
}

solve();