function SnowflakeDead(x, y, rot)
{
  this.drawX = x;
  this.drawY = y;
  this.rotate = rot;
}

SnowflakeDead.prototype.draw = Snowflake.prototype.draw;
