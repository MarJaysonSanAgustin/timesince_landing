import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Smartphone, Star } from 'lucide-react';
import counterScreen from '@/assets/features/hand-app.png';
import { StoryPlayer } from '@/components/home/story-player';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { LogoIcon } from '@/components/logo';
import { appStoreUrl, type CtaPlacement } from '@/lib/cta';
import { faqs } from '@/lib/faq';
import { getFeature } from '@/lib/features';
import { localizedPath } from '@/lib/i18n';
import { landing } from '@/lib/strings/home';
import s from '@/components/home/landing.module.css';

function Download({ placement }: { placement: CtaPlacement }) {
  return (
    <a className={s.download} href={appStoreUrl(placement)}>
      <Smartphone size={19} aria-hidden="true" />
      {landing.download}
    </a>
  );
}

function Stars() {
  return (
    <span className={s.stars} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
      ))}
    </span>
  );
}

function Laurel() {
  return (
    <svg className={s.laurel} viewBox="0 0 36 68" aria-hidden="true" fill="currentColor">
      <path d="M30 65C6 54 2 24 21 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 11Q18 3 29 1Q27 9 17 11ZM12 19Q5 14 9 5Q15 11 12 19ZM13 18Q18 9 28 11Q23 18 13 18ZM8 31Q1 24 4 16Q11 21 8 31ZM9 29Q13 18 22 19Q19 27 9 29ZM9 43Q0 38 1 28Q9 33 9 43ZM9 41Q10 30 18 27Q19 37 9 41ZM15 54Q4 53 1 42Q12 45 15 54ZM14 53Q11 43 18 37Q22 47 14 53ZM24 62Q12 64 7 55Q18 55 24 62ZM24 61Q17 54 21 46Q29 52 24 61Z" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className={s.landing}>
      <StoryPlayer>
        <h1>{landing.headline}</h1>
        <p>{landing.intro}</p>
        <div className={s.actions}>
          <Download placement="web_home_hero" />
          <a href="#how-it-works" className={s.textLink}>
            {landing.howLink}
            <ArrowDown size={16} />
          </a>
        </div>
      </StoryPlayer>

      <section className={`${s.wrap} ${s.proof}`} aria-labelledby="reviews-title">
        <div className={s.rating}>
          <h2 id="reviews-title">{landing.proofHeading[0]}<br />{landing.proofHeading[1]}</h2>
          <a href={landing.ratingUrl}>
            <span className={s.score}><Laurel /><strong>{landing.rating}</strong><Laurel /></span>
            <Stars />
            <small>{landing.ratingContext}</small>
          </a>
        </div>
        <div className={s.testimonials}>
          <div className={s.reviewList}>
            {landing.reviews.map((review) => (
              <figure className={s.review} key={review.author}>
                <Stars />
                <blockquote>
                  <h3>{review.title}</h3>
                  <p>“{review.quote}”</p>
                </blockquote>
                <figcaption>
                  <strong>{review.author}</strong> ·{' '}
                  <a href={review.url}>
                    {review.store}
                    <ArrowUpRight size={13} />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className={s.reviewVisual}>
            <Image src={counterScreen} alt="TimeSince on iPhone showing several elapsed-time counters" width={244} sizes="(max-width: 680px) 165px, 244px" />
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`${s.wrap} ${s.section}`} aria-labelledby="how-title">
        <h2 id="how-title" className={s.heading}>{landing.how}</h2>
        <ul className={s.paths}>
          {landing.paths.map((path) => (
            <li key={path.title}>
              <Image src={path.image} alt="" width={64} height={64} />
              <div>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="features" className={`${s.wrap} ${s.section}`}>
        <h2 className={s.heading}>{landing.featuresTitle}</h2>
        <div className={s.features}>
          {landing.features.map((item) => {
            const feature = getFeature(item.slug)!;
            const Icon = feature.icon;
            return (
              <Link key={item.slug} href={localizedPath(`/features/${item.slug}`)} className={s.feature}>
                <div className={s.featureArt}>
                  <Image
                    src={item.image}
                    alt=""
                    width={340}
                    height={236}
                    sizes="(max-width: 700px) 230px, 340px"
                  />
                </div>
                <div className={s.featureCopy}>
                  <span className={s.featureTag}>
                    <Icon size={18} />
                    {feature.nav}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ArrowUpRight className={s.featureArrow} size={20} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <Link className={s.more} href={localizedPath('/features')}>
          {landing.allFeatures}
          <ArrowRight size={17} />
        </Link>
      </section>

      <figure className={`${s.wrap} ${s.community}`}>
        <Stars />
        <blockquote>“{landing.community.quote}”</blockquote>
        <figcaption>
          {landing.community.author} · <a href={landing.community.url}>PH App Store</a>
        </figcaption>
      </figure>

      <section id="faq" className={`${s.wrap} ${s.faq}`}>
        <div>
          <h2 className={s.heading}>{landing.faqTitle}</h2>
          <Link className={s.more} href={localizedPath('/faq')}>
            {landing.faqLink}
            <ArrowRight size={16} />
          </Link>
        </div>
        <FaqAccordion
          items={faqs.filter((f) => f.featured).map((f) => ({ q: f.question, a: f.answer }))}
          emitSchema
        />
      </section>

      <section id="download" className={s.closing}>
        <LogoIcon size={64} />
        <h2 className={s.heading}>{landing.downloadTitle}</h2>
        <p>{landing.downloadDetail}</p>
        <Download placement="web_home_footer" />
      </section>
    </div>
  );
}
