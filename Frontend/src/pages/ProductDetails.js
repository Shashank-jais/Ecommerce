import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import summaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../Helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import RecommendProduct from '../components/RecommendProduct';
import Context from '../context';
import addToCart from '../Helpers/addToCart';

const ProductDetails = () => {
  const [data, setdata] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })

  const params = useParams()
  const [loading, setloading] = useState(false)
  const productimg = new Array(4).fill(null)
  const [activeimage, setactiveimage] = useState("")
  const [zoomimageCoor, setzoomimageCoor] = useState({
    x: 0,
    y: 0
  })
  const [zoomImage, setZoomImage] = useState(false)
  const navigate = useNavigate()




  const { fetchuserdetails, fetchUserAddCart } = useContext(Context)



    const handleAddtocart= async(e,id)=>{
        await addToCart(e, id)
        await fetchUserAddCart()
    }


  const fetchProductDetails = async () => {
    setloading(true)
    const response = await fetch(summaryApi.productDetails.url, {
      method: summaryApi.productDetails.method,
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setloading(false)
    const dataresponse = await response.json()
    setdata(dataresponse?.data)
    setactiveimage(dataresponse?.data.productImage[0])
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouse = (imageurl) => {
    setactiveimage(imageurl)
  }
  // console.log("Data", data)


  const handlezoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    // console.log("coordinate", left, top, width, height)
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setzoomimageCoor({
      x,
      y
    })

  }, [zoomimageCoor])


  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }
  console.log(data.category)

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddCart()
    navigate("/cart")

  }

  return (
    <div className='container mx-auto p-8 min-h-[87vh] md:min-h-[84vh]'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>


        {/* Product image section */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-full lg:h-96 lg:w-96 bg-slate-200 relative'>
            <img src={activeimage} className='w-full h-full object-scale-down mix-blend-multiply p-4' onMouseMove={handlezoomImage} onMouseLeave={handleLeaveImageZoom} />


            {/* Product Zoom  */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div className='w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply' style={{
                    backgroundImage: `url(${activeimage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomimageCoor.x * 100}% ${zoomimageCoor.y * 100}%`
                  }}>

                  </div>
                </div>
              )
            }

          </div>



          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productimg.map((el,index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse ' key={'loading'+index}></div>
                      )
                    })
                  }
                </div>

              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imageurl, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1 ' key={imageurl}>
                          <img src={imageurl} alt={data?.category} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={(() => handleMouse(imageurl))} onClick={(() => handleMouse(imageurl))} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/* Product Detail Section */}
        {
          loading ? (
            <div className='grid gap-1 w-full' >
              <p className='bg-slate-200  animate-pulse h-10 w-full  inline-block '></p>
              <h2 className='text-2xl lg:text-3xl font-medium h-6 bg-slate-200 animate-pulse '></h2>
              <p className='capitalize text-slate-500 bg-slate-200 max-w-[100px] animate-pulse h-6'></p>
              <div className='text-red-600 bg-slate-200 animate-pulse h-6 max-w-[150px]   flex items-center gap-1'>

              </div>

              <div className='flex gap-2 items-center text-2xl font-medium my-1 lg:text-3xl h-12 animate-pulse bg-slate-200'>
                <p className='text-red-600 bg-slate-200'></p>
                <p className='text-slate-400 line-through text-2xl bg-slate-200'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1 bg-slate-200 animate-pulse h-6'></p>
                <p className='h-10  bg-slate-200 animate-pulse'>
                </p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-3xl font-medium '>{data?.productName}</h2>
              <p className='capitalize text-slate-500 '>{data?.category}</p>
              <div className='text-red-600 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex gap-2 items-center text-2xl font-medium my-1 lg:text-3xl'>
                <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                <p className='text-slate-400 line-through text-2xl'>{displayINRCurrency(data?.price)}</p>
              </div>

              <div className='flex items-center gap-3 my-2 '>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white font-medium bg-red-600 hover:bg-white hover:text-red-600' onClick={(e)=>handleAddtocart(e,data?._id)}>Add To Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Description: </p>
                <p>
                  {data?.description.split('\n')[0]}
                </p>
              </div>
            </div>
          )
        }


      </div>

      {
        data.category && (
          <RecommendProduct category={data?.category} heading={'Recommended Product'} />

        )
      }
    </div>
  )
}

export default ProductDetails
