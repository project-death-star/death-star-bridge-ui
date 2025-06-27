'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    const fetchStatus = async () => {
      // The BFF URL is read from a public environment variable.
      // This allows the same frontend code to be deployed against different
      // backend environments (local, staging, production).
      const bffUrl = process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:8080';
      
      try {
        const response = await fetch(`${bffUrl}/health`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // We expect the body to be `{"status": "ok"}`
        if (data.status === 'ok') {
          setStatus('ok');
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error("Failed to fetch BFF status:", error);
        setStatus('error');
      }
    };

    fetchStatus();
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Status: {status}</h1>
    </main>
  );
}

