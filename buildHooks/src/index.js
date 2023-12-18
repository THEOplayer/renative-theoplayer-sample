import { Logger } from 'rnv'
import * as fs from 'fs-extra';

const hooks = {
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
};

const pipes = {
    'configure:before': hooks.copyTHEOworkers
};

export { pipes, hooks };
