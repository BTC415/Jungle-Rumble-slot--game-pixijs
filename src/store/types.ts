export type gameParamsType = {
    balance: number;
    token: string;
    hash: string;
}
export type storeType = {
    authorize: (loggedIn: boolean) => void,
    gameParams: gameParamsType,
}
export const initialPrams = {
    balance: 0,
    token: "",
    hash: "",
}
export const initialValue = {
    authorize: () => { },
    gameParams: initialPrams,
}