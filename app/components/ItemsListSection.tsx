import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PlusIcon, Trash2 } from 'lucide-react';

type Props = {
  form: any;
  fields: any;
  append: any;
  remove: any;
};

const ItemsListSection = ({ form, fields, append, remove }: Props) => {
  const setTotal = (i: number, quantity: number, price: number) => {
    const amount = quantity * price;
    form.setValue(`items.${i}.total`, Number(amount).toFixed(2));
  };

  return (
    <div>
      <strong className="mb-4 block text-base font-[600] text-[#101828] sm:mb-6 sm:text-2xl">
        Items
      </strong>
      {fields.map((item: any, index: any) => (
        <div key={item.id} className="mb-8 flex flex-col gap-4 sm:mb-4 sm:flex-row sm:items-end">
          <FormField
            control={form.control}
            name={`items.${index}.name`}
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/2">
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Qty.</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTotal(index, e.target.valueAsNumber, form.watch(`items.${index}.price`));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.price`}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTotal(
                        index,
                        form.watch(`items.${index}.quantity`),
                        e.target.valueAsNumber,
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.total`}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input className="bg-muted" type="number" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="ghost"
            type="button"
            onClick={() => remove(index)}
            className="hidden sm:flex"
          >
            <Trash2 />
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => remove(index)}
            className="w-full sm:hidden"
          >
            <Trash2 />
          </Button>
        </div>
      ))}
      <Button
        className="w-full"
        type="button"
        onClick={() => append({ name: '', quantity: 1, price: 0, total: 0 })}
      >
        <PlusIcon size={20} className="mr-2" /> Add New Item
      </Button>
    </div>
  );
};

export default ItemsListSection;
