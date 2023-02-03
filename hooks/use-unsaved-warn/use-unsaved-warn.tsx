import Router from "next/router";
import { useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { Prompt } from "../../components/Interactables/Prompt";
import { Affix, Alert, Button, Transition } from "@mantine/core";
import { MdWarning } from "react-icons/md";

// Also add on Tab/Browser close?
// optionally add some text, what form is dirty (e.g. think of layouts with multiple forms)

export function useUnsavedWarn<T>(
    form: UseFormReturnType<T>,
    title?: string,
    message?: string,
    confirmText?: string,
    cancelText?: string
) {
    const [isAccepted, setIsAccepted] = useState(false);
    const [lastRoute, setLastRoute] = useState<string>("");
    const [isOpened, setIsOpened] = useState(false);

    const handleConfirm = (state: boolean) => {
        setIsAccepted(state);
        setIsOpened(state);

        if (state) {
            // if clicked on discard changes, go to the clicked route
            Router.push(lastRoute);
        }
    };

    useEffect(() => {
        if (isAccepted) {
            return () => {
                Router.events.off("routeChangeStart", routeChangeStart);
            };
        }

        const routeChangeStart = (url: string) => {
            setLastRoute(url);
            if (form.isDirty()) {
                setIsOpened(true);
                Router.events.emit("routeChangeError");
                // search for better option than this!
                throw "Abort route change. Please ignore this error.";
            }
        };
        Router.events.on("routeChangeStart", routeChangeStart);

        return () => {
            Router.events.off("routeChangeStart", routeChangeStart);
        };
    }, [form.isDirty(), isAccepted, lastRoute]);

    const prompt = (
        <>
            {!isOpened ? (
                <Affix position={{ bottom: 20, right: 20 }}>
                    <Transition transition="slide-up" mounted={form.isDirty()}>
                        {(transitionStyles) => (
                            <Alert
                                //title="Warning"
                                //icon={<MdWarning />}
                                color="yellow"
                                variant="outline"
                                style={transitionStyles}
                            >
                                Note: You have unsaved changes!{/* <Button variant="subtle">Save now</Button> */}
                            </Alert>
                        )}
                    </Transition>
                </Affix>
            ) : null}

            <Prompt
                title={title}
                message={message}
                confirmText={confirmText}
                cancelText={cancelText}
                opened={isOpened}
                onChoose={handleConfirm}
            />
        </>
    );

    return [prompt];
}
