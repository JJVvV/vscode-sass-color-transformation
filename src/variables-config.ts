import * as vscode from 'vscode';
import { getVariablesConfig, funcColor, hexColor, getVariablesConfigUrl, cssVarColor } from './utils';
import { IVariablesConfig, TColor, TVariables } from './types';

let cached: TVariables | undefined;

export class VariablesConfig implements IVariablesConfig {
  static clearCache(){
    cached = undefined;
  }
  parsedColors: vscode.CodeLens[] = [];
  private variables?: TVariables;
  constructor(private document: vscode.TextDocument) {
    
  }

  public colorParse(text: string): TColor[] {
    return [hexColor, funcColor, cssVarColor].reduce((strategies, strategy) => {
      return [ ...strategies, ...strategy(text) ];
    }, [] as TColor[]);
  }

  public load() {
    if (vscode.workspace.getConfiguration("sass-color-transformation").get("enableCodeLens", true)) {
      this.parsedColors = [];
      const variablesPath = getVariablesConfigUrl();
      if(!variablesPath) {
        return;
      }
      // 如果当前为配置文件则返回
      if(this.document.fileName === variablesPath) {
        return;
      }
      this.variables = cached || getVariablesConfig(variablesPath);
      cached = this.variables;
      return this.variables;
    }
  }
}