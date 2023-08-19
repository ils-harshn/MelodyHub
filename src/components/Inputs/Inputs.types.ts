export type InputType = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    varient?: "primary" | "secondary";
    width?: "initial" | "full";
};
