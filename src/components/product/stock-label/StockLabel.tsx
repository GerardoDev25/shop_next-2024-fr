'use client';

import { getProductStockBySlug } from '@/actions/products';
import { titleFont } from '@/config';
import React, { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStock = async () => {
    const inStock = await getProductStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <h1
        className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}
      >
        &nbsp;
      </h1>
    );
  }
  return (
    <>
      <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
        Stock: {stock}
      </h1>
    </>
  );
};
