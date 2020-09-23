import Phaser from 'phaser';
import Board from '../objects/board';
import figures from '../objects/figures';

const DEBUG_MODE = true;

export default class LevelEditorScene extends Phaser.Scene {

    constructor() {
        super({ key: 'LevelEditorScene'})
    }

    preload() {
        this.load.image('level', 'assets/sprites/level.png');
        this.load.image('board', 'assets/sprites/board.png');
        this.load.image('cat11', 'assets/sprites/cats/cat11.png');
        this.load.image('cat12', 'assets/sprites/cats/cat12.png');
        this.load.image('cat13', 'assets/sprites/cats/cat13.png');
        this.load.image('cat14', 'assets/sprites/cats/cat14.png');
        this.load.image('cat15', 'assets/sprites/cats/cat15.png');
        this.load.image('cat16', 'assets/sprites/cats/cat16.png');
        this.load.image('cat17', 'assets/sprites/cats/cat17.png');
        this.load.image('cat18', 'assets/sprites/cats/cat18.png');
        this.load.spritesheet('mouse', 'assets/sprites/mouse.png', {
            frameWidth: 16,
            frameHeight: 16,
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
        this.cameraOffset = {x: 16, y: 87};
        this.cameras.main.scrollX = -this.cameraOffset.x;
        this.cameras.main.scrollY = -this.cameraOffset.y;
        this.add.sprite(-this.cameraOffset.x, -this.cameraOffset.y, 'level').setOrigin(0);
        this.add.text(0, -60, "Press S to output level to console", {font: "10px Courier"});
        this.add.text(10, -35, "Level\nEditor", {font: "10px Courier"});

        this.graphics = this.add.graphics();

        this.board = new Board({
            blockSize: 16,
            size: {
                width: 7,
                height: 7
            },
            scene: this,
        });

        // create gui
        let n = 0;
        for (let figure of ['cat11', 'cat12', 'cat13', 'cat14', 'cat15', 'cat16', 'cat17', 'cat18']) {
            //let row = Math.floor(n / 4);
            let sprite = this.add.sprite(32 * (n % 4), 130 + Math.floor(n / 4) * 32, figure).setOrigin(0).setScale(0.7);
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
