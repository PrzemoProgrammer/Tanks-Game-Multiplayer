export default class TankAmmoBar extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    const x = config.offsetX;
    const y = config.offsetY;
    super(scene, x, y);

    this.scene = scene;
    this.config = config;
    scene.add.existing(this);

    this.maxAmmo = this.config.maxAmmo;
    this.ammoCount = this.config.ammoCount;
    this.ammoImageWidth = this.config.imageWidth;
    this.ammoCountImageOffsetX = 17;

    this.ammoImages = this.createAmmoImages();
    this.container = this.createContainer(0, 0);
    this.add([this.container]);
    this.add(this.ammoImages);
  }

  createAmmoImage(x, y) {
    const image = this.config.image;
    const ammo = this.scene.add.image(x, y, image).setOrigin(0, 0.5);

    return ammo;
  }

  createContainer(x, y) {
    const image = this.config.containerImage;
    const container = this.scene.add.image(x, y, image).setOrigin(0, 0.5);

    return container;
  }

  createAmmoImages() {
    const ammoImages = [];

    for (let i = 1; i <= this.ammoCount; i++) {
      const x = this.ammoCountImageOffsetX + this.ammoImageWidth * i;
      const y = 1;

      const ammoImage = this.createAmmoImage(x, y);

      ammoImages.push(ammoImage);
    }

    return ammoImages;
  }
}
