import User from "../models/user";

const confirmAccount = async (accountNumber) => {
    let user = await User.findOne({ acccountNumber: accountNumber });
    return user;
};

export default async () => {

    const accountNumber = Math.floor(Math.random() * 100000000000);
    const user = await confirmAccount(accountNumber);

    if (user) {
        confirmAccount(Math.floor(Math.random() * 100000000000))
    } else {
        return accountNumber
    }
}
