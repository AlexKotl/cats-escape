import Phaser from 'phaser';
import IntroScene from './scenes/intro-scene';
import LevelsScene from './scenes/levels-scene';
import GameScene from './scenes/game-scene';
import LevelEditorScene from './scenes/level-editor-scene';

var config = {
    type: Phaser.CANVAS,
    width: 144,
    height: 256,
    //parent: null,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        parent: 'the-game',
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    pixelArt: true,
    //zoom: 4,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [/*IntroScene,*/ LevelsScene, GameScene, LevelEditorScene]
};

var game = new Phaser.Game(config);