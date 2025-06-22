import React from 'react';
import { NavProps } from '@/app/types/Nav';

const MainNav: React.FC<NavProps> = ({items}) => {
    return (
        <div className='flex justify-start items-center gap-4 '>
            {items.map((item, index) => 
                <a key={index} href={item.href} className='text-sm font-medium border py-1 px-2 rounded-lg text-[#921573] hover:bg-[#921573] hover:text-white transition-colors duration-200'>
                    {item.label}
                </a>
            )}
        </div>
    );
};

export default MainNav;