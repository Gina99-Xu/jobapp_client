import { Control, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  textarea?: boolean;
  disabled?: boolean;
};

export function CustomFormField({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  textarea = false,
}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{label ? label : name}</FormLabel>
          <FormControl>
            {textarea ? (
              <Textarea
                {...field}
                disabled={disabled}
                placeholder={placeholder}
                className='min-h-[100px]'
              />
            ) : (
              <Input {...field} disabled={disabled} placeholder={placeholder} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CustomFormSelectProps<T extends Record<string, string>> = {
  name: string;
  control: Control<any>;
  items: T;
  labelText?: string;
  placeholder?: string;
};

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
  placeholder = 'Select an option',
}: CustomFormSelectProps<T>) {
  const itemValues = Object.values(items) as string[];
  return (
    <div className='space-y-2'>
      {labelText && <Label>{labelText}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className='bg-white !important'>
              {itemValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
export default CustomFormSelect;
