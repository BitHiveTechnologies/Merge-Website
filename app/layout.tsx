import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
    title: 'Merge',
    icons: {
        icon: 'images/BitHive.ico',
    },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="7jmudv6">
            <body className="" data-oid="e.sei2f">
                {children}
            </body>
        </html>
    );
}
