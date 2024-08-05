import { CountriesProvider } from './components/CountriesContext';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';

export default function Home() {
  return (
    <CountriesProvider>
      <Header />
      <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8">
        <InvoiceForm />
      </main>
    </CountriesProvider>
  );
}
