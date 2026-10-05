"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetClose,
} from "@/components/ui/sheet";
import { services } from "@/lib/content";
import { guideLinks } from "@/lib/article-navigation";

const informationLinks = [
  { label: "Service areas", href: "/service-areas" },
  { label: "About us", href: "/about" },
  { label: "Privacy", href: "/privacy" },
];

export function Brand() {
  return (
    <a href="/" className="brand" aria-label="Arcade Game Australia home">
      <img className="brand-logo" src="/images/arcade-game-australia-logo.png" width={635} height={200} alt="Arcade Game Australia" />
    </a>
  );
}

export function Header() {
  const [openMenu, setOpenMenu] = useState("");
  const path = usePathname();
  const currentPage = (href: string) => path === href ? "page" as const : undefined;
  const isService = services.some(service => path === `/${service.slug}`);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <NavigationMenu className="desktop-nav site-navigation" aria-label="Main navigation" viewport={false} value={openMenu} onValueChange={setOpenMenu}>
          <NavigationMenuList className="desktop-nav-list">
            <NavigationMenuItem className="nav-item">
              <NavigationMenuLink asChild className="nav-link">
                <a href="/" aria-current={currentPage("/")}>Home</a>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="nav-item" value="services">
              <NavigationMenuTrigger className="nav-trigger" data-current={isService || undefined}
                onClick={event => { event.preventDefault(); setOpenMenu("services"); }}>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="service-dropdown">
                <ul className="service-menu-list">
                  {services.map(service => (
                    <li key={service.slug}>
                      <NavigationMenuLink asChild className="service-menu-link">
                        <a href={`/${service.slug}`} aria-current={currentPage(`/${service.slug}`)}>
                          {service.shortTitle}
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {informationLinks.map(({ label, href }) => (
              <NavigationMenuItem className="nav-item" key={href}>
                <NavigationMenuLink asChild className="nav-link">
                  <a href={href} aria-current={currentPage(href)}>{label}</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem className="nav-item" value="guides">
              <NavigationMenuTrigger className="nav-trigger" data-current={path.startsWith("/guides") || undefined}
                onClick={event => { event.preventDefault(); setOpenMenu("guides"); }}>Guides</NavigationMenuTrigger>
              <NavigationMenuContent className="service-dropdown">
                <ul className="service-menu-list">
                  <li><NavigationMenuLink asChild className="service-menu-link"><a href="/guides" aria-current={currentPage("/guides")}>All guides & checklists</a></NavigationMenuLink></li>
                  {guideLinks.map(guide => <li key={guide.slug}><NavigationMenuLink asChild className="service-menu-link"><a href={"/guides/" + guide.slug} aria-current={currentPage("/guides/" + guide.slug)}>{guide.label}</a></NavigationMenuLink></li>)}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <a className="button button-brand header-cta" href="/contact" aria-current={currentPage("/contact")}>
          Get a quote <ArrowUpRight size={17} />
        </a>
        <Sheet>
          <SheetTrigger asChild>
            <button className="menu-button" aria-label="Open menu"><Menu /></button>
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetHeader>
              <SheetTitle>MENU.</SheetTitle>
              <SheetDescription>Arcade Game Australia</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile navigation">
              <SheetClose asChild>
                <a href="/" aria-current={currentPage("/")}>Home</a>
              </SheetClose>
              <div className="mobile-service-links" aria-labelledby="mobile-services-heading">
                <h2 className="mobile-nav-label" id="mobile-services-heading">Services</h2>
                {services.map(service => (
                  <SheetClose asChild key={service.slug}>
                    <a href={`/${service.slug}`} aria-current={currentPage(`/${service.slug}`)}>
                      {service.shortTitle}
                    </a>
                  </SheetClose>
                ))}
              </div>
              {informationLinks.map(({ label, href }) => (
                <SheetClose asChild key={href}>
                  <a href={href} aria-current={currentPage(href)}>{label}</a>
                </SheetClose>
              ))}
              <div className="mobile-service-links" aria-labelledby="mobile-guides-heading">
                <h2 className="mobile-nav-label" id="mobile-guides-heading">Guides</h2>
                <SheetClose asChild><a href="/guides" aria-current={currentPage("/guides")}>All guides & checklists</a></SheetClose>
                {guideLinks.map(guide => <SheetClose asChild key={guide.slug}><a href={"/guides/" + guide.slug} aria-current={currentPage("/guides/" + guide.slug)}>{guide.label}</a></SheetClose>)}
              </div>
              <SheetClose asChild>
                <a className="button button-brand" href="/contact" aria-current={currentPage("/contact")}>
                  Contact & quotes <ArrowUpRight size={18} />
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
