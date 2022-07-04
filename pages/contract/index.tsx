import { Group, Text, useMantineTheme, MantineTheme } from "@mantine/core";
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

export const dropzoneChildren = (
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
    const [pdfData, setPdfData] = useState<ArrayBuffer>();

    const handleUpload = async (files: File[]) => {
        const file = files[0];
        const data = await file.arrayBuffer();
        setPdfData(data);
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

        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        // https://stackoverflow.com/questions/71309058/property-showsavefilepicker-does-not-exist-on-type-window-typeof-globalthis
        const handler = await window.showSaveFilePicker({
            types: [
                {
                    description: "PDF Document",
                    accept: { "application/pdf": ".pdf" },
                },
            ],
        });
        const fileStream = await handler.createWritable();
    
        await fileStream.write(blob);
        await fileStream.close();
    };

    const theme = useMantineTheme();
    return (
        <Dropzone
            onDrop={(files) => handleUpload(files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            multiple={false}
        >
            {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
    );
}
