import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Item } from '@/types';

type Props = {
  invoiceDate: string;
  paymentTerm: string;
  companyName: string;
  companyEmail: string;
  clientName: string;
  clientEmail: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostalCode: string;
  clientCountry: string;
  projectDescription: string;
  subTotal: number;
  total: number;
  items: any[];
};

const PreviewSection = ({
  invoiceDate,
  paymentTerm,
  companyName,
  companyEmail,
  clientName,
  clientEmail,
  streetAddress,
  city,
  postalCode,
  country,
  clientStreetAddress,
  clientCity,
  clientPostalCode,
  clientCountry,
  projectDescription,
  subTotal,
  total,
  items,
}: Props) => {
  return (
    <div className="rounded-2xl bg-white p-4 sm:p-6">
      <strong className="block text-lg font-semibold">Invoice</strong>
      <hr className="my-4" />
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex w-full flex-col sm:w-1/2">
          <span className="preview-label">Invoice Date</span>
          <span className="preview-data">{invoiceDate && format(invoiceDate, 'P')}</span>
        </div>
        <div className="flex w-full flex-col sm:w-1/2">
          <span className="preview-label">Payment Term</span>
          <span>{paymentTerm}</span>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex w-full flex-col sm:w-1/2">
          <span className="preview-label">Billed From</span>
          <span className="preview-data">{companyName}</span>
          <span className="preview-data">{companyEmail}</span>
          <span className="preview-data">{streetAddress}</span>
          <span className="preview-data">
            {city && postalCode ? `${city}, ${postalCode}` : city || postalCode}
          </span>
          <span className="preview-data">{country}</span>
        </div>
        <div className="flex w-full flex-col sm:w-1/2">
          <span className="preview-label">Billed To</span>
          <span className="preview-data">{clientName}</span>
          <span className="preview-data">{clientEmail}</span>
          <span className="preview-data">{clientStreetAddress}</span>
          <span className="preview-data">
            {clientCity && clientPostalCode
              ? `${clientCity}, ${clientPostalCode}`
              : clientCity || clientPostalCode}
          </span>
          <span className="preview-data">{clientCountry}</span>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <span className="preview-label">Project description</span>
        <span className="preview-data">{projectDescription}</span>
      </div>
      <div className="mt-4 flex flex-col">
        <span className="preview-label">Items</span>
        <Table>
          <TableHeader className="rounded-sm bg-[#F5F5F5]">
            <TableRow>
              <TableHead className="w-[150px] text-[#76787D]">Item</TableHead>
              <TableHead className="w-[100px] text-[#76787D]">Qty.</TableHead>
              <TableHead className="w-[100px] text-[#76787D]">Price</TableHead>
              <TableHead className="text-right text-[#76787D]">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(
              (item: Item, index: number) =>
                item.name && ( // Check if item.name exists before rendering the row
                  <TableRow key={index}>
                    <TableCell className="text-base">{item.name}</TableCell>
                    <TableCell className="text-base">{item.quantity}</TableCell>
                    <TableCell className="text-base">{item.price && `$ ${item.price}`}</TableCell>
                    <TableCell className="text-right text-base">
                      {item.price && item.total && `$ ${item.total}`}
                    </TableCell>
                  </TableRow>
                ),
            )}
          </TableBody>
        </Table>
      </div>
      <hr className="mb-6" />
      <div className="flex w-full justify-end">
        <div className="flex w-1/2 flex-col items-end">
          <div className="flex w-full justify-between">
            <span className="text-base font-semibold leading-[38px] text-[#101828]">Subtotal</span>
            <span className="text-base font-semibold leading-[38px] text-[#101828]">
              $ {subTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-base font-semibold leading-[38px] text-[#101828]">Tax</span>
            <span className="text-base font-semibold leading-[38px] text-[#101828]">10%</span>
          </div>
          <div className="flex w-full justify-between">
            <span className="text-xl font-bold leading-[38px] text-[#101828]">Total</span>
            <span className="text-xl font-bold leading-[38px] text-[#101828]">
              $ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
