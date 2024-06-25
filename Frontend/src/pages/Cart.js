import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../Helpers/displayCurrency';
import { MdDelete } from "react-icons/md";


const Cart = () => {

  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)


  const context = useContext(Context)
  const loadingCart = new Array(context.cartproductcount).fill(null)






  const fetchdata = async () => {
    // setloading(true)
    const response = await fetch(summaryApi.addtocartview.url, {
      method: summaryApi.addtocartview.method,
      credentials: "include",
      headers: { 'content-type': 'application/json' },

    })
    // setloading(false)
    const responsedata = await response.json()
    if (responsedata.success) {
      setdata(responsedata.data)
    }


  }

  const handleLoading = async () => {
    await fetchdata()
  }

  useEffect(() => {
    setloading(true)
    handleLoading()
    setloading(false)
  }, [])



  const increaseQty = async (id, qty) => {
    const response = await fetch(summaryApi.updateCartProduct.url, {
      method: summaryApi.updateCartProduct.method,
      credentials: "include",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(
        {
          _id: id,
          quantity: qty + 1,
        }
      )
    })
    const responsedata = await response.json()
    if (responsedata.success) {
      fetchdata()
    }
  }

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(summaryApi.updateCartProduct.url, {
        method: summaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify(
          {
            _id: id,
            quantity: qty - 1
          }
        )
      })

      const responseData = await response.json()


      if (responseData.success) {
        fetchdata()
      }
    }
  }


  const deleteProduct = async (id) => {

    const response = await fetch(summaryApi.deleteCartProduct.url, {
      method: summaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(
        {
          _id: id,
        }
      )
    })

    const responseData = await response.json()


    if (responseData.success) {
      fetchdata()
      context.fetchUserAddCart()
    }

  }

  const totalqty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
  const totalprice = data.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.productId?.sellingPrice), 0)








  console.log("cart", data)
  return (
    <div className='container  mx-auto p-4 px-8'>
      <div className='text-center text-lg '>
        {
          data.length == 0 && !loading && (
            <p className='bg-white py-2'>No Data</p>
          )
        }

      </div>

      <div className='flex flex-col lg:justify-between lg:flex-row gap-10 p-4'>
        {/* View Product */}
        <div className='w-full max-w-3xl  '>
          {
            loading ? (
              loadingCart.map((el, index) => {
                return (
                  <div key={el + "Add To Cart" + index} className='hidden w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'>

                  </div>

                )
              })

            ) : (
              data.map((product, index) => {
                return (
                  <div key={product?._id + "Add To Cart"} className='w-full bg-white h-36 my-2 border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-36 bg-slate-200 '>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply p-2' />
                    </div>
                    <div className='p-4 relative'>
                      <div className='absolute right-0 text-red-600 rounded-full p-2 cursor-pointer hover:bg-red-600 hover:text-white' onClick={() => deleteProduct(product?._id)}>
                        <MdDelete />
                      </div>
                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 '>{product?.productId?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                      <div className='flex justify-between items-center'>
                        <p className='text-red-600 font-medium text-lg  '>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                        <p className='text-slate-600 font-semibold text-lg '>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                      </div>
                      <div className='flex items-center gap-3 mt-2'>
                        <button className=' border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={() => decraseQty(product?._id, product?.quantity)}>-</button>
                        <span>{product?.quantity}</span>
                        <button className=' border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>

                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>


        {/* total product  */}
        <div className='mt-5 lg:mt-0 w-full max-w-md'>
          {loading ? (
            <div className='h-36 bg-slate-200 border border-slate-200 animate-pulse'>

            </div>
          ) :
            (
              <div className='h-36 bg-white'>
                <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Quantity</p>
                  <p>{totalqty}</p>
                </div>

                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalprice)}</p>
                </div>

                <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

              </div>
            )
          }

        </div>


      </div>
    </div>
  )
}

export default Cart
