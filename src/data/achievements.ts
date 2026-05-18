import type { Achievement } from "@/types";
import data from "./json/achievements.json";

export const achievements: Achievement[] = (data.achievements ?? []).map(
  (a) => ({
    ...a,
    source: a.source as Achievement["source"],
  }),
);
