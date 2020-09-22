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
        this.load.image('level', 'assets/sprites/level/level.png');
        this.load.image('level-sky', 'assets/sprites/level/level-sky.png');
        this.load.image('board', 'assets/sprites/board.png');
        this.load.image('menu-button', 'assets/sprites/menu/menu-button.png');
        this.load.image('menu-restart', 'assets/sprites/menu/menu-restart.png');
        this.load.image('cat11', 'assets/sprites/cats/cat11.png');
        this.load.image('cat12', 'assets/sprites/cats/cat12.png');
        this.load.image('cat13', 'assets/sprites/cats/cat13.png');
        this.load.image('cat14', 'assets/sprites/cats/cat14.png');
        this.load.image('cat15', 'assets/sprites/cats/cat15.png');
        this.load.image('cat16', 'assets/sprites/cats/cat16.png');
        this.load.image('cat17', 'assets/sprites/cats/cat17.png');
        const mouseSprite = this.load.spritesheet('mouse', 'assets/sprites/mouse.png', {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image('win-text', 'assets/sprites/menu/win.png');
    }

    create() {
        // setup camera and background
        this.cameraOffset = {x: 16, y: 87};
        this.cameras.main.scrollX = -this.cameraOffset.x;
        this.cameras.main.scrollY = -this.cameraOffset.y;
        this.skyBackground = this.add.tileSprite(-16, -87, 148, 256, 'level-sky').setOrigin(0);
        this.add.sprite(-16, -87, 'level').setOrigin(0); // set offset for room start

        // level number
        this.add.text(44, -65, "Level: " + this.scene.settings.data.level, {font: "5px bitmapFont"});

        const menuButton = this.add.sprite(-10, -70, 'menu-button').setOrigin(0).setInteractive().on('pointerup', () => {
            this.scene.start('LevelsScene');
        });

        const restartButton = this.add.sprite(100, -70, 'menu-restart').setOrigin(0).setInteractive().on('pointerup', () => {
            this.scene.restart()
        });

        this.graphics = this.add.graphics();

        this.level = JSON.parse(JSON.stringify( levelsData[this.scene.settings.data.level])); // clone object that weird style

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
            x: Math.round(this.board.size.height/2 - 1) * this.board.blockSize + this.board.blockSize/2,
            y: this.board.blockSize * 7,
            key: 'mouse',
        });

        this.input.on('dragstart', (pointer, obj) => {
            this.dragSprite = this.board.getSpriteByCoords(pointer.x - this.cameraOffset.x, pointer.y - this.cameraOffset.y)

            if (this.mouse.isRunning || !this.dragSprite) {
                return false;
            }

            // rebuild collision map - remove figure
            this.draggedFigureIndex = this.level.figures.findIndex(el => this.dragSprite === el.sprite);
            this.level.figures[this.draggedFigureIndex].pos.x = 100;
            this.board.generateBoard();

            let mapPos = this.board.getMapPosition(this.dragSprite.x, this.dragSprite.y);
            this.board.cells[mapPos.y][mapPos.x] = 0;

            this.isVerticalMove = undefined;
            this.draggedFrom = {x: this.dragSprite.x, y: this.dragSprite.y};
        });

        // dragX - new pos of element
        this.input.on('drag', (pointer, obj, dragX, dragY) => {
            if (this.mouse.isRunning || !this.dragSprite) {
                return false;
            }

            if (Math.abs(dragX - this.dragSprite.x) < 3 && Math.abs(dragY - this.dragSprite.y) < 3) {
                return true;
            }

            let mapPos = this.board.getMapPosition(this.dragSprite.x, this.dragSprite.y);
            let newMapPos = this.board.getMapPosition(dragX, dragY);

            // make new map pos difference not bigger than 1 as we move cell by cell and cant jump over figures
            for (let axis of ['x', 'y']) {
                if (Math.abs(mapPos[axis] - newMapPos[axis]) > 1) {
                    newMapPos[axis] = mapPos[axis] + Math.sign(newMapPos[axis] - mapPos[axis]);
                }
            }

            // decide which axis we move block
            if (this.isVerticalMove === undefined) {
                this.isVerticalMove = Math.abs(this.dragSprite.y - dragY) > Math.abs(this.dragSprite.x - dragX);
            }

            if (this.isVerticalMove) {
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], mapPos.x, newMapPos.y)) {
                    this.dragSprite.setPosition(this.dragSprite.x, mapPos.y * this.board.blockSize);
                    return true;
                }
                // bottom bouce
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], mapPos.x, newMapPos.y + 1)) {
                    this.dragSprite.setPosition(this.dragSprite.x, newMapPos.y * this.board.blockSize);
                    return true;
                }

                this.dragSprite.setPosition(this.dragSprite.x, dragY);
            }
            else {
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], newMapPos.x, mapPos.y)) {
                    this.dragSprite.setPosition(mapPos.x * this.board.blockSize, this.dragSprite.y);
                    return true;
                }
                // right bouce
                if (!this.board.isFigureAllowed(this.level.figures[this.draggedFigureIndex], newMapPos.x + 1, mapPos.y)) {
                    this.dragSprite.setPosition(newMapPos.x * this.board.blockSize, this.dragSprite.y);
                    return true;
                }

                this.dragSprite.setPosition(dragX, this.dragSprite.y);
            }
        });

        this.input.on('dragend', (pointer, obj) => {
            if (this.mouse.isRunning) {
                return false;
            }

            let mapPos = this.board.getMapPosition(this.dragSprite.x + this.board.blockSize/2, this.dragSprite.y + this.board.blockSize/2); // get avarage pos
            this.dragSprite.setPosition(mapPos.x * this.board.blockSize, mapPos.y * this.board.blockSize);

            // update collision map
            this.level.figures[this.draggedFigureIndex].pos.x = mapPos.x;
            this.level.figures[this.draggedFigureIndex].pos.y = mapPos.y;
            this.board.generateBoard();
        });

    }

    finish() {
        const graphics = this.add.graphics();

        graphics.fillStyle(0xffffff, 1);
        const background = graphics.fillRect(-this.cameraOffset.x, -this.cameraOffset.y, this.game.canvas.width, this.game.canvas.height);
        background.alpha = 0;

        let progress = JSON.parse(localStorage.getItem('progress')) || {};
        progress[this.scene.settings.data.level] = { completed: true };
        localStorage.setItem('progress', JSON.stringify(progress));

        this.tweens.add({
            targets: background,
            alpha: 1,
            ease: 'Power1',
            duration: 1000,
        });

        setTimeout(() => {
            this.scene.start('LevelsScene');
        }, 2000);
    }

    update(time, delta) {
        this.mouse.update(time, delta);
        this.skyBackground.tilePositionX += delta * 0.002;
    }

}
