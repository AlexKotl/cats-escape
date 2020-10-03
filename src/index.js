import Phaser from 'phaser';
import IntroScene from './scenes/intro-scene';
import LevelsScene from './scenes/levels-scene';
import GameScene from './scenes/game-scene';
import LevelEditorScene from './scenes/level-editor-scene';
var gameanalytics = require('gameanalytics');

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

gameanalytics.GameAnalytics.setEnabledInfoLog(true);
gameanalytics.GameAnalytics.setEnabledVerboseLog(true);
gameanalytics.GameAnalytics.initialize("3f26e286398b7e47653456e9cc79e568", "a1ef4b08fb037ea98dea431d5645fcd16006129f");

var game = new Phaser.Game(config);

