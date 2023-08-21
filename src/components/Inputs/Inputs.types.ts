export type InputType = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    varient?: "primary" | "secondary";
    width?: "initial" | "full";
    passwordVisibility?: boolean;
};

export type PasswordInputType = InputType & {
    IconWhenVisible?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    IconWhenHidden?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}