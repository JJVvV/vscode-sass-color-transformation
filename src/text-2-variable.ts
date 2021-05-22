const text2SassVariable = (text: string) => {
  return `\$${text}`;
};

const text2LessVariable = (text: string) => {
  return `@${text}`;
};

const text2StylVariable = (text: string) => {
  return `\$${text}`;
};

const text2Variable = (text: string, extensionType: string | undefined) => {
  if(!text){ return; }
  if(!extensionType){ return; }

  switch(extensionType){
    case 'sass':
    case 'scss':
      return text2SassVariable(text);
    case 'styl':
      return text2StylVariable(text);
    case 'less':
      return text2LessVariable(text);
  }
};

export class Text2Cariable {
  static sass = text2SassVariable;
  static scss = text2SassVariable;
  static less = text2LessVariable;
  static text2Variable = text2Variable;
}