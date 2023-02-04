import { Button, Center, Divider, Modal, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { SpecificDealMemoPageContentProps } from "../../../types";
import { nonEmptyObj } from "../../../utils/appHandles";
import { SearchableIdProxy } from "../../FormElements/Searchable";
import { DealEditForm } from "../../Forms/DealMemoForm";
import { HotelForm } from "../../Forms/HotelForm";
import { FormContainer } from "../../Layout/FormContainer";

export function SpecificDealMemoPageContent({
    session,
    memo,
    hotelState,
    hotelAutocomplete,
    handleMemo,
    handleHotel,
    handleSelectHotel,
    handleAddHotel,
}: SpecificDealMemoPageContentProps) {
    const [opened, setOpened] = useState(false);

    const Form = useForm({
        initialValues: {
            hotelid: "",
        },
    });

    const onHotelSubmit = () => {
        // closes the modal
        setOpened(false);
    }

    return (
        <>
            <Tabs defaultValue="deal-data">
                <Tabs.List>
                    <Tabs.Tab value="deal-data">Deal data</Tabs.Tab>
                    <Tabs.Tab value="hotel-data">Hotel data</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="deal-data">
                    <FormContainer>
                        <DealEditForm
                            handleMemos={handleMemo}
                            session={session}
                            data={memo}
                            created={memo.created}
                        />
                    </FormContainer>
                </Tabs.Panel>
                <Tabs.Panel value="hotel-data">
                    <FormContainer>
                        {nonEmptyObj(hotelState) ? (
                            <HotelForm
                                session={session}
                                handleData={handleHotel}
                                data={hotelState}
                            />
                        ) : (
                            <>
                                <form
                                    onSubmit={Form.onSubmit((value) =>
                                        handleSelectHotel(value.hotelid)
                                    )}
                                >
                                    <SearchableIdProxy
                                        Form={Form}
                                        label={"Hotels"}
                                        data={hotelAutocomplete}
                                        inputProps={"hotelid"}
                                    />

                                    <Divider my="xl" />

                                    <Center>
                                        {Form.values.hotelid !== "" ? (
                                            <Button
                                                type="submit"
                                                fullWidth
                                                mt="xl"
                                            >
                                                Save Hotel
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => setOpened(true)}
                                            >
                                                Add Hotel Data
                                            </Button>
                                        )}
                                    </Center>
                                </form>
                            </>
                        )}
                    </FormContainer>
                </Tabs.Panel>
            </Tabs>

            <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
                <HotelForm session={session} handleData={handleAddHotel} close={onHotelSubmit} />
            </Modal>
        </>
    );
}
