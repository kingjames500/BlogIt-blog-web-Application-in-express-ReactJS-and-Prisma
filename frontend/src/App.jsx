import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Landingpage from "./Pages/LandingPage/Landingpage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import Loginpage from "./Pages/LoginPage/Loginpage";
import BlogListingPage from "./Pages/BlogListingPage/BlogListingPage";
import CreateBlogPage from "./Pages/CreateBlogPage/CreateBlogPage";
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
          <Route path="/login" element={<Loginpage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/create-blog" element={<CreateBlogPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
