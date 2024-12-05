import HeaderLoggedIn from "../../components/logged-in-header/navBar";
import "../app/globals.css"

export const metadata = {
  title: "GETFIT",
  description: "Fitness App",
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderLoggedIn />
        {children}
      </body>
    </html>
  );
}
