type ErrorType = React.HTMLAttributes<HTMLDivElement> & {
    children?: string;
    varient?: "primary" | "secondary";
}

export default ErrorType;