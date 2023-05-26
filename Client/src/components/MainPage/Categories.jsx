import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Best Sellers",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "2022-23 Home Kit",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Signed T-shirts",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Basketball Kits",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Volleyball Kits",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Sweatshirts&Hoodies",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Give Aways",
    },

  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
