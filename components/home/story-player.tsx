'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import icon from '@/assets/icons/ios-light.png';
import { landing } from '@/lib/strings/home';
import s from './landing.module.css';

export function StoryPlayer({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [requestedPlay, setRequestedPlay] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const story = landing.stories[index];
  const total = landing.stories.length;

  function selectStory(nextIndex: number) {
    if (nextIndex === index) return;
    setPlaying(false);
    setIndex(nextIndex);
  }

  function advance(offset: number) {
    selectStory((index + offset + total) % total);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    function syncPlayback() {
      const shouldPlay = requestedPlay ?? !reducedMotion.matches;
      if (visible && !document.hidden && shouldPlay) {
        void video?.play().catch(() => {
          /* The play button also works when autoplay is blocked. */
        });
      } else {
        video?.pause();
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', syncPlayback);
    };
  }, [index, requestedPlay]);

  return (
    <section className={`${s.wrap} ${s.hero}`}>
      <div className={s.heroCopy}>{children}</div>
      <div id="home-story" className={s.story} role="region" aria-label={landing.storyLabel}>
        <video
          key={story.file}
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={`/stories/${story.file}.webp`}
          src={`/stories/${story.file}.mp4`}
          onPlaying={() => setPlaying(true)}
          onWaiting={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onError={() => setPlaying(false)}
          aria-hidden="true"
        />
        <div className={s.storyShade} />
        <div className={s.storyHead}>
          <div className={s.segments} data-playing={playing} role="group" aria-label="Choose a feature story">
            {landing.stories.map((item, i) => (
              <button
                key={item.file}
                type="button"
                aria-label={`Story ${i + 1} of ${total}. ${item.tier}. ${item.title}`}
                aria-pressed={i === index}
                onClick={() => selectStory(i)}
              >
                <span>
                  <i
                    className={i < index ? s.completedSegment : undefined}
                    onAnimationEnd={i === index ? () => advance(1) : undefined}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className={s.storyByline}>
            <Image src={icon} alt="" width={30} height={30} />
            <span>TimeSince <small>· {story.tier}</small></span>
            <button
              type="button"
              aria-label={playing ? landing.pause : landing.play}
              onClick={() => {
                if (playing) videoRef.current?.pause();
                else void videoRef.current?.play().catch(() => {});
                setRequestedPlay(!playing);
              }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
        <button type="button" className={s.storyPrev} aria-label={landing.previous} onClick={() => advance(-1)}>
          <ChevronLeft size={34} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button type="button" className={s.storyNext} aria-label={landing.next} onClick={() => advance(1)}>
          <ChevronRight size={34} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <Image className={s.storyLogo} src={icon} alt="" width={80} height={80} />
        <p className={s.storyTitle}>{story.title}</p>
      </div>
    </section>
  );
}
