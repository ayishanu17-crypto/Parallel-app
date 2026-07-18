import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  const location = useLocation();
  const isFocusMode = location.pathname.startsWith("/room");

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!isFocusMode && <Navbar />}
      
      {/* flex-grow pushes the footer to the bottom if content is short */}
      <main className={`flex-grow ${!isFocusMode ? "pt-20" : ""}`}>
        <Outlet />
      </main>

      {!isFocusMode && <Footer />}
    </div>
  );
}

export default AppLayout;