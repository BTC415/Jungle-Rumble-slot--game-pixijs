import React, { useEffect } from "react";

const AccessDenied = () => {
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1000)
    })
    return (
        <div style={{ height: '100vh', backgroundImage: 'url(/assets/res/bg-access-denied.png)', backgroundColor: "black", backgroundSize: "cover", padding: '10px 40px', color: 'white' }}>
            <a href='/'>
                <img alt='logo' src='/assets/image/logo.png' />
            </a>
            <div style={{ textAlign: 'center' }}>
                <img alt="Access Denied" src="/assets/res/text-access-denied.png" style={{padding:"20px",width:'100%', maxWidth:'600px'}} />
                <h3 style={{ fontFamily:"Arial", fontSize:'28px',textTransform:"uppercase"}}>Please try again later</h3>
                <img alt="astronaut" src="/assets/res/astronaut.gif" style={{padding:"20px",width:'100%', maxWidth:'600px'}} />
            </div>
        </div>
    )
}
export default AccessDenied;


