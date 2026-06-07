import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import "./(styles)/sheet-table-override.css"
import Navbar from "./(components)/navbar/Navbar";
import { SheetDataProvider } from "./(context)/SheetDataContext";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ['latin']
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "ViewCell",
  description: "Bring your data to the spotlight!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSans.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SheetDataProvider>
          <Navbar />
          {children}
        </SheetDataProvider>
      </body>
    </html>
  );
}
