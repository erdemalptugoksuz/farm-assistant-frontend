'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Control } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export enum FormFieldType {
  INPUT = 'input',
  NUMBER = 'number',
  CHECKBOX = 'checkbox',
  PASSWORD = 'password',
  SELECT = 'select',
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
  infoText?: string;
  labelColor?: string;
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
    case FormFieldType.NUMBER:
      return (
        <div className="flex rounded-md bg-slate-800">
          {iconSrc && <Image className="ml-2" src={iconSrc} height={24} width={24} alt={iconAlt || 'icon'} />}
          <FormControl>
            <Input className="shad-input border-0" placeholder={placeholder} type="number" {...field} />
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
    case FormFieldType.SELECT:
      return (
        <FormControl className="flex-1">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, infoText, labelColor } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <div className="flex items-center justify-between">
              <FormLabel className={labelColor}>{label}</FormLabel>
              {infoText && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <Image src="/assets/icons/info.svg" height={18} width={18} alt="info" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{infoText}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
