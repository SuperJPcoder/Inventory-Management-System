

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

// import "./transactions.css";
import Transactionlottie from "./TransactionLottie";
import Navbar from "../Navbar";
import { useActionData } from "react-router-dom";

export default function Transactions() {
    const [amount, setAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountAmt, setDiscountAmt] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [taxAmt, setTaxAmt] = useState(0);
    const [orderId, setOrderId] = useState("");
    const [productId, setProductId] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [date,setDate]=useState("");
    const[payMethod,setPayMethod]=useState("");
    const [discountId, setDiscountId] = useState("");
    const [taxId, setTaxId] = useState("");
    const [amountDue,setAmountDue]=useState(0);
    const [grandTotal,setGrandTotal]=useState(0);

    useEffect(()=>{
        import ("./transactions.css");
    })
    useEffect(() => {
        // Function to set the current date in the format YYYY-MM-DD
        const getCurrentDate = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        // Set the current date when the component mounts
        setDate(getCurrentDate());
    }, []);

    useEffect(() => {
        // Fetch product ID when order ID changes
        fetchProductForOrderId(orderId);
    }, [orderId]);

    useEffect(() => {
        setAmount(Math.max(amount, 0));
    }, [amount]);

    useEffect(() => {
        setDiscount(Math.min(Math.max(discount, 0), 100));
    }, [discount]);

    useEffect(() => {
        setTaxRate(Math.min(Math.max(taxRate, 0), 100));
    }, [taxRate]);

    const handleAmountChange = (event) => {
        const newAmount = parseInt(event.target.value);
        setAmount(isNaN(newAmount) || newAmount <= 0 ? 1 : newAmount);
    };

    const handleDiscountChange = (event) => {
        const newDiscount = parseInt(event.target.value);
        setDiscount(isNaN(newDiscount) || newDiscount < 0 || newDiscount > 100 ? 0 : newDiscount);
    };

    const handleTaxRateChange = (event) => {
        const newTaxRate = parseInt(event.target.value);
        setTaxRate(isNaN(newTaxRate) || newTaxRate < 0 || newTaxRate > 100 ? 0 : newTaxRate);
    };


    const handleSubmitOrder = async () => {
    // Calculate discounted amount, tax amount, and grand total
    const discountedAmount = amount - (amount * discount / 100);
    setDiscountAmt(discountedAmount);
    const taxAmount = discountedAmount * taxRate / 100;
    setTaxAmt(taxAmount);
    const grandTotal = discountedAmount + taxAmount;
    setGrandTotal(grandTotal);

    // Generate transaction ID
    const newTransactionId = generateTransactionId();
    setTransactionId(newTransactionId);
    const newTaxId = generateTaxId();
    setTaxId(newTaxId);
    const newDiscId = generateDiscountId();
    setDiscountId(newDiscId);

    // Prepare data for transaction
    const transactionData = {
        transactionId: newTransactionId,
        orderId,
        date,
        payMethod,
        amtDue: amountDue,
        totalAmount: grandTotal
    };

    // Prepare data for tax
    const taxData = {
        // taxId:newTaxId, // Assuming taxId is generated elsewhere
        orderId,
        taxRate,
        taxAmount: taxAmount
    };

    // Prepare data for discount
    const discData = {
        discountId:newDiscId, // Assuming discountId is generated elsewhere
        orderId,
        discount,
        discountAmt:discountAmt
    };

    // Log data for debugging
    console.log("Amount:", amount);
    console.log("Discount:", discount);
    console.log("Tax Rate:", taxRate);
    console.log("Discounted Amount:", discountedAmount);
    console.log("Tax Amount:", taxAmount);
    console.log("Grand Total:", grandTotal);
    console.log("Grand Total:", payMethod);

    try {
                     generatePDF(transactionData, taxData, discData);

        // Make POST requests to store transaction, tax, and discount data in backend
        const transactionResponse = await fetch('http://localhost:3000/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });

        const taxResponse = await fetch('http://localhost:3000/tax', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taxData)
        });

        const discResponse = await fetch('http://localhost:3000/discount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(discData)
        });

        // Check responses for successful insertion
        if (transactionResponse.ok && taxResponse.ok && discResponse.ok) {
            console.log('Data inserted successfully');
             generatePDF(transactionData, taxData, discData);
            // Handle success if needed
        } else {
            console.error('Failed to insert data');
            // Handle failure if needed
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        // Handle error if needed
    }
};


    const fetchProductForOrderId = async (orderId) => {
    try {
        const response = await fetch(`http://localhost:3000/orders/${orderId}`);
        const data = await response.json();
        if (response.ok) {
            if (data.success) {
                setProductId(data.productId);
                setAmount(data.total); // Set the total in state
            } else {
                // Order ID not found or error
                console.log("Order ID not found:", data.message);
                setProductId(""); // Reset product ID
                setAmount(""); // Reset total
            }
        } else {
            // Error response from server
            console.error("Error fetching product for order ID:", response.statusText);
            setProductId(""); // Reset product ID
            setAmount(""); // Reset total
        }
    } catch (error) {
        console.error("Error fetching product for order ID:", error);
        setProductId(""); // Reset product ID
        setAmount(""); // Reset total
    }
};
function generateTransactionId() {
        const nextOrderId = 'TRX' + Math.floor(Math.random() * 10000) + 1;
        return nextOrderId;
    }
