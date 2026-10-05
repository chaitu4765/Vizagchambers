"use client";
import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  BookOpen,
  Mail,
  CalendarDays,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { content, asset, localLink } from "@/lib/site-data";
type Leader = (typeof content.leadership)[number];
export function Leadership({ full = false }: { full?: boolean }) {
  const [person, setPerson] = useState<Leader | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">03 / THE PEOPLE BEHIND THE PROGRESS</p>
          <h2>
            Experience. Vision.
            <br />
            <em>Shared ambition.</em>
          </h2>
        </div>
        <div className="heading-controls">
          <p>Meet our executive committee.</p>
          {!full && (
            <div className="round-controls">
              <button
                aria-label="Previous committee members"
                onClick={() =>
                  rail.current?.scrollBy({ left: -680, behavior: "smooth" })
                }
              >
                <ChevronLeft />
              </button>
              <button
                aria-label="Next committee members"
                onClick={() =>
                  rail.current?.scrollBy({ left: 680, behavior: "smooth" })
                }
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
      <div ref={rail} className={full ? "leadership-grid" : "leadership-rail"}>
        {content.leadership.map((p, i) => (
          <button
            key={p.name}
            className="leader-card"
            onClick={() => setPerson(p)}
            data-reactive
          >
            <div className="leader-image">
              <img src={asset(p.image)} alt={p.name} loading="lazy" />
              <span className="profile-label">VIEW PROFILE</span>
              <span className="leader-index">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p>{p.spotlight}</p>
            <h3>{p.name}</h3>
          </button>
        ))}
      </div>
      {!full && (
        <div className="section-foot">
          <span>Leadership with a shared purpose.</span>
          <a className="underlined-link" href="/executive_committee">
            Meet the full committee
          </a>
        </div>
      )}
      <Dialog
        open={!!person}
        onOpenChange={(o) => {
          if (!o) setPerson(null);
        }}
      >
        <DialogContent className="profile-dialog">
          {person && (
            <>
              <img src={asset(person.image)} alt={person.name} />
              <div>
                <p className="eyebrow">{person.spotlight}</p>
                <DialogTitle>{person.name}</DialogTitle>
                <DialogDescription className="profile-bio">
                  {person.bio}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
export function HomeSections() {
  const [promo, setPromo] = useState(1);
  const [allNews, setAllNews] = useState(false);
  const pubs = useRef<HTMLDivElement>(null);
  const news = allNews ? content.news : content.news.slice(0, 5);
  return (
    <>
      <section className="section highlights-section" id="highlights">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">02 / IN THE SPOTLIGHT</p>
            <h2>
              A community
              <br />
              <em>in motion.</em>
            </h2>
          </div>
          <div className="heading-controls">
            <p>People, partnerships and possibilities.</p>
            <div className="round-controls">
              <button
                aria-label="Previous community highlights"
                onClick={() => setPromo(1 - promo)}
              >
                <ChevronLeft />
              </button>
              <button
                aria-label="Next community highlights"
                onClick={() => setPromo(1 - promo)}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="promo-grid">
          {content.promos.map((list, i) => {
            const p = list[promo];
            return (
              <a
                key={`${i}-${promo}`}
                href={
                  i === 0
                    ? localLink(p.href)
                    : promo === 0
                      ? "/alumni_forum"
                      : "/member_of_week/advertise"
                }
                className="promo-card"
                data-reactive
              >
                <div className="promo-image">
                  <img
                    src={asset(p.image)}
                    alt={
                      i === 0
                        ? promo === 0
                          ? "The Vizagapatam Chamber of Commerce & Industry"
                          : "Advertise with us"
                        : promo === 0
                          ? "British Isles Alumni Forum inauguration"
                          : "Boost your business"
                    }
                    loading="lazy"
                  />
                </div>
                <div className="promo-caption">
                  <span>
                    {i === 0 ? "MEMBER SPOTLIGHT" : "CHAMBER CONNECT"}
                  </span>
                  <h3>
                    {i === 0
                      ? promo === 0
                        ? "A voice for Vizag’s enterprise."
                        : "Put your business in the spotlight."
                      : promo === 0
                        ? "Connections that cross continents."
                        : "Build your next business connection."}
                  </h3>
                  <span className="text-link">Discover more</span>
                </div>
              </a>
            );
          })}
        </div>
        <div className="carousel-dots" aria-label="Community highlight slides">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setPromo(i)}
              aria-label={`Show highlights ${i + 1}`}
              aria-pressed={promo === i}
              className={promo === i ? "active" : ""}
            />
          ))}
        </div>
      </section>
      <section className="section leadership-section" id="leadership">
        <Leadership />
      </section>
      <section className="section insights-section" id="insights">
        <div className="insights-intro" data-reveal>
          <p className="eyebrow">04 / BUSINESS NEWS</p>
          <h2>
            Stay informed.
            <br />
            <em>Think ahead.</em>
          </h2>
          <p>
            Perspectives on trade, industry and
            <br />
            the economy from the Chamber’s news archive.
          </p>
          <span className="archive-note">
            <FileText size={16} /> BUSINESS NEWS ARCHIVE
          </span>
        </div>
        <div className="news-list">
          {news.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className="news-row"
              target="_blank"
              rel="noreferrer"
            >
              <span className="news-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="news-source">
                  {new URL(n.href).hostname.replace("www.", "")}
                </span>
                <h3>{n.title}</h3>
              </div>
              <span className="news-mark">↗</span>
            </a>
          ))}
          <button
            className="underlined-link news-toggle"
            onClick={() => setAllNews(!allNews)}
            aria-expanded={allNews}
          >
            {allNews
              ? "Show fewer articles"
              : `View all ${content.news.length} articles`}
          </button>
        </div>
      </section>
      <section className="section publications-section" id="publications">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">05 / PUBLICATIONS</p>
            <h2>
              Our stories.
              <br />
              <em>Our shared journey.</em>
            </h2>
          </div>
          <div className="heading-controls">
            <p>From the pages of the Chamber.</p>
            <div className="round-controls">
              <button
                aria-label="Previous publications"
                onClick={() =>
                  pubs.current?.scrollBy({ left: -640, behavior: "smooth" })
                }
              >
                <ChevronLeft />
              </button>
              <button
                aria-label="Next publications"
                onClick={() =>
                  pubs.current?.scrollBy({ left: 640, behavior: "smooth" })
                }
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="publication-rail" ref={pubs}>
          {content.publications.map((p) => (
            <a
              className="publication-card"
              href={localLink(p.href)}
              key={p.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="publication-cover">
                <img src={asset(p.image)} alt={p.title} loading="lazy" />
                <span>
                  <BookOpen size={18} /> READ PUBLICATION
                </span>
              </div>
              <p>{p.date}</p>
              <h3>{p.title}</h3>
            </a>
          ))}
        </div>
        <div className="section-foot">
          <span>10 editions. A record of progress.</span>
          <span>Scroll to explore the complete collection</span>
        </div>
      </section>
      <section className="membership-section" id="membership">
        <div className="membership-photo">
          <img
            src={asset(content.membership.image)}
            alt="The Vizag Chamber membership community"
            loading="lazy"
          />
        </div>
        <div className="membership-copy" data-reveal>
          <p className="eyebrow">06 / MEMBERSHIP</p>
          <h2>
            Your next chapter.
            <br />
            <em>Starts with us.</em>
          </h2>
          <p>{content.membership.body}</p>
          <div className="hero-actions">
            <a className="button button-gold" href="/join">
              Join the Chamber
            </a>
            <a className="text-link" href="/join/benefits">
              Explore the benefits
            </a>
          </div>
          <div className="member-meta">
            <span>
              <UsersIcon /> A network for growth
            </span>
            <a href="/join/renewal">Already a member? Renew</a>
          </div>
        </div>
      </section>
      <div className="meeting-photo" aria-label="Business meeting" data-reveal>
        <img
          src="/assets/member-bg.jpg"
          alt="Business leaders meeting around a conference table"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">BETTER TOGETHER</p>
          <h2>
            Where ideas
            <br />
            become <em>opportunities.</em>
          </h2>
          <a className="button button-outline" href="/conference_hall_booking">
            Explore our meeting spaces
          </a>
        </div>
      </div>
      <section className="section careers-section" id="careers">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">07 / CAREERS</p>
            <h2>
              Find your
              <br />
              <em>next opportunity.</em>
            </h2>
          </div>
          <a className="underlined-link" href="/find_job">
            Find a job / Find a post
          </a>
        </div>
        <div className="careers-grid">
          {content.careers.map((c, i) => (
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              key={c.href}
              aria-label={`Explore careers on ${["LinkedIn", "Indeed", "CareerBuilder", "Shine", "Jobrapido", "Quikr"][i]}`}
            >
              <img
                src={asset(c.image)}
                alt={
                  [
                    "LinkedIn",
                    "Indeed",
                    "CareerBuilder",
                    "Shine",
                    "Jobrapido",
                    "Quikr",
                  ][i]
                }
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
function UsersIcon() {
  return <CalendarDays size={16} />;
}
