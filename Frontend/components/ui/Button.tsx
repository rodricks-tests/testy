import { FC, ReactNode } from "react";
import classNames from "classnames";
import { Label } from "recharts";

type ButtonProps = {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "primaryPlaneRound"
    | "primaryPlane"
    | "neutral";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  hoverLabel?: string;
  width?: number;
  height?: number;
  onClick?: () => void ;
};

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  disabled = false,
  type = "button",
  hoverLabel,
  width,
  height,
  onClick,
}) => {
  const base = "px-4 py-2 rounded font-semibold transition-colors duration-200";

  const variants = {
    primary: `text-nowrap shadow-md bg-gradient-to-r from-[#a67c00] via-[#ffd700] to-[#a67c00] hover:from-[#ffd700] hover:via-[#a67c00] hover:to-[#ffd700] transition  text-black cursor-pointer w-${width} h-${height}`,
    secondary: `text-nowrap bg-[#d4a000] text-white hover:bg-[#b88f00] cursor-pointer w-${width} h-${height}`,
    primaryPlane: `text-nowrap bg-gold-middle text-black hover:text-white hover:bg-[#b88f00] cursor-pointer w-${width} h-${height}`,
    primaryPlaneRound: `text-nowrap bg-gold-middle text-black hover:text-white hover:bg-[#b88f00] rounded-full flex items-center justify-center cursor-pointer w-${width} h-${height}`,
    neutral: `text-nowrap bg-[#e0e0e0] text-black hover:bg-[#cfcfcf] cursor-pointer w-${width} h-${height}`,
  };

  const disabledStyle = "opacity-50 cursor-not-allowed";
  if (!hoverLabel) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classNames(
          base,
          variants[variant],
          disabled && disabledStyle
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <div className="w-full relative ">
      <div className="group items-center justify-center flex flex-col ">
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={classNames(
            base,
            variants[variant],
            disabled && disabledStyle
          )}
        >
          {children}
        </button>

        <label
          htmlFor=""
          className="bg-white/60 transition-all duration-400 absolute bottom-[-20px] text-nowrap text-sm rounded-full px-2 shadow-lg shadow-black/20 opacity-0 group-hover:opacity-100 pointer-events-none"
        >
          {hoverLabel}
        </label>
      </div>
    </div>
  );
};

export default Button;
