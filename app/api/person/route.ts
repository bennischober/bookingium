import { createDefaultHandler } from "@/handler";
import { Person } from "@/models/person";

export const dynamic = 'force-dynamic';
export const { POST, GET } = createDefaultHandler(Person);
