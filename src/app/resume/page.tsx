"use client";

import { Download, ExternalLink } from "lucide-react";
import { Section } from "@/components/home/section";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/effects/magnetic";
import { Reveal } from "@/components/effects/reveal";
import { fireConfetti } from "@/components/effects/confetti";
import { site } from "@/data/site";
import { withBase } from "@/lib/utils";

export default function ResumePage() {
  const url = withBase(site.resumeUrl);

  return (
    <Section
      eyebrow="Resume"
      title="My one-pager."
      description="Click download — and yes, confetti."
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <Magnetic strength={0.25}>
            <Button asChild size="lg" onClick={() => fireConfetti()}>
              <a href={url} download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Button asChild variant="outline" size="lg">
              <a href={url} target="_blank" rel="noopener noreferrer">
                Open in new tab
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="glow-card mt-10 overflow-hidden rounded-2xl">
          <object
            data={url}
            type="application/pdf"
            className="h-[80vh] w-full"
          >
            <div className="p-8 text-center text-sm text-[var(--muted-foreground)]">
              Your browser cannot preview PDFs. Use the download button above.
            </div>
          </object>
        </div>
      </Reveal>
    </Section>
  );
}
