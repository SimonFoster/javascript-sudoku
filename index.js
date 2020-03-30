var fs = require('fs');

var contents = fs.readFileSync('DATA', 'utf8');
let grid = JSON.parse(contents);
console.log(grid);

    
function possible(x,y,n){
    for (i = 0; i < 9; i++) {
        if ( grid[x][i] === n ) {
            return false;
        }
        if ( grid[i][y] === n ) {
            return false;
        }
    }

    let x0 = Math.floor(x/3)*3;
    let y0 = Math.floor(y/3)*3;

    for ( let i of [0,1,2] ){
        for ( let j of [0,1,2 ]){
            if ( grid[x0+i][y0+j] === n ){
                return false;
            }
        }
    }
    return true;
}
    
function show(){
    for ( let row of grid ){
        console.log(JSON.stringify(row));
    }
}

function solve(){
    for ( let x = 0; x < 9; x++){
        for ( let y = 0; y < 9; y++){
            if ( grid[x][y] == 0 ){
                for ( let n = 1; n <=9; n++ ){
                    if ( possible( x, y, n )){
                        grid[x][y] = n;
                        solve();
                        grid[x][y] = 0;
                    }
                }
                return;
            }
        }
    }
    show();   
}

solve();