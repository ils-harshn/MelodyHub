type ErrorType = React.HTMLAttributes<HTMLDivElement> & {
    children: string | null;
    varient?: "primary" | "secondary";
}

export default ErrorType;