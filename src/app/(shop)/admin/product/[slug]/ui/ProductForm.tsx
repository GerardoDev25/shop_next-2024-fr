'use client';

import { createUpdateProduct } from '@/actions/products';
import { Product, Category, Gender, ProductImage } from '@/interfaces';
import clsx from 'clsx';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

interface Props {
  product: Product & { ProductImage?: ProductImage[] };
  categories: Category[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FromInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Gender;
  categoryId: string;

  //todo images
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FromInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? [],
      // todo images
    },
  });

  const onSendSubmit = async (data: FromInputs) => {
    const formData = new FormData();

    const { ...productToSave } = data;

    formData.append('id', product.id ?? '');
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender);

    const { ok } = await createUpdateProduct(formData);
    console.log({ok});
  };

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from(sizes));
  };

  // ? if sizes change, update the view
  watch('sizes');

  return (
    <form
      onSubmit={handleSubmit(onSendSubmit)}
      className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'
    >
      {/* Textos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Title</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register('title', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register('slug', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Description</span>
          <textarea
            rows={5}
            className='p-2 border rounded-md bg-gray-200'
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Price</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Tags</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            {...register('tags', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Gender</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...register('gender', { required: true })}
          >
            <option value=''>[Select]</option>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kid'>Kid</option>
            <option value='unisex'>Unisex</option>
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Category</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            {...register('categoryId', { required: true })}
          >
            <option value=''>[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className='btn-primary w-full' type='submit'>
          Save
        </button>
      </div>

      {/* sizes and images selector*/}
      <div className='w-full'>
        {/* As checkboxes */}
        <div className='flex flex-col'>
          <span>Sizes</span>
          <div className='flex flex-wrap'>
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- if is selected
              <div
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  'flex  items-center justify-center w-10 h-10 mr-2 border rounded-md transition-all cursor-pointer',
                  { 'bg-blue-500 text-white': getValues().sizes.includes(size) }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className='flex flex-col mb-2'>
            <span>Images</span>
            <input
              type='file'
              multiple
              className='file:bg-gray-200 file:rounded p-2 border rounded-md bg-gray-200'
              accept='image/png, image/jpeg'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {product.ProductImage?.map((image) => (
              <div key={image.id} className='shadow-md rounded-t'>
                <Image
                  src={`/products/${image.url}`}
                  alt={product.title}
                  width={300}
                  height={300}
                />
                <input
                  type='button'
                  className='btn-danger rounded-b-xl w-full'
                  onClick={() => console.log({ id: image.id, url: image.url })}
                  value={'Delete'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
