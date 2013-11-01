/*
 * `command-buffer` is a simple command buffer abstraction library written in JavaScript.
 *
 * Author: Pilwon Huh
 * Git Repo: https://github.com/pilwon/command-buffer
 * Licnese: MIT
 * Version: 0.1.0
 */

;(function () {
  var objectTypes = {
    boolean: false,
    function: true,
    object: true,
    number: false,
    string: false,
    undefined: false
  };

  // Used as a reference to the global object.
  var root = (objectTypes[typeof window] && window) || this;

  // Detect free variable `exports`.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Detect free variable `module`.
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  // Detect the popular CommonJS extension `module.exports`.
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  // Detect free variable `global` from Node.js or Browserified code and use it as `root`.
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  var CommandBuffer = function (onCommandCallback, onCommandCallbackContext) {
    this._cb = onCommandCallback;
    this._cbCtx = onCommandCallbackContext;
    this._commands = [];
    this._commandsCurrent = [];
    this._paused = false;
    this._processing = false;
  };

  CommandBuffer.prototype._concatCurrentCommands = function () {
    this._commands = this._commandsCurrent.concat(this._commands);
    this._commandsCurrent.length = 0;
  };

  CommandBuffer.prototype._process = function () {
    var command;

    while (!this._paused) {
      this._processing = true;

      if (!this._commands.length) {
        this._concatCurrentCommands();
      }

      command = this._commands.shift();
      if (!command) { break; }

      this._cb.call(this._cbCtx, command.type, command.data);

      this._concatCurrentCommands();
    }

    this._processing = false;
  };

  CommandBuffer.prototype.pause = function () {
    this._paused = true;
  };

  CommandBuffer.prototype.resume = function () {
    this._paused = false;
    this._concatCurrentCommands();
    if (!this._processing) {
      this._process();
    }
  };

  CommandBuffer.prototype.run = function (type, data) {
    this._commandsCurrent.push({
      type: type,
      data: data
    });
    if (!this._processing) {
      this._process();
    }
  };

  CommandBuffer.prototype.schedule = function (type, data) {
    this._commands.push({
      type: type,
      data: data
    });
    if (!this._processing) {
      this._process();
    }
  };

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // Expose CommandBuffer to the global object even when an AMD loader is present in
    // case CommandBuffer was injected by a third-party script and not intended to be
    // loaded as a module. The global assignment can be reverted in the CommandBuffer
    // module by its `noConflict()` method.
    root.CommandBuffer = CommandBuffer;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return CommandBuffer;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = CommandBuffer).CommandBuffer = CommandBuffer;
    }
    // in Narwhal or Rhino -require
    else {
      freeExports.CommandBuffer = CommandBuffer;
    }
  }
  else {
    // in a browser or Rhino
    root.CommandBuffer = CommandBuffer;
  }
}.call(this));
