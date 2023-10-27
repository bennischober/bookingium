import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUnsavedWarn } from "../../../hooks";
import {
    getFormValueObject,
} from "../../../utils/appHandles";
import { CompanyFormProps } from "../../../types";
import { Company, ICompany } from "../../../models/company";
import { CompanyInput } from "../../FormInputs/CompanyInput";

export function CompanyForm({
    handleData,
    close,
    session,
    data,
    persons,
}: CompanyFormProps) {
    const Form = useForm<Company>({
        initialValues: {
            name: data?.name ?? "",
            notes: data?.notes ?? "",
            bank: data?.bank ??{
                bankName: "",
                accountHolder: "",
                iban: "",
                bic: "",
            },
            vatNumber: "",
            ustNumber: "",
            address: data?.address ?? {
                streetNumber: "",
                street: "",
                addressSuffix: "",
                zipCode: "",
                city: "",
                state: "",
                country: "",
                countryCode: "",
            },
            contact: data?.contact ?? {
                email: "",
                phone: "",
                mobilePhone: "",
                otherNumbers: [],
                homepage: "",
            },
            members: data?.members ?? [],
        },
    });

    const handleSubmit = (values: Company) => {
        const created = data?.created ?? "";

        const vals = getFormValueObject<Company>(
            values,
            session.userid,
            created
        ) as ICompany;

        handleData(vals);
        if (close) close();

        Form.resetDirty();

        if (!data) Form.reset();
    };

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <CompanyInput
                    Form={Form}
                    isEdit={data ? true : false}
                    persons={persons}
                />
                <Button type="submit" fullWidth mt="xl">
                    {data ? "Update Company" : "Save Company"}
                </Button>
            </form>
            {prompt}
        </>
    );
}
