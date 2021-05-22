import { CodeLens, Range } from "vscode";
import { TColor } from "./types";

export default class TipCodeLens extends CodeLens {
  constructor(
    fileName: string,
    range: Range,
    alias: string,
    color: TColor
  ) {
    super(range, {
      arguments: [alias, color, fileName, range],
      command: "css-color-translation.codelensAction",
      title: `${alias}`,
      tooltip: `${color.originalColor} can be replaced by ${alias}, click to replace`
    });
  }
}