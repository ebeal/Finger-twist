var triggerElementOn = function(onElement, el){
  if(onElement){
    $(el).addClass("ring-hover");
  } else {
    $(el).removeClass("ring-hover");
  }
};
var triggerReqElementOn = function(onElement, el){
  if(onElement){
    $(el).addClass("reqFinger-hover");
  } else {
    $(el).removeClass("reqFinger-hover");
  }
};
var changeButtonElementClass = function(onElement,onElementPress) {
  if(onElement){
      $(".round-container a").addClass("round-content-hover");
    }else{
      $(".round-container a").removeClass("round-content-hover").addClass("round-content");
    }
    if(onElementPress){
      $(".round-container a").removeClass("round-content-hover").addClass("round-content-press");
      startButtonPressed();
    }else{
      $(".round-container a").removeClass("round-content-press");
    }
};

var startButtonPressed = function(){
  window.location = '/game';
};
var buttonListener = function(x,y,z) {
  if(window.location.pathname === '/'){
    //declare go button position
    var buttonPos ={
      xLeft : 780,
      xRight : 870,
      yBottom : 180,
      yTop : 250,
      zero : 0
    };

    var onElement, onElementPress;
    if((x <= buttonPos.xRight && x >= buttonPos.xLeft)&&(y >= buttonPos.yBottom && y <= buttonPos.yTop)){
      onElement = true;
    }else{
      onElement = false;
    }
    if(z < buttonPos.zero && onElement){
      onElementPress = true;
    }

    changeButtonElementClass(onElement,onElementPress);

  }
};

function LeapTwist() {
  this.scalingFactor = 3;

  this.circleRadius = 75;
  this.spokes = 6;
  this.offset = 60;
  this.radiusIncrement = 75;
  this.angleIncrement = 360/this.spokes;

  this.reqCirclePositions = [];
  this.circlePositions = [];
  this.pointerPositions = [];

  this.init();
}

LeapTwist.prototype.highlightCircles = function() {
  var self = this;

  // Loop through circle positions
  self.circlePositions.forEach(function(circle) {
    var matched = self.pointerPositions.some(function(pointer) {
      // Circle based
      var inCircle = Math.pow(pointer.x - circle.x, 2) + Math.pow(pointer.y - circle.y, 2) < Math.pow(self.circleRadius, 2);

      if (inCircle)
        return true;
    });

    triggerElementOn(matched, circle.el);
  });


};

LeapTwist.prototype.matchReqCircles = function(){
  var self = this;

  // Loop through finger positions
  self.reqCirclePositions.forEach(function(circle) {
    var matched = self.pointerPositions.some(function(pointer) {
      // Circle based
      var inCircle = Math.pow(pointer.x - circle.x, 2) + Math.pow(pointer.y - circle.y, 2) < Math.pow(self.circleRadius, 2);

      if (inCircle)
        return true;
    });

    triggerReqElementOn(matched, circle.el);
  });
  // console.log(self.pointerPositions);

};


LeapTwist.prototype.handleMotion = function(obj) {
  var positions = this.pointerPositions = [];

  // Clear last frame
  this.ctx.clearRect(-this.width/2, -this.height, this.width, this.height);

  // Render circles based on pointable positions
  var pointablesMap = obj.pointablesMap;

  for (var prop in pointablesMap) {
    // Get the pointable's position
    var pointable = pointablesMap[prop];
    var pos = pointable.tipPosition;

    // Create a circle for each pointable
    var radius = Math.min(500/Math.abs(pos.z),10);
    this.ctx.beginPath();
    this.ctx.arc(pos.x - radius/2, -pos.y - radius/2, radius, 0, 2 * Math.PI);
    this.ctx.fill();

    // Store pointable positions
    positions.push({
      x: pos.x * 3 + this.center.x,
      y: this.height - (pos.y) * 3,
      z: pos.z
    });

    buttonListener(pos.x*3+this.center.x,this.canvas.height-(pos.y)*3,pos.z);
  }

    this.highlightCircles();
    this.matchReqCircles();
};

LeapTwist.prototype.positionCircles = function() {
  var self = this;

  // Find all circles
  var $circles = $('.color-wheel ul li');

  // Position them nicely
  $circles.each(function(index, el) {
    var multiplier = Math.floor(index / self.spokes) + 1;

    var angle = self.angleIncrement * index;

    if (multiplier % 2 === 0) {
      angle += 360/self.spokes/2;
    }

    var radius = self.offset + self.radiusIncrement * multiplier;

    var x = radius * Math.cos((angle) * (Math.PI/180));
    var y = radius * Math.sin((angle) * (Math.PI/180));

    $(el).css({
      top: y,
      left: x
    });
  });
};

// Get positions of circles
LeapTwist.prototype.storeCirclePositions = function() {
  var self = this;
  var positions = this.circlePositions = [];

  // Store the position of each circle
  $('.color-wheel a').each(function(index, el) {
    var position = $(el).offset();

    positions.push({
      el: el,
      x: position.left + self.circleRadius,
      y: position.top + self.circleRadius
    });
  });

};

LeapTwist.prototype.storeReqCirclePositions = function(){
  var self = this;
  var positions = this.reqCirclePositions = [];

  // Store the position of each circle
  $('.color-wheel a.reqFinger').each(function(index, el) {
    var position = $(el).offset();

    positions.push({
      el: el,
      x: position.left + self.circleRadius,
      y: position.top + self.circleRadius
    });
  });
};

LeapTwist.prototype.setupCanvas = function() {
  // Store canvas and context
  this.canvas = this.canvas || $('#leap-overlay').get(0);
  this.ctx = this.ctx || this.canvas.getContext("2d");

  // Set dimensions
  this.width = this.canvas.width = document.body.clientWidth;
  this.height = this.canvas.height = document.body.clientHeight;

  // Setup scaling
  this.ctx.translate(this.width/2, this.height);
  this.ctx.scale(this.scalingFactor, this.scalingFactor);
  this.ctx.fillStyle = "rgba(0,0,0,0.7)";
};

LeapTwist.prototype.setup = function() {
  this.storeCirclePositions();
  this.storeReqCirclePositions();
  this.setupCanvas();
  this.storeCenter();
};

LeapTwist.prototype.storeCenter = function() {
  this.center = {
    x: $(window).width()/2,
    y: $(window).height()/2
  };
};

LeapTwist.prototype.init = function() {
  this.positionCircles();

  this.setup();

  // Listen to changes in the window size
  $(window).on('resize', this.setup.bind(this));

};

var leapTwist = new LeapTwist();
    leapTwist.init();

Leap.loop({ enableGestures: true }, leapTwist.handleMotion.bind(leapTwist));




