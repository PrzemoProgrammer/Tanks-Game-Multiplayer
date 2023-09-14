//! ///////////////////////////////////////////////////////////////////////////

class Bottle {
  constructor(scene, x, y, sprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }
}

//! ///////////////////////////////////////////////////////////////////////////

class Bottle extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    scene.add.existing(this);
  }
}

//! ///////////////////////////////////////////////////////////////////////////

class Button extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    scene.add.existing(this);
    this.setOrigin(0, 0);

    this.scene.physics.world.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = false;

    this.body.width = 110;
    this.body.offset.x = 40;

    this.setInteractive();
  }

  //! ///////////////////////////////////////////////////////////////////////////

  class Entity extends Phaser.GameObjects.Container {
    constructor(scene, config) {
      const x = config.x;
      const y = config.y;
  
      super(scene, x, y);
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.config = config;
      this.scene.add.existing(this);

      this.leftTrackImage = this.createLeftTrack();

  
      this.add([
        this.leftTrackImage,

      ]);
  
    }
  
    update() {

    }
  }
  
  //! ///////////////////////////////////////////////////////////////////////////

  onClick(cb) {
    this.on("pointerdown", () => {
      this.setScale(0.9);
      cb();
    }).on("pointerup", () => this.setScale(1));

    return this;
  }
}

//! ///////////////////////////////////////////////////////////////////////////

class ProfileStatus extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;
    scene.add.existing(this);

    this.add([]);
  }
}
