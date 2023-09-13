
    // ! IMAGE / SPRITE /////////
    this.background = this.add
    .image(0, 0, "background")
    .setOrigin(0, 0)
    .setDisplaySize(this.gw, this.gh);



    this.road = this.add
    .tileSprite(this.gw / 2, 0, 685, 1177, "road")
    .setOrigin(0.5, 0);


    // ? PORUSZANIE TILEMAPĄ
    this.road.tilePositionY -= 8;
    
    
    
    // ! RANDOM NUMBER ///////////
    this.randomNumber =  Math.floor(Phaser.Math.Between(0, 9))
    
    
    
    // ! ANIMS /////////////////

    this.background = this.add
    .sprite(0, 0, "background")
    .setOrigin(0, 0)
    .setDisplaySize(this.gw, this.gh);



// ? ANIMS KLATKI TYLKO SZEROKO
    this.anims.create({
      key: "cannon",
      frames: "cannon",
      frameRate: 10,
      repeat: 0,
    });


//? KOLEJNOŚĆ KLATEK CUSTONMOWE
    this.anims.create({
      key: `moveRight`,
      frames: this.anims.generateFrameNumbers(`player`, {
        frames: [1, 2, 3, 2],
      }),
      frameRate: 15,
      repeat: -1,
    });


    //? ANIMS KLATKI SZEROKO I W DÓŁ
    this.anims.create({
      key: 'kick',
      frames: this.anims.generateFrameNumbers('brawler', { frames: [ 10, 11, 12, 13, 10 ] }),
      frameRate: 8,
      repeat: -1,
      repeatDelay: 2000
  });


// ? ////////// START ANIMACJI
  this.anims.play(state, true);


    
    // ? ///////////
    this.penguin.play("penguin-death")
    .once("animationcomplete", () => {
    
    });
    
    // ? ///////////
    .on('animationupdate', (anim, frame) => {   
        this.character.off('animationupdate')
      })


    // ? ///////////
    states.playReverse('frozenState', true)





// ? krótszy zapis ładowania animacji chodzenia w innych skinach//////////
//to w preload /////////
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 6; j++) {
        this.load.image(
          `Character ${i}${j}`,
          `Walking Character ${i}/0${j}.png`
        );
      }
    }

    //to w create ////////
    for (let i = 1; i <= 4; i++) {
      const frames = [];
      for (let j = 1; j <= 6; j++) {
        frames.push({ key: `Character ${i}${j}`, frame: null });
      }

      const anim = this.anims.create({
        key: `Character ${i} walk`,
        frames,
        frameRate: 20,
      });
    }


    lines.length === 1
    
    
    // ! TEXT / ADD TEXT /////////////////
    this.penguinsLeftText = this.add
      .text(
        this.gw / 2 - 20,
        75,
        "Jajsdiaod kdsiahuwed hdnusao /ndhjsaiohdoisah",
        {
          fontFamily: "LuckiestGuy",
          fontSize: "30px",
          color: "#FF0000",
          stroke: "#000000",
          strokeThickness: 5,
          maxLines: 3,
          padding: { left: 50 },
          wordWrap: { width: 200 },
          shadow: { blur: 0, stroke: false, fill: false },
        }
      
      .setOrigin(0.5)
      .setFontSize(60)
      .setText(text)
      .setColor(color)
      .setStroke("#000000")
      .setPadding(50, 0, 0, 0)
      .setWordWrapWidth(200);
    
      const text = this.add.text(0, 0, 'Hello');
      text.setText(text.text.padStart(100));


      this.text = "Ala"
      this.text.length // to 3



// ! COLOR ///////////////////////////////
    image.setTint("#000000")
  
    
    // ! SOUND ///////////////

    // ? TO wjebać do preload///////////
    this.load.audio("correctAnswer", "audio/correctAnswer.mp3");


 // ? TO już tam tego///////////
      this.bazookaShootAudio = this.sound.add('bazookaShoot')
      this.bazookaShootAudio.volume = 0.3
    
      // ? ///////////
      this.bazookaShootAudio.play() 


// ? ///////////////////
      this.waterSoundAudio.loop = true;




      // ? MUTE BUTTON ////////////
      addMusicButton() {
        this.muteButton = this.add.image(this.gw - 200, 60, "unmuteIcon");
        this.muteButton.setInteractive();
    
        this.muteButton.on("pointerup", () => {
          if (this.isMute) {
            this.isMute = false;
            this.waterSoundAudio.play();
            this.muteButton.setTexture("unmuteIcon");
          } else {
            this.isMute = true;
            this.waterSoundAudio.stop();
            this.muteButton.setTexture("muteIcon");
          }
        });
      }





// ? mute button
      addMusicButton() {
        this.muteButton = this.add.image(this.gw - 200, 60, "unmuteIcon");
        this.muteButton.setInteractive();
    
        this.muteButton.on("pointerup", () => {
          if (this.isMute) {
            this.isMute = false;
            this.waterSoundAudio.play();
            this.muteButton.setTexture("unmuteIcon");
          } else {
            this.isMute = true;
            this.waterSoundAudio.stop();
            this.muteButton.setTexture("muteIcon");
          }
        });
      }





    
      }
    
    
    // ! TIME ///////////////
      setTimeout(() => {
        // this.hudScene.healthBar.getDamage()
     }, 2000);


      //////////////////////////
     this.time.delayedCall(200, () => {

     })
    
     //////////////////////////
     setInterval(func,1000)


    /////////////////////////
    var timer = scene.time.addEvent({
      delay: 500,  
      callback: callback,
      //args: [],
      callbackScope: thisArg,
      loop: true
    });

    // to to ssamo co wyzej tylko jakos lepiej zapisane
    this.time.addEvent({
      delay: 13000,
      callback: () => this.addBanner(),
      loop: true,
    });




    // ! PERFORMANCE measurement//////////////////
    let startAt = performance.now();

    let endAt = performance.now();
    console.log(`${endAt - startAt} miliseconds`);


    // ! TWEENS ///////////////
    
    this.tweens.add({
      targets: this.banner,
      ease: 'Power2',
      y: this.gh + this.banner.displayHeight,
      duration: 2500,
      flipX: true,
      hold: 2000,
      repeat: 2,
      repeatDelay: 1000,
      yoyo: true,
      onComplete: () => {
        this.banner.destroy();
      },
      onUpdate: () => {
        console.log(1)
      },
      onStart: () => {
        console.log(1)
      },
      onYoyo: () => {
        console.log(1)
      },
      onRepeat: () => {
        console.log(1)
      },
    });


    // ? CUSTOM EASE
    ease: function (t) {
      return Math.pow(Math.sin(t * 3), 3);
  },



  
  //? ZNIEKSZTAŁCANIE OBRAZKA
