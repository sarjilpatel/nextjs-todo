import "../styles/app.scss";
import { Inter } from "next/font/google";
import Header from "./header";
import { ContextProvider } from "@/components/Clients";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TODO App",
  description: "TODO app project by Sarjil Patel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