function generateTaxId() {
        const nextTaxId = 'TAX' + Math.floor(Math.random() * 10000) + 1;
        return nextTaxId;
    }
function generateDiscountId() {
        const nextDiscId = 'DISC' + Math.floor(Math.random() * 10000) + 1;
        return nextDiscId;
    }

    const generatePDF = (transactionData, taxData, discData) => {
        const doc = new jsPDF();

        // Set font styles
        doc.setFont("Courier");
        doc.setFontSize(15);

        // Add transaction details
        doc.setTextColor("#333333");
        doc.text("          Transaction Details", 90, 15,'center');
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(45, 17, 165,17); // Horizontal line under the title
        doc.text(`          Transaction ID: ${transactionData.transactionId}`, 90, 30,'center');
        doc.text(`          Order ID: ${transactionData.orderId}`, 90, 40,'center');
        doc.text(`          Date: ${transactionData.date}`, 90, 50,'center');
        doc.text(`          Payment Method: ${transactionData.payMethod}`, 90, 60,'center');
        // doc.text(`          Amount Due: $${transactionData.amtDue.toFixed(2)}`, 10, 70);
        doc.text(`          Total Amount: Rs. ${transactionData.totalAmount.toFixed(2)}`, 90, 80,'center');

        doc.text("          Tax Details", 90, 95,'center');
        doc.line(45, 97, 165, 97); // Horizontal line under the title
        doc.text(`          Order ID: ${taxData.orderId}`, 90, 110,'center');
        doc.text(`          Tax Rate: ${taxData.taxRate}%`, 90, 1200,'center');
        doc.text(`          Tax Amount: Rs. ${taxData.taxAmount.toFixed(2)}`, 90, 130,'center');


        doc.text("          Discount Details", 90, 145,'center');
        doc.line(45, 147, 165, 147); // Horizontal line under the title
        doc.text(`          Order ID: ${discData.orderId}`, 90, 160,'center');
        doc.text(`          Discount: ${discData.discount}%`, 90, 170,'center');
        doc.text(`          Discount Amount: Rs. ${discData.discountAmt.toFixed(2)}`, 90, 180,'center');

        // Save the PDF
        doc.save("transaction_details.pdf");
    };


// const generatePDF = (transactionData, taxData, discData) => {
//     const doc = new jsPDF();
    
//     // Set font styles
//     doc.setFont("Courier");
//     doc.setFontSize(12);

//     // Get document width
//     const docWidth = doc.internal.pageSize.width;

