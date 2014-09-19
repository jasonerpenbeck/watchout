// start slingin' some d3 here.

var enemyCount = 20;
var enemySize = 10;
var container = d3.select("body").append("svg").attr('width', 800).attr('height',600);
var board =  container.append('rect').attr('width',750).attr('height',550).attr('fill', 'coral');

var Enemy = function(cx,cy) {
  this.node = container.append('circle').attr('fill','green').attr('r',enemySize).attr('cx',cx).attr('cy',cy);
}

var enemyArr = [];
for(var i=0; i < enemyCount; i++) {
  randomCX = Math.max(enemySize, Math.random() * board.attr('width') - enemySize);
  randomCY = Math.max(enemySize, Math.random() * board.attr('height') - enemySize);
  enemyArr.push(new Enemy(randomCX,randomCY));
}




