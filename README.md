# renative-theoplayer-sample

This project demonstrates using [react-native-theoplayer](https://github.com/THEOplayer/react-native-theoplayer) 
in a [ReNative](https://renative.org/) app.

ReNative is a framework designed to facilitate the development of cross-platform mobile applications using 
React Native. It extends React Native by providing additional tools and configurations to enable 
cross-platform development for a variety of target platforms.

## Quick Start

### Setup

```bash
$ yarn install
$ npx rnv run -p web
$ npx rnv run -p android
```

### Android Plugin Configuration

`react-native-theoplayer` depends on some extra Maven modules that are
located inside the package. Due to Renative's project structure, the repository
url cannot be correctly resolved and has to be set in the `renative.json`
plugin config:

```json
"BuildGradle": {
    "allprojects": {
        "repositories": {
            "maven { url(\"$rootDir/../../node_modules/react-native-theoplayer/android/local\") }": true
        }
    }
}
```

In addition, this line makes sure the correct `androidx.core` module is resolved:
```json
"implementations": [
    "'androidx.core:core:1.9.+'"
],
```

### Web build hook

For Web, the necessary web-workers are copied in the configuration step using a custom  
[copyTHEOworkers build hook](./buildHooks/src/index.js) to a `theoplayer` asset location:

```typescript
copyTHEOworkers: () => {
    Logger.logHook('Copying THEOplayer workers.')
    const projectRoot = './';
    const targetFolder = `${projectRoot}/appConfigs/base/assets/web/public/theoplayer`;
    const workerFiles = [
        'theoplayer.d.js',
        'THEOplayer.transmux.asmjs.js',
        'THEOplayer.transmux.js',
        'THEOplayer.transmux.wasm',
        'iframe.html'
    ]
    if (!fs.existsSync(targetFolder)){
        fs.mkdirSync(targetFolder);
    }
    workerFiles.forEach((fileName) => {
        fs.copyFileSync(
            `${projectRoot}/node_modules/theoplayer/${fileName}`,
            `${targetFolder}/${fileName}`
        );
    });
}
```

The `libraryLocation` in THEOplayer's `playerConfig` then becomes:

```typescript
const playerConfig = {
    libraryLocation: 'theoplayer'
};
```
