export type Dirs = {
  top: string;
  success: string;
  error: string;
};

export type LogDirs = {
  admin: Dirs;
  client: Dirs;
};

export type TestTypes = keyof LogDirs;
export type TestFunc = (...args: any[]) => any;
export type TestFuncObject = {
  [key: string]: TestFunc;
};
