import {
  GAME_WIDTH,
  GAME_HEIGHT,
  PLAYER_CONFIG,
  ENEMY_CONFIG,
} from "../gameConfig";
import HandleInputs from "../utils/HandleInputs";
import MouseControl from "../utils/MouseControl";
import Player from "../entities/Player";
import Enemy from "../entities/Enemy";
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
    this.playerShip = this.createPlayerShip();
    this.enemyShip = this.createEnemyShip();

    this.addCollisions();

    this.setupCamera();
    this.mouseInput = new MouseControl(this);
    this.handleInputs = new HandleInputs(this);
  }

  update() {
    this.playerShip.update();
    this.updateEnemies();
    this.checkPlayerBulletRange();
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
    const cameraX = -this.playerShip.getBodyWidth() / 2;
    const cameraY = -this.playerShip.getBodyHeight() / 2;

    this.cameras.main.startFollow(
      this.playerShip,
      true,
      0.5,
      0.5,
      cameraX,
      cameraY
    );
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.setWorldBounce(worldWidth, worldHeight);
  }

  updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.update();
    }
    // const enemyActiveBullets = enemy.getActiveBullets()
    // enemyActiveBullets.forEach(bullet => {
    //   if(  checkCollisionWithObject(
    //     bullet.body,
    //     this.playerShip.body,
    //     PLAYER_CONFIG.attackRange) ) {
    //     }
    // })
  }

  createPlayerShip() {
    const config = PLAYER_CONFIG;
    const player = new Player(this, config);

    return player;
  }

  createEnemyShip() {
    const config = ENEMY_CONFIG;
    const enemy = new Enemy(this, config);
    this.enemies.push(enemy);

    return enemy;
  }

  addCollisions() {
    this.addPlayerBulletToEnemyCollisions();
    this.addPlayerToEnemyCollision();
    this.addEnemyBulletToPlayerCollision();
    this.addPlayerCollisionWithObstacles();
    this.addPlayerBulletCollisionWithObstacles();
  }

  addPlayerCollisionWithObstacles() {
    const obstacles = this.tilemapLayers.obstacles;
    this.physics.add.collider(this.playerShip, obstacles);
  }

  addPlayerBulletCollisionWithObstacles() {
    const playerShipBullets = this.playerShip.getActiveBullets();
    const obstacles = this.tilemapLayers.obstacles;

    this.physics.add.collider(playerShipBullets, obstacles, (bullet) => {
      this.playerShip.turnOffBullet(bullet);
    });
  }

  addEnemyBulletToPlayerCollision() {
    const enemyShipBullets = this.enemyShip.getActiveBullets();
    const playerShip = this.playerShip;

    setCollision(this, enemyShipBullets, playerShip, (bullet) => {
      this.enemyShip.turnOffBullet(bullet);
      playerShip.manageVehicleCondition(this.enemyShip.getBulletDamageValue());
      this.hudScene.updateHealthBar(playerShip.getHealthBarPercent());
    });
  }

  addPlayerBulletToEnemyCollisions() {
    const playerShipBullets = this.playerShip.getActiveBullets();
    const enemyShip = this.enemyShip;

    setCollision(this, playerShipBullets, enemyShip, (bullet) => {
      this.playerShip.turnOffBullet(bullet);
      // this.score.updateScore(1);
      enemyShip.manageVehicleCondition(this.playerShip.getBulletDamageValue());
    });
  }

  addPlayerToEnemyCollision() {
    this.physics.add.collider(this.playerShip, this.enemyShip);
  }

  checkPlayerBulletRange() {
    const playerShipBullets = this.playerShip.getActiveBullets();

    playerShipBullets.forEach((bullet) => {
      if (
        checkCollisionWithObject(
          bullet.body,
          this.playerShip.body,
          PLAYER_CONFIG.attackRange
        )
      ) {
        this.playerShip.turnOffBullet(bullet);
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
    this.playerShip.handleShoot();
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
