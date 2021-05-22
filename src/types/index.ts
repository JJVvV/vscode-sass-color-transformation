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

export type TVariable = { 
  value: TRgbaColor | string
  originalValue: string
  prefix: string 
};

export type Alias = {
  name: string
};

export type TVariables = Map<string, TVariable>;

export interface IVariablesConfig {
  colorParse(text: string): TColor[]
  load(): TVariables | undefined
}

export type ParseColorStrategy = (text: string) => TColor[];