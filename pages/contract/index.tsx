import { Group, Text, Button, useMantineTheme } from "@mantine/core";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import { MdArrowBack, MdClose, MdOutlineCloudUpload } from "react-icons/md";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { useRouter } from "next/router";

export default function ContractPage() {
    const [pdfData, setPdfData] = useState<Uint8Array>();
    const theme = useMantineTheme();

    const router = useRouter();
    console.log(router.query);

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
    };

    return (
        <>
            <Button
                leftIcon={<MdArrowBack />}
                variant="subtle"
                onClick={() => {
                    router.back();
                }}
            >
                <Text>Go back</Text>
            </Button>
            <Dropzone
                onDrop={(file) => handleUpload(file)}
                radius="md"
                accept={[MIME_TYPES.pdf]}
                maxSize={30 * 1024 ** 2}
                multiple={false}
            >
                <Group
                    position="center"
                    spacing="xl"
                    style={{ minHeight: 220, pointerEvents: "none" }}
                >
                    <Dropzone.Accept>
                        <MdOutlineCloudUpload
                            size={50}
                            color={
                                theme.colors[theme.primaryColor][
                                    theme.colorScheme === "dark" ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <MdClose
                            size={50}
                            color={
                                theme.colors.red[
                                    theme.colorScheme === "dark" ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <BsFileEarmarkPdf size={50} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag PDF files here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Upload a single contract, the file should not exceed
                            5mb!
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <Button onClick={() => handleDownload()}>Download</Button>
        </>
    );
}
