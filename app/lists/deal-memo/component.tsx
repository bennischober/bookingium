"use client";

import { DealMemoList } from "@/components/Lists/DealMemoList";
import { IDealMemo } from "@/models/deal-memo";

export interface DealMemoListComponentProps {
    memos: IDealMemo[];
}

export default function DealMemoListComponent({
    memos,
}: DealMemoListComponentProps) {
    return <DealMemoList memos={memos} />;
}
