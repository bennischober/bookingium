import { createDefaultDynamicHandler } from "@/handler";
import { Hotel } from "@/models/hotel";

export const dynamic = 'force-dynamic';
export const { GET, PUT, DELETE } = createDefaultDynamicHandler(Hotel);
