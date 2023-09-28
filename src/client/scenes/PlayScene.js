import {
  // GAME_WIDTH,
  // GAME_HEIGHT,
  // PLAYER_CONFIG,
  // ENEMY_CONFIG,
  BOT_GUN_SOLDIER_CONFIG,
  BOT_BAZOOKA_SOLDIER_CONFIG,
  BOT_HELICOPTER_CONFIG,
  BOT_TANK_CONFIG,
} from "../gameConfig";

import { GAME_WIDTH, GAME_HEIGHT } from "../config/game/gameConfig";
import playerConfig from "../config/player/playerConfig";
import botEnemiesConfigIndex from "../config/botEnemies/configsIndex";
import HandleInputs from "../utils/HandleInputs";
import MouseControl from "../utils/MouseControl";
import MousePointerManager from "../utils/MousePointerManager";
import Player from "../entities/Player";
// import Enemy from "../entities/Enemy";
import SoldierBot from "../entities/Soldier";
import HelicopterBot from "../entities/Helicopter";
import TankBot from "../entities/Tank";
import checkCollisionWithObject from "../helper/collisionHandler";
import setCollision from "../helper/phaserCollision";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  get gw() {
    return GAME_WIDTH;
  }
  get gh() {
    return GAME_HEIGHT;
  }
  create() {
    this.enemies = [];

    this.hudScene = this.scene.get("HudScene");
    this.tilemapLayers = this.createTilemap();
    this.player = this.createPlayer();

    this.addPlayerCollisions();
    this.setupCamera();
    this.mouseInput = new MouseControl(this);
    this.handleInputs = new HandleInputs(this);
    this.mousePointer = new MousePointerManager(this);

    this.createEnemies();
  }

  update() {
    this.updatePlayer();
    this.updateEnemies();
    this.handleInputs.handleMovement();
    this.updateVisibleTiles();
  }

  createTilemap() {
    const {
      tilemap: { JSONKey, image },
      layers: { ground, objects, collision, entities },
    } = playerConfig.map;

    const tilemap = this.make.tilemap({ key: JSONKey });
    const tileset = tilemap.addTilesetImage(image);

    const groundLayer = tilemap.createLayer(ground, tileset);
    const objectsLayer = tilemap.createLayer(objects, tileset);
    const entitiesLayer = tilemap
      .createLayer(entities, tileset)
      .setVisible(false);
    const collisionLayer = tilemap
      .createLayer(collision, tileset)
      .setCollisionByExclusion([-1])
      .setVisible(false);

    return {
      ground: groundLayer,
      objects: objectsLayer,
      entities: entitiesLayer,
      collision: collisionLayer,
    };
  }

  getEntitiesTileIndexes() {
    const entities = this.tilemapLayers.entities;
    const entitiesTileIndexes = entities.filterTiles(
      (tile) => tile.index !== -1
    );
    return entitiesTileIndexes;
  }

  getBotEnemyClassByConfig(config) {
    let enemy = null;

    switch (config.type) {
      case "tank":
        enemy = new TankBot(this, config);
        break;
      case "gun_soldier":
      case "bazooka_soldier":
        enemy = new SoldierBot(this, config);
        break;
      case "helicopter":
        enemy = new HelicopterBot(this, config);
        break;
    }
    return enemy;
  }

  createAndAddEnemy(enemyConfig, tileIndex) {
    const enemy = this.getBotEnemyClassByConfig(enemyConfig).setPosition(
      tileIndex.x * tileIndex.width,
      tileIndex.y * tileIndex.width
    );

    this.enemies.push(enemy);
    this.addBotEntityCollisions(enemy);
  }

  createEnemies() {
    const entitiesTileIndexes = this.getEntitiesTileIndexes();

    for (const tileIndex of entitiesTileIndexes) {
      const enemyConfig = botEnemiesConfigIndex.find(
        (config) => config.map.index === tileIndex.index
      );

      this.createAndAddEnemy(enemyConfig, tileIndex);
    }
  }

  setWorldBounds(width, height) {
    this.physics.world.setBounds(0, 0, width, height);
  }

  setupCamera() {
    const worldWidth = this.tilemapLayers.ground.displayWidth;
    const worldHeight = this.tilemapLayers.ground.displayHeight;
    const cameraX = -this.player.getBodyWidth() / 2;
    const cameraY = -this.player.getBodyHeight() / 2;

    this.cameras.main.startFollow(
      this.player,
      true,
      0.5,
      0.5,
      cameraX,
      cameraY
    );
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.setWorldBounds(worldWidth, worldHeight);
  }

  updatePlayer() {
    this.player.update();
    this.checkEntityBulletRange(this.player);
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      const { x, y } = this.player.getXY();
      const enemy = this.enemies[i];
      enemy.update();
      this.checkEntityBulletRange(enemy);
      // enemy.handleRotation(x, y);
      enemy.handleShoot(x, y);
    }
  }

  createPlayer() {
    const config = playerConfig;
    const player = new Player(this, config);

    return player;
  }

  // createEnemy() {
  //   const config = ENEMY_CONFIG;
  //   const enemy = new Enemy(this, config);
  //   this.addBotEntityCollisions(enemy);
  //   this.enemies.push(enemy);

  //   return enemy;
  // }

  addPlayerCollisions() {
    // this.addPlayerBulletToEnemyCollisions();
    this.addPlayerToEnemyCollision();
    this.addPlayerCollisionWithMapObstacles();
    this.addTargetBulletsCollisionWithMapObstacles(this.player);
  }

  addBotEntityCollisions(enemy) {
    this.addTargetBulletsCollisionWithMapObstacles(enemy);
    this.addTargetBulletToPlayerCollision(enemy);
    this.addPlayerBulletWithTargetCollisions(enemy);
  }

  addPlayerCollisionWithMapObstacles() {
    const collision = this.tilemapLayers.collision;
    this.physics.add.collider(this.player, collision);
  }

  addTargetBulletsCollisionWithMapObstacles(target) {
    const targetBullets = target.getActiveBullets();
    const collision = this.tilemapLayers.collision;

    this.physics.add.collider(targetBullets, collision, (bullet) => {
      target.turnOffBullet(bullet);
    });
  }

  addTargetBulletToPlayerCollision(target) {
    const targetBullets = target.getActiveBullets();
    const player = this.player;

    setCollision(this, targetBullets, player, (bullet) => {
      target.turnOffBullet(bullet);
      player.manageCondition(target.getBulletDamageValue());
      this.shakeCamera(30, 0.003);
      this.hudScene.handlePlayerStatus(player.getHealthBarPercent());
    });
  }

  addPlayerBulletWithTargetCollisions(target) {
    const playerBullets = this.player.getActiveBullets();

    setCollision(this, playerBullets, target, (bullet) => {
      this.player.turnOffBullet(bullet);
      // this.score.updateScore(1);
      target.manageCondition(this.player.getBulletDamageValue());
    });
  }

  shakeCamera(parm1, parm2) {
    this.cameras.main.shake(parm1, parm2);
  }

  addPlayerToEnemyCollision() {
    this.physics.add.collider(this.player, this.enemy);
  }

  checkEntityBulletRange(entity) {
    const entityBullets = entity.getActiveBullets();

    entityBullets.forEach((bullet) => {
      if (
        checkCollisionWithObject(
          bullet.body,
          entity.body,
          entity.getShootAttackRange()
        )
      ) {
        entity.turnOffBullet(bullet);
      }
    });
  }

  updateVisibleTiles() {
    const camera = this.cameras.main;
    const tilemapLayers = this.tilemapLayers; // Twoje warstwy tilemapy

    // Pobierz aktualne położenie kamery
    const cameraX = camera.scrollX;
    const cameraY = camera.scrollY;

    // Pobierz wymiary widoku kamery
    const cameraWidth = camera.width;
    const cameraHeight = camera.height;

    // Iteruj przez wszystkie warstwy tilemapy, które chcesz dostosować
    for (const layerName in tilemapLayers) {
      const layer = tilemapLayers[layerName];

      // Pobierz indeksy kafelków, które są obecnie widoczne w widoku kamery
      const leftTile = Math.floor(cameraX / layer.tileWidth);
      const rightTile = Math.ceil((cameraX + cameraWidth) / layer.tileWidth);
      const topTile = Math.floor(cameraY / layer.tileHeight);
      const bottomTile = Math.ceil((cameraY + cameraHeight) / layer.tileHeight);

      // Ustaw kafelki poza widokiem kamery na niewidoczne
      layer.forEachTile(function (tile) {
        const tileX = tile.x;
        const tileY = tile.y;
        if (
          tileX < leftTile ||
          tileX > rightTile ||
          tileY < topTile ||
          tileY > bottomTile
        ) {
          tile.setVisible(false);
        } else {
          tile.setVisible(true);
        }
      });
    }
  }

  playerShootAttack() {
    this.player.handleShoot();
  }

  createMousePointerManager() {
    const pointer = new MousePointerManager(this);
    return pointer;
  }

  // createScore(x, y) {
  //   const config = {
  //     fontFamily: "Arial",
  //     fontSize: "30px",
  //     color: "#FFFFFF",
  //     stroke: "#FFFFFF",
  //     strokeThickness: 1,
  //   };
  //   const text = "Score: ";
  //   const score = new ScoreCounter(this, x, y, text, config);
  //   return score;
  // }
}
