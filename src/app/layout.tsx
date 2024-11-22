import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Grocery Ahai",
  description: "Grocery Ahai",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CookiesProvider>
            <StoreProvider>
              <main>{children}</main>
            </StoreProvider>
          </CookiesProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
