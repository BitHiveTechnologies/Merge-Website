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
        <html lang="en" data-oid="px3gvdj">
            <body className="" data-oid="hd0ji0x">
                {children}
            </body>
        </html>
    );
}
