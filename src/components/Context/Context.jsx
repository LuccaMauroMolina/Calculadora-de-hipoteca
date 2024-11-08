// src/Context/Context.js
import { createContext, useState } from "react";

export const contextRed = createContext();

const Red = ({ children }) => {
    const [red, setRed] = useState("hsl(4, 69%, 50%)");

    // Esta función cambia el color a un valor predefinido
    const colorRed = () => {
        setRed("hsl(4, 69%, 50%)");
    };

    return (
        <contextRed.Provider value={{ red, colorRed }}>
            {children} {/* Asegúrate de envolver los hijos */}
        </contextRed.Provider>
    );
}

export default Red;
