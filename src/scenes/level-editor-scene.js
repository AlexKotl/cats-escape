import Phaser from 'phaser';
import Board from '../objects/board';
import figures from '../objects/figures';

const DEBUG_MODE = true;

export default class LevelEditorScene extends Phaser.Scene {
    
    constructor() {
        super({ key: 'LevelEditorScene'})
    }

    preload() {
        this.load.image('room', 'assets/sprites/room2.jpg');
        this.load.image('cat1', 'assets/sprites/cats/cat1.png');
        this.load.image('cat2', 'assets/sprites/cats/cat2.png');
        this.load.image('cat3', 'assets/sprites/cats/cat3.png');
        this.load.image('cat4', 'assets/sprites/cats/cat4.png');
        this.load.image('cat5', 'assets/sprites/cats/cat5.png');
        this.load.spritesheet('mouse', 'assets/sprites/mouse.png', {
            frameWidth: 54, 
            frameHeight: 54,
        });
        
        this.level = {
            figures: [],
        };
    }
    
    updateMap() {
        // add sprites
        for (let n in this.level.figures) {
            let figure = this.level.figures[n];
            
            if (figure.sprite === undefined) {
                let sprite = this.add.sprite(figure.pos.x * this.board.blockSize, figure.pos.y * this.board.blockSize, figure.name);
                sprite.setOrigin(0);
                this.input.setDraggable(sprite.setInteractive());
                
                this.level.figures[n].sprite = sprite;
            }
            
        }
    }
    
    logMap() {
        let map = {figures: []};
        for (let figure of this.level.figures) {
            map.figures.push({
                name: figure.name,
                pos: figure.pos,
            });
        }
        console.log("Map:", JSON.stringify(map));
    }

    create() {
        this.input.mouse.disableContextMenu();
        
        // setup camera and background
        this.cameraOffset = {x: 170, y: 40};
        this.cameras.main.scrollX = -this.cameraOffset.x;
        this.cameras.main.scrollY = -this.cameraOffset.y;
        this.add.sprite(-this.cameraOffset.x, -this.cameraOffset.y, 'room').setOrigin(0);
        this.add.text(10, -20, "Press S to output level to console", {font: "14px Courier"});
        this.add.text(-140, -20, "Level\nEditor", {font: "20px Courier"});
        
        this.graphics = this.add.graphics(); 
        
        this.board = new Board({
            blockSize: 54,
            size: {
                width: 7, 
                height: 7
            },
            scene: this,
        });
        
        // create gui
        let n = 0;
        for (let figure of ['cat1', 'cat2', 'cat3', 'cat4', 'cat5']) {
            let sprite = this.add.sprite(470, 90 * n, figure).setOrigin(0).setScale(0.5);
            sprite.setInteractive();
            sprite.on('pointerdown', (pointer, sprite) => {
                this.level.figures.push({
                    name: figure,
                    pos: {x: 0, y: 0},
                });
                
                this.updateMap();
            });
            n++;
        }

        this.input.on('drag', (pointer, obj, dragX, dragY) => {
            obj.setPosition(dragX, dragY);
        });
        
        this.input.on('dragend', (pointer, obj) => {
            let mapPos = this.board.getMapPosition(obj.x + this.board.blockSize/2, obj.y + this.board.blockSize/2); // get avarage pos
            obj.setPosition(mapPos.x * this.board.blockSize, mapPos.y * this.board.blockSize);
            // update figure pos
            let draggedFigureIndex = this.level.figures.findIndex(el => obj === el.sprite);
            this.level.figures[draggedFigureIndex].pos.x = mapPos.x;
            this.level.figures[draggedFigureIndex].pos.y = mapPos.y;
        });
        
        this.input.on('pointerdown', (pointer, obj) => {
            if (pointer.rightButtonDown()) {
                let index = this.level.figures.findIndex(el => obj[0] === el.sprite);
                
                this.level.figures[index].sprite.destroy();
                this.level.figures.splice(index, 1);
                return;
            }
        });
        
        this.input.keyboard.on('keydown_S', (event) => {
            this.logMap();
        });

    }


}
