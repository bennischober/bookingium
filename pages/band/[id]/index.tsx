import { PageTemplate } from "../../../components/Layout/PageTemplate";
import { BackButton } from "../../../components/LayoutElements/BackButton";

// add api endpoint for specific band => "/api/band/[id]"
// fetch all data => deal memos etc.

export default function SpecificBandPage() {
    return (
        <PageTemplate title="Specific Band">
            <BackButton />
            <p>Specific Band Page</p>
        </PageTemplate>
    );
}