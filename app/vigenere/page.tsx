"use client";

import { Button, TextField } from "@mui/material";
import styles from "./Vigenere.module.css";
import React, { useState } from "react";

const Vigenere = () => {
  const [text, setText] = useState("");
  const [keyText, setKeyText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Алфавит для шифра Виженера
  const alp = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

  // Функция для кодирования и декодирования текста по методу Виженера
  const vigenere = (str: string, key: string, mode: string): string => {
    const cleanedStr = str
      .replace(/[^А-Яа-я]/g, "")
      .toLowerCase()
      .replace("ё", "е");
    const cleanedKey = key
      .repeat(Math.ceil(cleanedStr.length / key.length))
      .slice(0, cleanedStr.length);
    let result = "";
    for (let i = 0; i < cleanedStr.length; i++) {
      const strIndex = alp.indexOf(cleanedStr[i]);
      const keyIndex = alp.indexOf(cleanedKey[i]);
      let newIndex;
      mode === "encode"
        ? (newIndex = (strIndex + keyIndex) % 32)
        : (newIndex = (strIndex - keyIndex + 32) % 32);
      result += alp[newIndex];
    }
    return result;
  };

  // Функция для кодирования и декодирования текста по методу Виженера
  const encodeVigenere = (prop: string): void => {
    const encodedText: string = vigenere(text, keyText, prop);
    setOutputText(encodedText.match(/.{1,5}/g)?.join(" ") + "\n" || "");
  };

  // Функция для очистки введенного текста, ключа и вывода
  const clearText = () => {
    setText("");
    setKeyText("");
    setOutputText("");
  };

  return (
    <div className={styles.containerVigenere}>
      <h1>Шифр Виженера</h1>
      <label>Введите текст:</label>
      <TextField
        id="outlined-basic"
        label="Текст"
        variant="outlined"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label>Введите ключ:</label>
      <TextField
        id="outlined-basic"
        label="Ключ"
        variant="outlined"
        type="text"
        value={keyText}
        onChange={(e) => setKeyText(e.target.value)}/>
      <Button variant="contained" onClick={() => encodeVigenere("encode")}>
        Зашифровать
      </Button>
      <Button variant="contained" onClick={() => encodeVigenere("decode")}>
        Расшифровать
      </Button>
      <Button variant="contained" onClick={clearText}>
        Очистить
      </Button>
      <TextField
          id="outlined-textarea"
          label="Преобразованный текст"
          placeholder="Placeholder"
          multiline
          value={outputText}
        />
    </div>
  );
};

export default Vigenere;
