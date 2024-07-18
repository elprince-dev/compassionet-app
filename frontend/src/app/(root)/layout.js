import { Roboto } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Suggestions from "@/components/Suggestions";
import BottomBar from "@/components/BottomBar";
import Background from "@/components/Background";
import { UserProvider } from "@/constants/userContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "CompassioNet",
  description: "Share kindness",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <UserProvider>
          <div className="container">
            <Header />
            <main className="dashboard">
              <div className="background">
                <Background />
              </div>

              <Menu />
              {children}
              <Suggestions />
            </main>
            <BottomBar />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
