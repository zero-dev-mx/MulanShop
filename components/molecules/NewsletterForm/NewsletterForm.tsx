'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex border-b border-sumi">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="tu@correo.mx"
        className="flex-1 bg-transparent border-0 font-body text-[15px] text-sumi py-3.5 px-1 outline-none placeholder:text-ash"
      />
      <button
        type="submit"
        className="bg-transparent border-0 font-mono text-[10.5px] tracking-[0.25em] uppercase text-sumi cursor-pointer py-3.5 px-1"
      >
        Suscribirme →
      </button>
    </form>
  );
}
