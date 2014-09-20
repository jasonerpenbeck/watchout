// start slingin' some d3 here.

var enemyCount = 10;
var enemySize = 10;
var playerSize = 12;
var container = d3.select("body").append("svg").attr('width', 800).attr('height',600);
var board =  container.append('rect').attr('width',750).attr('height',550).attr('fill', 'coral');



var Player = function() {
  this.x = board.attr('width') * .5;
  this.y = board.attr('height') * .5;
  this.node = container.append('circle')
                .attr('fill','purple')
                .attr('r',playerSize)
                .attr('cx',this.x)
                .attr('cy',this.y)
                .attr('class','player')
                .attr('class','draggable');
}

var player = new Player();

var Enemy = function(cx,cy) {
  this.node = container.append('circle').attr('fill','green').attr('r',enemySize).attr('cx',cx).attr('cy',cy).attr('class','enemy');
}


for(var i=0; i < enemyCount; i++) {
  randomCX = Math.max(enemySize, Math.random() * board.attr('width') - enemySize);
  randomCY = Math.max(enemySize, Math.random() * board.attr('height') - enemySize);
  new Enemy(randomCX,randomCY);
}

var update = function() {

var newXY = [];
for(var i=0; i < enemyCount; i++) {
  randomCX = Math.max(enemySize, Math.random() * board.attr('width') - enemySize);
  randomCY = Math.max(enemySize, Math.random() * board.attr('height') - enemySize);
  newXY.push([randomCX,randomCY]);
}
// console.log(newXY);

d3.selectAll('circle.enemy').data(newXY)
  .transition()
    .duration(2500)
    .attr('cx',function(d) {return d[0];})
    .attr('cy',function(d) {return d[1];});

}

var checkCollision = function(){
  // keep track of the distance between our player and each enemy
    // this will result in 20 values
  var radiusSum = enemySize + playerSize;
  var collision = false;

  d3.selectAll('.enemy').each(function(d,i) {
    var x = this.getAttribute('cx');
    var y = this.getAttribute('cy');
    var distance = Math.sqrt(Math.pow(parseFloat(player.x) - parseFloat(x),2) + Math.pow(parseFloat(player.y) -  parseFloat(y),2));

    if(distance < radiusSum) {
      console.log('COLLISION');
      collision = true;
    }
  });
}
  // .attr('cx')//, function(d,i) {
    // console.log('Enemy ',i,': ',d[0],d[1]);
    // console.log(player.x);
    // console.log(player.y);
    // var distance = Math.sqrt(Math.pow(parseFloat(player.x) - parseFloat(d[0]),2) + Math.pow(parseFloat(player.y) -  parseFloat(d[1]),2));
    // console.log('Distance for #',i,': ',distance);

    // if(distance < radiusSum) {
    //   alert('COLLISION');
    //   collision = true;
    // }
  // var cyArray = d3.selectAll('.enemy').attr('cy');
  // console.log('CX: ',cxArray,typeof cxArray);
  // });
// }




var drag = d3.behavior.drag()
  .on('dragstart', function() {
    console.log('DRAG BEGINS');
  })
  .on('drag', function() {
    player.x += d3.event.dx;
    player.y += d3.event.dy;
    player.node.attr('cx',player.x);
    player.node.attr('cy',player.y);
    console.log(d3.event.dx,' | ',d3.event.dy);
    console.log(player.x,' | ',player.y);
  })
  .on('dragend', function() {
    console.log('DRAG ENDS');
    console.log(player.x,' | ',player.y);

  })

;

d3.selectAll('.draggable').call(drag);

update();
setInterval(checkCollision,1);
setInterval(update,2500);
