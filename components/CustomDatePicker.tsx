'use client';

import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-dropdown-menu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function CustomDatePicker({ control, name, label }) {
  return (
    <div className='space-y-2'>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                const isoDate = date?.toISOString().split('T')[0];
                field.onChange(isoDate);
              }}
              className='w-full p-2 border rounded'
              dateFormat='yyyy-MM-dd'
              placeholderText='Select a date'
            />
            {fieldState.error && <p>{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>
  );
}
