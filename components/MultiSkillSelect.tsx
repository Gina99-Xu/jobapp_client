import { CoreSkill } from '@/utils/types';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export function MultiSkillSelect({ control, name }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          isMulti
          options={Object.values(CoreSkill).map((skill) => ({
            value: skill,
            label: skill,
          }))}
          value={field.value?.map((val) => ({ value: val, label: val })) || []}
          onChange={(selected) =>
            field.onChange(selected?.map((item) => item.value))
          }
          className='my-react-select-container'
          classNamePrefix='my-react-select'
        />
      )}
    />
  );
}
