import { Outlet } from "react-router-dom";
import type React from "react";

function App(): React.ReactNode {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
