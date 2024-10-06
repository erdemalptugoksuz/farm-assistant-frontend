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
  name: z.string().min(2, 'Farm Name must be at least 2 characters').max(50, 'Farm Name must be at most 50 characters'),
  area: z.union([z.string().optional(), z.number().min(1, 'Farm Acreage must be at least 1').max(1000, 'Farm Acreage must be at most 1000')]),
  farm_type: z.string().min(2, 'Farm Name must be at least 2 characters').max(50, 'Farm Name must be at most 50 characters'),
  location_lat: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return parseFloat(val.toString());
    }
    return undefined;
  }, z.number().min(-90).max(90)),
  location_long: z.preprocess((val) => {
    if (typeof val === 'string' || typeof val === 'number') {
      return parseFloat(val.toString());
    }
    return undefined;
  }, z.number().min(-180).max(180)),
});
