import { CodeLens, Range } from "vscode";
import { Alias, TColor } from "./types";
import { getExtension, Text2Variable } from "./utils";

export default class TipCodeLens extends CodeLens {
  constructor(
    fileName: string,
    range: Range,
    alias: Alias,
    color: TColor
  ) {
    const extension = getExtension(fileName);
    const variable = Text2Variable.text2Variable(alias.name, extension);
    super(range, {
      arguments: [variable, color, fileName, range],
      command: "sass-color-transformation.codelensAction",
      title: `${variable}`,
      tooltip: `${color.originalColor} can be replaced by ${variable}, click to replace`
    });
  }
}