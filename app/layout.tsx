import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Merge',
    icons: {
        icon: 'images/merge.ico',
    },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="osrl195">
            <body className="" data-oid="ycdy_7x">
                {children}
            </body>
        </html>
    );
}
