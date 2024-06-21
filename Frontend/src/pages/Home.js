//rafce
import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HoriontalCardProduct from '../components/HoriontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  const horizontalProducts = [
    { category: 'airpodes', heading: "Best of AirPods" },
    { category: 'camera', heading: "Capture the Moment: Top Cameras" },
    { category: 'watches', heading: "Trending Smartwatches" }

  ];

  const verticalProducts = [
    { category: 'mobiles', heading: "Trending Smartphones" },
    { category: 'Mouse', heading: "Top-Rated Mouse" },
    { category: 'televisions', heading: "Latest Televisions" },
    { category: 'earphones', heading: "Best Earphones for Music Lovers" },
    { category: 'printers', heading: "Top Printers for Your Home Office" },
    { category: 'processor', heading: "High-Performance Processors" },
    { category: 'refrigerator', heading: "Best Refrigerators to Keep it Cool" },
    { category: 'speakers', heading: "Top Speakers for Ultimate Sound" },
    { category: 'trimmers', heading: "Best Trimmers for a Perfect Look" },
  ];

  return (
    <div>
      <CategoryList />
      <BannerProduct />
      {horizontalProducts.map(product => (
        <HoriontalCardProduct
          key={product.category}
          category={product.category}
          heading={product.heading}
        />
      ))}
      {verticalProducts.map(product => (
        <VerticalCardProduct
          key={product.category}
          category={product.category}
          heading={product.heading}
        />
      ))}
    </div>
  );
};


export default Home
