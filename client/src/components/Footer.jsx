import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Github, Dribbble } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const FooterLink = ({ href, children, target, rel }) => (
  <a 
    href={href} 
    target={target} 
    rel={rel}
    className="text-muted-foreground hover:text-foreground transition-colors"
  >
    {children}
  </a>
);

const FooterTitle = ({ children }) => (
  <h2 className="font-semibold text-foreground mb-2">{children}</h2>
);

const SocialIcon = ({ href, icon: Icon }) => (
  <a 
    href={href} 
    className="text-muted-foreground hover:text-foreground transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export default function FooterCom() {
  return (
    <footer className="border-t-8 border-teal-500 bg-background">
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* Logo Section */}
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Hoàng
              </span>
              <span className="dark:text-white">Blog</span>
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            {/* About Section */}
            <div>
              <FooterTitle>About</FooterTitle>
              <div className="flex flex-col gap-2">
                <FooterLink
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  50 projects 50 days
                </FooterLink>
                <FooterLink
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hoàng Blog
                </FooterLink>
              </div>
            </div>

            {/* Follow Us Section */}
            <div>
              <FooterTitle>Follow us</FooterTitle>
              <div className="flex flex-col gap-2">
                <FooterLink
                  href="https://github.com/0372hoanghoccode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </div>
            </div>

            {/* Legal Section */}
            <div>
              <FooterTitle>Legal</FooterTitle>
              <div className="flex flex-col gap-2">
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className="text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a href="#" className="hover:underline">
              Hoàng blog™
            </a>
            . All Rights Reserved.
          </div>

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <SocialIcon href="#" icon={Facebook} />
            <SocialIcon href="#" icon={Instagram} />
            <SocialIcon href="#" icon={Twitter} />
            <SocialIcon href="https://github.com/0372hoanghoccode" icon={Github} />
          </div>
        </div>
      </div>
    </footer>
  );
}