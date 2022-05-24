//https://segmentfault.com/a/1190000009478377 参考文章
// promise雏形 resolve
function Pro(fn) {
    var callbacks = []; //callbacks为数组，因为可能同时有很多个回调  这可以是一个很好的闭包原理
  
    //then注册事件回调
    this.then = function(onFulfilled) {
      callbacks.push(onFulfilled);
    };
    function resolve(value) {
      callbacks.forEach(function(cb) {
        cb(value);
      });
    }
    // 传入参数
    //fn==new Pro()传入的回调  resolve==new Pro()传入的回调接受的参数res   也是一个回调函数  当调用的之后执行callback数组中存在的回调用
    fn(resolve);
  }
  
  // 使用
  let result = new Pro(function(res) {
    setTimeout(() => {
      //这里必须异步  then中注册回调通知 如果不是哪callbacks中没有回调执行不了
      res("1:promise雏形");
    }, 3000);
  });
  result.then(function(res) {
    console.log(res);
  });
  
  // async await使用
  async function test(params) {
    let result = await new Pro(function(res) {
      setTimeout(() => {
        //这里必须异步  then中注册回调通知 如果不是哪callbacks中没有回调执行不了
        res("1:await调用");
      }, 3000);
    });
    console.log(result);
  }
  test();
  
  // ——————————————————————————————————————————————————————————————————————————————
  // 加入链式调用  被加入延迟
  function Pro1(fn) {
    var callbacks = []; //callbacks为数组，因为可能同时有很多个回调  这可以是一个很好的闭包原理
  
    this.then = function(onFulfilled) {
      callbacks.push(onFulfilled);
      return this; //链式调用
    };
    function resolve(value) {
      setTimeout(() => {
        //如果请求没有延迟 则应该加入延迟队列 settimeout会把当前执行函数至于队列末尾
        callbacks.forEach(function(cb) {
          cb(value);
        });
      }, 0);
    }
    fn(resolve); //fn==new Pro()传入的回调  resolve==new Pro()传入的回调接受的参数res   也是一个回调函数  当调用的之后执行callback数组中存在的回调用
  }
  
  // 调用
  let result1 = new Pro1(function(res) {
    res("2:链式调用");
  });
  result1
    .then(function(res) {
      console.log(res);
    })
    .then(function(res) {
      console.log(res);
    });
  
  //——————————————————————————————————————————————————————————————————————————————
  //状态pending、fulfilled              rejected
  
  function Pro2(fn) {
    var state = "pending",
      value = null,
      callbacks = [];
  
    this.then = function(onFulfilled) {
      if (state === "pending") {
        callbacks.push(onFulfilled);
        return this;
      }
      onFulfilled(value);
      return this;
    };
  
    function resolve(newValue) {
      value = newValue;
      state = "fulfilled";
      setTimeout(function() {
        callbacks.forEach(function(callback) {
          callback(value);
        });
      }, 0);
    }
    fn(resolve);
  }
  
  // 调用
  let result2 = new Pro2(function(res) {
    res("3:链式调用相同第二次应该是空 应为我没有return");
  });
  result2
    .then(function(res) {
      console.log(res); //相同的
    })
    .then(function(res) {
      console.log(res); //相同的
    });
  
  //___________________________________________________________________
  //链式调用 返回promise
  function Promise(fn) {
    var state = "pending",
      value = null,
      callbacks = [];
  
    this.then = function(onFulfilled) {
      return new Promise(function(resolve) {
        handle({
          onFulfilled: onFulfilled || null,
          resolve: resolve
        });
      });
    };
  
    function handle(callback) {
      if (state === "pending") {
        callbacks.push(callback);
        return;
      }
      //如果then中没有传递任何东西
      if (!callback.onFulfilled) {
        callback.resolve(value);
        return;
      }
  
      var ret = callback.onFulfilled(value);
      callback.resolve(ret);
    }
  
    function resolve(newValue) {
      if (
        newValue &&
        (typeof newValue === "object" || typeof newValue === "function")
      ) {
        var then = newValue.then;
        if (typeof then === "function") {
          then.call(newValue, resolve);
          return;
        }
      }
      state = "fulfilled";
      value = newValue;
      setTimeout(function() {
        callbacks.forEach(function(callback) {
          handle(callback);
        });
      }, 0);
    }
  
    fn(resolve);
  }
  
  
  
  
  
  
  
  
  
  //最终版本————————————————————————————————————————————————————————
  function Pro3(fn) {
    var state = "pending",
      value = null,
      callbacks = [];
  
    this.then = function(onFulfilled, onRejected) {
      return new Pro3(function(resolve, reject) {
        handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve: resolve,
          reject: reject
        });
      });
    };
    function handle(callback) {
      if (state === "pending") {
        callbacks.push(callback);
        return;
      }
  
      var cb = state === "fulfilled" ? callback.onFulfilled : callback.onRejected,
        ret;
      if (cb === null) {
        cb = state === "fulfilled" ? callback.resolve : callback.reject;
        cb(value);
        return;
      }
      try {
        ret = cb(value);
        callback.resolve(ret);
      } catch (e) {
        callback.reject(e);
      }
    }
    function resolve(newValue) {
      if (
        newValue &&
        (typeof newValue === "object" || typeof newValue === "function")
      ) {
        var then = newValue.then;
        if (typeof then === "function") {
          then.call(newValue, resolve, reject);
          return;
        }
      }
      state = "fulfilled";
      value = newValue;
      execute();
    }
  
    function reject(reason) {
      state = "rejected";
      value = reason;
      execute();
    }
  
    function execute() {
      setTimeout(function() {
        callbacks.forEach(function(callback) {
          handle(callback);
        });
      }, 0);
    }
  
    fn(resolve, reject);
  }
  