import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "./ui/button";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = useLocation().pathname;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to='/'
            className='flex items-center space-x-2 text-sm sm:text-xl font-semibold text-gray-900 dark:text-white'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Sahand's
            </span>
            <span>Blog</span>
          </Link>

          <div className="hidden lg:block">
            <form className="relative">
              <input
                type='text'
                placeholder='Search...'
                className='w-64 pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
          </div>

          <div className='flex items-center gap-2'>
            <Button size="icon" variant="outline" className='w-10 h-10 lg:hidden'>
              <AiOutlineSearch className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className='w-10 h-10 hidden sm:flex'>
              <FaMoon className="h-5 w-5" />
            </Button>
            <Button asChild>
              <Link to='/sign-in'>Sign In</Link>
            </Button>
            <Button size="icon" variant="outline" className='md:hidden' onClick={toggleMenu}>
              {isMenuOpen ? <AiOutlineClose className="h-5 w-5" /> : <AiOutlineMenu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/projects', label: 'Projects' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block py-2 px-4 rounded ${
                      path === link.to
                        ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <nav className="hidden md:flex space-x-4 py-2">
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/projects', label: 'Projects' },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                path === link.to
                  ? 'bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

