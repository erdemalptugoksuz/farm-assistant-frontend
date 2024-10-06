'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import RegisterYourFarm from '@/components/Forms/RegisterYourFarm';
import { Progress } from '@/components/ui/progress';

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
    //TODO : Remove this useEffect
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
            <p className="text-slate-950 font-extrabold text-4xl text-center">Farm Informations</p>
            <p className="text-slate-400 pt-[10px] mb-[50px] text-center">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
            <RegisterYourFarm handlePreviousStep={() => {}} handleFormSubmit={nextStep} step={step} totalStep={TOTAL_STEPS} />
            <Link href="/" className="bg-slate-300 hover:bg-[#adbace] transition-all w-full block text-center mt-3 py-[10px] text-sm font-medium rounded-md">
              I don’t have a farm
            </Link>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <p className="text-slate-950 font-extrabold text-4xl">Infrastructure Information</p>
            <p className="text-slate-400 pt-[10px] mb-[50px]">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
            <RegisterYourFarm handlePreviousStep={previousStep} handleFormSubmit={nextStep} step={step} totalStep={TOTAL_STEPS} />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <Image src="/assets/icons/success.svg" height={120} width={120} alt="success" />
            <p className="text-slate-950 pt-5 mb-[5px] text-4xl font-extrabold">Congratulations</p>
            <p className="text-slate-400">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
            <RegisterYourFarm handlePreviousStep={() => {}} handleFormSubmit={nextStep} step={step} totalStep={TOTAL_STEPS} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-950 h-screen w-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded-md p-[50px] max-w-[614px] relative">
          {step < TOTAL_STEPS && (
            <div className="flex justify-center items-center pb-[20px]">
              <Progress className="w-[200px] h-2 bg-slate-400" value={progress} />
            </div>
          )}
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default Page;
