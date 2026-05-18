import type { Experience } from "@/types";
import data from "./json/experiences.json";

export const experiences: Experience[] = (data.experiences ?? []).map((e) => ({
  ...e,
  type: e.type as Experience["type"],
}));
