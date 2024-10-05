'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Control } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '../ui/checkbox';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'password',
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  const [showPassword, setShowPassword] = useState(false);

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md bg-slate-800">
          {iconSrc && <Image className="ml-2" src={iconSrc} height={24} width={24} alt={iconAlt || 'icon'} />}
          <FormControl>
            <Input className="shad-input border-0" placeholder={placeholder} {...field} />
          </FormControl>
        </div>
      );
    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-md bg-slate-800">
          <FormControl>
            <>
              <Input className="shad-input border-0" placeholder={placeholder} type={showPassword ? 'text' : 'password'} {...field} />
              {iconSrc && (
                <Image
                  className="m-2 cursor-pointer"
                  src={showPassword ? '/assets/icons/close-eye.svg' : '/assets/icons/eye.svg'}
                  height={24}
                  width={24}
                  alt={iconAlt || 'icon'}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </>
          </FormControl>
        </div>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} className="bg-slate-100" />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel className="text-[#0F172A]">{label}</FormLabel>}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
