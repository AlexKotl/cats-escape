import Phaser from 'phaser';
import MenuScene from './scenes/menu-scene';
import LevelsScene from './scenes/levels-scene';
import BlocksScene from './scenes/game-scene';
import LevelEditorScene from './scenes/level-editor-scene';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 480,
    },
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [LevelEditorScene, LevelsScene, MenuScene, BlocksScene]
};

var game = new Phaser.Game(config);