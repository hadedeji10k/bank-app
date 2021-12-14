import bcrypt from "bcryptjs";
import User from "../models/user";
// const User = require("../models/user");
import jwt from "jsonwebtoken";
import env from "../config/environment/index";
import validateEmail from "../utils/validateEmail";
import validateUserName from "../utils/validateUserName";
import validatePassword from "../utils/validatePassword";
import emailSender from "../utils/emailSender";
import accountNumberGenerator from "../utils/emailSender";

const authenticationService = {
  async signUp(email, password, firstName, lastName, userName) {

    const isUserTaken = await validateEmail(email);
    if (isUserTaken) {
      return false;
    }

    const isUserNameTaken = await validateUserName(userName);
    if (isUserNameTaken) {
      return false;
    }
    
    const verificationCode = Math.floor(Math.random() * 100000);

    const hashedPassword = await bcrypt.hash(password, 10);

    const randomNumber = Math.floor(Math.random() * 100000000);

    const accountNumber = parseInt(`10${randomNumber}`);

    const newUser = new User({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      role: "user",
      userName,
      accountNumber,
      password: hashedPassword,
      verificationCode,
    });

    await newUser.save();

    let token = jwt.sign(
      {
        userId: newUser._id,
        role: newUser.role,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        name: newUser.name,
        accountNumber: newUser.accountNumber,
        userName: newUser.userName,
        accountBalance: newUser.accountBalance
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user: newUser };
  },

  async signIn(email, password) {
    const isPasswordValid = await validatePassword(email, password);

    if (!isPasswordValid) {
      return false;
    }

    let user = await User.findOne({ email })
    .populate("transactions")
    .exec();

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        accountNumber: user.accountNumber,
        userName: user.userName,
        accountBalance: user.accountBalance
      },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { token, user };
  },

  async getUserById(userId) {
    const user = await User.findById(userId)
    .populate("transactions")
    .exec();
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        accountNumber: user.accountNumber,
        userName: user.userName,
        accountBalance: user.accountBalance
      },
      env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { token, user };
  },

  async getAllUsers() {
    const users = await User.find({});
    return users;
  },

  async updateUser(userId, firstName, lastName, email, password, userName) {
    const user = await User.findById(userId);

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      let hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (userName) {
      user.userName = userName;
    }

    await user.save();
    return user;
  },

  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    return user;
  },

  async updateUserRole(userId, role) {
    const user = await User.findById(userId);

    if (!user) {
      return false;
    }

    user.role = role;

    await user.save();

    return user;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  },

  async getUserByUserName(userName) {
    const user = await User.findOne({ userName });
    return user;
  },

  async verifyUser(email, verificationCode) {
    const user = await User.findOne({ email });

    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      user.verificationCode = "";
      await user.save();
      return user;
    }

    return false;
  },

  async sendVerificationCode(email) {
    const user = await User.findOne({ email });

    if (!user) {
      return false;
    }

    if(user.isVerified) {
      return false;
    }

    const verificationCode = Math.floor(Math.random() * 100000);

    user.verificationCode = verificationCode;

    await user.save();

    return user;
  },

  async forgotPassword(email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return false;
      }

      const verificationCode = Math.floor(Math.random() * 100000);

      user.verificationCode = verificationCode;

      let token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.name,
          verificationCode: user.verificationCode,
        },
        env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      let html = `
      <h1>Reset Password</h1>
      <p>Hi ${user.firstName},</p>
      <br><br>
      <p>You recently requested to reset your password for your account.</p>
      <br>
      <p>Please click the link below to reset your password:</p>
      <a href="${env.CLIENT_URL}/reset-password/${token}/${verificationCode}">Reset Password</a>
      <br><br>
      <p>If you did not request a password reset, please ignore this email or reply to let us know.</p>
      <br>
      <p>Thanks</p>
      <br><br>
      <p>The ${env.CLIENT_NAME} Team</p>
      `;

      const emailSent = await emailSender(user.email, "Reset Password", html);

      if(emailSent) {
        await user.save();
        return { token };
      } else {
        return false;
      }

    } catch (error) {
      return false;
    }
  },

  async resetPassword(token, verificationCode, password) {
    try {

      const decoded = jwt.verify(token, env.JWT_SECRET);

      const user = await User.findById(decoded.userId);

      if (!user) {
        return false;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.verificationCode = "";

      await user.save();

      return user;
    } catch (error) {
      return false;
    }
  },

  async updatePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);

    if (!user) {
      return false;
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return false;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    return user;
  },
};

export default authenticationService;
