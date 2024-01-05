"use client";

import { Button } from "@mantine/core";
import { MdDownload } from "react-icons/md";
import { pdf } from "@react-pdf/renderer";

interface PdfDownloadButtonProps {
    title: string;
    fileName: string;
    pdfDocument: JSX.Element;
}

export function PdfDownloadButton({title, fileName, pdfDocument}: PdfDownloadButtonProps) {
    //const [pdfDoc, _] = usePDF({document: pdfDocument});
    const handleDownload = async () => {
        //if(!pdfDoc.url) return console.error("No pdf url found!");
        // download pdf
        const a = document.createElement("a");
        const asPdf = pdf();
        asPdf.updateContainer(pdfDocument);
        var b = await asPdf.toBlob();
        a.href = URL.createObjectURL(b);
        //a.href = pdfDoc.url;
        a.download = fileName;
        a.click();
    }

    return(
        <Button variant="default"
        leftSection={<MdDownload size={20} />}
        onClick={handleDownload}
        >
            {title}
        </Button>
    );
}