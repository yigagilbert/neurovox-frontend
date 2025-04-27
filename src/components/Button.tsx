import clsx from "clsx";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "ghost";
};
export const Button = ({ variant = "primary", className, ...rest }: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles: Record<string, string> = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white focus:ring-brand-500 disabled:opacity-40",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 disabled:opacity-40",
    ghost: "bg-transparent text-brand-700 hover:bg-brand-50 focus:ring-brand-500",
  };
  return <button className={clsx(base, styles[variant], className)} {...rest} />;
};