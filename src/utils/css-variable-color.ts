import { ParseColorStrategy, TColor } from "../types";

const tinycolor = require('tinycolor2');
const cssVarColorReg = /--([a-z0-9_-]+)/gi;

export const cssVarColor: ParseColorStrategy = (text: string): TColor[] => {
  let match = cssVarColorReg.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = cssVarColorReg.lastIndex;
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

    match = cssVarColorReg.exec(text);
  }

  return result;
};