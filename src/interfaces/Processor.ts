import { StoreRef } from "./StoreRef";

export interface Processor{
    id:string,
    brand:string,
    model:string,
    integrated_graphics:string,
    cores:number,
    tdp:number,
    base_clock:number,
    boost_clock:number,
    multithreading:boolean,
    stores:[StoreRef],
    price:number
}