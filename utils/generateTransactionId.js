
export default async () => {
    const randomNumber = Math.floor(Math.random() * 1000000)

    const arrayOfLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    return `tran-${randomNumber}${arrayOfLetters[Math.floor(Math.random() * 20)]}${Math.floor(Math.random() * 100)}${arrayOfLetters[Math.floor(Math.random() * 20)]}`;
}
