import React, { useEffect, useState } from "react";
import "./style.css";

let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiX2lkIjoiNjI5MzVmYzdjMDE4MTJiMmY0OTYyNmFlIiwiaWF0IjoxNjUzODI1NDc5LCJleHAiOjE2NTM5MTE4Nzl9.rwYR6WwRQN6tC6VWijL7_UIbNq3nZUgIibPdpWNfZa0";

const headers = {
  "Accept": "Application/json",
  "Authorization": token,
};

const Wishlist = ({ CartItem, addToCart, decreaseQty }) => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
      const response = await fetch("http://localhost:8001/customer/wishlist", {
        method: "GET",
        headers: {
          ...headers,
        },
      });
      const data = await response.json();
      setProducts(data);
      console.log(data);
    }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {products.length === 0 && (
              <h1 className="no-items product">No Items are add in Wishlist</h1>
            )}
            {products.map((product) => {
              return (
                <div className="box" key={product._id}>
                  <div className="product mtop">
                    <div className="img">
                      <img src={product.banner} alt="" />
                      <div className="product-like">
                        {/* <label>{count}</label> <br /> */}
                        {/* <i className='fa-regular fa-heart' onClick={increment}></i> */}
                      </div>
                    </div>
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <div className="rate">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                      <div className="price">
                        <h4>${product.price}.00 </h4>

                        <button
                          onClick={async (event) => {
                            try {
                              const response = await fetch(
                                `http://localhost:8000/wishlist/${product._id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    ...headers,
                                  },
                                }
                              );
                              console.log(response);
                              const data = await response.json();
                              console.log(data);
                              window.location.reload(false);
                            } catch (error) {
                              console.error(error);
                            }
                          }}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;