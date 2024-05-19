
import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../Navbar';
import Orderslottie from './OrdersLottie';

export default function Orders() {
    const [productId, setProductId] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [amountPer, setAmountPer] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [orderID, setOrderID] = useState('');
    
    useEffect(() => {
        import ('./style.css');
        // const handleFormSubmit = () => {
        //     handleSubmitOrder();
        // };
    
  }, []);

    useEffect(()=>{
        const total = quantity * amountPer;
        setTotalAmount(total);
        if (document.getElementById("total-amount")) {
            document.getElementById("total-amount").textContent = "Total Amount: ₹" + total;
        }
    },[])

  
    const handleSubmitOrder = () => {
        const total = quantity * amountPer;
        setTotalAmount(total);
        // setTotalAmount(total); // Update totalAmount state
        // const orderId = generateOrderId();
        // setOrderID(orderId); // Update orderID state

        if (!date || date === '') {
            console.error('Date is empty or invalid');
            return;
        }

        if (isNaN(total)) {
            console.error('Total amount is not a number');
            return;
        }

        const orderData = {
            orderID: orderID,
            date: date,
            quantity: quantity,
            amountPer: amountPer,
            totalAmount: totalAmount, // Use the calculated totalAmount
            productId: productId
        };

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Order placed successfully');
                } else {
                    console.error('Failed to place order');
                }
            })
            .catch(error => {
                console.error('Error placing order:', error);
            });
    };

        // const handleSubmitOrder = () => {
        //     console.log(date);
        //     const total = quantity * amountPer;
        //     setTotalAmount(total);
        //     const orderId = generateOrderId();
        //     setOrderID(orderId);

        //     if (!date || date === '') {
        //         console.error('Date is empty or invalid');
        //         return;
        //     }

        //     if (isNaN(total)) {
        //         console.error('Total amount is not a number');
        //         return;
        //     }

        //     const orderData = {
        //         orderID: orderId,
        //         date: date,
        //         quantity: quantity,
        //         amountPer: amountPer,
        //         totalAmount: total,
        //         productId: productId
        //     };

        //     fetch('http://localhost:3000/orders', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(orderData)
        //     })
        //     .then(response => {
        //         if (response.ok) {
        //             console.log('Order placed successfully');
        //         } else {
        //             console.error('Failed to place order');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error placing order:', error);
        //     });
        // };

        // const submitOrderButton = document.getElementById("submit-order");
        // if (submitOrderButton) {
        //     submitOrderButton.addEventListener("click", function() {
        //         const total = quantity * amountPer;
        //         setTotalAmount(total);
        //         if (document.getElementById("total-amount")) {
        //             document.getElementById("total-amount").textContent = "Total Amount: ₹" + total;
        //         }
        //         var popup = document.createElement("div");
        //         popup.classList.add("popup");
        //         var orderId = generateOrderId();
        //         setOrderID(orderId);
        //         popup.innerHTML = `
        //             <span class="popup-close">&times;</span>
        //             <h2>Order ID: ${orderId}</h2>
        //         `;
        //         document.body.appendChild(popup);
        //         document.querySelector(".popup-close").addEventListener("click", function() {
        //             document.body.removeChild(popup);
        //              });
        //     });
            
        // }
    // Add event listener to the document for event delegation
    
    
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("popup-close")) {
            const popup = event.target.closest(".popup");
            if (popup && document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }
    });
    
    const submitOrderButton = document.getElementById("submit-order");
    if (submitOrderButton) {
        submitOrderButton.addEventListener("click", function () {
            const total = quantity * amountPer;
            setTotalAmount(total);
            if (document.getElementById("total-amount")) {
                document.getElementById("total-amount").textContent = "Total Amount: ₹" + total;
            }
            const existingPopups = document.querySelectorAll(".popup");
            existingPopups.forEach(popup => popup.remove());
    
            // Generate the order ID
            var orderId = generateOrderId();
            
            // Send the order ID to backend
            setOrderID(orderId); // Assuming you have a function to send order ID to backend
    
            // Create the popup with the same order ID
            var popup = document.createElement("div");
            popup.classList.add("popup");
            popup.innerHTML = `
            <span class="popup-close">&times;</span>
            <h2>Order ID: ${orderId}</h2>
        `;
            document.body.appendChild(popup);
        });
    }
    
    function generateOrderId() {
        const nextOrderId = 'ORD' + Math.floor(Math.random() * 10000) + 1;
        return nextOrderId;
    }
    
    return (
        <>
            <Navbar/>
            <section className=" bg-slate-300 dark:bg-gray-900 p-3 sm:p-5" style={{backgroundImage:"url('https://assets-global.website-files.com/5f4e8ec8a6a5b17c5cefcc00/64ed3a8de9fa1f3bf8b32496_%20Inventory%20.jpeg')",backgroundSize:"cover",height:620}}>
                <div id="content" className=' bg-slate-300'  >
                    <h1 className=' text-3xl font-semibold p-4'>Order a Product</h1>
                    <div style={{display:"flex"}}>
                        <div> <Orderslottie/></div>
                        <div>
                            <div id="main-container">
                                <div id="left-column">
                                    <div id="product-list" style={{paddingTop:20}}>
                                        <label htmlFor="product-select" style={{fontWeight:"600"}} >Enter a Product ID:</label>
                                        <input type="text" name="productID" id="productID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" value={productId} onChange={(e)=>setProductId(e.target.value)}/>
                                    </div>
                                    <div  style={{paddingTop:20}}><label htmlFor="supplier" style={{fontWeight:"600"}}>Choose a supplier:</label>
                                        <input type="text" name="supplierID" id="supplierID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
                                    </div>
                                    <div style={{paddingTop:20}}>
                                        <label htmlFor="dateInput" style={{fontWeight:"600"}}>Select a date:</label>
                                        <input
                                            type="date"
                                            id="dateInput"
                                            value={date}
                                            onChange={(e)=>setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div id="right-column">
                                    <div id="order-form">
                                        <div id="product-list" style={{paddingTop:20}}><label htmlFor="quantity" style={{fontWeight:"600"}}>Quantity:</label>
                                            <input type="number" id="quantity" placeholder="Enter quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                                        </div>
                                        <div id="product-list" style={{paddingTop:17}}><label htmlFor="discount" style={{fontWeight:"600"}}>Amount Per Quantity:</label>
                                            <input type="number" id="discount" placeholder="Enter Amount Per Quantity" value={amountPer} onChange={(e)=>setAmountPer(e.target.value)} />
                                        </div>
                                    </div>
                                    <div id="product-list" style={{paddingTop:20}}><label htmlFor="discount" style={{fontWeight:"600"}}>Total:</label>
                                            <input type="number"  placeholder="Total Amount" value={totalAmount} disabled />
                                        </div>
                                    {/* <div>
        <label>Total Amount:</label>
    <div id="total-amount" className="box" style={{ marginTop: 60 }}>
        <input
            id="total-amount-placeholder"
            value={totalAmount}
            // onChange={(e) => setTotalAmount(e.target.value)}
            disabled
        />
    </div>
</div> */}

                                </div>
                            </div>
                            <div id="submit-section">
                                <button id="submit-order"  style={{width:"30%"}} onClick={()=>{handleSubmitOrder()}}>Submit Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
