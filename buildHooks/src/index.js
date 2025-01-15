import { Logger } from 'rnv'
import * as fs from 'fs-extra';

const hooks = {
    copyTHEOworkers: () => {
        const projectRoot = '.';
        const targetFolder = `${projectRoot}/platformTemplates/web/public/theoplayer`;
        Logger.logHook(`Copying THEOplayer workers to ${targetFolder}`)
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
