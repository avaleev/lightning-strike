'strict'

class LightningOptions {
  DEBUG;
  emitterField;
  receiverField;
}

class LightningStrike extends LightningOptions {
  mainScene;
  canvas;
  resizeListener;

  constructor(mainScene, options) {
    super();
    Object.seal(this);

    try {
      if (!mainScene || typeof mainScene !== 'object')
        throw new LightningStrikeError('Provided "Main Scene" DOM Element is invalid');
      this.mainScene = mainScene;

      if (typeof options !== 'object')
        throw new LightningStrikeError('Options must be an object, got '.concat(typeof options))
      // read and assign options
      this.processOptions(options);

      // prepare canvas for drawing
      this.prepareScene();
    } catch (ex) {
      console.error(ex);
    }
  }

  prepareScene() {
    // count existing scenes if any
    const sceneCount = document.querySelectorAll("[id^='lightning-strike-scene-']").length
    
    // create canvas and give it a unique scene id
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'lightning-strike-scene-' + sceneCount);
    
    // make sure it fills entirety of it's parent
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '0';

    this.mainScene.appendChild(this.canvas);
  }

  processOptions(options) {
    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case 'DEBUG':
          if (typeof value !== 'boolean')
            throw new LightningStrikeError('DEBUG parameter expected value type - boolean, got '.concat(typeof value));
          this.toggleDebug(value);
        default:
          this[key] = value;
          break;
      }
    }
  }

  toggleDebug(value) {
    const DEBUG_CLASS_NAME = 'debug-enabled';

    if (this.mainScene.classList) {
      this.mainScene.classList.toggle(DEBUG_CLASS_NAME);
    } else {
      const classes = this.mainScene.className.split(' ');
      let i = classes.indexOf(DEBUG_CLASS_NAME);

      if (i >= 0 && (value === false || value === undefined)) {
        classes.splice(i, 1);
      } else if (i === -1 && (value === true || value === undefined)) {
        classes.push(DEBUG_CLASS_NAME);
        this.mainScene.className = classes.join(' ');
      }
    }

    this.DEBUG = value;
  }
}

class LightningStrikeError extends Error {
  constructor(message) {
    super('[Lightning Strike: Syntax Error]: '.concat(message));
  }
}