this.owner.scene.tweens.add({
  targets: this.weapon,
  duration: 100, // Duration in milliseconds (1 second)
  scaleX: 1.5, // Scale along the X-axis
  scaleY: 0.5, // Scale along the Y-axis
  rotation: 0.5, // Rotation in radians
  x: 100, // X position
  y: 100, // Y position
  repeat: 0, // Number of times to repeat (0 means no repeat)
  yoyo: true, // Reverse the tween automatically
});




    // ? RUCH RYSOWANIA KWADRATU OD LEWEJ DO PRAWEJ W DÓŁ ITP
    this.timeline = this.tweens.timeline({

      tweens: [{
          targets: image,
          x: 600,
          ease: 'Power1',
          duration: 1000
          offset: '-=500', // starts 500ms before previous tween ends 
      },
      {
          targets: image,
          y: 500,
          ease: 'Power1',
          duration: 1000
          offset: '-=500', // starts 500ms before previous tween ends 
      },
      {
          targets: image,
          x: 100,
          ease: 'Power1',
          duration: 1000
          offset: '-=500', // starts 500ms before previous tween ends 
      },
      {
          targets: image,
          y: 100,
          ease: 'Power1',
          duration: 1000
          offset: '-=500', // starts 500ms before previous tween ends 
      }]

  });


// ? CHYBA JAKIEŚ WYCIĄGANIE WARTOŚCI Z TWEENA
    tween.getValue()

// ? UPDATE TWEENA 
tween.updateTo('x', this.input.x, true);

// ? UPDATE DURATION
tween.timeScale -= 0.1;


// ? PAUSA I RESUME TWEENA 
    this.input.on('pointerdown', function () {

      if (tween.isPlaying())
      {
          tween.pause();
      }
      else
      {
          tween.resume();
      }
  });






  // ! ATLAS ////////////////////////

  // ? TO W PRELOAD
  this.load.atlas(
    "atlas",
    "www/src/assets/images/atlas.png",
    "www/src/atlas.json"
  );


