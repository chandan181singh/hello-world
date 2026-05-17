import type { Metadata } from "next";
import { Section } from "@/components/home/section";
import { GuestbookGiscus } from "@/components/widgets/guestbook-giscus";
import { Reveal } from "@/components/effects/reveal";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign Chandan's guestbook — say hi.",
};

export default function GuestbookPage() {
  return (
    <Section
      eyebrow="Guestbook"
      title="Sign the guestbook."
      description="Say hi, leave feedback on the site, drop a link to your stuff. Sign in with GitHub — your message lives in GitHub Discussions."
    >
      <Reveal>
        <div className="glow-card relative rounded-2xl p-6 md:p-8">
          <GuestbookGiscus mapping="specific" term="guestbook" />
        </div>
      </Reveal>
    </Section>
  );
}
