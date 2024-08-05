import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { PAYMENT_TERMS } from '@/constants';

type Props = {
  form: any;
};

const InvoiceDetails = ({ form }: Props) => {
  return (
    <>
      <div className="mb-2 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-4">
        <FormField
          control={form.control}
          name="invoiceDate"
          render={({ field }) => (
            <FormItem className="w-full justify-between sm:w-1/2">
              <FormLabel>Invoice date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="flex w-full">
                    <Button
                      variant="outline"
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? format(field.value, 'P') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentTerm"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel htmlFor="paymentTerms">Payment terms</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="paymentTerms">
                    {field.value ? (
                      <SelectValue placeholder="Payment Terms" />
                    ) : (
                      <span className="font-normal text-[#667085]">Select Term</span>
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_TERMS.map((term: string, index: number) => (
                      <SelectItem key={index} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full">
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Project description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default InvoiceDetails;