// ? POTEM TO W MIEJSCE NP this.player = this.add.image itp

  this.add.sprite(this.gw / 2, this.gh / 4, "atlas", "riskyJumperText.png");






// ! KNOCK / PUSH / MOVE BACK ///////////////////////////
  
// ? W KLASIE ENEMY
pushMove(object, hitForce) {
  const direction = new Phaser.Math.Vector2(
    this.x - object.x,
    this.y - object.y
  ).normalize();

  this.body.setVelocity(direction.x * hitForce, direction.y * hitForce);
}






// ! ROTATE względem pointera / POINTER //////////////////

let angle = Phaser.Math.Angle.BetweenPoints(
  {
    x: this.x - this.scene.cameras.main.scrollX,
    y: this.y - this.scene.cameras.main.scrollY,
  },
  {
    x: this.scene.input.x,
    y: this.scene.input.y,
  } || { x: 0, y: 0 }
);
+ Phaser.Math.DegToRad(45);


this.head.setRotation(angle);







    // ! COLLISION ///////////////
        //? ///// DO ARACDE////////////

  //? DOBRE DO HITBOXA
   Phaser.Geom.Intersects.RectangleToRectangle(target1, target2);


 // ? GDY MA SIĘ COŚ ZADZIAĆ
    this.physics.add.overlap(
      this.mainCar,
      obstacle,
      () => {
        if (this.isGameLost) return;

      }),


    // ? GDY MA BYĆ TYLKO KOLIZJA I NIC SIE NIE DZIAĆ
    this.physics.add.collider(this.player, junk);

    // ? GDY MA SIĘ DZIAĆ
    this.physics.add.collider(this.player, platform, null, () => {
      if (!this.platformOverlap) return;
      this.player.restartPositionX = platform.x;
      this.player.restartPositionY = platform.y;
    });



    // ? WYŁĄCZANIE KOLIZJI 
    this.body.checkCollision.up = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;






    //! BODY /////////////////

 setupBody() {
    this.body.width = 30;
    this.body.height = 35;
    this.body.offset.y = 48; // 64
    this.body.offset.x = 83; // 64
  }

    

// ! BUTTON ///////////////

onClick(cb) {
  this.on("pointerdown", () => {
    this.setScale(0.9);
    cb();
  }).on("pointerup", () => this.setScale(1));

  return this;
}









//! EFFECT /////////////////////////////

//? ARROW particles

addParticles() {
  return this.scene.add.particles("bulletTrait");
}


addParticlesAnim() {
  return this.circleParticles
    .createEmitter({
      x: 0,
      y: 0,
      lifespan: 200,
      speed: { min: -100, max: 100 },
      // speedX: 0,
      // speedY: { min: -20, max: 20 },
      // gravityY: 200,
      scale: { start: 1, end: 0 },
      alpha: { start: 0.4, end: 0 },
        blendMode: 'ADD',
      frequency: 30,
    })
    .start();
}











    
     // ! SCENE ///////////////
    //odwołanie do sceny jak trzeba się do niej odwołać po jakimś czasie (po zrobieni creatów)
     this.hudScene = this.scene.get('HudScene');
    
    // odwołanei do sceny w trzeba się do niej odwołać podczas robienia creatów
    this.hudScene.events.on("create", () => {
      this.player.healthBar = this.hudScene.healthBar;
    });
    
    
      this.scene.start("HudScene")





      // ! ALPHA ///////////
      //? ZNIKA CORAZ BARDZIEJ DO GÓRY
      sea.setAlpha(1, 1, 0, 0);




      //! SLOTS ////////////////////

      addSlot(i) {
        const slotCount = this.itemSlotCount;
        const slotWidth = 70;
        const totalWidth = slotCount * slotWidth;
        const startX = (this.gw - totalWidth) / 2;
        const x = startX + i * slotWidth + slotWidth / 2;
        const y = this.gh - 50;
    
        const slot = this.add.image(x, y, "itemBox").setScale(0.5);
    
        this.itemSlots.push(slot);
      }
    
      addSlots(value) {
        for (let i = 0; i <= value - 1; i++) {
          this.addSlot(i);
        }
      }






     // ! EMITTER (np padający śnieg) ///////////////

     addSnow() {
      this.particles = this.add.particles("snowFlake");
      this.particles.createEmitter({
        y: 0,
        x: { min: 100, max: this.gw + 300 },
        lifespan: 4000,
        speedY: { min: 100, max: 300 },
        speedX: { min: -100, max: -200 },
        scale: { start: 1.2, end: 0.2 },
        // quantity: 1,
        frequency: 50,
        blendMode: "ADD",
      });
    }



    // ! Imput Text ///////////////

