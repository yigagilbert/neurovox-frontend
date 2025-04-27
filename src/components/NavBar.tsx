import React from 'react';
import { Link } from "react-router-dom";

export const NavBar = () => (
  <header className="sticky top-0 z-40 bg-brand-600 text-white shadow">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Link to="/" className="flex items-center gap-2">
        {/* <img src="/logo.svg" alt="NeuroVox" className="h-8 w-8" /> */}
        <span className="text-2xl font-semibold tracking-tight">NeuroVox</span>
      </Link>
      <nav className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-accent-500 transition-colors">
          Voice Test
        </Link>
      </nav>
    </div>
  </header>
);