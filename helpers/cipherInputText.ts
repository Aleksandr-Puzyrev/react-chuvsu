import languageCheck from "./languageCheck";

// Алфавит для шифра
const alpRus = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
const alpEnglish = "abcdefghijklmnopqrstuvwxyz";

// Функция для кодирования и декодирования текста по методу Виженера и Цезаря
export default function getCipherInputText(str: string, key: string, mode: string, chiferType: string): string {
  const cleanedStr = str
    .replace(/[^А-Яа-яa-zA-Z]/g, "")
    .toLowerCase()
    .replace("ё", "е");

  // if (!cleanedStr) return "Введите хотя бы одну букву!"
  let cleanedKey: string | number;
  if (chiferType === "vigenere") {
    cleanedKey = key
      .repeat(Math.ceil(cleanedStr.length / key.length))
      .slice(0, cleanedStr.length).toLowerCase();
  } else if (chiferType === "tritemius") {
    cleanedKey = key.toLowerCase().split("").reduce((acc, val) => acc + (languageCheck(cleanedStr) ? alpRus.indexOf(val) : alpEnglish.indexOf(val)), 0)
  } else {
    cleanedKey = key;
  }
  let result = "";
  for (let i = 0; i < cleanedStr.length; i++) {
    const isLanguageLen = (languageCheck(cleanedStr[i]) ? 32 : 26)
    const alp = languageCheck(cleanedStr[i]) ? alpRus : alpEnglish; 
    const strIndex = alp.indexOf(cleanedStr[i]);
    const keyIndex =
      chiferType === "vigenere" && typeof cleanedKey === 'string' ? alp.indexOf(cleanedKey[i]) : +cleanedKey;
    let newIndex;
    mode === "encode" ? (newIndex = (strIndex + keyIndex) % isLanguageLen) : (newIndex = (strIndex - (keyIndex % isLanguageLen) + isLanguageLen) % isLanguageLen);
    result += alp[newIndex];
  }
  return result;
};