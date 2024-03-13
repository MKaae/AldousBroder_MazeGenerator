"use strict"
import { generateModel } from "../model/model.js"

export function getMaze(mazeObject){
   return generateModel(mazeObject);
}