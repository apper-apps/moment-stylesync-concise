import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import ClosetPage from "@/components/pages/ClosetPage";
import TodaysLookPage from "@/components/pages/TodaysLookPage";
import TrendsPage from "@/components/pages/TrendsPage";
import AddItemPage from "@/components/pages/AddItemPage";
import LoginPage from "@/components/pages/LoginPage";
import SignupPage from "@/components/pages/SignupPage";
function App() {
  return (
    <div className="min-h-screen bg-background">
<Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<TodaysLookPage />} />
          <Route path="/closet" element={<ClosetPage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/add-item" element={<AddItemPage />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-[9999]"
      />
    </div>
  );
}

export default App;