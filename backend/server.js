
var mariadb=require('mariadb');
const cors = require('cors');

const express = require('express');

const app = express();
const bodyParser = require("body-parser");
app.use(cors());

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: "3307",
    user: "root",
    password: "DBMSis@1",
    database: "DBMS_project",
    connectionLimit: 10
});
async function runQuery() {
    let conn;
    try {
      conn = await pool.getConnection();
      // Run your queries here
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release(); // Release the connection back to the pool
    }
  }
  
  runQuery();
app.get('/products', async(req, res) => {
   const results=await pool.query('SELECT * FROM products');
    // , (err, results, fields) => {
        try{
            // console.log(results);
             res.json(results);
        }
       
        catch(err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    
});

app.get('/orders', async(req, res) => {
   const results=await pool.query('SELECT * FROM orders');
    // , (err, results, fields) => {
        try{
            // console.log(results);
             res.json(results);
        }
       
        catch(err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    
});

app.get('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params; // Extract orderId from request parameters
    try {
        // Fetch both Product_ID and Total from the orders table
        const results = await pool.query('SELECT Product_ID, Total FROM orders WHERE Order_ID = ?', [orderId]);

        if (results.length > 0) {
            // If there are results, send the product ID and total in the response
            const { Product_ID, Total } = results[0];
            res.json({ success: true, productId: Product_ID, total: Total });
        } else {
            // If no results found, send a message indicating that order ID doesn't exist
            res.json({ success: false, message: "Order ID not found" });
        }
    } catch (err) {
        console.error("Error fetching data for order ID:", err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.get('/transaction', async(req, res) => {
   const results=await pool.query('SELECT * FROM transaction');
    // , (err, results, fields) => {
        try{
            // console.log(results);
             res.json(results);
        }
       
        catch(err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    
});

app.get('/user', async(req, res) => {
   const results=await pool.query('SELECT * FROM user');
    // , (err, results, fields) => {
        try{
            // console.log(results);
             res.json(results);
        }
       
        catch(err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    
});

app.get('/suppliers', async(req, res) => {
   const results=await pool.query('SELECT * FROM suppliers');
    // , (err, results, fields) => {
        try{
            // console.log(results);
             res.json(results);
        }
       
        catch(err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    
});

app.delete('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        // Run a query to delete the product from the database
        const result = await pool.query('DELETE FROM products WHERE Product_ID = ?', [productId]);
        console.log(`Product with ID ${productId} deleted successfully`);
        res.status(200).json({ message: `Product with ID ${productId} deleted successfully` });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { name, supplierId, quantity, category } = req.body;
    try {
        // Run a query to update the product in the database
        await pool.query('UPDATE products SET Name = ?, Supplier_ID = ?, Quantity = ?, Category = ? WHERE Product_ID = ?', [name, supplierId, quantity, category, productId]);
        console.log(`Product with ID ${productId} updated successfully`);
        res.status(200).json({ message: `Product with ID ${productId} updated successfully` });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/products', async (req, res) => {
    const { productId, supplierId, productName, productCategory, quantity } = req.body;
    try {
        // Run a query to insert the order data into the database
        console.log({ supplierId });
    const result = await pool.query('INSERT INTO Products (Product_ID,Supplier_ID, Name, Category, Quantity) VALUES (?, ?, ?, ?, ?)', [productId, supplierId, productName, productCategory, quantity]);
        console.log('Product inserted successfully');
        res.status(200).json({ message: 'Product inserted successfully' });
    } catch (err) {
        console.error('Error inserting order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/transaction', async (req, res) => {
    const { transactionId,orderId,date,payMethod,amtDue,totalAmount } = req.body;
    try {
        // Run a query to insert the order data into the database
    const result = await pool.query('INSERT INTO Transaction (Transaction_ID,Order_ID, Date, Payment_Method, Amount_Due,Total_Amount) VALUES (?, ?, ?, ?, ?, ?)', [transactionId,orderId,date,payMethod,amtDue,totalAmount]);
        console.log('Transaction inserted successfully');
        res.status(200).json({ message: 'Transaction inserted successfully' });
    } catch (err) {
        console.error('Error inserting order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.post('/tax', async (req, res) => {
//     const { taxID,orderId,taxRate,taxAmt } = req.body;
//     try {
//         // Run a query to insert the order data into the database
//     const result = await pool.query('INSERT INTO Tax (Tax_ID,Order_ID,Tax_Percentage,Tax_Amount) VALUES (?, ?, ?, ?)', [taxID,orderId,taxRate,taxAmt]);
//         console.log('Tax inserted successfully');
//         res.status(200).json({ message: 'Tax inserted successfully' });
//     } catch (err) {
//         console.error('Error inserting order:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }

// });
const generateTaxId = () => {
    const nextTaxId = 'TAX' + Math.floor(Math.random() * 10000) + 1;
    return nextTaxId;
};

app.post('/tax', async (req, res) => {
    const { orderId, taxRate, taxAmount } = req.body;
    const taxId = generateTaxId(); // Generate taxId here
    try {
        // Run a query to insert tax data into the database
        const result = await pool.query('INSERT INTO Tax (Tax_ID, Order_ID, Tax_Percentage, Tax_Amount) VALUES (?, ?, ?, ?)', [taxId, orderId, taxRate, taxAmount]);
        console.log('Tax inserted successfully');
        res.status(200).json({ message: 'Tax inserted successfully' });
    } catch (err) {
        console.error('Error inserting tax:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/discount', async (req, res) => {
    const { discountId,orderId,discount,discountAmt } = req.body;
    try {
        // Run a query to insert the order data into the database
    const result = await pool.query('INSERT INTO Discount (Discount_ID,Order_ID, Discount_Percentage, Discount_Amount) VALUES (?, ?, ?, ?)', [discountId,orderId,discount,discountAmt]);
        console.log('disc inserted successfully');
        res.status(200).json({ message: 'disc inserted successfully' });
    } catch (err) {
        console.error('Error inserting order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// server.js
// Import necessary modules and set up server...

app.post('/orders', async (req, res) => {
    const { orderID, date, quantity, amountPer, totalAmount, productId } = req.body; // Use correct field names
    try {
        console.log(date);
        console.log(totalAmount);
        // Start a transaction to ensure data consistency
        await pool.query('START TRANSACTION');

        // Run a query to insert the order data into the database
        await pool.query('INSERT INTO Orders (Order_ID, Delivery_Date, Quantity_Ordered, Amount_Per_Quantity, Total, Product_ID) VALUES (?, ?, ?, ?, ?, ?)', [orderID, date, quantity, amountPer, totalAmount, productId]);

        // Retrieve the current quantity of the product from the database
        const currentQuantityResult = await pool.query('SELECT Quantity FROM Products WHERE Product_ID = ?', [productId]);
const currentQuantity = parseInt(currentQuantityResult[0].Quantity); // Convert to integer

// Ensure currentQuantity is a valid number
if (!isNaN(currentQuantity)) {
    // Calculate the new quantity by adding the ordered quantity
    const newQuantity = currentQuantity + parseInt(quantity); // Convert quantity to integer

    // Update the quantity of the product in the Products table
    await pool.query('UPDATE Products SET Quantity = ? WHERE Product_ID = ?', [newQuantity, productId]);

    // Commit the transaction
} else {
    console.error('Error: Current quantity is not a valid number');
}

        await pool.query('COMMIT');

        console.log('Order placed successfully');
        res.status(200).json({ message: 'Order placed successfully' });
    } catch (err) {
        // Rollback the transaction if an error occurs
        await pool.query('ROLLBACK');
        console.error('Error inserting order:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