//     // Add transaction details
//     const transactionTitle = "      Transaction Details";
//     const transactionText = [
//         `           Transaction ID: ${transactionData.transactionId}`,
//         `           Order ID: ${transactionData.orderId}`,
//         `           Date: ${transactionData.date}`,
//         `           Payment Method: ${transactionData.payMethod}`,
//         `           Amount Due: $${transactionData.amtDue.toFixed(2)}`,
//         `           Total Amount: $${transactionData.totalAmt.toFixed(2)}`
//     ];

//     const transactionHeight = 15;
//     const transactionTextHeight = 10;

//     let y = transactionHeight;
//     doc.setTextColor("#333333");
//     doc.text(transactionTitle, (docWidth - doc.getStringUnitWidth(transactionTitle) * doc.internal.getFontSize()) / 2, y);
//     y += transactionTextHeight;
//     doc.setDrawColor(0);
//     doc.setLineWidth(0.5);
//     doc.line(10, y, docWidth - 10, y); // Horizontal line under the title
//     y += transactionTextHeight;

//     transactionText.forEach(text => {
//         doc.text(text, 10, y);
//         y += transactionTextHeight;
//     });

//     // Add tax details
//     const taxTitle = "Tax Details";
//     const taxText = [
//         `Order ID: ${taxData.orderId}`,
//         `Tax Rate: ${taxData.taxRate}%`,
//         `Tax Amount: $${taxData.taxAmount.toFixed(2)}`
//     ];

//     doc.text(taxTitle, (docWidth - doc.getStringUnitWidth(taxTitle) * doc.internal.getFontSize()) / 2, y);
//     y += transactionTextHeight;
//     doc.line(10, y, docWidth - 10, y); // Horizontal line under the title
//     y += transactionTextHeight;

//     taxText.forEach(text => {
//         doc.text(text, 10, y);
//         y += transactionTextHeight;
//     });

//     // Add discount details
//     const discountTitle = "Discount Details";
//     const discountText = [
//         `Order ID: ${discData.orderId}`,
//         `Discount: ${discData.discount}%`,
//         `Discount Amount: $${discData.discountAmt.toFixed(2)}`
//     ];

//     doc.text(discountTitle, (docWidth - doc.getStringUnitWidth(discountTitle) * doc.internal.getFontSize()) / 2, y);
//     y += transactionTextHeight;
//     doc.line(10, y, docWidth - 10, y); // Horizontal line under the title
//     y += transactionTextHeight;

//     discountText.forEach(text => {
//         doc.text(text, 10, y);
//         y += transactionTextHeight;
//     });

