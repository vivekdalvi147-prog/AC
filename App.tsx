import React, { useState } from 'react';
import type { CalculatedAge } from './types';
import CustomInput from './components/DateInput';
import AgeDisplay from './components/AgeDisplay';
import ArrowIcon from './components/icons/ArrowIcon';

interface Errors {
  day?: string;
  month?: string;
  year?: string;
}

const AdBanner: React.FC = () => {
    React.useEffect(() => {
        const container = document.getElementById('ad-container');
        if (container && container.children.length === 0) {
            const configScript = document.createElement('script');
            configScript.type = 'text/javascript';
            configScript.innerHTML = `
                atOptions = {
                    'key' : '160528597dfdca3e82a5c045e6537551',
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            `;
            container.appendChild(configScript);

            const invokeScript = document.createElement('script');
            invokeScript.type = 'text/javascript';
            invokeScript.src = '//www.highperformanceformat.com/160528597dfdca3e82a5c045e6537551/invoke.js';
            invokeScript.async = true;
            container.appendChild(invokeScript);
        }
    }, []);

    return (
        <div className="flex justify-center mt-8">
             <div id="ad-container" style={{ width: '320px', height: '50px' }} />
        </div>
    );
};


const App: React.FC = () => {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [age, setAge] = useState<CalculatedAge | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, maxLength: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= maxLength) {
        setter(value);
    }
  };

  const validateAndCalculate = () => {
    const newErrors: Errors = {};
    const today = new Date();
    const currentYear = today.getFullYear();

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (!day) newErrors.day = 'This field is required';
    if (!month) newErrors.month = 'This field is required';
    if (!year) newErrors.year = 'This field is required';

    if (day && (dayNum < 1 || dayNum > 31)) newErrors.day = 'Must be a valid day';
    if (month && (monthNum < 1 || monthNum > 12)) newErrors.month = 'Must be a valid month';
    if (year && yearNum > currentYear) newErrors.year = 'Must be in the past';

    if (day && month && year && !newErrors.day && !newErrors.month && !newErrors.year) {
        const birthDateObj = new Date(yearNum, monthNum - 1, dayNum);
        if (birthDateObj.getFullYear() !== yearNum || birthDateObj.getMonth() !== monthNum - 1 || birthDateObj.getDate() !== dayNum) {
            newErrors.day = 'Must be a valid date';
            newErrors.month = ' ';
            newErrors.year = ' ';
        } else if (birthDateObj > today) {
            newErrors.day = 'Date cannot be in the future';
            newErrors.month = ' ';
            newErrors.year = ' ';
        }
    }
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setAge(null);
        return;
    }

    setErrors({});
    
    const birthDateObj = new Date(yearNum, monthNum-1, dayNum);
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }
    
    setAge({ years, months, days });
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-blue-900 min-h-screen flex items-center justify-center p-4 font-['Poppins'] text-white">
      <main className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rounded-br-[100px] md:rounded-br-[150px] p-6 md:p-12 shadow-2xl shadow-purple-500/10 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-0">
          <CustomInput
            id="day"
            label="Day"
            value={day}
            placeholder="DD"
            onChange={handleInputChange(setDay, 2)}
            error={errors.day}
            maxLength={2}
          />
          <CustomInput
            id="month"
            label="Month"
            value={month}
            placeholder="MM"
            onChange={handleInputChange(setMonth, 2)}
            error={errors.month}
            maxLength={2}
          />
          <CustomInput
            id="year"
            label="Year"
            value={year}
            placeholder="YYYY"
            onChange={handleInputChange(setYear, 4)}
            error={errors.year}
            maxLength={4}
          />
        </div>

        <div className="flex items-center my-8 md:my-0 relative">
          <div className="w-full h-[1px] bg-gray-600"></div>
          <button
            onClick={validateAndCalculate}
            aria-label="Calculate age"
            className="bg-purple-600 hover:bg-purple-700 focus:bg-purple-800 rounded-full p-4 md:p-5 flex-shrink-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-400/50 group shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/60"
          >
            <ArrowIcon />
          </button>
          <div className="w-full h-[1px] bg-gray-600 md:hidden"></div>
        </div>
        
        <AgeDisplay age={age} />
        <AdBanner />
      </main>
    </div>
  );
};

export default App;
