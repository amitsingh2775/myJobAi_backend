import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import Otp from "../models/otpModel.js"
import { SendEmail } from "../utils/sendEmail.js"
import { CreateToken } from "../utils/createToken.js"

export const Register = async (req, res) => {
  try {
    const { email, name, password } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "Enter the Credentials" })
    }
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ success: false, message: "user exits!!" })
    }
    // hasehd the password for security purpose
    const hashedPassword = await bcrypt.hash(password, 10)
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const hashedOTP = await bcrypt.hash(otp, 10)

    await Otp.deleteMany({ email })
    await Otp.create({ email, otp: hashedOTP })

    // user saved Temproly unverified
    await User.create({ email, name, password: hashedPassword })

    await SendEmail(
      email,
      "your OTP ",
      `<h2>Your OTP is: ${otp}</h2><p>This will expire in 5 minutes.</p>`
    )

    res.status(200).json({ message: 'OTP sent, complete verification to finish registration' });
  } catch (error) {
    console.log(error)
  }
}

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body
    const findRecord = await Otp.findOne({ email })
    if (!findRecord) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }
    const isMatchOTP = await bcrypt.compare(otp, findRecord.otp)
    if (!isMatchOTP) {
      return res.status(400).json({ message: 'Invaild OTP ' });
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: ' Wrong Email ' });
    }

    // mark varifed in db
    user.isVarified = true;
    await user.save()
    await Otp.deleteMany({ email })

    await SendEmail(
      email,
      'Verification Successfull!!',
      `<h2>Wellcome to our Platfrom</h2>`
    )
    const token = CreateToken(user)
   res.cookie(
      'token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    }
    )
    return res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.log(error)
  }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Enter the Credentials" })
    }
    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).json({ success: false, message: "user doesn't exist" })

    }
    if (!existUser.isVarified) {
      return res.status(400).json({ success: false, message: "User doesn't verified" })
    }
    const IsvaildPass = await bcrypt.compare(password, existUser.password)

    if (!IsvaildPass) {
      return res.status(400).json({ success: false, message: "Enter Correct Password" })
    }
    const token = CreateToken(existUser)
    res.cookie(
      'token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,

    }
    )
    return res.status(200).json({ success: true, message: "Login Sucessfull" })
  } catch (error) {
    console.log(error)
  }
}

export const logOut = (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({ success: true, message: "Logout Sucessfull" })
}

export const getME = async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.log(error)
  }
}

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVarified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: hashedOTP });

    await SendEmail(
      email,
      "Your New OTP",
      `<h2>Your OTP is: ${otp}</h2><p>This will expire in 5 minutes.</p>`
    );

    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
