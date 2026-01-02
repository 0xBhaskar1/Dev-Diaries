import React from 'react'
import { useId } from 'react'
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Input({ label, type, className = "", ref, ...props }) {
    const id = useId()
    return (
        <div className='w-full space-y-2'>
            {label &&
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id}>
                    {label}
                </Label>}

            <ShadcnInput type={type} className={`bg-white text-black border-gray-200 focus:border-black ${className}`}
                ref={ref} {...props} id={id}
            />
        </div>
    )

}

export default Input