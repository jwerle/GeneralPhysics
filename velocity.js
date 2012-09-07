(function(window, console){
  "use strict";

  var Velocity = function Velocity(value){
    var that = this;

    if (value){
      this.set(value);
    }


    // Averages
    this.average = {
      // V[ave] = (1/2(v[0] + v)
      vAve : function(callback){
        var v = that.get(that.length - 1), v0 = that.get(0), avg = (1/2) * (v0 + v);

        return that.call(callback, avg, v0, v);
      },

      // v[0] = 2(V[ave] - v)
      v0 : function(callback){
        this.vAve(function(avg){
          var v = that.get(that.length - 1), v0 = 2 * (avg) - v;

          that.call(callback, v0, avg, v);
        });

        return this;
      },

      // v = 2V[ave] - v[0]
      v : function(callback){
        this.vAve(function(avg){
          var v0 = that.get(0), v = 2 * avg - v0;

          that.call(callback, v, v0, avg);
        });

        return this;
      }
    };

    // Displacement
    this.delta = {
      // (d)x = v[ave]t
      x : function(t, callback){
        that.average.vAve(function(avg){
          var d = avg * t;

          return that.call(callback, d, avg, t);
        });

        return this;
      },

      // t = (d)x/v[ave]
      t : function(d, callback){
        that.average.vAve(function(avg){
          var t = d/avg;

          that.call(callback, t, avg, d);
        });

        return this;
      },

      // v[ave] = (d)x/t,
      vAve : function(t, callback){
        that.delta.x(t, function(d){
          var vAve = d/t;

          that.call(callback, vAve, d, t);
        });

        return this;
      }
    };
  };

  Velocity.prototype = [];

  // Constants
  Velocity.prototype.constants = {
    g : 9.8
  };

  // v = v[0] + at
  Velocity.prototype.v = function(a, t, callback){
    var v0 = this.get(0), v = v0 + a*t;

    return this.call(callback, v, v0, a, t);
  };

  // v[0] = v - at
  Velocity.prototype.v0 = function(a, t, callback){
    var v0 = this.get(this.length - 1) - (a*t);

    return this.call(callback, v0, a, t);
  };

  // a = (v - v[0])/t
  Velocity.prototype.a = function(t, callback){
    var v = this.get(this.length - 1), v0 = this.get(0), a = (v - v0)/t;

    return this.call(callback, a, v, v0, t);
  };

  // t = (v - v[0])/a
  Velocity.prototype.t = function(a, callback){
    var v = this.get(this.length - 1), v0 = this.get(0), t = (v - v0)/a;

    return this.call(callback, t, v, v0, a);
  };



  // Utilities
  Velocity.prototype.get = function(i){
    return (typeof i === 'number'? this[i] : this);
  };

  Velocity.prototype.set = function(value, pop){
    var that = this;

    if (pop === true){
      for (var i = this.length - 1; i >= 0; i--) {
        this.shift();
      }
    }

    value.forEach(function(element, index, array){
      that.push(element);
    });

    return this;
  };

  Velocity.prototype.pop = function(){
    Array.prototype.pop.call(this);

    return this;
  };

  Velocity.prototype.push = function(element){
    Array.prototype.push.call(this, element);

    return this;
  };

  Velocity.prototype.call = function(func){
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

  window.Velocity = Velocity;
})(window, console);