//? W CONFIGU PHASERA DODAĆ TO

parent: "div",

//? I TO

 dom: {
        createContainer: true,
    },

//? POD BODY TO W HTML

<div id="div"></div>


//? wrzucić w preload
 this.load.plugin(
      "rexinputtextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
      true
    );
    this.load.plugin(
      "rexninepatchplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexninepatchplugin.min.js",
      true
    );


//? to juz normlanie w create
    addInputText() {
      const inputbox = this.add.rexNinePatch({
        x: this.operation.container.x + this.operation.displayText.width / 2 + 90,
        y: 80,
        width: 160,
        height: 120,
        key: "inputBox",
        columns: [15, undefined, 15],
        rows: [10, undefined, 10],
      });
  
      console.log(this.operation.displayText.width);
      const inputText = this.add
        .rexInputText({
          x:
            this.operation.container.x +
            this.operation.displayText.width / 2 +
            170,
          y: 90,
          width: 300,
          height: 140,
          type: "textarea",
          placeholder: "",
          fontSize: "100px",
          fontFamily: "LuckiestGuy",
          color: "#ffffff",
          align: "left",
          maxLength: 2,
        })
        .resize(300, 140)
        .on("textchange", ({ text }) => {
          if (text.includes(" ")) {
            this.inputText.text = this.nickText || "";
            return;
          }
          console.log(text);
          this.nickText = text;
        })
        .on("focus", () => {
          this.addMoveAnim();
        });
    }








    //! DODAWANIE RZĘDÓW I KOLUMN /////////

    addBeads() {
      for (let i = 0; i < this.bead.maxColumns; i++) {
        this.beads[i] = [];
        for (let j = 0; j < this.bead.maxRows; j++) {
          this.beads[i][j] = [];
          let x =
            this.x +
            this.bead.marginX +
            this.bead.slotWeight / 2 +
            i * (this.bead.slotWeight / 2 + this.bead.gridSpacingX);
          let y =
            this.y +
            this.bead.marginY +
            this.bead.slotHeight / 2 +
            j * (this.bead.slotHeight / 2 + this.bead.gridSpacingY);
  
          if (j / 5 === 0) {
            y = y - this.bead.headSpace;
          }
          const bead = new Bead(this.scene, x, y, this.sprite);
          this.beads[i][j] = bead;
          bead.column = i;
          bead.row = j;
          this.setBeadClickable(bead);
          if (bead.row % 5 === 0) {
            bead.move();
          }
        }
      }
    }






    // ! MOUSE ///////////////

//? MYSZKA ZNIKA Z KERANU
this.input.manager.canvas.style.cursor = "none";


//? MYSZKA ZNIKA Z KERANU I NIE MOZNA NIC KLIKAĆ

  this.input.on(
      "pointerdown",
      function (pointer) {
        console.log(this.input.mouse);
        this.input.mouse.requestPointerLock();
      },
      this
    );


//? PORUSZANIE MYSZKĄ PO EKRANIE Z CURSOREM JAKO IMAGE
this.input.on(
  "pointermove",
  function (pointer) {
    this.celownik.x = pointer.x;
    this.celownik.y = pointer.y;

    // Zapętlanie na ekranie
    this.celownik.x = Phaser.Math.Wrap(this.celownik.x, 0, this.gw);
    this.celownik.y = Phaser.Math.Wrap(this.celownik.y, 0, this.gh);
  },
  this
).setInteractive();



//? RUSZANIE KÓLKIEM OD MYSZKI I PORUSZANIE OBIEKTEM
    this.container.on("wheel", (pointer, dx, dy, dz, event) => {
      console.log("scrollling");
      this.messagesContainer.y += dy * 0.5;
    });




//? ŁAPANIE ZA OBIEKT I PRZEÓWANIE GO
    this.windowContainer.setSize(200, 200);
    this.windowContainer.setInteractive()
    this.scene.input.setDraggable(this.windowContainer);
    this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    });



    //! SCREEN SHAKE, EFFECTS, CAMERA ////////////////////
    this.cameras.main.shake(20, 0.005);




    //! FULL GAME WINDOW ////////////////
    this.gw = window.innerWidth





