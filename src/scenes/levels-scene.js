export default class LevelsScene extends Phaser.Scene {

    constructor() {
        super({ key: 'LevelsScene'})
    }

    preload() {
        //this.load.image('clew', 'assets/sprites/clew.png');
        this.load.image('house-basement', 'assets/sprites/house/house-basement.png');
        this.load.image('house-level', 'assets/sprites/house/house-level.png');
        this.load.image('house-roof', 'assets/sprites/house/house-roof.png');
        this.load.image('house-window-off', 'assets/sprites/house/house-window-off.png');
        this.load.image('house-window-on', 'assets/sprites/house/house-window-on.png');
        this.load.image('house-road', 'assets/sprites/house/house-road.png');
        this.load.image('house-sky', 'assets/sprites/house/house-sky.png');
    }

    create() {
        const totalLevels = 12;
        const floorsCount = Math.ceil(totalLevels / 3);
        const houseOffset = 14;

        const progress = JSON.parse(localStorage.getItem('progress')) || {};

        this.skyBackground = this.add.tileSprite(0, 0, 150, 250, 'house-sky').setOrigin(0);

        this.add.text(18, 8, "Select the room:", {
            font: '10px Arial',
        });

        const spriteHouseRoof = this.add.sprite(0, houseOffset, 'house-roof').setOrigin(0);
        const houseLevelHeight = this.add.sprite(500, 500, 'house-level').height; // load sprite just to get proper height

        var level = 1;
        var x, y;
        var isAvailable = true;
        for (let floor=0; floor < floorsCount; floor++) {
            var spriteHouseLevel = this.add.sprite(0, houseOffset + spriteHouseRoof.height + houseLevelHeight * floor, 'house-level').setOrigin(0);
            for (let i = 0; i < 3; i++) {
                x = 32 + i * 31;
                y = houseOffset + spriteHouseRoof.height + houseLevelHeight * floor;
                let sprite = this.add.sprite(x, y, 'house-window-' + (progress[level] ? 'on' : 'off')).setOrigin(0);
                sprite.alpha = isAvailable ? 1 : 0.8;
                if (isAvailable) {
                    sprite.setInteractive();
                }
                sprite.levelNumber = '' + level;

                if (isAvailable) {
                    this.add.text(x + (level > 9 ? 4 : 7), y + 7, level, {
                        font: '12px Arial',
                        color: isAvailable ? '#000' : '#444',
                        boundsAlignH: "center",
                    });
                }


                if (!progress[level] && isAvailable) {
                    isAvailable = false;
                }

                level++;
            }
        }
        this.add.sprite(0, houseOffset + spriteHouseRoof.height + (spriteHouseLevel.height * floorsCount + 32), 'house-road').setOrigin(0);
        this.add.sprite(0, houseOffset + spriteHouseRoof.height + (spriteHouseLevel.height * floorsCount), 'house-basement').setOrigin(0);

        this.input.on('pointerup', (pointer, obj) => {
            if (obj[0] === undefined) {
                return;
            }

            const level = obj[0].levelNumber;
            if (level !== undefined) {
                this.scene.start('GameScene', {
                    level: level,
                });
            }
       });
    }

    update() {
        this.skyBackground.tilePositionX += 0.005;
    }
}