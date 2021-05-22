import * as fs from 'fs';
const tinycolor = require('tinycolor2');
import { TRgbaColor, TVariables } from '../types';

const scssVariableReg = /^\s*\$([-\w]+)\s*:\s*\$?([^;]*);?$/gm;
export const getVariablesConfig = (path: string): TVariables => {
  const variables: TVariables = new Map();
  if(fs.existsSync(path)){
    const content = fs.readFileSync(path, 'utf-8');
    let matched;
    while((matched = scssVariableReg.exec(content)) !== null){
      let [ , key, value ] = matched;
      // get source css variable value
      // $A1: #ccc; $A2: $A1; source of $A2 => #ccc;
      let source = value;
      while(variables.has(source)){
        source = variables.get(value)!.originalValue;
      }
      const color = tinycolor(source);
      if(color.isValid()){
        const rgbValue: TRgbaColor = color.toRgb();
        variables.set(key, { value: rgbValue, originalValue: source });
      } else {
        // 非颜色变量
        variables.set(key, { value: source, originalValue: source });
      }
    }
  }

  return variables;
};