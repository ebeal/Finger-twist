var levelCount = 0;

//timer logic:
var clock = document.querySelector(".clock"),
    seconds = 20,
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



// function countDown(clock, inputSecondsToCount){
//   showTime(inputSecondsToCount);
//   var secondsToCount = inputSecondsToCount + 1;//add 1 seconds since we show 10 till 0 which is in fact 11 seconds 
//   var endTime = new Date(new Date().getTime() + secondsToCount * 1000);

//   function showDiff() {
//     secondsToCount = Math.floor((endTime.getTime() - new Date().getTime()) / 1000);
//     if(secondsToCount >= 0) {
//       if(secondsToCount <= inputSecondsToCount){
//         showTime(secondsToCount);
//       }
//       window.setTimeout(showDiff ,500);
//     } else {
//       //window.setTimeout(levelEnd, (inputSecondsToCount*10));
//       clock.innerHTML = 0;
//       //countDown(clock, seconds);
//       levelEnd();
//     }

//   }
//   function showTime(seconds)
//   {
//      if(seconds > 60)
//      {
//        clock.innerHTML = Math.round(seconds / 60) + ":" + (seconds % 60);
//      }
//      else
//      {
//        clock.innerHTML = seconds;
//      }
//   }
//   showDiff();
// }

//add to levelcount and check for levels (win at 11)
function newLevel(){
  levelCount += 1;
  if(levelCount > 11){
    gameEnd("win");
  } else {
    //update printed level count
    updateLevel();
    //select random rings based on level #
    randomRingSelection(levelCount);
    //reset clock?
    createTimer(clock, 20);
  }
}

//select random rings
function randomRingSelection(count){
  var $circles = $('.color-wheel ul li a');
  _.each($circles, function(index, li){
    $(index).removeClass('reqFinger');
  });
  _.shuffle($circles);
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
    gameEnd("lose");
  }
}

function gameEnd(endCondition){

  var $conditionCon = $('body');
  $conditionCon.append(endCondition);
  
  window.location = '/game-end';
}



function updateLevel(){
  var $levelCon = $('.level-number');
  $levelCon.text(levelCount);
}