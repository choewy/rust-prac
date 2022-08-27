export type LogDirs = {
  admin: string;
  service: string;
};

export type TestTypes = keyof LogDirs;
export type TestFunc = (...args: any[]) => any;
export type TestFuncObject = {
  [key: string]: TestFunc;
};
