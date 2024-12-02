import { back, logout } from "../../actions/auth-actions";
import HeaderLoggedIn from "../../components/logged-in-header/navBar";
import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderLoggedIn/>
        {children}
      </body>
    </html>
  );
}
