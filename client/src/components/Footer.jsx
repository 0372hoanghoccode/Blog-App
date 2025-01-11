import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Github, Heart } from 'lucide-react';
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

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="md:col-span-4 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-lg font-semibold"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-lg text-primary-foreground">
                Hoàng
              </span>
              <span>Blog</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Sharing knowledge, experiences, and passion in the world of technology and beyond.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:col-span-3">
            {/* About Section */}
            <div>
              <FooterTitle>About</FooterTitle>
              <ul className="mt-4 space-y-2">
                <li>
                  <FooterLink
                    href="https://www.100jsprojects.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    50 projects 50 days
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/about">
                    Hoàng Blog
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <FooterTitle>Follow us</FooterTitle>
              <ul className="mt-4 space-y-2">
                <li>
                  <FooterLink
                    href="https://github.com/0372hoanghoccode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Discord</FooterLink>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <FooterTitle>Legal</FooterTitle>
              <ul className="mt-4 space-y-2">
                <li>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a href="#" className="hover:underline">
              Hoàng blog™
            </a>
            . All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
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

