"use client";

import React, { useState } from 'react';
import * as openpgp from 'openpgp';
import { Button, TextField } from '@mui/material';
import styles from "./PGPComp.module.css";

const PGPComp = () => {
    const [publicKey, setPublicKey] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');
    const [passphrase, setPassphrase] = useState<string>('привет');
    const [signedMessage, setSignedMessage] = useState<string>('');
    const [encryptedMessage, setEncryptedMessage] = useState<string>('');
    const [decryptedMessage, setDecryptedMessage] = useState<string>('');
    const [signatureVerification, setSignatureVerification] = useState<string>('');
    const [inputEncrypte, setInputEncrypte] = useState<string>('');
    const [inputSign, setInputSign] = useState<string>('');
    const [inputDecript, setInputDecript] = useState<string>('');
  
    const generateKeys = async () => {
      const { privateKey: privateKeyArmored, publicKey: publicKeyArmored } = await openpgp.generateKey({
        type: 'ecc',
        curve: 'ed25519',
        userIDs: [{ name: 'User', email: 'user@example.com' }],
        passphrase: passphrase,
      });
      setPublicKey(publicKeyArmored);
      setPrivateKey(privateKeyArmored);
    };
  
    const signMessage = async (message: string) => {
      const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
      const decryptedPrivateKey = await openpgp.decryptKey({
        privateKey: privateKeyObj,
        passphrase,
      });
      const signed = await openpgp.sign({
        message: await openpgp.createMessage({ text: message }),
        signingKeys: decryptedPrivateKey,
      });
      const signedText = signed as unknown as string;
      setSignedMessage(signedText);
    };
  
    const encryptMessage = async (message: string) => {
      const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
      const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }),
        encryptionKeys: publicKeyObj,
      });
      const encryptedText = encrypted as unknown as string;
      setEncryptedMessage(encryptedText);
    };
  
    const decryptMessage = async (message: string) => {
      const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
      const decryptedPrivateKey = await openpgp.decryptKey({
        privateKey: privateKeyObj,
        passphrase,
      });
      const messageObj = await openpgp.readMessage({ armoredMessage: message });
      const { data: decrypted } = await openpgp.decrypt({
        message: messageObj,
        decryptionKeys: decryptedPrivateKey,
      });
      const decryptedText = decrypted as unknown as string;
      setDecryptedMessage(decryptedText);
    };
  
    const verifySignature = async (message: string) => {
      const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
      const messageObj = await openpgp.readMessage({ armoredMessage: message });
      const verificationResult = await openpgp.verify({
        message: messageObj,
        verificationKeys: publicKeyObj,
      });
      const { verified } = verificationResult.signatures[0];
      try {
        await verified; // выдает неверную подпись
        setSignatureVerification('Подпись действительна.');
      } catch (e) {
        setSignatureVerification('Подпись недействительна.');
      }
    };
  
    return (
      <div className={styles.container}>
        <h1>Программа PGP</h1>
        <Button variant="contained" onClick={generateKeys}>Generate Keys</Button>
          <h2>Открытый ключ</h2>
          <textarea value={publicKey} readOnly rows={5} cols={50} />
          <h2>Закрытый ключ</h2>
          <textarea value={privateKey} readOnly rows={5} cols={50} />
          <h2>Подписать сообщение</h2>
          <TextField
          id="outlined-b"
          label="подпись"
          variant="outlined"
          type="text"
          value={inputSign}
          onChange={(e) => setInputSign(e.target.value)}
        />
          <Button variant="contained" onClick={() => signMessage(inputSign)}>Подписать сообщение</Button>
          <textarea value={signedMessage} readOnly rows={5} cols={50} />
          <h2>Зашифровать сообщение</h2>
          <TextField
          id="outlined-bas"
          label="сообщение"
          variant="outlined"
          type="text"
          value={inputEncrypte}
          onChange={(e) => setInputEncrypte(e.target.value)}
        />
          <Button variant="contained" onClick={() => encryptMessage(inputEncrypte)}>Зашифровать сообщение</Button>
          <textarea value={encryptedMessage} readOnly rows={5} cols={50} />
          <h2>Расшифровать сообщение</h2>
          <textarea value={inputDecript} onChange={(e) => setInputDecript(e.target.value)} />
          <Button variant="contained" onClick={() => decryptMessage(inputDecript)}>Расшифровать сообщение</Button>
          <textarea value={decryptedMessage} readOnly rows={5} cols={50} />
          <h2>Проверить подпись</h2>
          <Button variant="contained" onClick={() => verifySignature(signedMessage)}>Проверить подпись</Button>
          <p>{signatureVerification}</p>
      </div>
    );
  }

export default PGPComp;