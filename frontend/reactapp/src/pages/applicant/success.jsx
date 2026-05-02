import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import successImage from  '../../assets/loan_success.png' // './assets/loan_success.png' // Assuming you have an image for success
function success() {
    const navigate = useNavigate();

    useEffect(() =>{
        const timer = setTimeout(() => {
            // navigate("/");
             navigate('/applicant/my-applications');
        }, 3000);
        return () => clearTimeout(timer);
    },[navigate])

  return (
    <div>
        {/* <div className="container justify-content-center text-center m-5 p-5">
            <div className="container justify-content-center text-center m-5 p-5">
                <img src={successImage} alt="Success"/>
                <br />
                <h2 className='mt-5'>Application Submitted Successfully!</h2>

            </div>
        </div> */}
          <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',   // ensures it takes full viewport width
                textAlign: 'center',
            }}
        >
            <img
                src={successImage}
                alt="Success"
                style={{ maxWidth: '250px', width: '50%' }}
            />
            <h2 style={{ marginTop: '20px' }}>
                Application Submitted Successfully!
            </h2>
        </div>

    </div>
  )
}

export default success