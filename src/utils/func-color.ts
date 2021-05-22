import { ParseColorStrategy, TColor } from "../types";

const tinycolor = require('tinycolor2');
const funcColorReg = /((rgb|hsl)a?\([\d]{1,3}%?,\s*[\d]{1,3}%?,\s*[\d]{1,3}%?(,\s*\d?\.?\d+)?\))/gi;

export const funcColor: ParseColorStrategy = (text: string): TColor[] => {
  let match = funcColorReg.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = funcColorReg.lastIndex;
    const color = tinycolor(match[0]);
    if(color.isValid()){
      const rgbaColor = color.toRgb();
      result.push({
        start,
        end,
        color: rgbaColor,
        originalColor: match[0]
      });
    }

    match = funcColorReg.exec(text);
  }

  return result;
};