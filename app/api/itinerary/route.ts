import { createDefaultHandler } from "@/handler";
import { Itinerary } from "@/models/itinerary";

export const dynamic = 'force-dynamic';
export const { GET, POST } = createDefaultHandler(Itinerary);
