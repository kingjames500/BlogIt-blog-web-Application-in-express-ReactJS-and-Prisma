import { useNavigate } from "react-router-dom";
import userDetailsStore from "../../Store/userDetailsStore.js";
import apiUrl from "../../utils/apiUrl.js";

function isLogout() {
  const navigate = useNavigate();
  const logout = userDetailsStore((state) => state.logout); // function to clear user state

  // Send a logout request to the server
  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/logout`, {
        method: "POST", // or "DELETE" based on your API
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if your API requires credentials (like cookies)
      });

      if (response.ok) {
        // Successfully logged out
        logout(); // clear user data in local storage or state
        navigate("/login"); // redirect to login page
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message);
      }
    } catch (error) {
      console.error("Logout request error:", error);
    }
  };

  return handleLogout;
}

export default isLogout;
