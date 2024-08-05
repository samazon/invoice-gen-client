import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import React from 'react';

interface Props {
  onClickSave: () => void;
  onClickReset: () => void;
  isMobile: boolean;
}

function FormActions({ onClickSave, onClickReset, isMobile }: Props) {
  return (
    <div
      className={clsx('gap-4', {
        'flex w-full sm:hidden': isMobile,
        'hidden sm:flex': !isMobile,
      })}
    >
      <Button
        variant="outline"
        onClick={onClickReset}
        className={clsx({
          'flex w-1/2': isMobile,
        })}
      >
        Reset
      </Button>
      <Button
        variant="default"
        onClick={onClickSave}
        className={clsx({
          'flex w-1/2': isMobile,
        })}
      >
        Save
      </Button>
    </div>
  );
}

export default FormActions;