// ! FULL SCREEN ////////////////

// ? TO W METODACH
addFullScreenButton() {
  this.fullscreen = this.add
    .image(this.gw - 5, 5, "full-screen")
    .setOrigin(1, 0)
    .setScale(2)
    .setDepth(99999);
  this.fullscreen.setInteractive();

  this.fullscreen.on("pointerup", () => {
    console.log(this);
    this.scale.startFullscreen();
  });
}


//? TO W UPDATE
fullScreenVisible() {
  if (!this.scale.isFullscreen && !this.fullscreen.active) {
    this.fullscreen.setActive(true);
    this.fullscreen.setVisible(true);
  } else if (this.scale.isFullscreen && this.fullscreen.active) {
    this.fullscreen.setActive(false);
    this.fullscreen.setVisible(false);
  }
}






// ! DATA /////////////
// ? W CREATE
this.data.set('lives', 3);

// ? ODWOŁANIE TO 
this.data.get('level'),



// ? DATA W OBIEKCIE
// ? W PRELOAD
const gem = this.add.image(300, 300, 'gem');


// ? W CREATE
 //  Store some data about this Gem:
 gem.setData({ name: 'Red Gem Stone', level: 2, owner: 'Link', 'gold': 50 });


// ? ODWOŁANIE
 gem.getData('name'),


// ? ZMIANA WARTOŚCI
gem.data.values.gold += 100;









//! CAMERA ///////////


this.cameras.main.startFollow(this.ship, true, 0.08, 0.08);


this.cameras.main.centerOn(0, 0);

this.cameras.main.setZoom(4);



// ? RUCH BOUNCE CAMERY
this.cameras.main.setBounds(0, 0, 3392, 100);




// ! DEPTH ///////////////

updateDepth(){
  this.enemy.forEach(entity => entity.characterContainer.setDepth(entity.characterContainer.body.y + entity.characterContainer.body.height))
  this.NPC.forEach(entity => entity.characterContainer.setDepth(entity.characterContainer.body.y + entity.characterContainer.body.height))
  this.player.characterContainer.setDepth(this.player.characterContainer.body.y + this.player.characterContainer.body.height)
}





//! CONTAINER /////////////////////

const container = this.add.container(x, y);
container.add(object);





//! KOLIZJA UŻYCIE PROGRAMU

//? jakos tak to wygląda w tamtej maze game. Trzeba popatrzeć co się nada a co nie

//? TO W PRELOAD
this.load.json("colliders", "maze_world.json");


//? A TO JUZ DALSZY KOD

this.wallCategory = 1;
    this.baseCategory = this.matter.world.nextCategory();


    this.player.setCollidesWith([this.wallCategory, this.baseCategory]);

    this.matter.world.setBounds(0, 0, this.gw, this.gh);
    this.cameras.main.setBounds(0, 0, this.gw, this.gh);



    this.player.setCollidesWith([this.wallCategory]);


    addColliders() {
      var Body = Phaser.Physics.Matter.Matter.Body;
      var Composite = Phaser.Physics.Matter.Matter.Composite;
      var Parser = Phaser.Physics.Matter.PhysicsEditorParser;
      var shapes = this.cache.json.get("colliders")["background"];
      var composite = Composite.create();
  
      for (var i = 0; i < shapes.fixtures.length; i++) {
        var body = Body.create({ isStatic: true });
  
        Body.setParts(body, Parser.parseVertices(shapes.fixtures[i].vertices));
  
        Composite.addBody(composite, body);
      }
  
      this.matter.world.add(composite);
    }





    // ! LOADING ASSTETS //////////////

    `./src/client/assets/images/${folder}`




    // ! PRZESUWANIE OBIEKT ///////////////

const rewards = {
  reward_1: ["duck", "dog", "dragon"],
  reward_2: ["necklace", "frog", "panda"],
  reward_3: ["guitar", "wand", "crown"],
};

//? ZAMIANA OBIEKTU NA TABLICĘ
const keys = Object.keys(obj);

//? WZIECIE RANDOMOWEGO ELEMENTU Z OBIEKTU
const randomKey = keys[Math.floor(Math.random() * keys.length)];







// ! LOCAL STORAGE //////////////////////
// ? Czyści pamięć lokalną
    localStorage.clear();


