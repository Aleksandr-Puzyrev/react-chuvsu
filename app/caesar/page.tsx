import CipherComponent from '@/components/CipherComponent/CipherComponent';
import React from 'react';

const Caesar = () => {
  return (
    <div>
      <CipherComponent chiferType={"ceaser"} chiferName={"Шифр Цезаря"}/>
    </div>
  );
};

export default Caesar;