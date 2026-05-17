import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Skills } from "@/components/home/skills";
import { StatsBento } from "@/components/home/stats-bento";
import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { EducationSection } from "@/components/home/education";
import { AchievementsStrip } from "@/components/home/achievements-strip";
import { ContactCTA } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <StatsBento />
      <Skills />
      <ExperienceTimeline />
      <FeaturedProjects />
      <EducationSection />
      <AchievementsStrip />
      <ContactCTA />
    </>
  );
}
