"use client"

import React, { useState } from 'react';

const TritemiusCipher: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [key, setKey] = useState<number>(0);
  const [outputText, setOutputText] = useState<string>('');

  const alp: string = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';

  const tritemius = (str: string, key: number): string => {
    let result: string = '';
    const cleanedStr: string = str.replace(/[^А-Яа-я]/g, "").toLowerCase().replace("ё", "е");

    result = cleanedStr.replace(/./g, (char) => {
      const strIndex: number = alp.indexOf(char);
      const newIndex: number = (strIndex + key) % 32;
      return alp[newIndex];
    });

    return result;
  };

  const encodeTritemius = (): void => {
    const encodedText: string = tritemius(text, key);
    setOutputText(encodedText.match(/.{1,5}/g)?.join(" ") + "\n" || '');
  };

  return (
    <div>
      <h1>Шифр Тритемиуса</h1>
      <label>Введите текст:</label>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <br />
      <label>Введите ключ:</label>
      <input type="number" value={key} onChange={(e) => setKey(parseInt(e.target.value))} />
      <br />
      <button onClick={encodeTritemius}>Зашифровать</button>
      <br />
      <textarea rows={4} cols={50} value={outputText} readOnly />
    </div>
  );
};

export default TritemiusCipher;