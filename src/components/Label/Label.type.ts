type LabelType = React.HTMLAttributes<HTMLLabelElement> & {
    children: string;
    varient?: "primary" | "secondary";
}

export default LabelType;