// Logo components using SVG for reliable display

export const InfosysLogo = () => (
  <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="20" fontSize="16" fontWeight="700" fill="#007CC3" fontFamily="Arial, sans-serif">Infosys</text>
  </svg>
);

export const BankOfAmericaLogo = () => (
  <svg width="140" height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="20" height="20" rx="3" fill="#E31837"/>
    <text x="26" y="20" fontSize="11" fontWeight="700" fill="#E31837" fontFamily="Arial, sans-serif">Bank of America</text>
  </svg>
);

export const FlipkartLogo = () => (
  <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="20" fontSize="16" fontWeight="700" fill="#2874F0" fontFamily="Arial, sans-serif">Flipkart</text>
  </svg>
);

export const TCSLogo = () => (
  <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="20" fontSize="18" fontWeight="700" fill="#0066CC" fontFamily="Arial, sans-serif">TCS</text>
  </svg>
);

export const WiproLogo = () => (
  <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="20" fontSize="16" fontWeight="700" fill="#117CFD" fontFamily="Arial, sans-serif">Wipro</text>
  </svg>
);

export const AccentureLogo = () => (
  <svg width="110" height="30" viewBox="0 0 110 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="20" fontSize="14" fontWeight="700" fill="#A100FF" fontFamily="Arial, sans-serif">Accenture</text>
  </svg>
);

export const MicrosoftLogo = () => (
  <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="6" height="6" fill="#F25022"/>
    <rect x="10" y="8" width="6" height="6" fill="#7FBA00"/>
    <rect x="2" y="16" width="6" height="6" fill="#00A4EF"/>
    <rect x="10" y="16" width="6" height="6" fill="#FFB900"/>
    <text x="20" y="20" fontSize="12" fontWeight="600" fill="#737373" fontFamily="Arial, sans-serif">Microsoft</text>
  </svg>
);

export const AmazonLogo = () => (
  <svg width="110" height="30" viewBox="0 0 110 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15 L8 12 L11 15 L8 18 Z" fill="#FF9900"/>
    <text x="15" y="20" fontSize="14" fontWeight="600" fill="#232F3E" fontFamily="Arial, sans-serif">amazon</text>
  </svg>
);

export const AmityLogo = () => (
  <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="22" height="22" rx="3" fill="#FF6B00"/>
    <text x="28" y="19" fontSize="14" fontWeight="700" fill="#FF6B00" fontFamily="Arial, sans-serif">Amity</text>
  </svg>
);

export const AWSLogo = () => (
  <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12 Q8 8 11 12 Q14 16 11 20 Q8 24 5 20 Z" fill="#232F3E"/>
    <text x="18" y="19" fontSize="12" fontWeight="700" fill="#232F3E" fontFamily="Arial, sans-serif">AWS</text>
  </svg>
);

export const IBMLogo = () => {
  const blue = "#006699";
  const stripeHeight = 1.5;
  const gap = 0.5;
  
  // Create horizontal stripes for the iconic IBM logo
  const createStripe = (y: number) => {
    return (
      <g key={y}>
        {/* Letter I - vertical bar */}
        <rect x="2" y={y} width="6" height={stripeHeight} fill={blue} />
        
        {/* Letter B */}
        <rect x="10" y={y} width="5" height={stripeHeight} fill={blue} />
        {/* Top curve of B */}
        {y < 10 && <rect x="15" y={y} width="10" height={stripeHeight} fill={blue} />}
        {/* Middle of B */}
        {y >= 10 && y <= 12 && <rect x="15" y={y} width="10" height={stripeHeight} fill={blue} />}
        {/* Bottom curve of B */}
        {y > 12 && <rect x="15" y={y} width="10" height={stripeHeight} fill={blue} />}
        <rect x="25" y={y} width="5" height={stripeHeight} fill={blue} />
        
        {/* Letter M */}
        <rect x="33" y={y} width="5" height={stripeHeight} fill={blue} />
        {/* Middle of M - varies by position */}
        {y > 7 && y < 15 && (
          <>
            <rect x="39" y={y} width="3" height={stripeHeight} fill={blue} />
            <rect x="43" y={y} width="3" height={stripeHeight} fill={blue} />
          </>
        )}
        <rect x="47" y={y} width="5" height={stripeHeight} fill={blue} />
      </g>
    );
  };

  const stripes = [];
  let y = 7;
  for (let i = 0; i < 13; i++) {
    stripes.push(createStripe(y));
    y += stripeHeight + gap;
  }

  return (
    <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      {stripes}
    </svg>
  );
};