//     // Save the PDF
//     doc.save("transaction_details.pdf");
// };


    return (
        <body style={{backgroundImage:"url('https://assets-global.website-files.com/5f4e8ec8a6a5b17c5cefcc00/64ed3a8de9fa1f3bf8b32496_%20Inventory%20.jpeg')"}}>
            <Navbar/>
        <div id="content" className=" bg-slate-50" style={{backgroundColor:"white"}}>
            <h1 className=' text-3xl font-semibold p-4'>Transactions</h1>
            <div id="main-container">
                <div id="left-column">
                    <div id="red-square"><Transactionlottie/></div>
                    
                   
                </div>
                <div id="right-column">
                    <div id="order-form">
                        <div id="product-list" style={{paddingTop:20,display:"flex",justifyContent:"center"}}>
                        <label htmlFor="order-id" style={{fontWeight:"600"}}>Order ID:</label>
                        <input type="text" id="order-id" placeholder="Enter order ID" value={orderId} onChange={(e)=>setOrderId(e.target.value)} />
                    </div>
                    <div className="box" style={{fontWeight:"600",paddingTop:20,fontSize:"large"}}>Product ID: <span id="product-id" style={{paddingLeft:10}}>{productId}</span></div>
                        <div className="box" style={{fontWeight:"600",fontSize:"large",paddingTop:20,display:"flex", alignItems:"center"}}>Amount: <input type="number" id="amount" value={amount}  disabled /></div>
                        <div style={{display:"flex",fontWeight:"600", alignItems:"center",paddingTop:20}}><label htmlFor="discount" style={{fontWeight:"600"}}>Discount:</label>
                        <input type="number" id="discount" value={discount} onChange={(e) => {
        handleDiscountChange(e); // Call handleDiscountChange function
        setDiscount(parseInt(e.target.value)); // Update the discount state
    }
                        } placeholder="Enter discount percentage" /></div>
                        
                        <div className="box" style={{fontWeight:"600",fontSize:"large",paddingTop:20}}>Discounted Amount: <span id="discounted-amount-placeholder">{amount - (amount * discount / 100)}</span></div>

                        <div style={{fontWeight:"600",fontSize:"large",paddingTop:20,display:"flex", alignItems:"center"}}><label htmlFor="tax-rate" style={{fontWeight:"600"}}>Tax Rate:</label>
                        <input type="number" id="tax-rate" value={taxRate} onChange={(e) => {
        handleTaxRateChange(e); // Call handleDiscountChange function
        setTaxRate(parseInt(e.target.value)); // Update the discount state
    }
                        } placeholder="Enter tax rate" /></div>
                        
                        <div className="box" style={{fontWeight:"600",fontSize:"large",paddingTop:20}}>Tax Amount: <span id="tax-amount-placeholder">{(amount - (amount * discount / 100)) * taxRate / 100}</span></div>
                        <div className="box" style={{fontWeight:"600",fontSize:"large",paddingTop:20}}>Grand Total: <span id="grand-total-placeholder">{(amount - (amount * discount / 100)) + ((amount - (amount * discount / 100)) * taxRate / 100)}</span></div>
                    </div>

                    <div style={{fontWeight:"600",fontSize:"large",paddingTop:20,display:"flex", alignItems:"center"}}><label style={{fontWeight:"600"}}>Transaction Type:</label>
                    <div id="transaction-type" style={{paddingLeft:10}}>
                        <div className="flex" style={{alignItems:"center",paddingLeft:10}}><input type="radio" id="cash" name="transaction" value="cash" onChange={(e) => setPayMethod(e.target.value)}/>
                        <label htmlFor="cash">Cash</label></div>
                        <div className="flex" style={{alignItems:"center",paddingLeft:10}}><input type="radio" id="upi" name="transaction" value="upi" onChange={(e) => setPayMethod(e.target.value)}/>
                        <label htmlFor="upi">UPI</label></div>
                        
                        <div className="flex" style={{alignItems:"center",paddingLeft:10}}><input type="radio" id="card" name="transaction" value="card" onChange={(e) => setPayMethod(e.target.value)} />
                        <label htmlFor="card">Card</label></div>
                        
                    </div></div>
                    
                </div>
            </div>
            {/* <!-- QR Code Section (above the submit button)--> */}
        <div id="qr-section">
            <form id="qrForm">
                <input type="hidden" id="qr-order-id" name="Order ID"/>
                <input type="hidden" id="qr-product-id" name="Product ID"/>
                <input type="hidden" id="qr-transaction-type" name="Transaction Type"/>
                <input type="hidden" id="qr-amount" name="Amount"/>
                <input type="hidden" id="qr-discount" name="Discount"/>
                <input type="hidden" id="qr-discounted-amount" name="Discounted Amount"/>
                <input type="hidden" id="qr-tax-rate" name="Tax Rate"/>
                <input type="hidden" id="qr-tax-amount" name="Tax Amount"/>
                <input type="hidden" id="qr-grand-total" name="Grand Total"/>
            </form>
            <div id="qrcode"></div>
        </div>
        

            <div id="submit-section">
                <button id="submit-order" onClick={handleSubmitOrder}>Submit Order</button>
            </div>
    </div>
        {/* </div> */}
        </body>
    );
}
