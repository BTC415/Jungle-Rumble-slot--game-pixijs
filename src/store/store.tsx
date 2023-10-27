import React, { createContext, useContext, useEffect, useState } from "react";
import AccessDenied from "../components/access_denied";
import axios from "axios";
import { gameParamsType, initialPrams, initialValue, storeType } from "./types";
export const globalContext = createContext<storeType>(initialValue);
const StoreProvider = (props: { children: JSX.Element }) => {
    const [content, setContent] = useState(<></>);
    const [gameParams, setGameParmas] = useState<gameParamsType>(initialPrams)
    const authorize = (loggedIn: boolean) => {
        if (loggedIn) {
            setContent(props.children);
        } else {
            setContent(
                <AccessDenied />
            );
        }
    };

    useEffect(() => {
        // authorize(true)
        const urlParams = new URLSearchParams(window.location.search);
        const token: string = urlParams.get('token') || "";
        axios.defaults.headers.common['token'] = token;
        axios.defaults.baseURL = 'https://vacuumplay.com'
        axios.post('/api/config').then((response) => {
            setGameParmas(prev => ({
                ...prev,
                balance: response.data.data.user.balance,
                token: token,
            }))
            authorize(true)
        }).catch(error => {
            authorize(false);
            if (error.response.data.message === "Invalid token!") {
            }
        });
        axios.post('/api/user/games/create', {
            game_package_id: "slots",
            client_seed: Math.ceil(Math.random() * 99999999)
        }).then(({ data: { hash } }: { data: { hash: string } }) => {
            setGameParmas(prev => ({ ...prev, hash }))
        })
    }, []);
    return (
        <globalContext.Provider value={{ authorize, gameParams }}>
            {content}
        </globalContext.Provider>
    )
}

const useAuthorize = () => useContext(globalContext).authorize;
const useGameParams = () => useContext(globalContext).gameParams;

export default StoreProvider;
export { useAuthorize, useGameParams };
