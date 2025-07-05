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
        <html lang="en" data-oid="phs4z6g">
            <body className="" data-oid="5.ue2j-">
                {children}
                <SpeedInsights data-oid="g.t:n:i" />
                <Analytics data-oid="uissxh8" />
            </body>
        </html>
    );
}
