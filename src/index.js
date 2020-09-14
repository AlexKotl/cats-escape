import Phaser from 'phaser';
import IntroScene from './scenes/intro-scene';
import LevelsScene from './scenes/levels-scene';
import GameScene from './scenes/game-scene';
import LevelEditorScene from './scenes/level-editor-scene';

var config = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1000,
        height: 1000 * window.innerHeight / window.innerWidth,
    },
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [IntroScene, LevelsScene, GameScene, LevelEditorScene]
};

var game = new Phaser.Game(config);