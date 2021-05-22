import { ParseColorStrategy, TColor } from "../types";

const tinycolor = require('tinycolor2');
const colorHex = /.?((?:\#|\b0x)([a-f0-9]{6}([a-f0-9]{2})?|[a-f0-9]{3}([a-f0-9]{1})?))\b/gi;

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export const hexColor: ParseColorStrategy =  (text: string): TColor[] => {
  let match = colorHex.exec(text);
  let result = [];

  while (match !== null) {
    const firstChar = match[0][0];
    const matchedColor = match[1];
    const matchedHex = '#' + match[2];
    const start = match.index + (match[0].length - matchedColor.length);
    const end = colorHex.lastIndex;

    if (firstChar.length && /\w/.test(firstChar)) {
      match = colorHex.exec(text);
      continue;
    }

    const color = tinycolor(matchedHex);
    if(color.isValid()){
      const rgbaColor = color.toRgb();
      result.push({
        start,
        end,
        color: rgbaColor,
        originalColor: matchedHex
      }); 
    }

    match = colorHex.exec(text);
  }

  return result;
};