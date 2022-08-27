export type LogDirs = {
  root: string;
  admin: string;
  service: string;
};

export type TestFunc = (...args: any[]) => any;

export type TestFuncObject = {
  [key: string]: TestFunc;
};
