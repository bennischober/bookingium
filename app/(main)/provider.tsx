"use client";

import { createContext, useContext, useState } from "react";

interface IPdfContext {
    information?: string;
    amountOfMembers?: number;
}

interface ContextType {
    state: IPdfContext;
    updateContext: (newState: Partial<IPdfContext>) => void;
}

const PdfStateContext = createContext<ContextType>({
    state: {},
    updateContext: () => {},
});

export const PdfStateProvider = ({ children }: React.PropsWithChildren) => {
    const [state, setState] = useState({
        /* initial state values */
    });

    // Function to update the state
    const updateContext = (newState: Partial<IPdfContext>) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    return (
        <PdfStateContext.Provider value={{ state, updateContext }}>
            {children}
        </PdfStateContext.Provider>
    );
};

export const usePdfStateContext = () => useContext(PdfStateContext);
