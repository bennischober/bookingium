import { createDefaultHandler } from "@/handler";
import { Company } from "@/models/company";

export const dynamic = 'force-dynamic';
export const { POST, GET } = createDefaultHandler(Company); 
