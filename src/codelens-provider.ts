import * as vscode from 'vscode';
import TipCodeLens from './tip-codelens';
import { getAlias } from './utils';
import { TVariables } from './types';
import { VariablesConfig } from './variables-config';

export class CodelensProvider implements vscode.CodeLensProvider {

  private codeLenses: vscode.CodeLens[] = [];
  private variables?: TVariables;

  public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    const variablesConfig = new VariablesConfig(document);
    this.variables = variablesConfig.load();
    if(!this.variables){
      return [];
    }
    const text = document.getText();
    const colors = variablesConfig.colorParse(text);
    this.codeLenses = [];
    colors.forEach((color) => {
      const range = new vscode.Range(
        document.positionAt(color.start),
        document.positionAt(color.end)
      );
      if(range){
        const matchedAliases = getAlias(this.variables!, color);
        matchedAliases.forEach((alias) => {
          this.codeLenses.push(new TipCodeLens(document.fileName, range, alias, color));
        });
      }
    });
    return this.codeLenses;
  }

  public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
      return null;
  }
}