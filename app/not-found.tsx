import { SiteHeader, SiteFooter } from "@/components/site-shell";
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-body">
        <div className="empty-state">
          <p className="eyebrow">404 / PAGE NOT FOUND</p>
          <h1>This page isn’t here.</h1>
          <p>Explore the Chamber’s services, community and publications.</p>
          <a href="/" className="button button-gold">
            Return to the Chamber
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
