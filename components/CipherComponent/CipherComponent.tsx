"use client";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import styles from "./CipherComponent.module.css";
import React, { useState } from "react";
import getCipherInputText from "@/helpers/cipherInputText";


interface CipherTypeProps {
  chiferType: string;
  chiferName: string;
}

const CipherComponent = ({
  chiferType,
  chiferName,
}: CipherTypeProps): JSX.Element => {

  const [text, setText] = useState("");
  const [keyText, setKeyText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Функция для кодирования и декодирования текста по методу Виженера и Цезаря
  const encodeVigenere = (prop: string): void => {

    const encodedText: string = getCipherInputText(text,keyText,prop,chiferType);
    (!encodedText) ? setOutputText("Введите хотя бы одну букву") : setOutputText(encodedText.match(/.{1,5}/g)?.join(" ") + "\n" || "");
  };

  // Функция для очистки введенного текста, ключа и вывода
  const clearText = () => {
    setText("");
    setKeyText("");
    setOutputText("");
  };

  return (
    <div className={styles.container}>
      <h1>{chiferName}</h1>
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
      {chiferType === "ceaser" && (
        <TextField
          id="outlined-basic"
          label="Ключ"
          variant="outlined"
          type="number"
          value={keyText}
          onChange={(e) => setKeyText(e.target.value)}
        />
      )}
      {(chiferType === "vigenere" || chiferType === "tritemius") && (
        <TextField
          id="outlined-basic"
          label="Ключ"
          variant="outlined"
          type="text"
          value={keyText}
          onChange={(e) => setKeyText(e.target.value)}
        />
      )}
      {chiferType === "gamma" && (
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={keyText} onChange={(e) => setKeyText(e.target.value)}>
          <MenuItem value={"2"}>e</MenuItem>
          <MenuItem value={"3"}>П</MenuItem>
        </Select>
      )}
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
        placeholder="Ввод недоступен"
        multiline
        value={outputText}
      />
    </div>
  );
};

export default CipherComponent;
