
//timer logic:
var clock = document.querySelector(".clock"),
    seconds = 10;

function createTimer(clock, inputSeconds) {
  timer = document.getElementById(clock);
  totalSeconds = inputSeconds;

  updateTimer();
  window.setTimeout("tick()", 1000);
}

function tick() {
  if (totalSeconds <= 0) {
    levelEnd();
  }
  console.log("before decrement",totalSeconds);
  totalSeconds -= 1;
  console.log("after decrement",totalSeconds);
  updateTimer();
  window.setTimeout("tick()", 1000);
}

function updateTimer() {
  clock.innerHTML = totalSeconds;
}




var levelCount = 0;
//add to levelcount and check for levels (win at 11)
function newLevel(){
  levelCount += 1;
  //seconds += 5 ;

  if(levelCount > 5){
    window.location = '/game-win';
  } else {
    updateLevel();
    randomRingSelection(levelCount);
    createTimer(clock, seconds);
  }
}

//select random rings
function randomRingSelection(count){
  var $circles = $('.color-wheel ul li a');
  _.each($circles, function(index, li){
    $(index).removeClass('reqFinger');
  });
  $circles = _.shuffle($circles);
  $circles = _.first($circles, count);
  _.each($circles, function(index, li){
    $(index).addClass('reqFinger');
  });
}

//if level ended
function levelEnd(){
  var $reqCircles = $('.reqFinger');
  if (_.every($reqCircles,
    function(index, li){
      return $(index).hasClass('ring-hover');
    })){
    newLevel();
  } else {
    window.location = '/game-lose';
  }
}

function gameEnd(endCondition){

  var $conditionCon = $('body');
  $conditionCon.append(endCondition);

}

function updateLevel(){
  var $levelCon = $('.level-number');
  $levelCon.text(levelCount);
}

//Initialize the new game
$(document).ready(function(){
  newLevel();
});