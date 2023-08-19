export function getClassName(...args: string[]): string {
    return args.filter(Boolean).join(' ')
}