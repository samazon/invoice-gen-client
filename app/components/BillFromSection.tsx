import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { Country } from './CountriesContext';

type Props = {
  form: any;
  countries: Country[];
};

const BillFromSection = ({ form, countries }: Props) => {
  return (
    <div className="bill-from-section">
      <strong className="mb-4 block text-base font-[600] text-[#101828] sm:mb-6 sm:text-2xl">
        Bill From
      </strong>
      <div className="mb-2 flex w-full flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="mb-2 flex w-full flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-4">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/3">
              <FormLabel htmlFor="companyCountry">Country</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="companyCountry">
                    {field.value ? (
                      <SelectValue placeholder="Select Country" />
                    ) : (
                      <span className="font-normal text-[#667085]">Select Country</span>
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country: Country) => (
                      <SelectItem key={country.cca2} value={country.name.common}>
                        {country.name.common}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/3">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/3">
              <FormLabel>Postal code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex w-full">
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Street address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BillFromSection;
