import User from "../models/user";

export default async (email) => {
    let user = await User.findOne({ email });
    if (user) {
        return true;
    } else {
        return false;
    }
}
