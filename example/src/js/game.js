const Game = module.exports = {};

const Miga = require("migalib");

Game.instance = null;

Game.init = function init() {
    this.instance = new Miga.Game(1024, 576); 
    this.loadAssets();
    Miga.ScreenManager.currentScreen = {
        render: () => {
            this.render();
        },
        update: (delta) => {
            this.update(delta);
        },
    }; 
    this.testEntity = new Miga.Entity(10, 10, 16, 16);
    this.testEntity.textureArea = new Miga.TextureArea(Miga.ResourceManager.sprites, 0, 0);
    Miga.Renderer.zoom = 4;
    this.instance.start();
};

Game.loadAssets = function loadAssets() {
 Miga.ResourceManager.loadImage("sprites", "https://raw.githubusercontent.com/markus-wi/ludumDare27/master/ld27-android/assets/data/sprites.png");   
};

Game.render = function render() {
    this.testEntity.render();
    if(this.monsters) {
        this.monsters.forEach((monster) => {
            monster.render();
        });
    }
};

Game.update = function update(delta) {
    // player movement
    if(Miga.InputManager.isKeyPressed(Miga.Keys.rightarrow)) {
        this.testEntity.move(Miga.Directions.right, 1000, delta);
    } else if(Miga.InputManager.isKeyPressed(Miga.Keys.leftarrow)) {
        this.testEntity.move(Miga.Directions.left, 1000, delta);
    }
    if(Miga.InputManager.isKeyPressed(Miga.Keys.uparrow)) {
        this.testEntity.move(Miga.Directions.up, 1000, delta);
    } else if(Miga.InputManager.isKeyPressed(Miga.Keys.downarrow)) {
        this.testEntity.move(Miga.Directions.down, 1000, delta);
    }
    //monster "AI" xD 
    if(this.monsters) {
        const monstersToDelete = [];
        this.monsters.forEach((monster, index) => {
            monster.move(Miga.Directions.down, monster.speed, delta);
            if(monster.y > 650) {
                monstersToDelete.push(index);
            }
        });
        monstersToDelete.forEach((index) => {
            this.monsters.splice(index, 1);
        })
    }
    // spawn    
    if(this.spawnTimer && this.spawnTimer > 0) {
       this.spawnTimer -= delta; 
    } else {
        this.spawnTimer = parseInt(Math.random(), 10);
        if(this.monsters) {
            for(let i = 0; i < Math.random()*50 +1; i++) {
                const monster = new Miga.Entity(Math.random()*800, -64, 16, 16);
                monster.textureArea = new Miga.TextureArea(Miga.ResourceManager.sprites, parseInt(Math.random()*5+2), 0);
                monster.speed = Math.random()*800+100;
                this.monsters.push(monster);
            }
        } else {
            this.monsters = [];
        }
    }
    
};





