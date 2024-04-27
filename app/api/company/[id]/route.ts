import { createDefaultDynamicHandler } from "@/handler";
import { Company } from "@/models/company";

export const dynamic = 'force-dynamic';
export const { GET, PUT, DELETE } = createDefaultDynamicHandler(Company);
