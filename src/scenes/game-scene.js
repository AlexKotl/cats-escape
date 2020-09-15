import Phaser from 'phaser';
import Board from '../objects/board';
import Mouse from '../objects/mouse';
import levelsData from '../objects/levels-data';

const DEBUG_MODE = false;

export default class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene'})
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
        this.load.spritesheet('mouse', 'assets/sprites/mouse.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image('win-text', 'assets/sprites/menu/win.png');
    }

    create() {
        // setup camera and background
        this.cameraOffset = {x: 16, y: 64};
        this.cameras.main.scrollX = -this.cameraOffset.x;
        this.cameras.main.scrollY = -this.cameraOffset.y;
        this.add.sprite(-16, -64, 'level').setOrigin(0)//.setScale(2); // set offset for room start

        // level number
        this.add.text(0, -54, "Level: " + this.scene.settings.data.level, {font: "11px Arial"});
        this.level = levelsData[this.scene.settings.data.level];

        // const menuButton = this.add.sprite(0, -250, 'menu_button').setScale(0.3).setInteractive().on('pointerdown', () => {
        //     this.scene.start('LevelsScene');
        // });

        this.graphics = this.add.graphics();

        this.board = new Board({
            blockSize: 16,
            size: {
                width: 7,
                height: 7
            },
            scene: this,
        });

        // add sprites
        for (let n in this.level.figures) {
            let figure = this.level.figures[n];

            let sprite = this.add.sprite(figure.pos.x * this.board.blockSize, figure.pos.y * this.board.blockSize, figure.name);
            sprite.setOrigin(0);
            sprite.alpha = DEBUG_MODE ? 0.8 : 1;
            this.input.setDraggable(sprite.setInteractive());

            this.level.figures[n].sprite = sprite;
        }

        // add mouse
        this.mouse = new Mouse({
            scene: this,
            board: this.board,
            x: -30,
            y: Math.round(this.board.size.height/2 - 1) * this.board.blockSize + this.board.blockSize/2,
            key: 'mouse',
        });

        this.input.on('dragstart', (pointer, obj) => {
            // rebuild collision map - remove figure
            this.draggedFigureIndex = this.level.figures.findIndex(el => obj === el.sprite);
            this.level.figures[this.draggedFigureIndex].pos.x = 100;
            this.board.generateBoard();

            let mapPos = this.board.getMapPosition(obj.x, obj.y);
            this.board.cells[mapPos.y][mapPos.x] = 0;

            this.isVerticalMove = undefined;
            this.draggedFrom = {x: obj.x, y: obj.y};
        });

        // dragX - new pos of element
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
            if (Math.abs(dragX - obj.x) < 5 && Math.abs(dragY - obj.y) < 5) {
                return true;
            }

            let mapPos = this.board.getMapPosition(obj.x, obj.y);
            let newMapPos = this.board.getMapPosition(dragX, dragY);

            // make new map pos difference not bigger than 1 as we move cell by cell and cant jump over figures
            for (let axis of ['x', 'y']) {
                if (Math.abs(mapPos[axis] - newMapPos[axis]) > 1) {
                    newMapPos[axis] = mapPos[axis] + Math.sign(newMapPos[axis] - mapPos[axis]);
                }
            }

            // decide which axis we move block
            if (this.isVerticalMove === undefined) {
                this.isVerticalMove = Math.abs(obj.y - dragY) > Math.abs(obj.x - dragX);
            }

            if (this.isVerticalMove) {
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], mapPos.x, newMapPos.y)) {
                    obj.setPosition(obj.x, mapPos.y * this.board.blockSize);
                    return true;
                }
                // bottom bouce
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], mapPos.x, newMapPos.y + 1)) {
                    obj.setPosition(obj.x, newMapPos.y * this.board.blockSize);
                    return true;
                }

                obj.setPosition(obj.x, dragY);
            }
            else {
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], newMapPos.x, mapPos.y)) {
                    obj.setPosition(mapPos.x * this.board.blockSize, obj.y);
                    return true;
                }
                // right bouce
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], newMapPos.x + 1, mapPos.y)) {
                    obj.setPosition(newMapPos.x * this.board.blockSize, obj.y);
                    return true;
                }

                obj.setPosition(dragX, obj.y);
            }
        });

        this.input.on('dragend', (pointer, obj) => {
            let mapPos = this.board.getMapPosition(obj.x + this.board.blockSize/2, obj.y + this.board.blockSize/2); // get avarage pos
            obj.setPosition(mapPos.x * this.board.blockSize, mapPos.y * this.board.blockSize);

            // update collision map
            this.level.figures[this.draggedFigureIndex].pos.x = mapPos.x;
            this.level.figures[this.draggedFigureIndex].pos.y = mapPos.y;
            this.board.generateBoard();
        });

    }

    finish() {
        const graphics = this.add.graphics();
        const text = this.add.sprite(this.game.canvas.width / 2 - this.cameraOffset.x, this.game.canvas.height / 2 - this.cameraOffset.y, 'win-text');
        text.scaleX = 0;
        text.scaleY = 0;

        graphics.fillStyle(0xffffff, 1);
        const background = graphics.fillRect(-this.cameraOffset.x, -this.cameraOffset.y, this.game.canvas.width, this.game.canvas.height);
        background.alpha = 0;

        this.tweens.add({
            targets: text,
            scaleX: 2,
            scaleY: 2,
            ease: 'Power1',
            duration: 3000,
        });

        this.tweens.add({
            targets: background,
            alpha: 1,
            ease: 'Power1',
            duration: 1000,
        });

        setTimeout(() => {
            this.scene.start('LevelsScene');
        }, 3000);
    }

    update() {
        this.mouse.update();
    }

}
