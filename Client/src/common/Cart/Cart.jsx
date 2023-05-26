import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import "./style.css"


let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRFU1RAZ21haWwuY29tIiwiX2lkIjoiNjI5OGY2ODk2YTJjMGQ4YzQ5YmI4ZWViIiwiaWF0IjoxNjU0MTkxNzUzLCJleHAiOjE2NTQyNzgxNTN9.sxbrhQ17of8ZAwEh61LY4py4L-u_W4aA7suQTLF1v3E"
const headers = {
  'Accept': 'Application/json',
  'Authorization': token
}
const Cart = ({ CartItem, addToCart, decreaseQty }) => {

  const [products, setProducts] = useState([])

 const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8000/shopping/cart", {
      method: 'GET',
      headers: {
        ...headers
      }
    })
    const data = await response.json()

    // Check if the data is empty before using it
    if (!data) {
      console.log("Error: Empty response")
      return
    }

    setProducts(data[0]?.items || [])
    console.log(data[0]?._id)
  } catch (error) {
    console.error(error)
  }
}

  let Total = 0;






  // Stpe: 7   calucate total of items
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)

  // prodcut qty total

  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          <div className='cart-details'>
            {products.length == 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}
            {
              products.map((items) => {
                const item = items.product
                //console.log(items)
                //console.log(cart)
                //console.log(item.price)
                const productQty = item.price * items.unit;

                Total += productQty;
                console.log(Total)
                console.log(productQty)
                return (
                  <div className='cart-list product d_flex'>
                    <div className='img'>
                      <img src={item.banner} alt='' />
                    </div>
                    <div className='cart-details'>
                      <h3>{item.name}</h3>
                      <h4>
                        ${item.price}.00 x {items.unit}
                        {/* <span>${productQty}.00</span> */}
                      </h4>
                    </div>
                    <div className='cart-items-function'>
                      <div className='removeCart'>
                        <button className='removeCart' onClick={(event) => {

                          fetch(`http://localhost:8000/cart/${item._id}`, {
                            //fetch(`http://vetements4-env.eba-djbmqqrc.us-east-1.elasticbeanstalk.com/cart/${item._id}`, {
                            method: 'delete',
                            headers: {
                              ...headers
                            }


                          }).then(function (response) {
                            console.log(response)
                            return response.json();

                          });
                          window.location.reload(false)


                        }}
                        >
                          <i className='fa-solid fa-xmark'></i>
                        </button>
                      </div>

                      <div className='cartControl d_flex'>
                        <button className='incCart' onClick={() => {
                          let x = parseInt(items.unit)
                          x += 1
                          items.unit = x
                          fetch(`http://localhost:8000/cart`, {
                           // fetch(`http://vetements4-env.eba-djbmqqrc.us-east-1.elasticbeanstalk.com/cart`, {
                            method: 'PUT',
                            headers: {
                              ...headers,
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ _id: item._id, qty: x })

                          }).then(function (response) {
                            console.log(response)
                            return response.json();

                          }
                          );
                          window.location.reload(false)
                        }}>
                          <i className='fa-solid fa-plus'></i>
                        </button>
                        <button className='desCart' onClick={(event) => {

                          let x = parseInt(items.unit)
                          x -= 1
                          items.unit = x
                          console.log(items.unit)
                          console.log(x)

                          if (x == 0) {
                            fetch(`http://localhost:8000/cart/${item._id}`, {
                              //fetch(`http://vetements4-env.eba-djbmqqrc.us-east-1.elasticbeanstalk.com/cart/${item._id}`, {
                              method: 'delete',
                              headers: {
                                ...headers
                              }

                            }).then(function (response) {
                              console.log(response)
                              return response.json();

                            });
                            window.location.reload(false)
                          }
                          else {
                            fetch(`http://localhost:8000/cart`, {
                              //fetch(`http://vetements4-env.eba-djbmqqrc.us-east-1.elasticbeanstalk.com/cart`, {
                              method: 'PUT',
                              headers: {
                                ...headers,
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ _id: item._id, qty: x })

                            }).then(function (response) {
                              console.log(response)
                              return response.json();

                            }
                            );
                            window.location.reload(false)
                          }



                        }}>
                          <i className='fa-solid fa-minus'></i>
                        </button>
                      </div>
                    </div>

                    <div className='cart-item-price'></div>
                  </div>
                )

              }
              )
            }
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>${Total}.00</h3>
              <Button className='btn-primary'
                onClick=
                {(event) => {

                  fetch(`http://localhost:8000/shopping/order`, {
                   // fetch(`http://vetements4-env.eba-djbmqqrc.us-east-1.elasticbeanstalk.com/shopping/order`, {
                    method: 'POST',
                    headers: {
                      ...headers,
                      'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({ txnId: products._id })
                  }).then(function (response) {
                    console.log(response)
                    return response.json();

                  });

                  window.location.reload(false)

                }}
              >Check Out</Button>
            </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default Cart