import User from "../models/user";

export default async (userName) => {
    let user = await User.findOne({ userName });
    if (user) {
        return true;
    } else {
        return false;
    }
}
