'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import ReactConfetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../Core/CustomFormField';
import SubmitButton from '../Core/SubmitButton';
import { RegisterYourFarmValidation } from '@/lib/validation';
import { MultiSelect } from '@/components/ui/multiselect';

interface RegisterYourFormProps {
  handleFormSubmit: () => void;
  handlePreviousStep: () => void;
  step: number;
  totalStep: number;
}

const RegisterYourForm: React.FC<RegisterYourFormProps> = ({ handleFormSubmit, step, totalStep, handlePreviousStep }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formCase, setFormCase] = useState<'case1' | 'case2' | 'case3'>('case1');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  useEffect(() => {
    if (step === 3) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const options = [
    { value: 'option1', label: 'Electricity' },
    { value: 'option2', label: 'Electricity' },
    { value: 'option3', label: 'Electricity' },
    { value: 'option4', label: 'Electricity' },
  ];

  const form = useForm<z.infer<typeof RegisterYourFarmValidation>>({
    resolver: zodResolver(RegisterYourFarmValidation),
    defaultValues: {
      farmName: '',
      farmAcreage: '',
      farmType: '',
      farmOther: '',
    },
  });

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (step === 2) {
        handleFormSubmit();

        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }, 100);
      } else if (step === totalStep) {
        const userData = { ...form.getValues(), selectedOptions };
        let response = await fetch('/api/auth/register-your-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (data.error) {
          toast({
            title: 'Hata',
            description: data.error,
            variant: 'destructive',
          });
        } else if (response.ok) {
          router.push('/');
        }
      } else {
        handleFormSubmit();
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-2 gap-x-5 gap-y-[30px]">
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="farmName" label="Farm Name" placeholder="Jack Teller’s Farm" />
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="farmAcreage" label="Farm Acreage" placeholder="578" />
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="farmType" label="Farm Type" placeholder="Select an option" />
            <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="farmOther" label="Other Field" placeholder="Other field" />
          </div>
        );
      case 2:
        return (
          <div className="h-[182px]">
            <MultiSelect options={options} onChange={setSelectedOptions} className="w-full" />
          </div>
        );
      case 3:
        return <div></div>;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={submitForm}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            {renderFormContent()}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center mt-[50px]">
          {step === 2 && (
            <button type="button" onClick={handlePreviousStep} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors mr-2">
              Geri
            </button>
          )}

          <SubmitButton isLoading={isLoading} buttonState={form.formState.isValid}>
            {step === totalStep ? 'Complete' : 'Next'}
          </SubmitButton>
        </div>
      </form>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <ReactConfetti width={windowDimensions.width} height={windowDimensions.height} recycle={false} numberOfPieces={200} />
        </div>
      )}
    </Form>
  );
};

export default RegisterYourForm;
