import {useEffect} from "react";

export const useEvent = (event: any, handler: { (this: Window, ev: any): any; (this: Window, ev: any): any; }) =>{
    useEffect(()=>{
        window.addEventListener(event,handler);
        return function cleanup(){
            window.removeEventListener(event,handler);
        }
    })
}