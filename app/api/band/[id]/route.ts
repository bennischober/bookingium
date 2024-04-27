import { createDefaultDynamicHandler } from "@/handler";
import { Band } from "@/models/band";

export const dynamic = 'force-dynamic';
export const { GET, PUT, DELETE } = createDefaultDynamicHandler(Band);
