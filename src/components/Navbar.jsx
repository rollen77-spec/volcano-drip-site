
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEcwid } from '@/context/EcwidContext';
import { ECWID_GUATEMALA_PRODUCT_URL, ECWID_PRODUCT_BY_ORIGIN } from '@/config/ecwid';

const GUATEMALA_HREF = '/origins/guatemala';

const Navbar = () => {
  const { openCart, openProduct } = useEcwid();
  const originLinks = [{
    href: '/origins/costa-rica',
    label: 'Costa Rica'
  }, {
    href: '/origins/guatemala',
    label: 'Guatemala'
  }, {
    href: '/origins/indonesia',
    label: 'Indonesia'
  }, {
    href: '/origins/peru',
    label: 'Peru'
  }, {
    href: '/origins/honduras',
    label: 'Honduras'
  }];
  const mainLinks = [{
    href: '/subscription',
    label: 'Subscription'
  }, {
    href: '/sourcing',
    label: 'Sourcing'
  }, {
    href: '/brewing',
    label: 'Brewing'
  }, {
    href: '/about',
    label: 'About'
  }, {
    href: '/contact',
    label: 'Contact'
  }];
  return <nav className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Desktop Logo - on white background */}
        <Link to="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
          <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/primary-logo-copy-wWYt4.png" alt="Volcano Drip Coffee Logo" className="h-[50px] w-auto mix-blend-multiply" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-stone-600 hover:text-stone-900 outline-none">
              Shop <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-white border-stone-200 p-2">
              <DropdownMenuItem asChild>
                <Link to="/shop" className="cursor-pointer text-stone-900 font-semibold focus:bg-stone-100">
                  Shop all
                </Link>
              </DropdownMenuItem>
              {originLinks.map(link =>
                link.href === GUATEMALA_HREF ? (
                  ECWID_GUATEMALA_PRODUCT_URL ? (
                    <DropdownMenuItem key={link.href} asChild>
                      <a
                        href={ECWID_GUATEMALA_PRODUCT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-stone-600 focus:text-stone-900 focus:bg-stone-100"
                      >
                        {link.label}
                      </a>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      key={link.href}
                      className="cursor-pointer text-stone-600 focus:text-stone-900 focus:bg-stone-100"
                      onSelect={() => openProduct(ECWID_PRODUCT_BY_ORIGIN.guatemala)}
                    >
                      {link.label}
                    </DropdownMenuItem>
                  )
                ) : (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      to={link.href}
                      className="cursor-pointer text-stone-600 focus:text-stone-900 focus:bg-stone-100"
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {mainLinks.map(link => <Link key={link.href} to={link.href} className={`text-sm font-medium ${link.href === '/subscription' ? 'text-amber-700 font-bold' : 'text-stone-600'} hover:text-stone-900 hover:underline underline-offset-4 transition-all`}>
              {link.label}
            </Link>)}

          <Button type="button" variant="ghost" size="icon" className="text-stone-700" onClick={openCart} aria-label="Open shopping cart">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="flex items-center gap-1 md:hidden">
          <Button type="button" variant="ghost" size="icon" className="text-stone-700" onClick={openCart} aria-label="Open shopping cart">
            <ShoppingBag className="h-6 w-6" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-full sm:w-[350px] border-l border-stone-200 flex flex-col">
              <div className="flex flex-col gap-8 mt-10 px-2 flex-grow">
                {/* Mobile Logo */}
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center transition-transform duration-300 hover:scale-105 self-start">
                   <img src="https://horizons-cdn.hostinger.com/a60a47d3-e50a-4efb-b68d-75c5629e9afd/79bc2e736d21c7618f2910ac600f1d5e.png" alt="Volcano Drip Coffee Logo" className="h-[120px] w-auto mix-blend-multiply" />
                </Link>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500">Coffee Shop</h4>
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-stone-200">
                    <SheetClose asChild>
                      <Link to="/shop" onClick={() => window.scrollTo(0, 0)} className="text-lg font-semibold text-stone-900 hover:text-amber-700">
                        Shop all
                      </Link>
                    </SheetClose>
                    {originLinks.map(link =>
                      link.href === GUATEMALA_HREF ? (
                        ECWID_GUATEMALA_PRODUCT_URL ? (
                          <SheetClose asChild key={link.href}>
                            <a
                              href={ECWID_GUATEMALA_PRODUCT_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg text-stone-600 hover:text-stone-900"
                            >
                              {link.label}
                            </a>
                          </SheetClose>
                        ) : (
                          <SheetClose asChild key={link.href}>
                            <button
                              type="button"
                              className="text-lg text-left w-full text-stone-600 hover:text-stone-900"
                              onClick={() => openProduct(ECWID_PRODUCT_BY_ORIGIN.guatemala)}
                            >
                              {link.label}
                            </button>
                          </SheetClose>
                        )
                      ) : (
                        <SheetClose asChild key={link.href}>
                          <Link to={link.href} onClick={() => window.scrollTo(0, 0)} className="text-lg text-stone-600 hover:text-stone-900">
                            {link.label}
                          </Link>
                        </SheetClose>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500">Explore</h4>
                   <div className="flex flex-col gap-3">
                      {mainLinks.map(link => <SheetClose asChild key={link.href}>
                           <Link to={link.href} onClick={() => window.scrollTo(0, 0)} className={`text-xl font-medium ${link.href === '/subscription' ? 'text-amber-700 font-bold' : 'text-stone-800'} hover:text-amber-700`}>
                            {link.label}
                          </Link>
                        </SheetClose>)}
                   </div>
                </div>
              </div>
              
              {/* Mobile Footer Nav */}
              <div className="mt-auto pt-8 pb-4 px-2 border-t border-stone-200 flex flex-col gap-3">
                <SheetClose asChild>
                  <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="text-sm text-stone-500 hover:text-stone-900 font-medium">
                    Privacy Policy
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/terms-and-conditions" onClick={() => window.scrollTo(0, 0)} className="text-sm text-stone-500 hover:text-stone-900 font-medium">
                    Terms & Conditions
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/cookies" onClick={() => window.scrollTo(0, 0)} className="text-sm text-stone-500 hover:text-stone-900 font-medium">
                    Cookies & Data Policy
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>;
};
export default Navbar;
