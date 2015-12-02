
function Snowflake(ref_snow)
{

  this.ref_snow = ref_snow;

  this.x = 0;
  this.y = 0;

  this.drawX = 0;
  this.drawY = 0;

  this.offsetX = 0;
  this.offsetXmax = 0;
  this.rotate = 0;
  this.rotateSpeed = 0;
  this.weight = 0;

  this.inicjalize();
  this.y = (Math.random() * -this.ref_snow.height) - snowSetting.distanceTop;

}

Snowflake.prototype.inicjalize = function ()
{
  this.x = (Math.random() * this.ref_snow.width) + snowSetting.distanceSides;
  this.y = -snowSetting.distanceSides;

  this.drawX = this.x;
  this.drawY = this.y;

  this.offsetX = Math.random();
  this.offsetXmax = snowSetting.rightLeftShift * Math.random();
  this.rotateSpeed = snowSetting.maxRotate * Math.random();
  this.weight = snowSetting.maxWeight * Math.random();
}

Snowflake.prototype.update = function(windX, windY)
{
  this.rotate += this.rotateSpeed;
  this.offsetX += snowSetting.rightLeftSpeed;
  this.x += snowSetting.speedX;
  this.y += snowSetting.speedY+this.weight;
  this.drawX = this.x + (15 * Math.sin(this.offsetX));
  this.drawY = this.y;
  if( (this.y > this.ref_snow.height) || (this.collision()) )
  {
    this.ref_snow.addDeadSnowflakes(this.drawX,this.drawY,this.rotate);
    this.inicjalize();
  }

}

Snowflake.prototype.draw = function (context)
{
  context.shadowColor = "rgba( 0, 0, 0, 0.3 )";
  context.shadowOffsetX = 6;
  context.shadowOffsetY = 6;
  context.shadowBlur = 3;

  context.save();
  context.translate(this.drawX, this.drawY);
  context.rotate(this.rotate);
  context.drawImage(snowSetting.SnowflakeImage, -snowSetting.SnowflakeImageHalfSize, -snowSetting.SnowflakeImageHalfSize);
  context.restore();
}

Snowflake.prototype.collision = function(){

  for(var i=0; i<this.ref_snow.snowflakesDead.length; i++)
  {
    var dx = this.drawX - this.ref_snow.snowflakesDead[i].drawX;
    var dy = this.drawY - this.ref_snow.snowflakesDead[i].drawY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 20)
    {
      return true;
    }
  }
  return false;
}
