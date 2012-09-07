(function(window, console){
  "use strict";

  var Gravity = function Gravity(){};

  Gravity.prototype.constants = {
    g : 9.807
  };

  // How far an object has fallen after t seconds
  // d = (gt^2)/2
  Gravity.prototype.d = function(t, callback){
    var g = this.constants.g, d = (g * (t*t))/2;

    return this.call(callback, d, t, g);
  };

  // How long (in seconds) it takes an object to fall distance d
  // t = sqrt(2d/g)
  Gravity.prototype.t = function(d, callback){
    var g = this.constants.g, t = Math.sqrt((2*d)/g);

    return this.call(callback, t, g, d);
  };

  // How fast an object is going after falling for t seconds
  // v = gt
  Gravity.prototype.vfort = function(t, callback){
    var g = this.constants.g, v = g * t;

    return this.call(callback, v, t, g);
  };

  // The velocity of an object that has traveled d meters
  // v = sqrt(2gd)
  Gravity.prototype.vford = function(d, callback){
    var g = this.constants.g, v = Math.sqrt(2 * g * d);

    return this.call(callback, v, g, d);
  };

  // The average velocity of an object that has been falling for t seconds
  // Vavg = (gt)/2
  Gravity.prototype.vavgfort = function(t, callback){
    var g = this.constants.g, vavg = (g * t)/2;

    return this.call(callback, vavg, g, t);
  };

  // The average velocity of an object that has fallen for distance d meters
  // Vavg = sqrt(2gd)/2
  Gravity.prototype.vavgford = function(d, callback){
    var g = this.constants.g, vavg = Math.sqrt(2 * g * d)/2;

    return this.call(callback, vavg, g, d);
  };

  Gravity.prototype.call = function(func){
    if (typeof func === 'function'){
      // Make the arguments object an array
      var args =  Array.prototype.slice.call(arguments);
      // shift off the function from the stack
      args.shift();
      // call the function applying the current object and arguments
      func.apply(this, args);
    }

    return this;
  };


  window.Gravity = Gravity;
})(window, console);