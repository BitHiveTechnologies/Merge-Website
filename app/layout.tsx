import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Merge',
    icons: {
        icon: 'images/merge.ico',
    },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid=":6obefw">
            <body className="" data-oid="ty_2imt">
                {children}
                <SpeedInsights data-oid=":ap:_ru" />
                <Analytics data-oid="tjxrus6" />
            </body>
        </html>
    );
}
