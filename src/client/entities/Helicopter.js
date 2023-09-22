import Bot from "./Bot";
import AnimationManager from "../utils/AnimationManager";

export default class Helicopter extends Bot {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;

    this.destroyAnim = this.createDestroyAnim();
    this.add([this.destroyAnim]);

    //! /////////////////////////////////
    this.scene.time.addEvent({
      delay: 100,
      callback: () => this.handleShoot(),
      loop: true,
    });
    //! /////////////////////////////////
  }

  update() {
    if (!this.isAlive) return;
    this.updateHealthBarPosition();
    // this.moveRight();
  }

  createDestroyAnim() {
    const config = this.config.explosionAnim;
    const anim = new AnimationManager(this.scene, config).setScale(1.7);

    return anim;
  }

  playDestroyAnim() {
    this.destroyAnim.playAnim();
  }

  startSmallerSizeAnim(callback) {
    this.scene.tweens.add({
      targets: this,
      ease: "Circ.in",
      scale: 0.5,
      duration: 1500,
      onComplete: () => {
        callback();
      },
    });
  }

  kill() {
    this.disablePhysicsBody();
    this.setIsAlive(false);
    this.healthBar.setVisible(false);
    this.playDestroyAnim();
    this.startSmallerSizeAnim(() => this.playDestroyAnim());
    this.stopAnims();
    this.playDeadAnim(() => {
      this.makeInvisibleWithDelay(this.config.deadInvisibleDelayTime);
      this.playDestroyAnim();
      this.stopAnims();
    });
  }
}
