import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "./store/slice/userSlice";
import fetchUserDetails from "./utils/fetchUser";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await fetchUserDetails();
          dispatch(setUser(userData));
        } catch (error) {
          // ignore fetch errors; user may not have a backend profile yet
        }
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsub();
  }, [dispatch]);
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
