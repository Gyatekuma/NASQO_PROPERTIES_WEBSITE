'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from './OptimizedImage'
import { usePathname } from 'next/navigation'
import { Menu, X, MoveRight, ChevronDown } from 'lucide-react'
import { servicesPageData, propertiesPageData } from '../Data/AppData'
import { useLenis } from './providers/LenisProvider'

function Navbar() {
    const pathname = usePathname();
    const lenis = useLenis();
    const [isOpen, setIsOpen] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);
    const [propertiesExpanded, setPropertiesExpanded] = useState(false);
    /** Bumps when menu opens so stagger animations replay */
    const [mobileMenuAnimCycle, setMobileMenuAnimCycle] = useState(0);
    const prevIsOpenRef = useRef(false);

    useEffect(() => {
      if (!isOpen) {
        setServicesExpanded(false);
        setPropertiesExpanded(false);
      }
      if (isOpen && !prevIsOpenRef.current) {
        setMobileMenuAnimCycle((c) => c + 1);
      }
      prevIsOpenRef.current = isOpen;
    }, [isOpen]);

    /** Lock page scroll when mobile menu is open (Lenis + native overflow). */
    useEffect(() => {
      if (typeof window === 'undefined') return;

      const html = document.documentElement;
      const body = document.body;

      const applyLock = () => {
        if (!isOpen || window.innerWidth >= 768) return;
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.style.overscrollBehavior = 'none';
        lenis?.stop();
      };

      const releaseLock = () => {
        html.style.overflow = '';
        body.style.overflow = '';
        body.style.overscrollBehavior = '';
        lenis?.start();
      };

      const sync = () => {
        if (isOpen && window.innerWidth < 768) {
          applyLock();
        } else {
          releaseLock();
        }
      };

      sync();
      window.addEventListener('resize', sync);

      return () => {
        window.removeEventListener('resize', sync);
        releaseLock();
      };
    }, [isOpen, lenis]);

    const desktopNavRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        // Only apply click-outside behavior on desktop / tablet widths
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;
        if (desktopNavRef.current?.contains(e.target as Node)) return;
        setServicesExpanded(false);
        setPropertiesExpanded(false);
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const navLinks = [
      { id: 1, path: '/', name: 'Home' },
      { id: 2, path: '/About', name: 'About' },
      { id: 3, path: '/Services', name: 'Services' },
      { id: 4, path: '/Properties', name: 'Properties' },
      { id: 5, path: '/Contact', name: 'Contact Us' },
    ];

    const isLinkActive = (link: { path: string; name: string }) => {
      if (link.name === 'Services') return pathname === '/Services' || pathname?.startsWith('/Services/');
      if (link.name === 'Properties') return pathname === '/Properties' || pathname?.startsWith('/Properties/');
      return pathname === link.path;
    };

    /** Main nav items — blue text + light blue fill when route is active */
    const navActiveDesktop = 'bg-blue-50 text-blue-700 font-semibold shadow-sm';
    const navInactiveDesktop = 'font-medium';
    const navActiveMobileRow =
      'bg-blue-50 text-blue-700 font-semibold tracking-[-0.03em] rounded-lg px-3.5';
    const navInactiveMobileRow = 'text-neutral-500 font-normal tracking-[-0.03em] px-3.5';

  return (
    <>
      {/* Full-screen blur behind mobile menu (navbar stays z-50 on top) */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 h-dvh w-full md:hidden bg-neutral-950/45 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="main_navbar_container fixed top-0 left-0 right-0 z-50 w-full">
      <header>
        <nav className="">

          {/* NavLogo - crossfades white/black for seamless transition, inline with menu when open */}
          <div className="main_navbar_nav relative flex justify-between items-center px-[5%] md:px-[8%] xl:px-[10%] py-5 md:py-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
              <Link
                href="/"
                aria-label="NASQO Properties — Home"
                className={`nav_logo flex items-center gap-2.5 shrink-0 cursor-pointer
                  ${isOpen ? 'hidden md:flex md:static' : ''}`}
              >
                <span className="relative block w-[54px] h-[54px] xl:w-[62px] xl:h-[62px] shrink-0 filter-[drop-shadow(0_1px_3px_rgba(0,0,0,0.12))]">
                  <Image
                    src="/Main_Assets/Main_Logo.svg"
                    alt="NASQO Properties"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </span>
                <span className="font-bricolage font-semibold text-white uppercase tracking-wide text-sm xl:text-base whitespace-nowrap [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                  NASQO PROPERTIES
                </span>
              </Link>


              {/* Desktop Navigation List */}

              <div ref={desktopNavRef} className="hidden md:flex lg:flex xl:flex large_screen_nav_list items-center gap-8 xl:gap-10">
                {navLinks.map((link) => (
                  <div key={link.id} className="navLink_container font-mona text-white text-sm xl:text-base tracking-wide relative">
                    {link.name === 'Services' ? (
                      <>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setServicesExpanded(!servicesExpanded); setPropertiesExpanded(false); }}
                          className={`flex items-center gap-1.5 py-1.5 px-3 -mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isLinkActive(link) ? navActiveDesktop : 'text-white/90 hover:text-white ' + navInactiveDesktop}`}
                        >
                          {link.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {servicesExpanded && (
                          <div className="absolute top-full left-0 mt-3 py-2 min-w-[240px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-neutral-100 z-50 dropdown-enter">
                            {servicesPageData.map((service) => {
                              const subActive = pathname === `/Services/${service.slug}` || pathname?.startsWith(`/Services/${service.slug}/`);
                              return (
                              <Link
                                key={service.id}
                                href={`/Services/${service.slug}`}
                                onClick={() => { setServicesExpanded(false); }}
                                className={`block px-5 py-2.5 text-[15px] transition-colors duration-150 rounded-lg mx-1 ${subActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-neutral-600 hover:text-blue-600 hover:bg-blue-50'}`}
                              >
                                {service.heroTitle}
                              </Link>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : link.name === 'Properties' ? (
                      <>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPropertiesExpanded(!propertiesExpanded); setServicesExpanded(false); }}
                          className={`flex items-center gap-1.5 py-1.5 px-3 -mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isLinkActive(link) ? navActiveDesktop : 'text-white/90 hover:text-white ' + navInactiveDesktop}`}
                        >
                          {link.name}
                          <span className="nav-icon-wiggle inline-flex shrink-0">
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${propertiesExpanded ? 'rotate-180' : ''}`} />
                          </span>
                        </button>
                        {propertiesExpanded && (
                          <div className="absolute top-full left-0 mt-3 py-2 min-w-[240px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-neutral-100 z-50 dropdown-enter">
                            {propertiesPageData.map((property) => {
                              const subActive = pathname === `/Properties/${property.slug}` || pathname?.startsWith(`/Properties/${property.slug}/`);
                              return (
                              <Link
                                key={property.id}
                                href={`/Properties/${property.slug}`}
                                onClick={() => { setPropertiesExpanded(false); }}
                                className={`block px-5 py-2.5 text-[15px] transition-colors duration-150 rounded-lg mx-1 ${subActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-neutral-600 hover:text-blue-600 hover:bg-blue-50'}`}
                              >
                                {property.heroTitle ?? property.title ?? 'Property'}
                              </Link>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : link.name === 'Contact Us' ? (
                      <Link
                        href={link.path}
                        className={`rounded-full px-4 py-2 text-sm shadow-sm cursor-pointer transition-all duration-200 ${isLinkActive(link) ? 'bg-blue-50 text-blue-700 font-semibold ring-2 ring-blue-200/80' : 'bg-white text-neutral-800 font-medium hover:shadow-md hover:bg-white/95'}`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        href={link.path}
                        className={`py-1.5 px-3 -mx-2 rounded-lg cursor-pointer transition-all duration-200 ${isLinkActive(link) ? navActiveDesktop : 'text-white/90 hover:text-white ' + navInactiveDesktop}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>



              {/* Mobile menu panel — outer shell must not toggle isOpen on every tap (breaks Services/Properties expand). */}
              <div
              className={`humburger_menu relative md:hidden lg:hidden xl:hidden font-mona font-semibold py-3 px-3 bg-white text-black cursor-pointer hover:opacity-80
              [transition:width_0.4s_cubic-bezier(0.22,1,0.36,1),height_0.4s_cubic-bezier(0.22,1,0.36,1)]
              ${isOpen ? 'rounded-b-2xl w-screen h-[95vh] max-h-[95dvh] flex flex-col overflow-hidden' : 'rounded-full w-[120px] h-12 flex items-center'}`}>
                {isOpen ? (
                  <>
                  <div className="w-full shrink-0 border-b border-neutral-100 pt-7 pb-5">
                    <div className="mx-auto flex w-[90%] max-w-full flex-row items-center justify-between px-2">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="nav_logo relative block h-[22px] w-[52px] shrink-0 opacity-95"
                        aria-label="NASQO Properties — Home"
                      >
                        <Image
                          src="/Main_Assets/Main_Logo_black.svg"
                          alt="NASQO Properties"
                          width={100}
                          height={100}
                          className="h-full w-full object-contain object-left"
                        />
                      </Link>
                      <button
                        type="button"
                        aria-label="Close menu"
                        aria-expanded={true}
                        onClick={() => setIsOpen(false)}
                        className="humburger_menu_content flex flex-row items-center gap-2.5 text-neutral-700 cursor-pointer rounded-lg py-1 -mr-1 pr-1 hover:opacity-80"
                      >
                        <X className="humburger_menu_icon h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em]">close</p>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`mobile_navItems flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pb-[max(1.25rem,env(safe-area-inset-bottom))] transition-opacity duration-300 ease-out [scrollbar-width:thin] [-webkit-overflow-scrolling:touch] [scrollbar-color:rgba(115,115,115,0.25)_transparent] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div key={mobileMenuAnimCycle} className="mx-auto flex w-[90%] max-w-full flex-col px-2">
                    {navLinks.map((link, index) => {
                      const staggerMs = 90;
                      const baseDelay = 60;
                      const rowDelay = isOpen ? baseDelay + index * staggerMs : 0;
                      const rowActive = isLinkActive(link);
                      const rowText = rowActive ? navActiveMobileRow : navInactiveMobileRow;
                      const rowPad = 'py-[1.1rem]';
                      const divider = 'border-b border-neutral-100';
                      return (
                      <div key={link.id}>
                        {link.name === 'Services' ? (
                          <div
                            className={`mobile-nav-link-enter items flex items-center justify-between text-xl leading-snug ${rowPad} ${divider} cursor-pointer ${rowText}`}
                            style={{ animationDelay: `${rowDelay}ms` }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setServicesExpanded((v) => !v);
                              setPropertiesExpanded(false);
                            }}
                          >
                            <span>{link.name}</span>
                            <span className="nav-icon-wiggle inline-flex shrink-0">
                              <ChevronDown className={`size-4.5 transition-transform duration-300 ease-out ${rowActive ? 'text-blue-600' : 'text-neutral-600'} ${servicesExpanded ? 'rotate-180' : ''}`} strokeWidth={rowActive ? 3 : 2.5} />
                            </span>
                          </div>
                        ) : link.name === 'Properties' ? (
                          <div
                            className={`mobile-nav-link-enter items flex items-center justify-between text-xl leading-snug ${rowPad} ${divider} cursor-pointer ${rowText}`}
                            style={{ animationDelay: `${rowDelay}ms` }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPropertiesExpanded((v) => !v);
                              setServicesExpanded(false);
                            }}
                          >
                            <span>{link.name}</span>
                            <span className="nav-icon-wiggle inline-flex shrink-0">
                              <ChevronDown className={`size-4.5 transition-transform duration-300 ease-out ${rowActive ? 'text-blue-600' : 'text-neutral-600'} ${propertiesExpanded ? 'rotate-180' : ''}`} strokeWidth={rowActive ? 3 : 2.5} />
                            </span>
                          </div>
                        ) : (
                          <Link
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`mobile-nav-link-enter items flex w-full min-w-0 items-center justify-between gap-3 text-left text-xl leading-snug ${rowPad} ${rowText} ${link.name === 'Contact Us' ? 'border-b-0' : divider} outline-none focus-visible:ring-2 focus-visible:ring-blue-300/80 focus-visible:ring-inset focus-visible:rounded-lg`}
                            style={{ animationDelay: `${rowDelay}ms` }}
                          >
                            <span className="min-w-0">{link.name}</span>
                            <span className="nav-icon-wiggle inline-flex shrink-0 text-current" aria-hidden>
                              <MoveRight className={`size-4.5 ${rowActive ? 'text-blue-600' : 'text-neutral-600'}`} strokeWidth={rowActive ? 2.5 : 2} />
                            </span>
                          </Link>
                        )}
                        {link.name === 'Services' && servicesExpanded && (
                          <div className="pl-[6%] pt-1 pb-4 flex flex-col gap-1 border-b border-neutral-100">
                            {servicesPageData.map((service, subIndex) => {
                              const subActive = pathname === `/Services/${service.slug}` || pathname?.startsWith(`/Services/${service.slug}/`);
                              return (
                              <Link
                                key={service.id}
                                href={`/Services/${service.slug}`}
                                onClick={() => { setIsOpen(false); setServicesExpanded(false); }}
                                className={`mobile-nav-link-enter text-[0.9375rem] leading-relaxed py-2.5 px-3 -mx-1 rounded-xl transition-colors duration-200 ${subActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-neutral-500 hover:text-blue-700 hover:bg-blue-50/60'}`}
                                style={{ animationDelay: `${baseDelay + index * staggerMs + 40 + subIndex * 55}ms` }}
                              >
                                {service.heroTitle}
                              </Link>
                              );
                            })}
                          </div>
                        )}
                        {link.name === 'Properties' && propertiesExpanded && (
                          <div className="pl-[6%] pt-1 pb-4 flex flex-col gap-1 border-b border-neutral-100">
                            {propertiesPageData.map((property, subIndex) => {
                              const subActive = pathname === `/Properties/${property.slug}` || pathname?.startsWith(`/Properties/${property.slug}/`);
                              return (
                              <Link
                                key={property.id}
                                href={`/Properties/${property.slug}`}
                                onClick={() => { setIsOpen(false); setPropertiesExpanded(false); }}
                                className={`mobile-nav-link-enter text-[0.9375rem] leading-relaxed py-2.5 px-3 -mx-1 rounded-xl transition-colors duration-200 ${subActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-neutral-500 hover:text-blue-700 hover:bg-blue-50/60'}`}
                                style={{ animationDelay: `${baseDelay + index * staggerMs + 40 + subIndex * 55}ms` }}
                              >
                                {property.heroTitle ?? property.title ?? 'Property'}
                              </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      );
                    })}
                    </div>
                  </div>
                  </>
                ) : (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label="Open menu"
                    onClick={() => setIsOpen(true)}
                    className="humburger_menu_content flex w-full h-full flex-row gap-2 items-center justify-center"
                  >
                    <Menu className="humburger_menu_icon h-[17px] w-[17px] text-neutral-700" strokeWidth={1.75} />
                    <p className="uppercase tracking-[0.2em] text-[11px] font-medium text-neutral-700">menu</p>
                  </button>
                )}
              </div>

          </div>
        </nav>
      </header>
    </div>
    </>
  )
}

export default Navbar
