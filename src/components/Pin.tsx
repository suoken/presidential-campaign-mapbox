import React, { CSSProperties } from 'react'

// Pulled from https://github.com/visgl/react-map-gl/blob/7.0-release/examples/controls/src/pin.tsx

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

const numberStyle: CSSProperties = {
  fill: '#fff',
  fontSize: '12px',
  textAnchor: 'middle',
};

type PinProps = {
  size?: number
  number: number
}

const Pin: React.FC<PinProps> = ({size = 30, number}) => {
  return (
    <svg height={size} viewBox='0 0 24 24' style={pinStyle}>
      <path d={ICON} />
        <text x='12' y='16' style={numberStyle}>
          {number}
        </text>
    </svg>
  );
}

export default Pin