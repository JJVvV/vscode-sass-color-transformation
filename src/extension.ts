import * as vscode from 'vscode';
import * as path from 'path';
import { CodelensProvider } from './codelens-provider';
import { getVariablesConfigUrl, Text2Variable } from './utils';
import { VariablesConfig } from './variables-config';
import { TColor } from './types';

export function activate(context: vscode.ExtensionContext) {
  let providerRegistrations: vscode.Disposable[] = [];
  const reload = () => {
    for (const existing of providerRegistrations) {
      existing.dispose();
    }
    providerRegistrations = [];
    VariablesConfig.clearCache();
    // watch variables config file
    const configPath = getVariablesConfigUrl();
    if(configPath) {
      const configWatcher = vscode.workspace.createFileSystemWatcher(configPath);
      providerRegistrations.push(
        configWatcher.onDidChange(() => {
          VariablesConfig.clearCache();
        })
      );
    }
    const languages = vscode.workspace.getConfiguration("sass-color-transformation").get("languages");
    if(Array.isArray(languages)){
      languages.forEach((language) => {
        const registration = vscode.languages.registerCodeLensProvider({ 
          scheme: 'file', 
          language
        }, new CodelensProvider());
        providerRegistrations.push(registration);
      });
    }

    providerRegistrations.push(
      vscode.commands.registerCommand('sass-color-transformation.codelensAction', (variable: string | undefined, color: TColor, fileName: string, range: vscode.Range) => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          editor.edit(editBuilder => {
            if(variable){
              editBuilder.replace(range, variable);
            }
          });
        }
      })
    );



    const provider1 = vscode.languages.registerCompletionItemProvider('sass', {

      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        const variables = new VariablesConfig(document).load();
        const completionItems: vscode.CompletionItem[] = [];
        variables?.forEach((value, key) => {
          const snippetCompletion = new vscode.CompletionItem(`\$${key}`);
          snippetCompletion.documentation = `${value}`;
          completionItems.push(snippetCompletion);
        });
        return completionItems;
      }
    }, ':', ' ');

    providerRegistrations.push(provider1);








  };

	context.subscriptions.push(...providerRegistrations);

  vscode.workspace.onDidChangeConfiguration(() => {
    reload();
  });
  reload();
}

// this method is called when your extension is deactivated
export function deactivate() {}
