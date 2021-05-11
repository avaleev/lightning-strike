'strict'

class LightningStrike {
  mainScene;
  emitterField;
  catcherField;

  DEBUG = false;

  constructor(
    mainScene,
    emitterField,
    catcherField,
    options
  ) {
    Object.seal(this);

    try {
      if (!mainScene)
        throw new LightningStrikeError('Provided "Main Scene" DOM Element is invalid');
      this.mainScene = mainScene;
  
      if (!emitterField)
        throw new LightningStrikeError('Provided "Emitter Field" DOM Element is invalid');
      this.emitterField = emitterField;
  
      // verify that 
      if (!catcherField)
        throw new LightningStrikeError('Provided "Catcher Field" DOM Element is invalid');
      this.catcherField = catcherField;
    } catch (ex) {
      console.error(ex);
    }

    // process passed or defaulted options
    this.processOptions(options);
  }

  processOptions(options) {
    for (const [key, value] of Object.entries(options)) {
      switch (key) {
        case 'DEBUG':
          if (typeof value !== 'boolean')
            throw new LightningStrikeError('1st parameter expected value type - boolean, got '.concat(typeof value));

          this.toggleDebug(value);
        default:
          break;
      }
    }
  }

  toggleDebug(value = undefined) {
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
  }
}

class LightningStrikeError extends Error {
  constructor(message) {
    super('[Lightning Strike: Syntax Error]: '.concat(message));
  }
}