var levelCount = 0;

//timer logic:
var clock = document.querySelector(".clock"),
    seconds = 10,
    duration = seconds + "s";

window.setTimeout(function(){
  newLevel();
  countDown(clock, seconds);
},0);

function countDown(clock, inputSecondsToCount)
{
  showTime(inputSecondsToCount);
  var secondsToCount = inputSecondsToCount + 1;//add 1 seconds since we show 10 till 0 which is in fact 11 seconds 
  var endTime = new Date(new Date().getTime() + secondsToCount * 1000);

  function showDiff()
  {
    secondsToCount = Math.floor((endTime.getTime() - new Date().getTime()) / 1000);
    if(secondsToCount >= 0)
    {
      if(secondsToCount <= inputSecondsToCount)
      {
        showTime(secondsToCount);
      }
      window.setTimeout(showDiff ,500);
    }
    else
    {
      levelEnd();
      clock.innerHTML = 0;
    }

  }
  function showTime(seconds)
  {
     if(seconds > 60)
     {
       clock.innerHTML = Math.round(seconds / 60) + ":" + (seconds % 60);
     }
     else
     {
       clock.innerHTML = seconds;
     }
  }
  showDiff();
}

//if level ended
function levelEnd(){
  //check if req circles have hover state
    //if true
      //trigger newLevel()
    //else
      //trigger gameEnd(lose)
}

function gameEnd(endCondition){
  //trigger end screen with win or lose (condition is endCondition) start over button
}

function newLevel(){
  if(levelCount === 11){
    gameEnd("win");
  } else {
    levelCount += 1;
    updateLevel();
    randomRingSelection(levelCount);
    countDown(clock, timer);
  }
}

function randomRingSelection(count){
  //select li list from dom
  //add to array
  //shuffle
  //pop count number of els
  //add req class
}

function updateLevel(){
  //update level element with current levelCount
}