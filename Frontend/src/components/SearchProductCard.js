import React, { useContext } from 'react'
import displayINRCurrency from '../Helpers/displayCurrency';
import addToCart from '../Helpers/addToCart';
import Context from '../context';
import { Link } from 'react-router-dom';

const SearchProductCard = ({loading,data=[]}) => {

    const loadingList = new Array(13).fill(null);
    const { fetchuserdetails, fetchUserAddCart } = useContext(Context)

    const handleAddtocart= async(e,id)=>{
        await addToCart(e, id)
        await fetchUserAddCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-evenly md:gap-2 overflow-x-auto scrollbar-none transition-all '>
            {
                loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'></div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link to={"/product/" + product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow ' >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.productName} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-1'>
                                    <p className='text-red-500 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button className='  text-base mt-1 bg-red-500 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddtocart(e, product?._id)}>Add to cart</button>
                            </div>
                        </Link>
                    ))
                )
            }
        </div>
    )
}

export default SearchProductCard
