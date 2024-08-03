'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { useContext } from 'react';
import FormActions from './FormActions';
import SeactionHeader from './SectionHeader';
import BillFromSection from './BillFromSection';
import BillToSection from './BillToSection';
import { CountriesContext } from './CountriesContext';
import InvoiceDetails from './InvoiceDetails';
import ItemsListSection from './ItemsListSection';

const invoiceSchema = z.object({
  companyName: z.string().min(2, 'Required').trim(),
  companyEmail: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  postalCode: z.string().min(1, 'Required'),
  streetAddress: z.string().min(1, 'Required'),
  clientName: z.string().min(1, 'Required'),
  clientEmail: z.string().min(1, 'Required').email('Invalid email.'),
  clientCountry: z.string().min(1, 'Required'),
  clientCity: z.string().min(1, 'Required'),
  clientPostalCode: z.string().min(1, 'Required'),
  clientStreetAddress: z.string().min(1, 'Required'),
  invoiceDate: z.date(),
  paymentTerms: z.string().min(1, 'Required'),
  projectDescription: z.string().min(1, 'Required'),
  items: z.array(
    z.object({
      name: z.string().min(1, 'Required'),
      quantity: z.coerce.number().min(1, 'Required'),
      price: z.coerce.number().min(0, 'Required'),
      total: z.coerce.number().min(0, 'Required'),
    }),
  ),
});

const defaultValues = {
  companyName: '',
  companyEmail: '',
  country: undefined,
  city: '',
  postalCode: '',
  streetAddress: '',
  clientName: '',
  clientEmail: '',
  clientCountry: '',
  clientCity: '',
  clientPostalCode: '',
  clientStreetAddress: '',
  invoiceDate: new Date(),
  paymentTerms: '',
  projectDescription: '',
  items: [{ name: '', quantity: 1, price: 0, total: 0 }],
};

function InvoiceForm() {
  const { countries } = useContext(CountriesContext);

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const onSubmit = (values: z.infer<typeof invoiceSchema>) => {
    console.log(values);
  };

  const onReset = () => {
    form.reset(defaultValues);
  };

  return (
    <>
      <SeactionHeader
        title="New Invoice"
        subtitle="Create new invoice for your customers"
        actions={
          <FormActions
            isMobile={false}
            onClickSave={form.handleSubmit(onSubmit)}
            onClickReset={onReset}
          />
        }
      />
      <div className="flex flex-col justify-between gap-5 lg:flex-row">
        <div className="w-full rounded-3xl border border-[#D0D5DD] bg-white p-4 dark:bg-gray-800 lg:w-1/2">
          <Form {...form}>
            <form className="space-y-8">
              <BillFromSection form={form} countries={countries || []} />
              <BillToSection form={form} countries={countries || []} />
              <InvoiceDetails form={form} />
              <ItemsListSection form={form} append={append} remove={remove} fields={fields} />
            </form>
          </Form>
        </div>
        <div className="w-full rounded-3xl bg-[#F5F5F5] p-4 lg:w-1/2">
          <h3 className="mb-4 text-2xl font-[600] text-[#101828]">Preview</h3>
          Preview component here
        </div>
      </div>
      <div className="mt-4">
        <FormActions isMobile onClickSave={form.handleSubmit(onSubmit)} onClickReset={onReset} />
      </div>
    </>
  );
}

export default InvoiceForm;
