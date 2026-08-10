import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lucas 8 anos | Aventura Roblox',
  description: 'Você recebeu um convite para uma aventura entre ilhas!',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
