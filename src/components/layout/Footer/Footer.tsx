import Container from "@/components/common/Container";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import FooterSocial from "./FooterSocial";

import {
  exploreLinks,
  supportLinks,
} from "@/constants/footer";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <Container>
        <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">

          <div className="space-y-8">
            <FooterBrand />
            <FooterSocial />
          </div>

          <FooterLinks
            title="Explore"
            links={exploreLinks}
          />

          <FooterLinks
            title="Support"
            links={supportLinks}
          />

          <FooterNewsletter />
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-[var(--body)]">
          © 2026 Soul Studio. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}