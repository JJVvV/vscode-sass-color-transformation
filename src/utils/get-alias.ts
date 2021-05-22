import { TColor, TRgbaColor, TVariables } from "../types";
import { isRgbaEqual } from "./is-rgba-equal";



export const getAlias = (variables: TVariables, value: TColor): string[] => {
  const result: string[] = [];
  for(let [ key, v ] of variables){
    if(v.originalValue === value.originalColor){
      result.push(key);
      continue;
    }
    if(typeof v.value === 'string'){
      continue;
    }
    
    const configVariable = v.value as TRgbaColor;
    if(isRgbaEqual(configVariable, value.color)) {
      result.push(key);
    }
  }
  return result;
};