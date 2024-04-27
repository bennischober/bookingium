import { createDefaultDynamicHandler } from "@/handler";
import { Venue } from "@/models/venue";

export const dynamic = 'force-dynamic';
export const { GET, PUT, DELETE } = createDefaultDynamicHandler(Venue);
