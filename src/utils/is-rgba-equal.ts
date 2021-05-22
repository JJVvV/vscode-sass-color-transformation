import { TRgbaColor } from "../types";

export const isRgbaEqual = (c1: TRgbaColor, c2: TRgbaColor): boolean => {
  return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b && c1.a === c2.a;
};