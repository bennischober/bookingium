import { createDefaultDynamicHandler } from "@/handler";
import { Person } from "@/models/person";

export const dynamic = 'force-dynamic';
export const { GET, PUT, DELETE } = createDefaultDynamicHandler(Person);
