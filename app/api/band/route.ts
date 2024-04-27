import { createDefaultHandler } from "@/handler";
import { Band } from "@/models/band";

export const dynamic = 'force-dynamic';
export const { POST, GET } = createDefaultHandler(Band);
