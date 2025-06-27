"use client";
import React from 'react';
import { Product } from "@/app/types/Product";
import { Brand } from "@/app/types/Brand";

type Props = {
    product: Product;
    brand?: Brand;
};


const ProductInfo = ({product, brand}: Props ) => {
    return (
        <div className='w-full bg-white rounded-xl shadow p-4 mt-4'>
            <h2 className='font-semibold text-xl'>Mô tả</h2>
            <p className='mt-2'>{product.description}</p>
            {product.origin && (
            <div className='mt-6 flex flex-col gap-2'>
                <span className='text-gray-400 text-sm'>Nguồn gốc</span>
                <span className='font-medium'>{product.origin}</span>
            </div>
            )}
            {brand?.name && (
            <div className='mt-6 flex flex-col gap-2'>
                <span className='text-gray-400 text-sm'>Thương hiệu</span>
                <span className='font-medium'>{brand?.name}</span>
            </div>
            )}
            {product.display_unit && (
            <div className='mt-6 flex flex-col gap-2'>
                <span className='text-gray-400 text-sm'>Đơn vị</span>
                <span className='font-medium'>{product.display_unit}</span>
            </div>
            )}
            {product.weight > 0 && product.weight_unit && (
            <div className='mt-6 flex flex-col gap-2'>
                <span className='text-gray-400 text-sm'>Khối lượng</span>
                <span className='font-medium'>{product.weight}{product.weight_unit}</span>
            </div>
            )}
            {product.expired_at && (
            <div className='mt-6 flex flex-col gap-2'>
                <span className='text-gray-400 text-sm'>Ngày hết hạn</span>
                <span className='font-medium'>{product.expired_at}</span>
            </div>
            )}
            {product.ingredient && (
            <div className='mt-6 flex flex-col gap-2'>
                <span className='text-gray-400 text-sm'>Thành phần</span>
                <span className='font-medium'>{product.ingredient}</span>
            </div>
            )}
            {product.usage && (
            <div className='mt-6 flex flex-col gap-2'>
                <span className='text-gray-400 text-sm'>Cách sử dụng</span>
                <span className='font-medium'>{product.usage}</span>
            </div>
            )}
        </div>
    );
};

export default ProductInfo;