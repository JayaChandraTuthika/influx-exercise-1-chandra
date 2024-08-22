import { Inter } from "next/font/google";

import "./globals.css";
import AppContextProvider from "@/store/appContext";

export const metadata = {
  title: "Demo Exercise Influx",
  description: "A demo application by jayachandra for influx interview",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
