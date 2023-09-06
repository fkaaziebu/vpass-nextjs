import Image from "next/image";
import React, { MouseEventHandler } from "react";

type Props = {
  title: string;
  type?: "button" | "submit";
  leftIcon?: string | null;
  isSubmitting?: boolean;
  handleClick?: MouseEventHandler;
};

const Button = ({ title, type, leftIcon, isSubmitting, handleClick }: Props) => {
  return (
    <button
      type={type || "button"}
      className="flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full bg-primary-purple text-white"
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
    </button>
  );
};

export default Button;
