import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { BandEditForm } from "../../../components/Forms/BandForm";
import { FormContainer } from "../../../components/Layout/FormContainer";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { SpecificBandPageProps } from "../../../types";
import { SpecificPageHeader } from "../../../components/Layout/SpecificPageHeader";
import { Tabs } from "@mantine/core";
import { serverSideFetch } from "../../../utils/appHandles";

// finish this page and extract to new component as soon as the depending components are finished
// update band model and interface to have a genre and founded field!

export default function SpecificBandPage({
    band,
    session,
}: SpecificBandPageProps) {
    const handleBandUpdate = (band: {}) => {
        // create helper function for this
        // => this is used in other components aswell!
        console.log(band);
    };

    return (
        <PageTemplate title="Specific Band">
            <SpecificPageHeader
                title={band.name}
                titleName={"Band name"}
                subTitle={"Genre: Rock"}
            />
            <Tabs defaultValue="band-data">
                <Tabs.List>
                    <Tabs.Tab value="band-data">Band data</Tabs.Tab>
                    <Tabs.Tab value="contract-data">Contracts</Tabs.Tab>
                    <Tabs.Tab value="deal-memo-data">Deal Memos</Tabs.Tab>
                    <Tabs.Tab value="calender-data">Calendar</Tabs.Tab>
                    <Tabs.Tab value="isrc-data">ISRC Codes</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="band-data">
                    <FormContainer>
                        <BandEditForm
                            session={session}
                            handleBand={handleBandUpdate}
                            data={{
                                bandName: band.name,
                                notes: band.notes,
                                companyName: band.company.name,
                                vatNumber: band.company.vatNumber,
                                ustNumber: band.company.ustNumber,
                                streetNumber: band.company.address.streetNumber,
                                street: band.company.address.street,
                                addressSuffix:
                                    band.company.address.addressSuffix,
                                zipCode: band.company.address.zipCode,
                                city: band.company.address.city,
                                state: band.company.address.state,
                                country: band.company.address.country,
                                countryCode: band.company.address.countryCode,
                                email: band.company.contact.email,
                                phone: band.company.contact.phone,
                                mobilePhone: band.company.contact.mobilePhone,
                                homepage: band.company.contact.homepage,
                                members: band.members,
                            }}
                        />
                    </FormContainer>
                </Tabs.Panel>
                <Tabs.Panel value="contract-data">Coming soon! Uses a Grid to show all contracts for this band.</Tabs.Panel>
                <Tabs.Panel value="deal-memo-data">Coming soon! Uses a Grid to show all deal memos for this band.</Tabs.Panel>
                <Tabs.Panel value="calender-data">Coming soon! Uses a calender to show all dates for this band.</Tabs.Panel>
                <Tabs.Panel value="isrc-data">Coming soon! Uses a Grid to show all ISRC codes with their songs/albums.</Tabs.Panel>
            </Tabs>
        </PageTemplate>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession({ req: ctx.req });
    const id = ctx.query.id;

    const data = await serverSideFetch(`/api/band/${id}`, {userid: session?.userid});

    // edit deal memo api endpoint to have another parameter "band"
    // return all deal memos that this user created for this band

    return { props: { session: session, band: data } };
};
