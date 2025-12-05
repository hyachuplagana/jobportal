import React from 'react'

import PixelBlast from '../components/PixelBlast.jsx'
const Home = () => {
  return (
    <div style={{ width: '100%', backgroundColor:'black', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <PixelBlast
        variant="circle"
        pixelSize={6}
        color="#B19EEF"
        patternScale={3}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        edgeFade={0.25}
        transparent
      />
      {/* <FloatingLines/> */}

      {/* Text content positioned absolutely over the FloatingLines */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          NepTalent: Where Skills Meet Oppurtunity
        </h1>
        <p style={{
          fontSize: '1.2rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          Finds the right job for you.
        </p>
        <button style={{
          marginTop: '2rem',
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: 'rgba(255,255,255,0.2)',
          border: '2px solid white',
          borderRadius: '25px',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
          }}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Home