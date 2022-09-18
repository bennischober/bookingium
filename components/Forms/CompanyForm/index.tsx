import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUnsavedWarn } from "../../../hooks";
import {
    getFormValueObject,
    getValuesAtCombinedKey,
    toCombinedAutocomplete,
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

        vals.members = persons
            ? getValuesAtCombinedKey(
                  persons,
                  ["firstName", "lastName"],
                  values.members,
                  " ",
                  "_id"
              )
            : [];

        handleData(vals);
        if (close) close();

        Form.resetDirty();

        if (!data) Form.reset();
    };

    // change to useMemo?
    const personAC = toCombinedAutocomplete(
        persons,
        ["firstName", "lastName"],
        " "
    );

    const [prompt] = useUnsavedWarn(Form);

    return (
        <>
            <form onSubmit={Form.onSubmit((values) => handleSubmit(values))}>
                <CompanyInput
                    Form={Form}
                    autocomplete={personAC}
                    isEdit={data ? true : false}
                />
                <Button type="submit" fullWidth mt="xl">
                    {data ? "Update Company" : "Save Company"}
                </Button>
            </form>
            {prompt}
        </>
    );
}
