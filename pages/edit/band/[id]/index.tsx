import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { BandForm } from "../../../../components/Forms/BandForm";
import { FormContainer } from "../../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../../components/Layout/PageTemplate";
import { SpecificBandPageProps } from "../../../../types";
import { SpecificPageHeader } from "../../../../components/Layout/SpecificPageHeader";
import { Space, Tabs } from "@mantine/core";
import { serverSideFetch, updateData } from "../../../../utils/appHandles";
import { IBand } from "../../../../models/band";
import { ContentContainer } from "../../../../components/Layout/ContentContainer";
import { IDealMemo } from "../../../../models/deal-memo";
import { ICompany } from "../../../../models/company";
import { IPerson } from "../../../../models/person";
import { DealMemoList } from "../../../../components/Lists/DealMemoList";

// finish this page and extract to new component as soon as the depending components are finished
// update band model and interface to have a genre and founded field!

export default function SpecificBandPage({
    session,
    band,
    persons,
    companies,
    memos,
}: SpecificBandPageProps) {
    const handleBandUpdate = async (bandIn: IBand) => {
        const res = await updateData(
            `/api/band/${band._id}`,
            bandIn,
            session.userid
        );

        if (res == 200) {
            console.log("Band updated successfully!");
        }
    };

    return (
        <PageTemplate title="Specific Band">
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
                                handleData={handleBandUpdate}
                                data={band}
                                persons={persons}
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
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    const id = ctx.query.id;

    const band = await serverSideFetch<IBand>(`/api/band/${id}`, {
        userid: session?.userid,
    });
    const persons = await serverSideFetch<IPerson>("/api/person", {
        userid: session?.userid,
    });
    const companies = await serverSideFetch<ICompany>("/api/company", {
        userid: session?.userid,
    });
    const memos = await serverSideFetch<IDealMemo[]>("/api/deal-memo", {
        userid: session?.userid,
        bandid: band._id,
    });

    // edit deal memo api endpoint to have another parameter "band"
    // return all deal memos that this user created for this band
    return {
        props: {
            session: session,
            band: band,
            persons: persons,
            companies: companies,
            memos: memos,
        },
    };
};
