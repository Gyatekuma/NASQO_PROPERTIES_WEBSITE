import React from 'react'
import Link from 'next/link'
import clsx from 'clsx';

interface ButtonProps {
    text: string;
    variants: "primary" | "secondary" | "outline";
    href?: string;
    className?: string;
    /** When set, hints the browser to download (e.g. PDF brochures). */
    download?: boolean | string;
}

const Button: React.FC<ButtonProps> = ({ text, variants, href = "/", className="", download }) => {

    const baseStyles = "inline-block text-center rounded-full text-base font-bricolage py-3 px-8 whitespace-nowrap transition-all duration-200 hover:opacity-90"

    const variantStyles: Record<"primary" | "secondary" | "outline", string> = {
        primary: 'bg-[#4361EE] text-white',
        secondary: 'bg-white text-black',
        outline: 'bg-transparent border-2 border-white text-white'
    }

    return (
        <Link 
            href={href} 
            className={clsx(baseStyles, variantStyles[variants], className)}
            download={download}
        >
            {text}
        </Link>
    )
}

export default Button;