import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      {" "}
      <div className="flex flex-col">
        <Toaster />

        <Header />
        <main className="h-auto w-full min-h-screen md:mt-16 ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
