import React, { useEffect, useState } from 'react';
import { getCategories} from '../services/index'
import Link from 'next/link'

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res))
  }, [])

  return (
    <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
      <h4 className='text-xl mb-8 font-semibold border-b pb-4'>
       Categories  
      </h4>
      {categories.map(category => (
        <Link href={`/category/${category.slug}`} key={category.slug}>
          <span className='cursor-pointer block pb-3 mb-3 text-indigo-800 hover:text-indigo-400 transition duration-300'>
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Categories;



