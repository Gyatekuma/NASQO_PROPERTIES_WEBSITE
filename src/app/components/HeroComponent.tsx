'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from './OptimizedImage'
import Button from './button'

const HOME_HERO_IMAGES = [
  '/PropertiesAssets/ImgSC1.webp',
  '/PropertiesAssets/ImgN5.webp',
  '/PropertiesAssets/Img22.webp',
  '/PropertiesAssets/ImgN7.webp',
  '/PropertiesAssets/ImgAY6.webp',
  '/PropertiesAssets/ImgAY8.webp',
]

const HERO_AUTO_SLIDE_INTERVAL_MS = 5500

const BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAQEA'

function HeroComponent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (HOME_HERO_IMAGES.length <= 1) return
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HOME_HERO_IMAGES.length)
    }, HERO_AUTO_SLIDE_INTERVAL_MS)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % HOME_HERO_IMAGES.length)
      }, HERO_AUTO_SLIDE_INTERVAL_MS)
    }
  }

  return (
    <div className="Main_Hero_Container relative w-screen h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden">
      {/* Stacked hero images with crossfade + subtle zoom - Next/Image for optimization */}
      {HOME_HERO_IMAGES.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            opacity: activeIndex === index ? 1 : 0,
            transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
            zIndex: activeIndex === index ? 1 : 0,
            transition:
              'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          aria-hidden={activeIndex !== index}
        >
          <Image
            src={src}
            alt={`Hero slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover object-center"
          />
        </div>
      ))}

      <div className="overlay_section inset-0 absolute bg-black/50 z-2" aria-hidden />

      <div className="relative z-10 flex flex-col h-full text-white justify-center items-center text-center px-[5%] md:px-[8%] xl:px-0 xl:items-start xl:text-left">
        <div className="hero-texts xl:ml-[5%] 2xl:ml-[10%] mt-0 xl:mt-[6%] 2xl:mt-[5%] font-bricolage">
          <p className="font-medium text-lg md:text-xl">Kasoa, Nyanyano Road</p>
          <div className="main_hero_caption text-6xl md:text-8xl xl:text-8xl tracking-tighter font-semibold mt-[10%] xl:mt-[3%]">
            <p className="">Futuristic</p>
            <p>Haven</p>
          </div>
        </div>
        <div className="hero-buttons mt-[10%] xl:mt-[1%] xl:w-[30%] 2xl:w-[30%] 2xl:mt-[1%] flex md:flex-row flex-col gap-4 text-center justify-center xl:justify-start xl:ml-[5%] 2xl:ml-[10%]">
          <Button text="Get in touch" variants="secondary" href="/Contact" />
          <Button text="View details" variants="outline" href="/About" />
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center gap-2 max-md:bottom-[max(5rem,calc(env(safe-area-inset-bottom,0px)+1.25rem))] md:bottom-8"
        role="tablist"
        aria-label="Hero image slides"
      >
        {HOME_HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={`View image ${index + 1} of ${HOME_HERO_IMAGES.length}`}
            className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
              activeIndex === index
                ? 'w-3 h-3 bg-white'
                : 'w-2.5 h-2.5 bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroComponent
