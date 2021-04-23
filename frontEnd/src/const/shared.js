import { resourceUsage } from "process";

var userScoped = null;

export function getUser(){
    return JSON.parse(localStorage.getItem("User"));
}

export function setUser(user){
    localStorage.setItem("User", JSON.stringify(user));
}