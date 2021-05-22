// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { CodelensProvider } from './codelens-provider';
import { getExtension, getVariablesConfigUrl } from './utils';
import { Text2Cariable } from './text-2-variable';
import { VariablesConfig } from './variables-config';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let providerRegistrations: vscode.Disposable[] = [];
  const reload = () => {
    for (const existing of providerRegistrations) {
      existing.dispose();
    }
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
    const languages = vscode.workspace.getConfiguration("css-color-translation").get("languages");
    providerRegistrations = [];
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
      vscode.commands.registerCommand('css-color-translation.codelensAction', (alias: string, value: string, fileName: string, range: vscode.Range) => {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
    
        if (editor) {
          editor.edit(editBuilder => {
            const extension = getExtension(editor.document.fileName);
            const variable = Text2Cariable.text2Variable(alias, extension);
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
