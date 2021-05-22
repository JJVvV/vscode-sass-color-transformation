const text2SassVariable = (text: string) => {
  return `\$${text}`;
};

const text2CssVariable = (text: string) => {
  text = text.startsWith('--') ? text : `--${text}`;
  return `var(${text})`;
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

  // css variable
  if(text.startsWith('--')){
    return text2CssVariable(text);
  }

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

export class Text2Variable {
  static css = text2SassVariable;
  static cssVar = text2CssVariable;
  static sass = text2SassVariable;
  static scss = text2SassVariable;
  static less = text2LessVariable;
  static text2Variable = text2Variable;
}