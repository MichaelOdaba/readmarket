import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/userSlice";
import fetchUserDetails from "./utils/fetchUser";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUser(userData));
  };

  useEffect(() => {
    fetchUser();
  }, []);
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
