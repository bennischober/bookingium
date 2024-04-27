import { createDefaultHandler } from "@/handler";
import { Hotel } from "@/models/hotel";

export const dynamic = 'force-dynamic';
export const { POST, GET } = createDefaultHandler(Hotel);
