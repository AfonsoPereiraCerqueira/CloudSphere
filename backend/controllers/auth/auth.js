import { generateTokenAndSetCookie, generateTokenAndSetCookieEmployee } from "../../utils/generateTokenAndSetCookie.js"
import Employee from "../../models/employees.model.js"
import User from "../../models/users.model.js"
import Cart from "../../models/cart.model.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import mongoose from "mongoose"
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../../mailtrap/emails.js";

// Register

export const registerUser = async (req, res) => {
  
  const { name, email, password } = req.body;
  
  try {
    
    if (!name || !email || !password) {
      throw new Error("All fields are required")
    };

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
      return res.status(400).json({ success:false, message: "User already exists" })
    };

    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log(hashedPassword)
    const verificationToken = Math.floor(100000 + Math.random() * 900000)
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }); 

    await user.save()

    const cart = new Cart({
      userId: user._id
    });

    await cart.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success:true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({ sucess:false, message: error.message})
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    })

    if(!user) {
      return res.status(400).json({sucess:false, message:"Invalid or expired verification Token"})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      sucess: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (!user.Status) {
      return res.status(400).json({ message: "User is not active" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success:false, message: error.message });
  }
}

export const forgotPassword = async (req, res) => {

  const { email } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // email

    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({ success: true, message: "Password reset link sent to your email" });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const resetPassword = async (req, res) => {
  try {
    
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    };

    // update password

    const hashedPassword = await bcryptjs.hash(password, 10);
    
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message });
  }
}

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "employee not found" });
    }

    const isPasswordValid = await bcryptjs.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (!employee.Status) {
      return res.status(400).json({ message: "employee is not active" });
    }

    generateTokenAndSetCookieEmployee(res, employee._id);


    employee.lastLogin = Date.now();
    await employee.save();

    res.status(200).json({
      success: true,
      message: "employee logged in successfully",
      employee: {
        ...employee._doc,
        password: undefined,
      },
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success:false, message: error.message });
  }
}

export const registerEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const employeeAlreadyExists = await Employee.findOne({ email });
    if (employeeAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Employee already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const employee = new Employee({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await employee.save();

    // jwt
    generateTokenAndSetCookieEmployee(res, employee._id);

    await sendVerificationEmail(employee.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      employee: {
        ...employee._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ sucess: false, message: error.message });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Employee.findById(id);

    if (!user) {
      return res.status(401).json({ message: "Employee not found" });
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({success:true, message:"Logout successfully"})
};

export const logoutEmployee = async (req, res) => {
  res.clearCookie("tokenEmployee");
  res.status(200).json({success:true, message:"Logout successfully"})
}

export const checkAuthEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employeeId).select("-password");


    if (!employee) {
      return res
        .status(400)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// -----------------------------------------------------------------------

export const desactivateUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    user.Status = false;

    await user.save();

    res.status(200).json({ success: true, message: "User desactivated successfully" });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const activateUser = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    user.Status = true;

    await user.save();

    res.status(200).json({ success: true, message: "User activated successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const desactivateEmployee = async (req, res) => {
  const { id } = req.body;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(400).json({ success: false, message: "Employee not found" });
    }

    employee.Status = false;

    await employee.save();

    res.status(200).json({ success: true, message: "Employee desactivated successfully" });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const activateEmployee = async (req, res) => {
  const { id } = req.body;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(400).json({ success: false, message: "Employee not found" });
    }

    employee.Status = true;

    await employee.save();

    res.status(200).json({ success: true, message: "Employee activated successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}