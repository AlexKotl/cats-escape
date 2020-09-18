import Phaser from 'phaser';
import figures from '../objects/figures';

const DEBUG_MODE = false;

export default class Board {
    constructor(settings) {
        this.size = settings.size;
        this.blockSize = settings.blockSize;
        this.scene = settings.scene;
        this.figureTypes = figures;
        this.generateBoard();
    }

    generateBoard() {
        // init empty board
        let board = [];
        for (let i=0; i<this.size.height; i++) {
            board[i] = [];
            for (let j=0; j<this.size.width; j++) {
                board[i][j] = 0;
            }
        }

        this.scene.graphics.clear(); // clear debug graphics
        // fill with figures
        for (const [index, figure] of Object.entries(this.scene.level.figures)) {
            let shape = this.figureTypes[figure.name].shape;
            for (let y=0; y<shape.length; y++) {
                for (let x=0; x<shape[y].length; x++) {
                    // skip already assigned cells by other figures
                    if (typeof board[y + figure.pos.y][x + figure.pos.x] === 'string') {
                        continue;
                    }

                    board[y + figure.pos.y][x + figure.pos.x] = shape[y][x] === 1 ? index : 0;

                    // debug squares
                    if (DEBUG_MODE && shape[y][x] === 1) {
                        this.drawDebugSquare(x + figure.pos.x, y + figure.pos.y);
                    }

                }
            }
        }

        this.cells = board;
    }

    // get cell position (0-6, 0-6) from pointer position
    getMapPosition(x, y) {
        return {
            x: Math.round(x / this.blockSize + 0.5) - 1,
            y: Math.round(y / this.blockSize + 0.5) - 1,
        }
    }

    getSpriteByCoords(x, y) {
        let mapCoords = this.getMapPosition(x, y);
        const figureIndex = this.cells[mapCoords.y][mapCoords.x];
        if (figureIndex !== 0) {
            return this.scene.level.figures[figureIndex].sprite;
        }
    }

    isAllowed(x, y) {
        if (x >= this.size.width || y >= this.size.height || x < 0 || y < 0) {
            return false;
        }
        return this.cells[y][x] === 0;
    }

    isFigureAllowed(figure, x, y) {
        let shape = this.figureTypes[figure.name].shape;
        for (let fy=0; fy<shape.length; fy++) {
            for (let fx=0; fx<shape[fy].length; fx++) {
                if (shape[fy][fx] === 1 && !this.isAllowed(x + fx, y + fy)) {
                    return false;
                }
            }
        }

        return true;
    }

    drawDebugSquare(x, y, color=0x00ff00) {
        this.scene.graphics.fillStyle(color, 0.3);
        this.scene.graphics.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }
}