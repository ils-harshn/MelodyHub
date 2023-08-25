import urlJoin from "url-join";

export function getClassName(...args: string[]): string {
  return args.filter(Boolean).join(" ");
}

export function makeRoute(path: string, ...nestedEndpoints: string[]) {
  return {
    path,
    endpoint: urlJoin(...nestedEndpoints, path),
  };
}
