import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Country } from './CountriesContext';

type Props = {
  form: any;
  countries: Country[];
};

const BillToSection = ({ form, countries }: Props) => {
  return (
    <div className="bill-to-section">
      <strong className="mb-4 block text-base font-[600] text-[#101828] sm:mb-6 sm:text-2xl">
        Bill To
      </strong>
      <div className="mb-2 flex w-full flex-col gap-2 sm:mb-4 sm:flex-row sm:gap-4">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel>{`Client's Name`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientEmail"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel>{`Client's Email`}</FormLabel>
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
          name="clientCountry"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/3">
              <FormLabel htmlFor="clientCountry">Country</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="clientCountry">
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
          name="clientCity"
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
          name="clientPostalCode"
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
      <div className="mb-2 flex w-full sm:mb-4">
        <FormField
          control={form.control}
          name="clientStreetAddress"
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

export default BillToSection;
