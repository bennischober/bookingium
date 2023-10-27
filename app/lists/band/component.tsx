"use client";

import { BandList } from "@/components/Lists/BandList";
import { IBand } from "@/models/band";

export interface BandListComponentProps {
    bands: IBand[];
}

export default function BandListComponent({ bands }: BandListComponentProps) {
    return <BandList bands={bands} />;
}
