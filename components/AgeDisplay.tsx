import React from 'react';
import type { CalculatedAge } from '../types';

interface AgeDisplayProps {
  age: CalculatedAge | null;
}

interface AnimatedNumberProps {
    value: number | null;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
    const [displayValue, setDisplayValue] = React.useState(0);

    React.useEffect(() => {
        if (value === null) {
            setDisplayValue(0);
            return;
        }

        const duration = 500;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const animatedValue = Math.floor(progress * value);
            setDisplayValue(animatedValue);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value]);

    if (value === null) {
        return <span className="font-extrabold italic text-5xl md:text-7xl tracking-tighter text-gray-500">--</span>;
    }
    
    return <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-extrabold italic text-5xl md:text-7xl tracking-tighter">{displayValue}</span>;
}

const AgeDisplay: React.FC<AgeDisplayProps> = ({ age }) => {
  return (
    <div className="flex flex-col mt-8 md:mt-0">
      <div className="flex items-center">
        <AnimatedNumber value={age?.years ?? null} />
        <span className="font-extrabold italic text-5xl md:text-7xl text-gray-100 ml-2">years</span>
      </div>
      <div className="flex items-center">
        <AnimatedNumber value={age?.months ?? null} />
        <span className="font-extrabold italic text-5xl md:text-7xl text-gray-100 ml-2">months</span>
      </div>
      <div className="flex items-center">
        <AnimatedNumber value={age?.days ?? null} />
        <span className="font-extrabold italic text-5xl md:text-7xl text-gray-100 ml-2">days</span>
      </div>
    </div>
  );
};

export default AgeDisplay;
