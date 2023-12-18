# renative-theoplayer-sample

Demonstrates using react-native-theoplayer in a ReNative app.

## Quick Start

### Setup

```bash
$ yarn install
$ npx rnv run -p web
$ npx rnv run -p android
```

### THEOplayer Web Workers

The necessary web-workers are copied in the configuration step using a custom  
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
