"use client";

import { DealEditForm } from "@/components/Forms/DealMemoForm";
import { FormContainer } from "@/components/Layout/FormContainer";
import { IDealMemo } from "@/models/deal-memo";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface MemoComponentProps {
    session: Session;
    memo: IDealMemo;
}

export default function MemoComponent({session, memo}: MemoComponentProps) {
    const handleMemo = async (data: IDealMemo) => {
        await withNotification(
            () =>
                callAPI<IDealMemo>(
                    `/deal-memo/${memo._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            undefined,
            "PUT"
        );
    };

    return (
        <FormContainer>
            <DealEditForm
                handleMemos={handleMemo}
                session={session}
                data={memo}
                created={memo.created}
            />
        </FormContainer>
    );
}
