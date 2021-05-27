import { resourceUsage } from "process";

var userScoped = null;

export function getUser(){
    return JSON.parse(sessionStorage.getItem("User"));
}

export function setUser(user){
    sessionStorage.setItem("User", JSON.stringify(user));
}