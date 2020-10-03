export default class LevelsScene extends Phaser.Scene {

    constructor() {
        super({ key: 'LevelsScene'})
    }

    preload() {
        //this.load.image('clew', 'assets/sprites/clew.png');
        this.load.image('house-basement', 'assets/sprites/house/house-basement.png');
        this.load.image('house-basement-open', 'assets/sprites/house/house-basement-open.png');
        this.load.image('house-level', 'assets/sprites/house/house-level.png');
        this.load.image('house-roof', 'assets/sprites/house/house-roof.png');
        this.load.image('house-window-off', 'assets/sprites/house/house-window-off.png');
        this.load.image('house-window-on', 'assets/sprites/house/house-window-on.png');
        this.load.image('house-road', 'assets/sprites/house/house-road.png');
        this.load.image('house-sky', 'assets/sprites/house/house-sky.png');
        const mouseSprite = this.load.spritesheet('mouse', 'assets/sprites/mouse.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

        // load sounds
        this.load.audio('door-sound', ['assets/sounds/door-open.mp3']);
    }

    create() {
        const canvas = this.sys.game.canvas;
        const totalLevels = 12;
        const floorsCount = Math.ceil(totalLevels / 3);
        const houseOffset = 14;

        const progress = JSON.parse(localStorage.getItem('progress')) || {};
        const isWin = progress[totalLevels] && progress[totalLevels].completed;

        this.skyBackground = this.add.tileSprite(0, 0, 150, 250, 'house-sky').setOrigin(0);

        const spriteHouseRoof = this.add.sprite(0, houseOffset, 'house-roof').setOrigin(0);
        const houseLevelHeight = this.add.sprite(500, 500, 'house-level').height; // load sprite just to get proper height

        this.add.text(32, 18, isWin ? "You have escaped!" : "Select the room", {
            font: '5px bitmapFont',
        });

        var level = 1;
        var x, y;
        var isAvailable = true;
        for (let floor=0; floor < floorsCount; floor++) {
            var spriteHouseLevel = this.add.sprite(0, houseOffset + spriteHouseRoof.height + houseLevelHeight * floor, 'house-level').setOrigin(0);
            for (let i = 0; i < 3; i++) {
                x = 32 + i * 31;
                y = houseOffset + spriteHouseRoof.height + houseLevelHeight * floor;
                let sprite = this.add.sprite(x, y, 'house-window-' + (isAvailable && !progress[level] ? 'on' : 'off')).setOrigin(0);
                // sprite.alpha = isAvailable ? 1 : 0.8;
                if (isAvailable) {
                    sprite.setInteractive();
                }
                sprite.levelNumber = '' + level;

                if (isAvailable) {
                    this.add.text(x + (level > 9 ? 4 : 8), y + 9, level, {
                        fontFamily: 'bitmapFont',
                        fontSize: '5px',
                        color: progress[level] ? '#693d2f' : '#444',
                        boundsAlignH: "center",
                    });
                }


                if (!progress[level] && isAvailable) {
                    isAvailable = false;
                }

                level++;
            }
        }
        const groundPosY = houseOffset + spriteHouseRoof.height + (spriteHouseLevel.height * floorsCount);
        this.add.sprite(0, groundPosY + 32, 'house-road').setOrigin(0);

        if (isWin) {
            this.add.sprite(0, groundPosY, 'house-basement-open').setOrigin(0).setInteractive().on('pointerdown', (pointer) => {
                this.scene.start('CompleteScene');
            });
            this.add.sprite(82, groundPosY + 28, 'mouse').setOrigin(0); // place mouse in the door
            this.add.text(32, groundPosY, "more levels \ncoming...", {
                font: '5px bitmapFont',
                color: '#242629'
            });
        }
        else {
            this.add.sprite(0, groundPosY, 'house-basement').setOrigin(0);
        }


        this.input.on('pointerup', (pointer, obj) => {
            if (obj[0] === undefined) {
                return;
            }

            const level = obj[0].levelNumber;
            if (level !== undefined) {
                var doorSound = this.sound.add('door-sound');
                doorSound.play();

                this.scene.start('GameScene', {
                    level: level,
                });
            }
       });
    }

    update(time, delta) {
        this.skyBackground.tilePositionX += delta * 0.002;
    }
}