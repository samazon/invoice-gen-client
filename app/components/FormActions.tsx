import { Button } from '@/components/ui/button';
import { TailSpin } from 'react-loader-spinner';
import clsx from 'clsx';
import React from 'react';

interface Props {
  onClickSave: () => void;
  onClickReset: () => void;
  isMobile: boolean;
  isLoading?: boolean;
}

function FormActions({ onClickSave, onClickReset, isMobile, isLoading }: Props) {
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
        className={clsx('min-w-[65px]', {
          'flex w-1/2': isMobile,
        })}
      >
        Reset
      </Button>
      <Button
        variant="default"
        onClick={onClickSave}
        className={clsx('min-w-[65px]', {
          'flex w-1/2': isMobile,
        })}
      >
        {isLoading ? (
          <TailSpin
            visible
            height="20"
            width="20"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          'Save'
        )}
      </Button>
    </div>
  );
}

export default FormActions;
