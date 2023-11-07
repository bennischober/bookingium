import { PdfStateProvider } from "./provider";

export default async function MainLayout({
    children,
}: React.PropsWithChildren) {
    return <PdfStateProvider>{children}</PdfStateProvider>;
}
