import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import summaryAPI from "./common";
import Context from "./context/index.";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      axios
        .get(summaryAPI.currentUser.url, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.success) {
            dispatch(setUserDetails(response.data));
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
