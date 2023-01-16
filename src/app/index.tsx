import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { THEOplayerView } from "react-native-theoplayer";
import { ActionButton } from "../actionbutton/ActionButton";
import styles from './styles';
import { PlayButton } from "../config";

const USE_RN_UI = true;

const playerConfig = {
    license: undefined,
    libraryLocation: 'theoplayer',
    chromeless: USE_RN_UI
};

const source = {
    sources: [
        {
            "src": "https://cdn.theoplayer.com/video/elephants-dream/playlistCorrectionENG.m3u8",
            "type": "application/x-mpegurl"
        },
    ],
};

const App = () => {

    const [paused, setPaused] = useState(true);
    const onTogglePlayPause = useCallback(() => {
        setPaused(!paused);
    }, [paused]);

    return (
        <View style={styles.container}>
            <THEOplayerView
                config={playerConfig}
                source={source}
                paused={paused}/>

            {USE_RN_UI && <ActionButton
                touchable={true}
                icon={paused ? PlayButton : null}
                style={styles.fullScreenCenter}
                iconStyle={styles.playButton}
                onPress={onTogglePlayPause}
            />}
        </View>
    );
};

export default App;
