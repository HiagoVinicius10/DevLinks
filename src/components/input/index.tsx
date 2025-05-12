import { InputHTMLAttributes } from "react";

interface InputProp  extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(prop: InputProp) {


    return(
        <input
        className="border-0 h-9 bg-amber-50 rounded-md outline-none px-2 mb-3"
        {...prop}
        />
    
    )
}