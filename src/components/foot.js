import React from 'react';

export default function Footer() {
  return (
    <footer >
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Alice & Stéphane
        </p>
      </div>
    </footer>
  );
}
