import userModel from "../../models/userModels.js"; // Adjust the path as needed

const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    console.log("Allusers",users);
    
    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};

export default allUsers;
