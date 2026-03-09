'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, MoveRight, ChevronDown } from 'lucide-react'
import { servicesPageData, propertiesPageData } from '../Data/AppData'

function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [servicesExpanded, setServicesExpanded] = useState(false);
    const [propertiesExpanded, setPropertiesExpanded] = useState(false);

    useEffect(() => {
      if (!isOpen) {
        setServicesExpanded(false);
        setPropertiesExpanded(false);
      }
    }, [isOpen]);

    const desktopNavRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
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
      { id: 5, path: '/Contact', name: 'Contact' },
    ];

    const isLinkActive = (link: { path: string; name: string }) => {
      if (link.name === 'Services') return pathname === '/Services' || pathname?.startsWith('/Services/');
      if (link.name === 'Properties') return pathname === '/Properties' || pathname?.startsWith('/Properties/');
      return pathname === link.path;
    };

    const activeRingClasses = 'ring-2 ring-white/90 rounded-lg outline-none';

  return (



    <div className='main_navbar_container fixed top-0 left-0 right-0 z-50 w-full'>
      <header>
        <nav className="">

          {/* NavLogo - crossfades white/black for seamless transition, inline with menu when open */}
          <div className="main_navbar_nav relative flex justify-between items-center px-[5%] md:px-[8%] xl:px-[10%] py-5 md:py-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
              <Link
                href="/"
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
                          className={`flex items-center gap-1.5 py-1 px-2 -mx-2 rounded-lg text-white/90 hover:text-white cursor-pointer transition-all duration-200 ${isLinkActive(link) ? `font-bold ${activeRingClasses}` : 'font-medium'}`}
                        >
                          {link.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {servicesExpanded && (
                          <div className="absolute top-full left-0 mt-3 py-2 min-w-[240px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-neutral-100 z-50 dropdown-enter">
                            {servicesPageData.map((service) => (
                              <Link
                                key={service.id}
                                href={`/Services/${service.slug}`}
                                onClick={() => { setServicesExpanded(false); }}
                                className="block px-5 py-2.5 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 text-[15px] transition-colors duration-150"
                              >
                                {service.heroTitle}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : link.name === 'Properties' ? (
                      <>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPropertiesExpanded(!propertiesExpanded); setServicesExpanded(false); }}
                          className={`flex items-center gap-1.5 py-1 px-2 -mx-2 rounded-lg text-white/90 hover:text-white cursor-pointer transition-all duration-200 ${isLinkActive(link) ? `font-bold ${activeRingClasses}` : 'font-medium'}`}
                        >
                          {link.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${propertiesExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {propertiesExpanded && (
                          <div className="absolute top-full left-0 mt-3 py-2 min-w-[240px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-neutral-100 z-50 dropdown-enter">
                            {propertiesPageData.map((property) => (
                              <Link
                                key={property.id}
                                href={`/Properties/${property.slug}`}
                                onClick={() => { setPropertiesExpanded(false); }}
                                className="block px-5 py-2.5 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 text-[15px] transition-colors duration-150"
                              >
                                {property.heroTitle ?? property.title ?? 'Property'}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : link.name === 'Contact' ? (
                      <Link
                        href={link.path}
                        className={`bg-white text-neutral-800 rounded-full px-4 py-2 text-sm shadow-sm hover:shadow-md hover:bg-white/95 cursor-pointer transition-all duration-200 ${isLinkActive(link) ? 'font-bold ring-2 ring-white/90' : 'font-medium'}`}
                      >
                        Contact Us
                      </Link>
                    ) : (
                      <Link
                        href={link.path}
                        className={`py-1 px-2 -mx-2 rounded-lg text-white/90 hover:text-white cursor-pointer transition-all duration-200 ${isLinkActive(link) ? `font-bold ${activeRingClasses}` : 'font-medium'}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>



              {/* Mobile screen icon - when open: flex row top bar with logo + menu */}
              <div 
              onClick={() => setIsOpen(!isOpen)}
              className={`humburger_menu relative md:hidden lg:hidden xl:hidden font-mona font-semibold py-3 px-3 bg-white text-black cursor-pointer hover:opacity-80
              [transition:width_0.4s_cubic-bezier(0.22,1,0.36,1),height_0.4s_cubic-bezier(0.22,1,0.36,1)]
              ${isOpen ? 'rounded-none w-screen h-[93vh] flex flex-col' : 'rounded-full w-[120px] h-12 flex items-center'}`}>
                {isOpen ? (
                  <div className="flex flex-row justify-between items-center w-full px-6 pt-6 shrink-0">
                    <div className="nav_logo relative w-[72px] h-8 shrink-0">
                      <Image
                        src="/Main_Assets/Main_Logo_Black.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-contain object-left"
                      />
                    </div>
                    <div className="humburger_menu_content flex flex-row gap-2 items-center">
                      <Menu className="humburger_menu_icon" />
                      <p className="uppercase">menu</p>
                    </div>
                  </div>
                ) : (
                  <div className="humburger_menu_content flex flex-row gap-2 items-center">
                    <Menu className="humburger_menu_icon" />
                    <p className="uppercase">menu</p>
                  </div>
                )}
              </div>

          </div>

          {/* Mobile Screen Navigation Items */}
            <div className={`mobile_navItems absolute top-[15%] translate-x-[12%] w-[80%] md:hidden transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {navLinks.map((link, index) => (
                <div key={link.id}>
                  {link.name === 'Services' ? (
                    <div
                      className="mobile-nav-link-enter items flex items-center justify-between text-2xl py-[5%] px-[3%] border-b text-neutral-500 cursor-pointer"
                      style={{ animationDelay: isOpen ? `${120 + index * 80}ms` : '0ms' }}
                      onClick={() => setServicesExpanded(!servicesExpanded)}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${servicesExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  ) : link.name === 'Properties' ? (
                    <div
                      className="mobile-nav-link-enter items flex items-center justify-between text-2xl py-[5%] px-[3%] border-b text-neutral-500 cursor-pointer"
                      style={{ animationDelay: isOpen ? `${120 + index * 80}ms` : '0ms' }}
                      onClick={() => setPropertiesExpanded(!propertiesExpanded)}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${propertiesExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  ) : (
                    <div
                      className="mobile-nav-link-enter items flex items-center justify-between text-2xl py-[5%] px-[3%] border-b text-neutral-500"
                      style={{ animationDelay: isOpen ? `${120 + index * 80}ms` : '0ms' }}
                    >
                      <Link href={link.path} onClick={() => setIsOpen(false)}>{link.name}</Link>
                      <MoveRight/>
                    </div>
                  )}
                  {link.name === 'Services' && servicesExpanded && (
                    <div className="pl-[6%] pb-[3%] flex flex-col gap-1">
                      {servicesPageData.map((service, subIndex) => (
                        <Link
                          key={service.id}
                          href={`/Services/${service.slug}`}
                          onClick={() => { setIsOpen(false); setServicesExpanded(false); }}
                          className="mobile-nav-link-enter text-lg text-neutral-500 hover:text-blue-600 hover:bg-blue-50/50 py-1.5 px-2 -mx-2 rounded border-b border-neutral-200 last:border-b-0 transition-colors duration-150"
                          style={{ animationDelay: isOpen ? `${120 + (index + 1) * 80 + subIndex * 60}ms` : '0ms' }}
                        >
                          {service.heroTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                  {link.name === 'Properties' && propertiesExpanded && (
                    <div className="pl-[6%] pb-[3%] flex flex-col gap-1">
                      {propertiesPageData.map((property, subIndex) => (
                        <Link
                          key={property.id}
                          href={`/Properties/${property.slug}`}
                          onClick={() => { setIsOpen(false); setPropertiesExpanded(false); }}
                          className="mobile-nav-link-enter text-lg text-neutral-500 hover:text-blue-600 hover:bg-blue-50/50 py-1.5 px-2 -mx-2 rounded border-b border-neutral-200 last:border-b-0 transition-colors duration-150"
                          style={{ animationDelay: isOpen ? `${120 + (index + 1) * 80 + subIndex * 60}ms` : '0ms' }}
                        >
                          {property.heroTitle ?? property.title ?? 'Property'}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
