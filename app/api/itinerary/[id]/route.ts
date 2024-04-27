import { createDefaultDynamicHandler } from "@/handler";
import { Itinerary } from "@/models/itinerary";

export const dynamic = 'force-dynamic';
export const { GET, PUT, DELETE } = createDefaultDynamicHandler(Itinerary);
