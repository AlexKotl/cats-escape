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
Or `cordova run android`

#### Generate icons for platforms
Install `cordova-icon`, then run command:
`cordova-icon --config=config.xml --icon=res/icon.png`

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

#### Android platform
If no emulator found - export paths:
```
export ANDROID_SDK_ROOT=/Users/[username]/Library/Android/sdk
export PATH=$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/tools:$PATH
```

How to generate AAB bundle:
>
Launch Android Studio
Go To Import Project (Eclipse ADT, Gradle, etc).
Select Android platform directory in your project (/platforms/android).
Wait for finish the Sync
Go to Build > Generate Sign Bundle
Complete Signing info
Upload de .aab file generated (in path /platforms/android/outputs/


### Misc Docs
Scaling example: https://github.com/yandeu/phaser3-scaling-resizing-example
How to fit on iPhone X: https://blog.phonegap.com/displaying-a-phonegap-app-correctly-on-the-iphone-x-c4a85664c493
Generate font bitmap: https://img.dafont.com/preview_bitmap.php?text=Tap+mouse+to+make+a+run&ttf=8_bit_hud0&ext=1&size=3.75