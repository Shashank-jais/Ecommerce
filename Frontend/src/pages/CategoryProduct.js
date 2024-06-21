import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
  const params = useParams()

  return (
    <div>
      <h1 className='capitalize'>{params?.categoryname}</h1>
    </div>
  )
}

export default CategoryProduct
