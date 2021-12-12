import User from "../models/user";
import bcrypt from "bcryptjs";

export default async (email, password) => {
    let user = await User.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return false;
    } else {
        return true
    }
}
