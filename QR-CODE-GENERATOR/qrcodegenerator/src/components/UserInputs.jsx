import React, { useState } from 'react'
import { QrCode } from './QrCode';







export const UserInputs = () => {
    
    const [downloadstate,Setdownloadstate]=useState(false);
    const [loadingstate,Setloadingstate]=useState(false);

    const [UserData,SetUserData]=useState('');
    const [ImgSize,SetImgSize]=useState(150);

    const [url,Seturl]=useState(null);



    async function  GenerateQrCode(){

        try{
            Setloadingstate(true);
             const url=`https://api.qrserver.com/v1/create-qr-code/?size=${ImgSize}x${ImgSize}&data=${encodeURIComponent(UserData)}`;
           

             const response=await fetch(url);

             if(response.ok){
                console.log("Response : ",response);

                Seturl(url);
                
                Setdownloadstate(true);
              
            
             }
             else{
                alert('URL failed !');
             }


        }
        catch(error){
            console.log(error);
            alert(error);
        }
        finally{           
             Setloadingstate(false);
            

        }
        

    }

    const downloadQrCode = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcodes.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Setdownloadstate(false);
    }
        



   

    
  return (
    <div className='container p-5 form'>

    { url &&
        <div className='img-thumbnail text-center'>
        <QrCode url={url} />
        </div>
    }

    {loadingstate && 
    <div className='container-fluid text-center p-5 m-2'>
    <div className="spinner-border text-center "></div>
    </div>
    }

        
        
        <div className='m-4 p-2'>

        
        <label htmlFor="" className='form-label'>Data for Qrcode </label>
        <input type="text" className='form-control' onChange={(data)=>{SetUserData(data.target.value)}}/>
       
        </div>

        <div className='m-4 p-2'>
            <label htmlFor="Imgsize"  className='form-label'>Image Size (e.g, 150) </label>
            <input type="number" name="Imgsize"  className='form-control'value={ImgSize} onChange={(data)=>{SetImgSize(data.target.value)}}/>
        </div>

        <div>
            <button onClick={()=>{GenerateQrCode()}} className='btn btn-primary p-2 m-2'>Generate Qr Code</button>
            {downloadstate && <button onClick={()=>{ downloadQrCode()}}  className='btn btn-success p-2 m-2'>Download Qr Code</button>}
        </div>
    </div>
  )
}
