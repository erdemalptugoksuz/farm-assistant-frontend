'use client';

import { useState, useEffect } from 'react';
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
import { SelectItem } from '@/components/ui/select';

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
  const [facilities, setFacilities] = useState<string[]>([]);
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

  const infrastructurInformationOptions = [
    { value: 'electricity', label: 'Electricity' },
    { value: 'water', label: 'Water' },
    { value: 'internet-network', label: 'Internet Network' },
    { value: 'natural-gas', label: 'Natural Gas' },
  ];

  const farmTypeOptions = ['Just field', 'With home', 'Big factory'];

  const infoTexts = {
    farmName: 'Your farm name like Jack Teller’s Farm',
    farmAcreage: 'Your farm acreage like 578',
    farmType: 'Your farm type like Just field',
    farmLat: 'Please visit www.latlong.net/ for your location information',
    farmLong: 'Please visit www.latlong.net/ for your location information',
  };

  const form = useForm<z.infer<typeof RegisterYourFarmValidation>>({
    resolver: zodResolver(RegisterYourFarmValidation),
    defaultValues: {
      name: '',
      area: '',
      farm_type: '',
      location_lat: '',
      location_long: '',
    },
  });

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (step === 2) {
        const userData = { ...form.getValues(), facilities };
        userData.area = parseInt(userData.area);

        const response = await fetch('/api/farm/create-farm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log('data', data);
        console.log('response', response);

        if (response.ok) {
          handleFormSubmit();
          setTimeout(() => {
            setShowConfetti(true);
            setTimeout(() => {
              setShowConfetti(false);
            }, 5000);
          }, 100);
        } else if (response.status === 401) {
          toast({
            title: 'Error',
            description: 'You are not authorized to perform this action.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'destructive',
          });
        }
      } else if (step === totalStep) {
        window.location.href = '/';
      } else {
        handleFormSubmit();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
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
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Farm Name"
              placeholder="Jack Teller’s Farm"
              infoText={infoTexts.farmName}
              labelColor="text-slate-950"
            />
            <CustomFormField fieldType={FormFieldType.NUMBER} control={form.control} name="area" label="Farm Acreage" placeholder="578" infoText={infoTexts.farmAcreage} labelColor="text-slate-950" />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="farm_type"
              label="Farm Type"
              placeholder="Select your farm type"
              infoText={infoTexts.farmType}
              labelColor="text-slate-950"
            >
              {farmTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              name="location_lat"
              label="Latitude"
              placeholder="42.12312312"
              infoText={infoTexts.farmLat}
              labelColor="text-slate-950"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              name="location_long"
              label="Longitude"
              placeholder="21.123123321"
              infoText={infoTexts.farmLong}
              labelColor="text-slate-950"
            />
          </div>
        );
      case 2:
        return (
          <div className="h-[182px]">
            <MultiSelect options={infrastructurInformationOptions} onChange={setFacilities} className="w-full" />
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

          <SubmitButton isLoading={isLoading} buttonState={step === totalStep ? true : form.formState.isValid}>
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
