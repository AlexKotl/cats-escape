# Cats Escape
> The game about lazy cats and dump mouse

### Run the app

Run game in dev mode: `npm run dev`
Run Levels editor: `npm run levels`

### Mobile Platforms

Run game using cordova:
```
cd mobile_platforms
cp -R ../public/* www/ && cordova run android --device
```
Or just `npm run run-android`

#### Build iOS using Cordova
- make distribution profile and resolve all other certificate issues
- make sure no certificate duplicates in keychain
- make IPA using xcode: Product -> Archive
- follow steps in xcode to upload to itunes connect

### Misc
Scaling example: https://github.com/yandeu/phaser3-scaling-resizing-example