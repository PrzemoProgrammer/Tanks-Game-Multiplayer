import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_CONFIG,
  ENEMY_CONFIG,
  BOT_GUN_SOLDIER_CONFIG,
  BOT_BAZOOKA_SOLDIER_CONFIG,
  BOT_HELICOPTER_CONFIG,
  BOT_TANK_CONFIG,
} from "../gameConfig";
import HandleInputs from "../utils/HandleInputs";
import MouseControl from "../utils/MouseControl";
import MousePointerManager from "../utils/MousePointerManager";
import Player from "../entities/Player";
import Enemy from "../entities/Enemy";
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
    // this.background = this.createBackground();
    this.tilemapLayers = this.createTilemap();
    this.player = this.createPlayer();
    // this.enemy = this.createEnemy();
    this.botSoldier = this.createBotSoldier();
    this.botHelicopter = this.createBotHelicopter();
    this.botTank = this.createBotTank();

    this.addPlayerCollisions();
    this.setupCamera();
    this.mouseInput = new MouseControl(this);
    this.handleInputs = new HandleInputs(this);
    this.mousePointer = new MousePointerManager(this);
  }

  update() {
    this.updatePlayer();
    this.updateEnemies();
    this.handleInputs.handleMovement();
    this.updateVisibleTiles();
  }

  createTilemap() {
    const tilemapJSONKey = PLAYER_CONFIG.map.tilemap.JSONKey;
    const tilemapImage = PLAYER_CONFIG.map.tilemap.image;
    const groundLayer = PLAYER_CONFIG.map.layers.ground;
    const obstaclesLayer = PLAYER_CONFIG.map.layers.obstacles;

    const tilemap = this.make.tilemap({
      key: tilemapJSONKey,
    });
    const tileset = tilemap.addTilesetImage(tilemapImage);
    const ground = tilemap.createLayer(groundLayer, tileset);
    const obstacles = tilemap.createLayer(obstaclesLayer, tileset);
    obstacles.setCollisionByExclusion([-1]);

    return { ground, obstacles };
  }

  // createBackground() {
  //   const background = this.add
  //     .image(0, 0, PLAYER_CONFIG.backgroundImage)
  //     .setOrigin(0, 0);

  //   return background;
  // }

  setWorldBounce(width, height) {
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
    this.setWorldBounce(worldWidth, worldHeight);
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
      enemy.handleRotation(x, y);
      this.checkEntityBulletRange(enemy);
      // enemy.handleShoot(x, y);
    }
  }

  createPlayer() {
    const config = PLAYER_CONFIG;
    const player = new Player(this, config);

    return player;
  }

  createEnemy() {
    const config = ENEMY_CONFIG;
    const enemy = new Enemy(this, config);
    this.addEnemyCollisions(enemy);
    this.enemies.push(enemy);

    return enemy;
  }

  createBotSoldier() {
    const config = BOT_BAZOOKA_SOLDIER_CONFIG; // BOT_BAZOOKA_SOLDIER_CONFIG  BOT_GUN_SOLDIER_CONFIG
    const botSoldier = new SoldierBot(this, config);
    this.addEnemyCollisions(botSoldier);
    this.enemies.push(botSoldier);

    return botSoldier;
  }

  createBotHelicopter() {
    const config = BOT_HELICOPTER_CONFIG;
    const botHelicopter = new HelicopterBot(this, config);
    this.addEnemyCollisions(botHelicopter);
    this.enemies.push(botHelicopter);

    return botHelicopter;
  }

  createBotTank() {
    const config = BOT_TANK_CONFIG;
    const botTank = new TankBot(this, config);
    this.addEnemyCollisions(botTank);
    this.enemies.push(botTank);

    return botTank;
  }

  addPlayerCollisions() {
    // this.addPlayerBulletToEnemyCollisions();
    this.addPlayerToEnemyCollision();
    this.addPlayerCollisionWithObstacles();
    this.addTargetBulletsCollisionWithObstacles(this.player);
  }

  addEnemyCollisions(enemy) {
    this.addTargetBulletsCollisionWithObstacles(enemy);
    this.addTargetBulletToPlayerCollision(enemy);
    this.addPlayerBulletWithTargetCollisions(enemy);
  }

  addPlayerCollisionWithObstacles() {
    const obstacles = this.tilemapLayers.obstacles;
    this.physics.add.collider(this.player, obstacles);
  }

  addTargetBulletsCollisionWithObstacles(target) {
    const targetBullets = target.getActiveBullets();
    const obstacles = this.tilemapLayers.obstacles;

    this.physics.add.collider(targetBullets, obstacles, (bullet) => {
      target.turnOffBullet(bullet);
    });
  }

  addTargetBulletToPlayerCollision(target) {
    const targetBullets = target.getActiveBullets();
    const player = this.player;

    setCollision(this, targetBullets, player, (bullet) => {
      target.turnOffBullet(bullet);
      player.manageCondition(target.getBulletDamageValue());
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

  // addPlayerBulletToEnemyCollisions() {
  //   const playerBullets = this.player.getActiveBullets();
  //   const enemy = this.enemy;

  //   setCollision(this, playerBullets, enemy, (bullet) => {
  //     this.player.turnOffBullet(bullet);
  //     // this.score.updateScore(1);
  //     enemy.manageCondition(this.player.getBulletDamageValue());
  //   });
  // }

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
