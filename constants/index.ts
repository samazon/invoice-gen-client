import { z } from 'zod';

export const PAYMENT_TERMS = ['Net 10 days', 'Net 20 days', 'Net 30 days'];
export const GRAPHQL_ENDPOINT_URL =
  'https://sse-frontend-assessment-api-823449bb66ac.herokuapp.com/graphql';

export const InvoiceFormSchema = z.object({
  companyName: z.string().min(2, 'Required').trim(),
  companyEmail: z.string().min(1, 'Required').email('Invalid email.'),
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
  paymentTerm: z.string().min(1, 'Required'),
  projectDescription: z.string().min(1, 'Required'),
  items: z.array(
    z.object({
      name: z.string().min(1, 'Required'),
      quantity: z.coerce.number({ invalid_type_error: 'Required' }).min(1, 'Required'),
      price: z.coerce.number({ invalid_type_error: 'Required' }).min(1, 'Required'),
      total: z.coerce.number({ invalid_type_error: 'Required' }),
    }),
  ),
});

export const InvoiceFormDefaults = {
  companyName: '',
  companyEmail: '',
  country: '',
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
  paymentTerm: '',
  projectDescription: '',
  items: [
    {
      name: '',
      quantity: undefined,
      price: undefined,
      total: undefined,
    },
  ],
};
