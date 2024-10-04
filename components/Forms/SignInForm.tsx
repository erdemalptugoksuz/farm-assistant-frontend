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
import { SignInValidation } from '@/lib/validation';

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof SignInValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        email,
        password,
      };

      let response = await fetch('/api/auth/sign-in', {
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
        router.push('/');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-8 flex flex-col items-center">
          <h1 className="header">
            Welcome <span className="text-green-700">back Farmer</span>
          </h1>
          <p className="text-dark-700 text-sm">Manage your field with ease!</p>
        </section>
        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email" placeholder="macdonald@farm.com" />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Password"
          placeholder="your strong password"
          iconAlt="password"
          iconSrc="/assets/icons/eye.svg"
        />
        <SubmitButton isLoading={isLoading} buttonState={form.formState.isValid}>
          Welcome Back
        </SubmitButton>
      </form>
    </Form>
  );
};

export default SignInForm;
