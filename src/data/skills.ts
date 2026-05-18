import type { SkillCategory } from "@/types";
import data from "./json/skills.json";

export const skillCategories: SkillCategory[] = data.categories ?? [];

export const interests: string[] = data.interests ?? [];
