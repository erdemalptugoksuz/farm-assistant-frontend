'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../Core/CustomFormField';
import SubmitButton from '../Core/SubmitButton';
import { SignUpValidation } from '@/lib/validation';

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  async function onSubmit({ name, email, password }: z.infer<typeof SignUpValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        name,
        email,
        password,
      };

      let response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          variant: 'destructive',
        });
      } else if (response.status) {
        router.push('/auth/register-your-farm');
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-8 flex flex-col items-center">
          <h1 className="header">
            Welcome <span className="text-green-700">new Farmer</span>
          </h1>
          <p className="text-dark-700 text-sm">Manage your field with ease!</p>
        </section>
        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="name" label="Full name" placeholder="Old MacDonald" labelColor="text-slate-50" />
        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email" placeholder="macdonald@farm.com" labelColor="text-slate-50" />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Password"
          placeholder="your strong password"
          iconAlt="password"
          iconSrc="/assets/icons/eye.svg"
          labelColor="text-slate-50"
        />
        <CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name="terms" label="I agree to the terms and conditions" />
        <SubmitButton isLoading={isLoading} buttonState={form.formState.isValid}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default SignUpForm;
