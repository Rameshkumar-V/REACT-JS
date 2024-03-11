import React, { useState } from 'react'






export const QrCode = (props) => {

    const [qrcode,Setqrcode]=useState(true);
    const [img,Setimg]=useState(props.url);

    return (
    <>
      
        <div className='generatedqrcode'>
           { qrcode && <img src={img} alt="qrcode" /> }
        </div>
    </>
  );
};
