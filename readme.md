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

Hide status bar on iOS - add to .plist:
```
<key>UIStatusBarHidden</key>
<true/>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>
```

### Misc Docs
Scaling example: https://github.com/yandeu/phaser3-scaling-resizing-example
How to fit on iPhone X: https://blog.phonegap.com/displaying-a-phonegap-app-correctly-on-the-iphone-x-c4a85664c493
Generate font bitmap: https://img.dafont.com/preview_bitmap.php?text=Tap+mouse+to+make+a+run&ttf=8_bit_hud0&ext=1&size=3.75