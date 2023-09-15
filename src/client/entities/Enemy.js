import Entity from "./Entity";

export default class Enemy extends Entity {
  constructor(scene, config) {
    super(scene, config);
    this.scene = scene;
  }
}
