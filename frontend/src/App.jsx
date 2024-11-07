import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Landingpage from "./Pages/LandingPage/Landingpage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import Loginpage from "./Pages/LoginPage/Loginpage";
import BlogListingPage from "./Pages/BlogListingPage/BlogListingPage";
import BlogsFeedPage from "./Pages/BlogsFeedPage/BlogsFeedPage";
import CreateBlogPage from "./Pages/CreateBlogPage/CreateBlogPage";
import FullBlogPage from "./Pages/FullBlogPage/FullBlogPage";
import UpdateBlogPage from "./Pages/UpdateBlogPage/UpdateBlogPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/blogs" element={<BlogListingPage />} />
              <Route path="/blogs-feed" element={<BlogsFeedPage />} />
              <Route path="/blog/:id" element={<FullBlogPage />} />
              <Route path="/create-blog" element={<CreateBlogPage />} />
              <Route path="/update-blog/:blogId" element={<UpdateBlogPage />} />
              <Route path="/profile-page" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
