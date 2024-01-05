"use client";

import { BandForm } from "@/components/Forms/BandForm";
import { ContentContainer } from "@/components/Layout/ContentContainer";
import { FormContainer } from "@/components/Layout/FormContainer";
import { SpecificPageHeader } from "@/components/Layout/SpecificPageHeader";
import { DealMemoList } from "@/components/Lists/DealMemoList";
import { IBand } from "@/models/band";
import { ICompany } from "@/models/company";
import { IDealMemo } from "@/models/deal-memo";
import { IPerson } from "@/models/person";
import { callAPI, getAPIBaseUrl, withNotification } from "@/utils/apiHandler";
import { Space, Tabs } from "@mantine/core";
import { Session } from "next-auth";

interface SpecificBandComponentProps {
    session: Session;
    band: IBand;
    persons: IPerson[];
    members: IPerson[];
    companies: ICompany[];
    memos: IDealMemo[];
}

export default function SpecificBandComponent({
    session,
    band,
    persons,
    members,
    companies,
    memos,
}: SpecificBandComponentProps) {
    console.log(band)
    const handleUpdate = async (data: IBand) => {
        await withNotification(
            () =>
                callAPI(
                    `/band/${band._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            {
                notificationId: "update-band",
                loadingTitle: "Updating Band",
                loadingMessage: "Please wait...",
                successTitle: "Band updated successfully!",
                successMessage: "You can now close this window.",
                errorTitle: "Band update failed!",
                errorMessage: "Please try again later.",
            },
            "PUT"
        );
    };

    return (
        <>
            <SpecificPageHeader
                title={band.name}
                titleName={"Band"}
                subTitle={`Genre: ${band.genre}`}
            />
            <ContentContainer>
                <Tabs defaultValue="band-data">
                    <Tabs.List>
                        <Tabs.Tab value="band-data">Band data</Tabs.Tab>
                        <Tabs.Tab value="deal-memo-data">Deal Memos</Tabs.Tab>
                        <Tabs.Tab value="isrc-data">ISRC Codes</Tabs.Tab>
                        <Tabs.Tab value="calender-data">Calendar</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="band-data">
                        <FormContainer>
                            <BandForm
                                session={session}
                                handleData={handleUpdate}
                                data={band}
                                persons={persons}
                                existingMembers={members}
                                companies={companies}
                                isEdit
                            />
                        </FormContainer>
                    </Tabs.Panel>
                    <Tabs.Panel value="deal-memo-data">
                        <Space h="xl" />
                        <DealMemoList memos={memos} />
                    </Tabs.Panel>
                    <Tabs.Panel value="calender-data">
                        Coming soon! Uses a calender to show all dates for this
                        band.
                    </Tabs.Panel>
                    <Tabs.Panel value="isrc-data">
                        Coming soon! Uses a Grid to show all ISRC codes with
                        their songs/albums.
                    </Tabs.Panel>
                </Tabs>
            </ContentContainer>
        </>
    );
}
