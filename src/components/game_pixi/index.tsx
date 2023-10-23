import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { PIXI, app, Global_Vars } from '../../renderer';
import { assetUrls } from '../../utils/urls';
import { loadStartScreen } from './loadStartScreen';
import { animateFromTweenLoop } from './loops/animateFromTweenLoop';
import { useGameParams } from '../../store/store';
const GamePIXI = () => {
    const navigate = useNavigate()
    const gameParams = useGameParams()
    useEffect(() => {
        if (Global_Vars.loaded) {
            // loadStartScreen()
        } else {
            PIXI.Assets.load(assetUrls).then(() => loadStartScreen(navigate, gameParams));
        }
    }, [])
    // Game Loop.
    app.ticker.add(animateFromTweenLoop);
    return (
        <div />
    )
}
export default GamePIXI;