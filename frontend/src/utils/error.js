import React from "react";

export function RenderErrors({errors}){
    if (errors.length === 0) return '';
    return (
        <ul>
            {errors.map((error, i) => (
                <li key={`error-${i}`} className="error">
                    {error}
                </li>
            ))}
        </ul>
    )};