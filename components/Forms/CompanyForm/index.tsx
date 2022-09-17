import { Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Types } from "mongoose";
import { z } from "zod";
import { useUnsavedWarn } from "../../../hooks";
import { getFormValueObject } from "../../../utils/appHandles";
import { CompanyFormProps } from "../../../types";
import { Company, ICompany } from "../../../models/company";
import { CompanyInput } from "../../FormInputs/CompanyInput";

export function CompanyForm({
    handleData,
    close,
    session,
    data,
}: CompanyFormProps) {
    const Form = useForm<Company>({
        initialValues: {
            name: data?.name ?? "",
            notes: data?.notes ?? "",
            vatNumber: data?.vatNumber ?? "",
            ustNumber: data?.ustNumber ?? "",
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
        const created = data?.dm.created ?? "";

        const vals = getFormValueObject<Company>(
            values,
            session.userid,
            created,
            {
                createId: "companyid",
                value: data?.companyid,
            }
        ) as ICompany;

        handleData(vals);
        if (close) close();

        Form.reset();
    };

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <CompanyInput Form={Form} autocomplete={[]} />
                <Button type="submit" fullWidth mt="xl">
                    {data ? "Update Company" : "Save Company"}
                </Button>
            </form>
            {prompt}
        </>
    );
}
