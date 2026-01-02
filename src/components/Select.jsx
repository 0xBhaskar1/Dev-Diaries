import React from 'react'
import { useId } from 'react'
import { Label } from "@/components/ui/label";


function Select({
    options = [],
    label,
    className = "",
    ref,
    ...props
}) {
    const id = useId()
  return (
        <div className='w-full space-y-2'>
            {label && (
                <Label 
                    htmlFor={id} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </Label>
            )}

            <select
                {...props}
                id={id}
                ref={ref}
                className={`flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
  )
}

export default Select