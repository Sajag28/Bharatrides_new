'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee', display: 'flex', gap: '1rem' }}>
      <Link href="/">Home</Link>
      <Link href="/upload">Upload Car</Link>
      <Link href="/cars">View Cars</Link>
    </nav>
  );
}
