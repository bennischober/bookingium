import { HotelForm } from "@/components/Forms/HotelForm";
import { IHotel } from "@/models/hotel";
import { callAPI, withNotification } from "@/utils/apiHandler";
import { Session } from "next-auth";

interface SpecificHotelComponentProps {
    session: Session;
    hotel: IHotel;
}

export default function SpecificHotelComponent({
    session,
    hotel,
}: SpecificHotelComponentProps) {
    const handleData = async (data: IHotel) => {
        await withNotification<IHotel>(
            () =>
                callAPI(
                    `/hotel/${data._id}`,
                    "PUT",
                    { data: data },
                    { userid: session.userid }
                ),
            {
                notificationId: "update-hotel",
                loadingTitle: "Updating Hotel",
                loadingMessage: "Please wait...",
                successTitle: "Hotel updated successfully!",
                successMessage: "You can now close this window.",
                errorTitle: "Hotel update failed!",
                errorMessage: "Please try again later.",
            },
            "PUT"
        );
    };

    return (
        <HotelForm
            session={session}
            handleData={handleData}
            data={hotel}
        />
    );
}
