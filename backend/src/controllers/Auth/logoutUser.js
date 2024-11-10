const logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out user" });
  }
};
export default logoutUser;
