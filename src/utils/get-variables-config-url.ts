import * as vscode from "vscode";
import * as path from "path";

export const getVariablesConfigUrl = () => {
  // @ts-ignore
  const path1 = vscode.workspace.workspaceFolders![0].uri._fsPath;
  const path2 = vscode.workspace.getConfiguration("sass-color-transformation").get('variablesConfigPath');
  if(!path2) {
    return;
  }
  return path.join(path1, path2 as string);

};