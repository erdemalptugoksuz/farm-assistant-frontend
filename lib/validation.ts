import { z } from 'zod';

export const SignUpValidation = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  terms: z.boolean().refine((value) => value === true, { message: 'You must agree to the terms and conditions' }),
});

export const SignInValidation = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const RegisterYourFarmValidation = z.object({
  farmName: z.string().min(2, 'Farm Name must be at least 2 characters').max(50, 'Farm Name must be at most 50 characters'),
  farmAcreage: z.string().min(2, 'Farm Acreage must be at least 2 characters').max(50, 'Farm Acreage must be at most 50 characters'),
  farmType: z.string().min(2, 'Farm Name must be at least 2 characters').max(50, 'Farm Name must be at most 50 characters'),
  farmOther: z.string().min(2, 'Farm Name must be at least 2 characters').max(50, 'Farm Name must be at most 50 characters'),
});
