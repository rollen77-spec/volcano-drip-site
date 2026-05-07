import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Shared full-bleed header: small amber kicker + heavy white title (matches About page). */
const SIZE_CLASSES = {
  default: 'min-h-[360px] h-[min(70vh,820px)]',
  tall: 'min-h-[400px] h-[90vh]',
  about: 'min-h-[360px] h-[70vh]',
  compact: 'min-h-[240px] py-14 md:min-h-[260px]',
  /** No height utilities — use `sectionClassName` only. */
  custom: '',
};

export function PageHero({
  /** Rendered above the kicker (e.g. podcast logo). */
  leading,
  kicker,
  title,
  children,
  /** Background image URL (ignored if `background` is set). */
  imageSrc,
  imageAlt = '',
  imageClassName = 'h-full w-full object-cover object-center',
  /** Custom background layer (e.g. motion image). Renders inside the photo slot. */
  background,
  overlayClassName = 'pointer-events-none absolute inset-0 z-10 bg-black/60',
  /** Wrapper around image or custom `background`. */
  imageWrapperClassName = 'absolute inset-0 z-0',
  /** Extra classes on the image wrapper (e.g. opacity). */
  imageWrapperExtraClassName,
  size = 'default',
  sectionClassName,
  contentClassName,
  contentMaxWidthClassName = 'max-w-4xl',
  titleClassName,
  kickerClassName,
  disableAnimation = false,
  fetchPriority,
  decoding = 'async',
  /** Anchored to the hero section (e.g. scroll cue on home). */
  footerSlot,
}) {
  const Wrapper = disableAnimation ? 'div' : motion.div;
  const wrapperProps = disableAnimation
    ? { className: 'w-full' }
    : {
        className: 'w-full',
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-stone-900 text-white',
        SIZE_CLASSES[size] || SIZE_CLASSES.default,
        sectionClassName
      )}
    >
      {background ? (
        <div className={cn(imageWrapperClassName, imageWrapperExtraClassName)}>{background}</div>
      ) : imageSrc ? (
        <div className={cn(imageWrapperClassName, imageWrapperExtraClassName ?? 'opacity-[0.55]')}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={imageClassName}
            width={1920}
            height={1080}
            fetchPriority={fetchPriority}
            decoding={decoding}
          />
        </div>
      ) : null}
      <div className={overlayClassName} aria-hidden />

      <div
        className={cn(
          'relative z-20 mx-auto w-full px-4 text-center',
          contentMaxWidthClassName,
          contentClassName
        )}
      >
        <Wrapper {...wrapperProps}>
          {leading ? <div className="mb-6 flex justify-center">{leading}</div> : null}
          {kicker ? (
            <span
              className={cn(
                'mb-4 block text-xs font-bold uppercase tracking-widest text-amber-500',
                kickerClassName
              )}
            >
              {kicker}
            </span>
          ) : null}
          {title ? (
            <h1
              className={cn(
                'font-black tracking-tighter text-white',
                'text-5xl leading-[0.9] md:text-8xl',
                children ? 'mb-6 md:mb-8' : 'mb-0',
                titleClassName
              )}
            >
              {title}
            </h1>
          ) : null}
          {children}
        </Wrapper>
      </div>
      {footerSlot}
    </section>
  );
}

export default PageHero;
