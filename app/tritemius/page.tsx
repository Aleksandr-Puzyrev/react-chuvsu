import CipherComponent from '@/components/CipherComponent/CipherComponent';
import React from 'react';

const Tritemius = () => {
    return (
        <div>
            <CipherComponent chiferType={"tritemius"} chiferName={"Шифр Тритемиуса"}/>
        </div>
    );
};

export default Tritemius;