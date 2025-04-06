import { type ComponentPropsWithoutRef, useMemo } from 'react';

import { cn } from '../../../lib/utils';

import { useComboboxContext } from './context';
import type { ComboboxItemBase } from './types';
import { IconCircle } from '@tabler/icons-react';

export type ComboboxItemProps = ComboboxItemBase &
  ComponentPropsWithoutRef<'li'>;

export const ComboboxItem = ({
  label,
  description,
  value,
  disabled,
  className,
  children,
  ...props
}: ComboboxItemProps) => {
  const { filteredItems, getItemProps, selectedItem } = useComboboxContext();

  const isSelected = selectedItem?.value === value;
  const item = useMemo(
    () => ({ disabled, label, value }),
    [disabled, label, value]
  );
 const index = (filteredItems || []).findIndex(
  item => {
    if (!item.value || value === null || value === undefined) return false;
    return item.value.toString().toLowerCase() === value.toString().toLowerCase();
  }
);

  if (index < 0) return null;

  return (
    <li
      {...props}
      data-index={index}
      className={cn(
        `relative flex cursor-default select-none flex-col rounded-sm px-3 py-1.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground`,
        !children && 'ps-8',
        className
      )}
      {...getItemProps?.({ item, index })}
    >
      {children || (
        <>
        <div className='flex flex-col '>
              <span className='text-sm text-foreground'>{label}</span>
            {description &&   <span className='text-xs text-foreground breaks-word'>{description}</span>}
        </div>
          {isSelected && (
            <span className='absolute start-3 top-0 flex h-full items-center justify-center'>
              <IconCircle className='size-2 fill-current' />
            </span>
          )}
        </>
      )}
    </li>
  );
};
