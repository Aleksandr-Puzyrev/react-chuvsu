export default function languageCheck(text: string) {
    const match = /^[а-яё]*$/i.test(text);
    return match;
}