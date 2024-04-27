import { createDefaultHandler } from "@/handler";
import { Venue } from "@/models/venue";

export const dynamic = 'force-dynamic';
export const { POST, GET } = createDefaultHandler(Venue);
