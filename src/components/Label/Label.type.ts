type LabelType = React.LabelHTMLAttributes<HTMLLabelElement> & {
    children: string;
    varient?: "primary" | "secondary";
}

export default LabelType;