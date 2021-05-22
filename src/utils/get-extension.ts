export const getExtension = (fileName: string) => {
  const index = fileName.lastIndexOf('.');
  if(index !== -1){
    return fileName.slice(index+1);
  }
};