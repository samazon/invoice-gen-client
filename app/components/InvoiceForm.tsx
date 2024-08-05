'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { gql, useMutation } from '@apollo/client';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { useContext, useEffect, useState } from 'react';
import { InvoiceFormDefaults, InvoiceFormSchema } from '@/constants';
import { Bounce, toast } from 'react-toastify';
import { formatISO } from 'date-fns';
import { filterItems } from '@/lib/utils';
import FormActions from './FormActions';
import SeactionHeader from './SectionHeader';
import BillFromSection from './BillFromSection';
import BillToSection from './BillToSection';
import { CountriesContext } from './CountriesContext';
import InvoiceDetails from './InvoiceDetails';
import ItemsListSection from './ItemsListSection';
import PreviewSection from './PreviewSection';
import ToastComponent from './ToastComponent';

const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
      invoiceDate
      projectDescription
      subTotal
      tax
      totalAmount
      billingFrom {
        companyEmail
        companyName
        id
        billingFromAddress {
          city
          country
          postalCode
          streetAddress
        }
      }
      billingTo {
        clientEmail
        clientName
        id
        billingToAddress {
          city
          country
          postalCode
          streetAddress
        }
      }
      items {
        id
        name
        price
        quantity
        totalPrice
      }
      paymentTerms
    }
  }
`;

function InvoiceForm() {
  const { countries } = useContext(CountriesContext);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const form = useForm<z.infer<typeof InvoiceFormSchema>>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues: InvoiceFormDefaults,
  });

  const itemsWatch = useWatch({ control: form.control, name: 'items' });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const [createInvoice] = useMutation(CREATE_INVOICE);

  const onSubmit = async (values: z.infer<typeof InvoiceFormSchema>) => {
    const filteredItems = filterItems(values.items);
    const invoiceData = {
      input: {
        createInvoiceAttributes: {
          paymentTerms: String(values.paymentTerm).toUpperCase().split(' ').join('_'),
          projectDescription: values.projectDescription,
          billingToAttributes: {
            clientName: values.companyName,
            clientEmail: values.companyEmail,
            billingToAddressAttributes: {
              streetAddress: values.clientStreetAddress,
              city: values.clientCity,
              country: values.clientCountry,
              postalCode: values.clientPostalCode,
            },
          },
          billingFromAttributes: {
            billingFromAddressAttributes: {
              streetAddress: values.streetAddress,
              city: values.city,
              country: values.country,
              postalCode: values.postalCode,
            },
            companyEmail: values.companyEmail,
            companyName: values.companyName,
          },
          itemAttributes: filteredItems,
          invoiceDate: formatISO(values.invoiceDate),
        },
        clientMutationId: 'unique-client-id-123',
      },
    };

    try {
      const response = await createInvoice({ variables: invoiceData });
      if (Object.keys(response.data).length > 0) {
        toast(<ToastComponent />, {
          position: 'top-right',
          autoClose: 2000,
          theme: 'light',
          transition: Bounce,
        });
      }
    } catch (err) {
      toast('Error creating invoice', { type: 'error' });
    } finally {
      form.reset(InvoiceFormDefaults);
    }
  };

  const onReset = () => {
    form.reset(InvoiceFormDefaults);
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
            paymentTerm={form.watch('paymentTerm')}
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
