"use client";

import { ministereLinks, sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar_mobile from "./navbar_mobile";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const pathname = usePathname();

  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.addEventListener("scroll", scrollHeader);
    };
  });
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={
        header
          ? "fixed top-0 left-0 z-50 shadow-md w-full pt-3 px-10 lg:px-20 bg-white/80"
          : "w-full pt-3 px-10 lg:px-20"
      }
    >
      <div className="flex flex-row justify-between border-b-2 pb-1 border-green-400 w-full">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/Images/logo.png"
            alt="AfricanWhiz-Tech logo"
            width={70}
            height={70}
            className=""
          />
        </Link>
        <div className="flex flex-row items-center">
          <div className="flex flex-row gap-2 md:gap-0.5 w-full">
            {sidebarLinks.map((link, index) => {
              const isAcive =
                pathname === link.route ||
                pathname.startsWith("${link.route}/");

              if (link == sidebarLinks[1]) {
                return (
                  <motion.div
                    className="p-3 whitespace-nowrap hidden md:block group cursor-pointer"
                    key={index}
                    onHoverStart={() => setIsOpen(!isOpen)}
                    onHoverEnd={() => setIsOpen(!isOpen)}
                  >
                    <Link
                      href=""
                      className={cn("", {
                        "text-green-400": isAcive,
                      })}
                    >
                      <p className="text-sm font-normal hidden md:block md:text-xs hover:text-green-500 ">
                        {link.label}
                      </p>
                    </Link>

                    <motion.div
                      className="absolute z-50 flex flex-col gap-4 mt-2 py-2 px-4 bg-white shadow-lg"
                      variants={{
                        open: {
                          clipPath: "inset(0% 0% 0% 0% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.1,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                          },
                        },
                        closed: {
                          clipPath: "inset(10% 50% 90% 50% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.5,
                          },
                        },
                      }}
                      style={{ pointerEvents: isOpen ? "auto" : "none" }}
                    >
                      {ministereLinks.map((mLink) => {
                        const isAcive =
                          pathname === mLink.route ||
                          pathname.startsWith("${link.route}/");
                        return (
                          <motion.div key={index} variants={itemVariants}>
                            <Link
                              href={mLink.route}
                              key={mLink.label}
                              className={cn(
                                "whitespace-nowrap hidden md:block group hover:text-green-500",
                                {
                                  "text-green-400": isAcive,
                                }
                              )}
                            >
                              <p className="text-sm font-normal hidden md:block md:text-xs">
                                {mLink.label}
                              </p>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                );
              } else {
                return (
                  <Link
                    href={link.route}
                    key={link.label}
                    className={cn(
                      "p-3 hover:text-green-500 whitespace-nowrap hidden md:block",
                      {
                        "text-green-400": isAcive,
                      }
                    )}
                  >
                    <p className="text-sm font-normal hidden md:block md:text-xs">
                      {link.label}
                    </p>
                  </Link>
                );
              }
            })}
          </div>
          <Navbar_mobile />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
