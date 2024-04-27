import { createDefaultHandler } from "@/handler";
import { Workplace } from "@/models/workplace";

export const dynamic = 'force-dynamic';
export const { GET, POST } = createDefaultHandler(Workplace);
