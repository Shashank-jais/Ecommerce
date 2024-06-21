import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import summaryApi from '../common'
import SearchProductCard from '../components/SearchProductCard'

const SearchProduct = () => {
  const [data, setdata] = useState([])

  const [loading, setloading] = useState(false)
  const query = useLocation()

  const fetchproduct = async () => {
    setloading(true)
    const response = await fetch(summaryApi.SearchProduct.url + query.search)
    const responsedata = await response.json()
    setloading(false)

    setdata(responsedata.data)


  }

  useEffect(() => {
    fetchproduct()
  }, [query])

  return (
    <div className=' container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading...</p>
        )
      }
      <p>Search Result: {data.length}</p>
      {
        data.length == 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No Data Found</p>
        )
      }

      {
        data.length != 0 && !loading && (
          <SearchProductCard loading={loading} data={data} />
        )
      }
    </div>
  )
}

export default SearchProduct
