'use client';

import React, { createContext, useState, useEffect } from 'react';

export interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

interface CountriesContextValue {
  countries: Country[];
  isLoading: boolean;
  error: string | null;
}

export const CountriesContext = createContext<CountriesContextValue>({
  countries: [],
  isLoading: false,
  error: null,
});

export const CountriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch countries');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, isLoading, error }}>
      {children}
    </CountriesContext.Provider>
  );
};
