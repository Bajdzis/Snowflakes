snowSetting = {
  speedX:0,
  speedY:1.5,
  distanceTop:40,
  distanceSides:30,
  rightLeftShift:20,
  rightLeftSpeed:0.15,
  maxRotate:0.05,
  maxWeight:5,
  SnowflakeImage:null,
	SnowflakeImageSize:36,
	SnowflakeImageHalfSize:18
};
snowSetting.SnowflakeImage =  new Image();
snowSetting.SnowflakeImage.src = '../image/1.png';

function Snow(canvasID)
{

	this.canvas = document.getElementById(canvasID);
	this.context = this.canvas.getContext('2d');

	this.timer = null;
	this.drawFrameTime = 0;
	this.windowActive = true;

	this.snowflakes = [];
	this.snowflakesDead = [];

	this.mouseX = 0;
	this.mouseY = 0;

  this.height = 0;
	this.width = 0;

	window.addEventListener('focus', function()
	{
		if(this.windowActive === false)
		{
			this.windowActive = true;
			this.update();
		}
	}.bind(this));


	window.addEventListener('blur', function()
	{
		if(this.windowActive === true)
		{
			this.windowActive = false;
			clearTimeout(this.timer);
		}
	}.bind(this));

	document.addEventListener("mousemove", function(e) {
			var bodyRect = document.body.getBoundingClientRect();
			var elemRect = this.canvas.getBoundingClientRect();
			var offsetY = elemRect.top - bodyRect.top;
			var offsetX = elemRect.left - bodyRect.left;
			this.mouseX = e.clientX - offsetX;
			this.mouseY = e.clientY - offsetY;
	}.bind(this));

}

Snow.prototype.start = function (quantity, width, height)
{
	this.canvas.width  = width;
	this.canvas.height = height;
	this.height = this.canvas.height;
	this.width = this.canvas.width - (snowSetting.distanceSides + snowSetting.distanceSides);
	this.context = this.canvas.getContext('2d');
	for(i=0; i<quantity; i++)
	{
		this.snowflakes[i] = new Snowflake(this);
	}
	this.update();
}


Snow.prototype.update = function ()
{
	var now = new Date();
	this.drawFrameTime = now.getTime();

	for(i=0; i<this.snowflakes.length; i++)
	{
		this.snowflakes[i].update();
	}

	for(i=0; i<this.snowflakesDead.length; i++)
	{
		this.snowflakesDead[i].drawY += 0.1;
	}

	this.draw(this.context);
}

Snow.prototype.draw = function (c)
{
	c.clearRect ( 0, 0, this.canvas.width, this.canvas.height );

	for(i=0; i<this.snowflakesDead.length; i++)
	{
		this.snowflakesDead[i].draw(c);
	}

	for(i=0; i<this.snowflakes.length; i++)
	{
		this.snowflakes[i].draw(c);
	}

	var now = new Date();
	var timeRenderLastFrame = now.getTime() - this.drawFrameTime;
	this.timer = setTimeout(this.update.bind(this), 33 - timeRenderLastFrame);
}

Snow.prototype.addDeadSnowflakes = function (x, y, rotate)
{
	this.snowflakesDead[this.snowflakesDead.length] = new SnowflakeDead(x, y, rotate);
}
