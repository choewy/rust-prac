export const getArgumentNames = (func: (...args: any[]) => any) => {
  const funcToString = func
    .toString()
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/(.)*/g, '')
    .replace(/{[\s\S]*}/, '')
    .replace(/=>/g, '')
    .trim();

  const args: string[] = [];

  funcToString
    .substring(funcToString.indexOf('(') + 1, funcToString.length - 1)
    .split(', ')
    .forEach((arg) => {
      arg = arg.replace(/=[\s\S]*/g, '').trim();
      if (arg.length > 0) {
        args.push(arg);
      }
    });

  return args;
};
