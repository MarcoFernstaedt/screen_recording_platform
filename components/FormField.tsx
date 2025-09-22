import React from "react";

const FormField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    as = "input",
    options = [],
}: FormFieldProps) => {

    const InputToRender = ({ type }: { type: "string" }) => {
        {
            as === 'textarea' ? (
                <textarea id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} />
            ) : as === 'select' ? (
                <select id={id} name={id} value={value} onChange={onChange}>
                    <option key={value}>{label}</option>
                </select>
            ) : (
                <input id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} />
            )
        }


        return (
            <div className="form-field">
                <label htmlFor={id}>{label}</label>
                <InputToRender type={as} />
            </div>
        );
    };

    export default FormField;
