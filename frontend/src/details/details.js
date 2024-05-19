
import { useState } from "react";
import Navbar from "../Navbar";

export default function Details() {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState('');
    const [headers, setHeaders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const fetchData = async (dataType) => {
        try {
            const response = await fetch(`http://localhost:3000/${dataType}`);
            const data = await response.json();
            console.log(data)
            setData(data);
            setDataType(dataType);
            setHeaders(Object.keys(data[0]));
        } catch (error) {
            console.error(`Error fetching ${dataType}:`, error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className=" min-h-screen" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/rainbow-light-watercolor-stains_125540-2250.jpg?t=st=1714978359~exp=1714981959~hmac=9238b453fa09c7ab85829885f822f82e20c256154b64c2e1157a0530afbeadeb&w=1380')", backgroundSize: "cover" }}>
            <Navbar />
            <div className="flex justify-center mb-10">
                <div className="max-w-xlg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-52 mt-14" >
                    <a href="#">
                        <h5 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white text-center mb-10">Show details of:</h5>
                    </a>
                    <button href="#" className="inline-flex items-center px-3 py-3 text-xlg font-bold text-center text-white  bg-orange-400 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: 150, fontSize: 30, paddingLeft: 23, marginRight: 50 }} onClick={() => fetchData('orders')}>
                        Orders
                    </button>
                    <button href="#" className="inline-flex items-center px-3 py-3 text-xlg font-bold text-center text-white bg-orange-400 hover:bg-green-500 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: 220, fontSize: 30, paddingLeft: 23, marginRight: 50 }} onClick={() => fetchData('transaction')}>
                        Transactions
                    </button>
                    <button href="#" className="inline-flex items-center px-3 py-3 text-xlg font-bold text-center text-white bg-orange-400 hover:bg-green-500 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: 180, fontSize: 30, paddingLeft: 23, marginRight: 50 }} onClick={() => fetchData('suppliers')}>
                        Suppliers
                    </button>
                    <button href="#" className="inline-flex items-center px-3 py-3 text-xlg font-bold text-center text-white bg-orange-400 hover:bg-green-500 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: 130, fontSize: 30, paddingLeft: 23, marginRight: 50 }} onClick={() => fetchData('user')}>
                        Users
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <section className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden" style={{ marginRight: 70,marginLeft:70,marginBottom:70, padding: 20 }}>
                    <div className="flex mt-2">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" value={searchQuery} onChange={handleSearch} required="" />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-between px-6 " style={{ paddingLeft: 350 }}>
                            <button onClick={handlePrevPage} disabled={currentPage === 1} className=" bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 text-xl rounded focus:outline-none focus:shadow-outline" style={{ marginRight: 100, width: 100 }}>
                                Prev
                            </button>
                            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredData.length / productsPerPage)} className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ width: 100 }}>
                                Next
                            </button>
                        </div>
                    </div>

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} scope="col" className="px-6 py-3">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage).map((item, index) => (
                                <tr key={index} className=" bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700">
                                    {headers.map((header, index) => (
                                        <td key={index} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </section>
            </div>
        </div>
    );
}
