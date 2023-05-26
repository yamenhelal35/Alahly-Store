import React, { useEffect, useState } from "react"


///BATCH
let token = "Bearer .eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiX2lkIjoiNjQ2ZjMyZjQ2N2M4MmIxMTU0M2ZlMDJmIiwiaWF0IjoxNjg1MDA5MTQwLCJleHAiOjE2ODUwOTU1NDB9.GKofJVZmaLxw_dIDsLDvWdQdcWiQ1DSDiJBAIPLMg7c"
const headers = {
  'Accept': 'Application/json',
  'Authorization': token
}
const ShopCart = () => {
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8002")
      const data = await response.json()
  
      // Check if the data is empty before using it
      if (!data) {
        console.log("Error: Empty response")
        return
      }
  
      setProducts(data.products)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData("http://localhost:8002")
  }, [])


  return (
    <>
      {products.length > 0 && (
        products.map((product) => {
          return (
            <div className='box'>
              <div className='product mtop'>
                <div className='img'>
                  <img src={product.banner} alt='' />
                  <div className='product-like'>
                    {/* <label>{count}</label> <br /> */}
                    {/* <i className='fa-regular fa-heart' onClick={increment}></i> */}
                  </div>
                </div>
                <div className='product-details'>
                  <h3>{product.name}</h3>
                  <div className='rate'>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                    <i className='fa fa-star'></i>
                  </div>
                  <div className='price'>
                    <h4>${product.price}.00 </h4>
                    {/* step : 3  
                       if hami le button ma click garryo bahne 
                      */}

                    <button
                      onClick=
                      {(event) => {

                        {
                          alert(
                            "Product Added Successfully ", product.name
                          )
                        }

                        fetch(`http://localhost:8002`, {
                          method: 'PUT',
                          headers: {
                            ...headers,
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ _id: product._id })

                        }).then(function (response) {
                          console.log(response)
                          return response.json();

                        }
                        );

                      }}
                    >
                      <i className='fa fa-heart'></i>
                    </button>


                    <button
                      onClick=
                      {(event) => {

                        fetch(`http://localhost:8002`, {
                          method: 'PUT',
                          headers: {
                            ...headers,
                            'Content-Type': 'application/json'
                          },

                          body: JSON.stringify({ _id: product._id, qty: "1" })
                        }).then(function (response) {
                          console.log(response)
                          return product;

                        });

                      }}
                    >
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </>
  )
}

export default ShopCart