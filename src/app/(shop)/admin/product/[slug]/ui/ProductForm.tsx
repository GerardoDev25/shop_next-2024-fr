'use client';

import { Product, Category, Gender } from '@/interfaces';
import { useForm } from 'react-hook-form';

interface Props {
  product: Product;
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
  } = useForm<FromInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? [],
      // todo images
    },
  });

  const onSendSubmit = async (data: FromInputs) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSendSubmit)} className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'>
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

        <button className='btn-primary w-full'>Save</button>
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
                className='flex  items-center justify-center w-10 h-10 mr-2 border rounded-md'
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
              className='p-2 border rounded-md bg-gray-200'
              accept='image/png, image/jpeg'
            />
          </div>
        </div>
      </div>
    </form>
  );
};
