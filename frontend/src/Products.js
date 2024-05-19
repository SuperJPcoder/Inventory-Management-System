
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function ProductList() {
  const [products, setProducts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [isVisible,setIsVisible]=useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [quantity, setQuantity] = useState('0');
    const [supplierId, setSupplierId] = useState('');
        const [searchQuery, setSearchQuery] = useState('');
      const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
  setData(products); // Initialize data with all products
}, [products]);
   
  const handleSubmitOrder = () => {
      
        const orderData = {
          productId: productId,
          supplierId: supplierId,
            productName: productName,
            productCategory: productCategory,
            quantity: quantity
        };
        console.log({orderData});

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Order placed successfully');
                // Reset form fields or show success message
            } else {
                console.error('Failed to place order');
                // Show error message to the user
            }
        })
        .catch(error => {
            console.error('Error placing order:', error);
            // Show error message to the user
        });
    };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
      const uniqueCategories = [...new Set(data.map(product => product.Category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product.Product_ID !== productId));
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // const handleSearch = (event) => {
  //       setSearchQuery(event.target.value);
  //   };
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredProducts = products.filter((product) => {
        return (
            product.Product_ID.toString().toLowerCase().includes(query) ||
            product.Name.toLowerCase().includes(query) ||
            product.Category.toLowerCase().includes(query) ||
            product.Supplier_ID.toLowerCase().includes(query) ||
            product.Quantity.toString().toLowerCase().includes(query)
        );
    });
    setData(filteredProducts);
};


  // const filteredData = products.filter((item) =>
  //       Object.values(item).some((value) =>
  //           value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //   );

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`http://localhost:3000/products/${formData.productId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });
  //     if (response.ok) {
  //       console.log('Product updated successfully');
  //       // Optionally, you can fetch updated products here to reflect changes immediately
  //       fetchProducts();
  //       setIsVisible(false); // Close the modal after successful update
  //     } else {
  //       console.error('Failed to update product');
  //     }
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

    const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const setImg = (category) => {
    if (category !== null) {

    switch (category.toLowerCase()) {
      case 'dairy':
        return 'https://cdn-icons-png.freepik.com/256/4472/4472631.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        // Add more cases for other categories if needed
        case 'bakery':
          return 'https://cdn-icons-png.freepik.com/256/1530/1530672.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'grains':
          return 'https://cdn-icons-png.freepik.com/256/782/782968.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'pasta':
          return 'https://cdn-icons-png.freepik.com/256/4727/4727368.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'breakfast':
          return 'https://cdn-icons-png.freepik.com/256/3480/3480768.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'produce':
          return 'https://cdn-icons-png.freepik.com/256/782/782968.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'frozenfoods':
          return 'https://cdn-icons-png.freepik.com/256/2317/2317005.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'beverages':
          return 'https://cdn-icons-png.freepik.com/256/3050/3050130.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'snacks':
          return 'https://cdn-icons-png.freepik.com/256/2553/2553691.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'cannedgoods':
          return 'https://cdn-icons-png.freepik.com/256/1050/1050106.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'condiments':
          // return 'https://example.com/laptop-icon.png'; // Replace with your actual URL
        case 'household':
          return 'https://cdn-icons-png.freepik.com/256/3475/3475581.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        case 'personalcare':
          return 'https://cdn-icons-png.freepik.com/256/5114/5114407.png?ga=GA1.1.1255800410.1704448219&semt=ais_hybrid'; // Replace with your actual URL
        default:
          return null;
    }}
  };
    const setCol = (quantity) => {
  if (quantity < 100) {
    return "bg-red-700";
  } else if (quantity < 200) {
    return "bg-yellow-400";
  } else if (quantity < 300) {
    return "bg-blue-500";
  } else {
    return "bg-green-500";
  }
};


  return (
    <div style={{minHeight:"screen"}}>
    <Navbar/>
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5" style={{ minHeight:"screen" ,backgroundImage:"url('https://img.freepik.com/free-photo/rainbow-light-watercolor-stains_125540-2250.jpg?t=st=1714978359~exp=1714981959~hmac=9238b453fa09c7ab85829885f822f82e20c256154b64c2e1157a0530afbeadeb&w=1380')",backgroundSize:"cover"}}>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{marginTop:30}}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" value={searchQuery} onChange={handleSearch}/>
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              
              <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"   onClick={() => setIsVisible(true)}
>
                Add product
              </button>




{/* <!-- Main modal --> */}
{isVisible && (<div id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{position: "center",marginTop:70}}>
    <div class="relative p-4 w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Product
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal"   onClick={() => setIsVisible(false)}
>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            
            <form class="p-4 md:p-5" onSubmit={handleSubmitOrder} >
  <div class="grid gap-4 mb-4 grid-cols-2">
    <div class="col-span-2">
      <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
      <input type="text" name="Name" id="Name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" value={productName} onChange={(e)=>setProductName(e.target.value)}  required/>
    </div>
    <div class="col-span-1">
      <label for="Product_ID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product ID</label>
      <input type="number" name="Product_ID" id="Product_ID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)}required/>
    </div>
    <div class="col-span-1">
      <label for="Supplier_ID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Supplier ID</label>
      <input type="text" name="Supplier_ID" id="Supplier_ID" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type suppleir ID" value={supplierId}  onChange={(e)=>setSupplierId(e.target.value)} required />
      {/* {console.log(supplierID)} */}

    </div>
    <div class="col-span-2 sm:col-span-1">
      <label for="Quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
      <input type="number" name="Quantity" id="Quantity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="0" value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
    </div>
    <div class="col-span-2 sm:col-span-1">
      <label for="Category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
      <input type="text" name="Category" id="Category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type category" value={productCategory} onChange={(e)=>setProductCategory(e.target.value)} required/>
    </div>
  </div>
  <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
    Add product
  </button>
</form>

        </div>
    </div>
</div> )}

              <div className="flex items-center space-x-3 w-full md:w-auto">
               
                {/* <button
                  type="button"
                  onClick={toggleDropdown}
                  className=" z-10 w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filter
                  <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button> */}
               
                {showDropdown && (
                  <div className="absolute  left-0 z-20 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700" style={{top:58,left:1014}}>
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose Category</h6>
                    <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                      {categories.map((category, index) => (
                        <li key={index} className="flex items-center">
                          <input id={`category-${index}`} type="checkbox" value={category} className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                          <label htmlFor={`category-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">{category}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Product ID</th>
                  <th scope="col" className="px-4 py-3">Product name</th>
                  <th scope="col" className="px-4 py-3">Category</th>
                  <th scope="col" className="px-4 py-3">Quantity</th>
                  <th scope="col" className="px-4 py-3">Supplier ID</th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
               {data.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
.map((product, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.Product_ID}</th>
                    <td class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img src={setImg(product.Category)}alt="iMac Front Image" class="w-auto h-8 mr-3"/>
{product.Name}</td>
                    <td className="px-4 py-3">
                      <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{product.Category}</span></td>
                    <td className="px-4 py-3">
                      <div class="flex items-center">
                                 <div class={`inline-block w-4 h-4 mr-2 rounded-full ${setCol(product.Quantity)}`}></div>


                                  {product.Quantity}
                      </div></td>
                    <td className="px-4 py-3">{product.Supplier_ID}</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      
              <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" style={{width:70}} onClick={() => {deleteProduct(product.Product_ID)}}>
                
                Delete
              </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                <div className="flex justify-center mb-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" style={{marginLeft:60,marginRight:100, width:300}}
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={(currentPage - 1) * productsPerPage + productsPerPage >= products.length}
              className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" style={{marginRight:60,marginleft:100,width:300}}
            >
              Next
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default ProductList;
