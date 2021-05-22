import { Alias, TColor, TRgbaColor, TVariable, TVariables } from "../types";
import { isRgbaEqual } from "./is-rgba-equal";

export const getAlias = (variables: TVariables, value: TColor): Alias[] => {
  const result: Alias[] = [];
  for(let [ key, v ] of variables){
    if(v.originalValue === value.originalColor){
      result.push({
        name: key,
      });
      continue;
    }
    if(typeof v.value === 'string'){
      continue;
    }
    
    const configVariable = v.value as TRgbaColor;
    if(isRgbaEqual(configVariable, value.color)) {
      result.push({
        name: key,
      });
    }
  }
  return result;
};