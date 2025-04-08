import type { ComponentPropsWithoutRef } from 'react';
import { PopoverAnchor } from '@radix-ui/react-popover';
import type { UseComboboxGetInputPropsReturnValue } from 'downshift';

import { Input } from '../../../components/ui/input';
import { IconChevronDown } from '@tabler/icons-react';

import { useComboboxContext } from './context';

export type ComboboxInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  keyof UseComboboxGetInputPropsReturnValue
> & {
  controlledValue?: string;
  onControlledChange?: (value: string) => void;
};

export const ComboboxInput = ({
  controlledValue,
  onControlledChange,
  ...props
}: ComboboxInputProps) => {
  const { getInputProps, isOpen } = useComboboxContext();

  // Lấy các props từ Downshift
  const downshiftInputProps = getInputProps?.() || {};

  // Tạo handler kết hợp
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Gọi handler của Downshift nếu có
    (downshiftInputProps as React.InputHTMLAttributes<HTMLInputElement>).onChange?.(e);

    // Gọi handler được kiểm soát nếu được cung cấp
    onControlledChange?.(e.target.value);
  };

  return (
    <div className='relative w-full' data-combobox-input-wrapper=''>
      <PopoverAnchor asChild>
        <Input
          {...props}
          {...downshiftInputProps}
          // Ghi đè các props cần kiểm soát
          value={controlledValue !== undefined ? controlledValue : (downshiftInputProps as any).value ?? ''}
          onChange={handleChange}
        />
      </PopoverAnchor>
      <div className='pointer-events-none absolute inset-y-0 end-3 grid h-full place-items-center'>
        <IconChevronDown className={` size-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
    </div>
  );
};
