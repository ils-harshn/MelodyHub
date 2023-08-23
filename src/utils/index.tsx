export function getClassName(...args: string[]): string {
  return args.filter(Boolean).join(" ");
}

export function joinEndpoints(...parts: string[]): string {
  const sanitizedParts = parts.map((part) => part.replace(/^\/|\/$/g, ""));
  const joinedURL = "/" + sanitizedParts.join("/");
  return joinedURL;
}

export function makeRoute(path: string, ...nestedEndpoints: string[]) {
  return {
    path,
    endpoint: joinEndpoints(...nestedEndpoints, path),
  };
}
