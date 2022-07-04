import { Group, Text, useMantineTheme, MantineTheme, Button } from "@mantine/core";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Dropzone, DropzoneStatus, PDF_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { IconType } from "react-icons";
import {
    MdClose,
    MdOutlineFileUpload,
    MdPhotoSizeSelectActual,
} from "react-icons/md";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
    return status.accepted
        ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
        : status.rejected
        ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
        : theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

function ImageUploadIcon({
    status,
    ...props
}: React.ComponentProps<IconType> & { status: DropzoneStatus }) {
    if (status.accepted) {
        return <MdOutlineFileUpload {...props} />;
    }

    if (status.rejected) {
        return <MdClose {...props} />;
    }

    return <MdPhotoSizeSelectActual {...props} />;
}

const dropzoneChildren = (
    status: DropzoneStatus,
    theme: MantineTheme
) => {
    return (
        <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
        >
            <ImageUploadIcon
                status={status}
                style={{ color: getIconColor(status, theme) }}
                size={80}
            />

            <div>
                <Text size="xl" inline>
                    Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                </Text>
            </div>
        </Group>
    );
};

export default function ContractPage() {
    const [pdfData, setPdfData] = useState<Uint8Array>();
    const theme = useMantineTheme();

    const handleUpload = async (files: File[]) => {
        const file = files[0];
        const data = await file.arrayBuffer();
        console.log(data);

        const pdfDoc = await PDFDocument.load(data);
        // Embed the Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Get the width and height of the first page
        const { width, height } = firstPage.getSize();

        // Draw a string of text diagonally across the first page
        firstPage.drawText("This text was added with JavaScript!", {
            x: 5,
            y: height / 2 + 300,
            size: 50,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(-45),
        });

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();
        setPdfData(pdfBytes);
    };

    const handleDownload = async () => {
        // three different options here:
        // 1. download the file directly (https://stackoverflow.com/questions/63048857/using-native-file-system-api-to-save-file-to-a-specific-location-without-user-in) / download the file via a blob (https://stackoverflow.com/questions/5100569/how-to-download-a-file-from-an-html5-canvas)
        // 2. open the file in new tab and let the user download
        const blob = new Blob([pdfData!], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url);
        // 3. open native file api and let the user decide a location to save the file => note: if the user doesnt accept the download, an error will be thrown
        // const blob = new Blob([pdfBytes], { type: "application/pdf" });
        // const handler = await window.showSaveFilePicker({
        //     types: [
        //         {
        //             description: "PDF Document",
        //             accept: { "application/pdf": ".pdf" },
        //         },
        //     ],
        // });
        // const fileStream = await handler.createWritable();
    
        // await fileStream.write(blob);
        // await fileStream.close();
    }

    return (
        <>
        <Dropzone
            onDrop={(files) => handleUpload(files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            multiple={false}
        >
            {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
        <Button onClick={() => handleDownload()}>Download</Button>
        </>
    );
}
