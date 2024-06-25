import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../Helpers/productCategory'
import summaryApi from '../common'
import SearchProductCard from '../components/SearchProductCard'

const CategoryProduct = () => {
  const [data, setdata] = useState([])
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")
  const navigate = useNavigate()

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })


  const [selectCategory, setselectCategory] = useState(urlCategoryListObject)
  const [filterCategory, setfilterCategory] = useState([])
  const [loading, setloading] = useState(false)

  const [sortBy, setSortBy] = useState("")

  const handleselectcategory = (e) => {
    const { name, value, checked } = e.target
    setselectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })

  }
  // console.log("setselect category",selectCategory)
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(category => {
      if (selectCategory[category]) {
        return category
      }
      return null
    }).filter(el => el)
    setfilterCategory(arrayOfCategory)


    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate("/product-category?" + urlFormat.join(""))


  }, [selectCategory])

  const fetchdata = async () => {
    const response = await fetch(summaryApi.filterProduct.url, {
      method: summaryApi.filterProduct.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: filterCategory
      })
    })
    const dataresponse = await response.json()

    setdata(dataresponse?.data)
  }


  useEffect(() => {
    fetchdata()
  }, [filterCategory])


  const handleOnChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if (value === 'asc') {
      setdata(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === 'dsc') {
      setdata(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {

  }, [sortBy])




  return (

    <div className='container mx-auto p-4 '>
      {/* Desktop version */}


      <div className='hidden md:grid grid-cols-[200px,1fr]'>
        {/*Left Side  */}
        <div className='bg-white p-2 min-h-[calc(100vh-155px)] overflow-y-scroll'>


          {/* Sort By */}
          <div className=''>

            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Sort By</h3>


            <form className='text-sm flex-col gap-2 py-2'>
              <div className='flex items-center gap-3 mb-2'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3 mb-2'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                <label>Price - High to low</label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div className=''>

            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Category</h3>


            <form className='text-sm flex-col gap-2 py-2'>
              {
                productCategory.map((category, index) => {
                  return (
                    <div className='flex items-center capitalize gap-3 mb-3'>
                      <input type='checkbox' name={'category'} checked={selectCategory[category?.value]} value={category?.value} id={category?.value} onChange={handleselectcategory} />
                      <label htmlFor={category?.value}>{category?.value}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>

        {/* right side */}
        <div className='px-2 '>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
          {/* {
            params?.categoryname && (
              <RecommendProduct category={params?.categoryname} heading={'Recommended Product'} />
            )
          } */}
          <div className='max-h-[calc(100vh-200px)] overflow-y-scroll'>
            {
              data.length !== 0 && !loading && (
                <SearchProductCard data={data} loading={loading} />
              )
            }
          </div>


        </div>
      </div>

    </div>

  )
}

export default CategoryProduct
