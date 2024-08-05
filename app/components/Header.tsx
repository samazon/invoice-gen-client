import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <header className="flex items-center justify-center border-b border-[#EAECF0] bg-white px-4 py-5 sm:px-8">
      <Image alt="logo" src="/logo.png" height={32} width={32} />
    </header>
  );
}

export default Header;
