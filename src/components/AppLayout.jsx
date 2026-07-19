import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  const location = useLocation();
  const isFocusMode = location.pathname.startsWith("/room");

  return (
    // Tailwind will now look for 'bg-app-bg' and 'text-app-text' defined in your config
    <div className="flex flex-col min-h-screen bg-app-bg text-app-text antialiased">
      {!isFocusMode && <Navbar />}
      
      <main className={`flex-grow ${!isFocusMode ? "pt-20" : ""}`}>
        <Outlet />
      </main>

      {!isFocusMode && <Footer />}
    </div>
  );
}

export default AppLayout;