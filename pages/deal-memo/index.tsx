import axios from "axios";
import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";

interface DealMemoFormValues {
    date: string;
    deal: string;
    price: Number;
    posters: Number;
    notes: string;
}

interface BandFormValues {
    name: string;
    notes: string;
}

// Rework component and move interfaces
// also import {v4 as uuid4} from 'uuid'; to generate a unique id for deal memo

// add popups, if hotel/band/venue does not exits

// also add auto complete for band, venue, lopro, hotel

// add date input field

export default function DealMemoPage() {
    const dealid = "38eb3751-8926-4b04-9d06-4aca5356d2b1";

    const dealForm = useForm<DealMemoFormValues>({
        initialValues: {
            date: "",
            deal: "",
            price: 0,
            posters: 0,
            notes: "",
        },
        validate: (values: DealMemoFormValues) => ({
            date: values.date.length > 0,
            deal: values.deal.length > 0,
            price: values.price > 0,
            posters: values.posters > 0,
            notes: values.notes.length > 0,
        }),
    });

    const onDealSubmit = (values: DealMemoFormValues) => {
        let v = { ...values, dealid };
        axios.post("/api/deal-memo", v);
    };

    return (
        <>
            <form onSubmit={dealForm.onSubmit((values) => onDealSubmit(values))}>
                <TextInput 
                label="Date"
                
                />
            </form>
        </>
    );
}
