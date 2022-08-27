import Router from "next/router";
import { useEffect } from "react";

// idea: open a dialog https://mantine.dev/core/dialog/ and return wether ok or no is clicked (true/false)

export function useUsafedWarn(unsafed: boolean, callback: () => boolean) {
    useEffect(() => {
        if (!unsafed) return;
        const routeChangeStart = () => {
            const ok = callback();
            if (!ok) {
                Router.events.emit("routeChangeError");
                throw "Abort route change. Please ignore this error.";
            }
        };
        Router.events.on("routeChangeStart", routeChangeStart);

        return () => {
            Router.events.off("routeChangeStart", routeChangeStart);
        };
    }, [unsafed]);
}
