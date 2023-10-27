import ReactPDF from "@react-pdf/renderer";

export interface ViewerProps {
    Pdf: any;
}

export default function Viewer({ Pdf }: ViewerProps) {
    return (
        <>
            <ReactPDF.PDFViewer style={{width: "100%", height: "100%"}}>{Pdf}</ReactPDF.PDFViewer>
        </>
    );
}
