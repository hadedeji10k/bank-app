import accountNumberGenerator from './utils/validateAccountNumber';
const generate = async () => {
    const acccountNumber = await accountNumberGenerator();
    console.log(acccountNumber);
};

generate();