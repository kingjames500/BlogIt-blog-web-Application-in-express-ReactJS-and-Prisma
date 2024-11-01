import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Landingpage from "./Pages/LandingPage/Landingpage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
