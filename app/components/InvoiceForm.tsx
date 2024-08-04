'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { useContext, useEffect, useState } from 'react';
import FormActions from './FormActions';
import SeactionHeader from './SectionHeader';
import BillFromSection from './BillFromSection';
import BillToSection from './BillToSection';
import { CountriesContext } from './CountriesContext';
import InvoiceDetails from './InvoiceDetails';
import ItemsListSection from './ItemsListSection';
import PreviewSection from './PreviewSection';

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
      price: z.coerce.number().min(1, 'Required'),
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
  items: [{ name: '', quantity: undefined, price: undefined, total: undefined }],
};

function InvoiceForm() {
  const { countries } = useContext(CountriesContext);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const itemsWatch = useWatch({ control: form.control, name: 'items' });

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

  useEffect(() => {
    const calculateSubTotal = () => {
      let subtotal = 0;
      itemsWatch.forEach((item) => {
        if (item.quantity && item.price) {
          subtotal += item.quantity * item.price;
        }
      });
      setSubTotal(subtotal);
    };

    const calculateTotal = () => {
      let totalAmount = 0;
      itemsWatch.forEach((item) => {
        if (item.quantity && item.price) {
          totalAmount += item.quantity * item.price;
        }
      });
      setTotal(totalAmount * 1.1); // Assuming a 10% tax
    };

    calculateSubTotal();
    calculateTotal();
  }, [itemsWatch]);

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
        <div className="w-full rounded-3xl border border-[#D0D5DD] bg-white p-4 dark:bg-gray-800 sm:p-6 lg:w-1/2">
          <Form {...form}>
            <form className="space-y-8">
              <BillFromSection form={form} countries={countries || []} />
              <BillToSection form={form} countries={countries || []} />
              <InvoiceDetails form={form} />
              <ItemsListSection form={form} append={append} remove={remove} fields={fields} />
            </form>
          </Form>
        </div>
        <div className="w-full rounded-3xl bg-[#F5F5F5] p-4 sm:p-6 lg:w-1/2">
          <h3 className="mb-4 text-2xl font-[600] text-[#101828]">Preview</h3>
          <PreviewSection
            invoiceDate={String(form.watch('invoiceDate'))}
            paymentTerm={form.watch('paymentTerms')}
            items={form.watch('items')}
            companyName={form.watch('companyName')}
            companyEmail={form.watch('companyEmail')}
            clientName={form.watch('clientName')}
            clientEmail={form.watch('clientEmail')}
            streetAddress={form.watch('streetAddress')}
            city={form.watch('city')}
            postalCode={form.watch('postalCode')}
            country={form.watch('country')}
            clientStreetAddress={form.watch('clientStreetAddress')}
            clientCity={form.watch('clientCity')}
            clientPostalCode={form.watch('clientPostalCode')}
            clientCountry={form.watch('clientCountry')}
            projectDescription={form.watch('projectDescription')}
            subTotal={subTotal}
            total={total}
          />
        </div>
      </div>
      <div className="mt-4">
        <FormActions isMobile onClickSave={form.handleSubmit(onSubmit)} onClickReset={onReset} />
      </div>
    </>
  );
}

export default InvoiceForm;
