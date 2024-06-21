import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(summaryApi.allProducts.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])



  return (
    <div className='overflow-hidden'>
      <div className='bg-white px-4 py-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg '>
          All Products
        </h2>
        <button className='border-2 rounded-full py-1 px-2 border-red-400 text-red-400 hover:bg-red-500 hover:text-white transistion-all ' onClick={() => setUploadProduct(true)}>Upload Products</button>
      </div>


      {/* all product */}
      <div className='flex  flex-wrap gap-5 py-4 overflow-y-auto max-h-[calc(100vh-190px)]'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />

            )
          })
        }
      </div>


      {/* { upload product} */}
      {
        openUploadProduct && (<UploadProduct onClose={() => setUploadProduct(false)} fetchdata={fetchAllProduct} />
        )
      }

    </div>
  )
}

export default AllProducts
