import {createContext} from 'react';

export const AuthContext = createContext<{
    authCurrent:Boolean,
    setAuthCurrent:(status:boolean) => void
}>({
    authCurrent:false,
    setAuthCurrent:()=>{}
})
export default AuthContext;
