'use client';
import RegisterYourForm from '@/components/Forms/RegisterYourForm';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';

const TOTAL_STEPS = 3;

const Page = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);

  const nextStep = () => {
    if (step < TOTAL_STEPS) {
      setStep((prevStep) => {
        const newStep = prevStep + 1;
        return newStep;
      });
      setProgress((prevProgress) => Math.min(prevProgress + 33, 100));
    } else {
      handleFormSubmit();
    }
  };

  const previousStep = () => {
    setStep((prevStep) => {
      const newStep = Math.max(prevStep - 1, 1);
      return newStep;
    });
    setProgress((prevProgress) => Math.max(prevProgress - 33, 33));
  };

  useEffect(() => {
    console.log('Güncel adım:', step);
    console.log('Güncel ilerleme:', progress);
  }, [step, progress]);

  const handleFormSubmit = () => {
    console.log('Form gönderildi!');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="">
            <p className="text-[#020617] font-extrabold text-4xl text-center">Farm Informations</p>
            <p className="text-[#94A3B8] pt-[10px] mb-[50px] text-center">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
            <RegisterYourForm handlePreviousStep={() => {}} handleFormSubmit={nextStep} step={step} totalStep={TOTAL_STEPS} />
            <a href="/" className="bg-[#CBD5E1] hover:bg-[#adbace] transition-all w-full block text-center mt-3 py-[10px] text-sm font-medium rounded-md">
              I don’t have a farm
            </a>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <p className="text-[#020617] font-extrabold text-4xl">Infrastructure Information</p>
            <p className="text-[#94A3B8] pt-[10px] mb-[50px]">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
            <RegisterYourForm handlePreviousStep={previousStep} handleFormSubmit={nextStep} step={step} totalStep={TOTAL_STEPS} />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M110 55.4V60C109.994 70.7821 106.503 81.2734 100.047 89.9091C93.5908 98.5449 84.5164 104.862 74.1768 107.919C63.8372 110.977 52.7863 110.609 42.6724 106.873C32.5584 103.136 23.9233 96.2305 18.0548 87.1853C12.1863 78.1402 9.39896 67.4403 10.1084 56.6816C10.8178 45.9228 14.986 35.6816 21.9914 27.4854C28.9968 19.2891 38.4639 13.5769 48.9809 11.2007C59.498 8.82454 70.5013 9.91168 80.35 14.3"
                stroke="#16A34A"
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M45 55L60 70L110 20" stroke="#16A34A" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p className="text-[#020617] pt-5 mb-[5px] text-4xl font-extrabold">Congratulations</p>
            <p className="text-[#94A3B8]">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
            <RegisterYourForm handlePreviousStep={() => {}} handleFormSubmit={nextStep} step={step} totalStep={TOTAL_STEPS} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#020617] h-screen w-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded-md p-[50px] max-w-[614px] relative">
          {step < TOTAL_STEPS && (
            <div className="flex justify-center items-center pb-[20px]">
              <Progress className="w-[200px] h-2 bg-[#94A3B8]" value={progress} />
            </div>
          )}
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default Page;
