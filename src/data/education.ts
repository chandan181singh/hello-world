import type { Education } from "@/types";
import data from "./json/education.json";

export const education: Education[] = data.education ?? [];