// ? Zapisuje w pamięci lokalnej
    localStorage.setItem("nick", "Janek");


  // ? Odwołanei do zapisanych danych w pamięci lokalnej
    this.nick = localStorage.getItem("nick");







    // ! Dodanie phasera z linku ///////////////

    <!DOCTYPE html>
<html>
  <head>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
  </head>
  <style>
  </style>
  <body>
    <div id="game"></div>
    <script src="./src/scenes/PlayScene.js"></script>
  </body>
</html>






// ! DODANIE CZCIONKI ///////////////

//? Po pierwesze wklej ten plik txt

<!DOCTYPE html>
<html>
  <head>
  </head>
  <style>
    @font-face {
      font-family: "LuckiestGuy";
      src: url("/src/LuckiestGuy.ttf") format("truetype");
    }
    * {
      font-family: "LuckiestGuy";
    }
  </style>
  <body>
    <div id="game"></div>

    <script>
         // Wait for fonts to load
         document.fonts.ready.then(function() {
        // Fonts are loaded, do something
        console.log("Fonts are loaded");
      });
    </script>

    <script src="./src/scenes/PlayScene.js"></script>
    <script src="./src/index.js"></script>
  </body>
</html>









// ! FRONTEND ///////////////

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> // name i content to to co tam jest wpisane bedzie wyswietlane tak jak bys wpisał jakąś strone w google</meta> </meta>
    <title>Tenis Gra JavaScript</title>
    <style>
        body {
            margin: 0;
            padding: 0; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            height: 100vh; 
            background-color: darkgray; 
        }

   canvas {border: 3px solid #fff
   }
    </style>
</head>
<>
    <div></div>
    <canvas></canvas>
    <script></script>
    </html>



    // ! PRZESUWANIE OBIEKTU MYSZKĄ ///////////////
    //? To akurat jest metoda jakiejs klasy
    moveable(){
        this.windowContainer.setSize(200, 200);
        this.windowContainer.setInteractive()
        this.scene.input.setDraggable(this.windowContainer);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }









// ! SKRÓTY ///////////////
this.entity.character.flipX ? this.entity.x : this.entity.x + 10












// ! HTML 5 ///////////////
<!DOCTYPE html>
<html lang="en"> // język
  <head>
      <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> // name i content to to co tam jest wpisane bedzie wyswietlane tak jak bys wpisał jakąś strone w google i jest to związne ze skalowaniem itp
        <link rel="stylesheet" href="Style.css"> // dodanie pliku. nadanie mu nazwy "stylesheet" i podanie ścieżki gdzie on się znajduje
        <link rel="icon" href="dsadsad.jpg"> // dodanie ikony do strony. Ta na górze tam w zakjładce

        <title>Tenis Gra JavaScript</title> // tytuł karty

          <style>
            .bolded-text {  // z kropką na początku to odwołanie do klasy  
              font-size: 20px
            }

            #boldedText {  // z chsztagiem na początku to odwołanie do id
              font-size: 20px
            }
          </style>

  </head>
    <body>
      <div class="container" id="container"> // zeby móc odwołać siędo elementu można nadać mu albo klase albo id. Można ito i to. Różnica jest taka że klase container można nadać paru elementom i będą one takjakby w kontzenerze i będzie można edytować oba a jeśli nadasz id to będzie to się tyczyło tylko tego jednego
        <h1> Kurs HTML</h1> // tekst wyświetlany na stronie
        <p> Witaj na mojej pierwszej stronie</p> // (Przejście do nowej linii ) tekst w nowym akapicie to sie pisze mniejszymi literami pod tym h1

        <p>
          Przykładowa treść 1 <br>   // br oddziela tekst od tekstu przechodząc do nowej linii bez akapitu. Nie trzeba go zamykać
          Przykładowa treśc 2
        </p>

        <img width="200" src = "obrazek.jpg"></img> dodaje zdjęcie. Width zmienia rozmiar
        <img src = "https://obrazek.jpg"></img> może bytć to również link do storny internetowej
        <li><a href="about.html"> O mnie </a></li> // przycisk z linkiem w k tóry jak klikniesz to przeniesie do danej strony a li to wykropkowywanie telkstu
      </div>
    </body>
</html>


let li = document.createElement("li") // Tworzy nowy element w html
list.appendChild(li) // list to zmienna któa odwołuje się do elementu html a appendchild dodaje wybrany element do danego elementu


this.document.getElementById("contetnt") // bierze element z html po id i można coś z nim zrobić

