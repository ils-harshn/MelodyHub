import urlJoin from "url-join";

export function getClassName(...args: string[]): string {
  return args.filter(Boolean).join(" ");
}

export function makeRoute(path: string, ...nestedEndpoints: string[]) {
  return urlJoin(...nestedEndpoints, path);
}

export const isNumeric = (str: string): boolean => {
  return /^[0-9]+$/.test(str);
};
