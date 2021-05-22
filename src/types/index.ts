import * as vscode from "vscode";

export type TColor = {
  start: number
  end: number
  color: TRgbaColor
  originalColor: string
};

export type TRgbaColor = {
  r: number,
  g: number
  b: number
  a: number
};

export type TVariables = Map<string, { value: TRgbaColor | string, originalValue: string }>;

export interface IVariablesConfig {
  colorParse(text: string): TColor[]
  load(): TVariables | undefined
}

export type ParseColorStrategy = (text: string) => TColor[];