module.exports = Rect;

function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.intersects = function(rect) {
		if(rect.width <= 0 || rect.height <= 0 || this.width <= 0 || this.height <= 0) {
			return false;
		}
		return ((rect.width + rect.x < rect.x || rect.width + rect.x > this.x) &&
				(rect.height + rect.y < rect.y || rect.height + rect.y > this.y) &&
				(this.width + this.x < this.x || this.width + this.x > rect.x) &&
				(this.height + this.y < this.y || this.height + this.y > rect.y)); 
	}
}
