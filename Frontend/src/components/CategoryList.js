import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { Link } from 'react-router-dom';


const CategoryList = () => {
    const [categoryproduct, setcategoryproduct] = useState([])
    const [loading, setloading] = useState(false)
    const categoryLoading = new Array(13).fill(null)

    const fetchcategoryproducts = async () => {
        setloading(true)
        const response = await fetch(summaryApi.categoryproduct.url)
        const dataresponse = await response.json()
        setloading(false)
        setcategoryproduct(dataresponse.data)
    }

    useEffect(() => {
        fetchcategoryproducts()
    }, [])
    return (
        <div className='container mx-auto p-4 px-8'>
            <div className='flex justify-between  gap-4 items-center overflow-x-auto scrollbar-none'>
                {
                    loading ? (

                        categoryLoading.map((cat, index) => {
                            return (
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center animate-pulse' key={'categoryLoading'+index}></div>
                            )
                        })

                    ) :
                        (
                            categoryproduct.map((el, index) => {
                                return (
                                    <Link to={'/product-category/' + el?.category} className='cursor-pointer' key={el?.category }>
                                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center '>
                                            <img src={el?.productImage[0]} alt={el?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all ' />
                                        </div>
                                        <p className='text-center text-sm md:text-base capitalize'>{el?.category}</p>
                                    </Link>
                                )
                            }))
                }

            </div>
        </div>
    )
}

export default CategoryList
