import "./globals.css";
import { Inter } from "next/font/google";

import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger",
  description: "Messenger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className={inter.className}>
        <AuthContext>
          {children}
          <ToasterContext />
        </AuthContext>
      </body>
    </html>
  );
}
