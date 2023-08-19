export type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: string;
    varient?: 'primary' | 'secondary';
    width?: 'full' | 'fit';
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}