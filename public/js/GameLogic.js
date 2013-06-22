var levelCount = 0;

//timer logic:
var clock = document.querySelector(".clock"),
    seconds = 0,
    duration = seconds + "s";

window.setTimeout(function(){
  newLevel();
},0);




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
  totalSeconds -= 1;
  updateTimer();
  window.setTimeout("tick()", 1000);
}

function updateTimer() {
  clock.innerHTML = totalSeconds;
}




//add to levelcount and check for levels (win at 11)
function newLevel(){
  levelCount += 1;
  seconds += 6;
  if(levelCount > 5){
    window.location = '/game-win';
  } else {
    //update printed level count
    updateLevel();
    //select random rings based on level #
    randomRingSelection(levelCount);
    //reset clock
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