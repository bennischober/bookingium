import { createDefaultDynamicHandler } from "@/handler";
import { Workplace } from "@/models/workplace";

export const dynamic = 'force-dynamic';
export const { GET, PUT, DELETE } = createDefaultDynamicHandler(Workplace);
