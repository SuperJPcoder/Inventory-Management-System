import Navbar from "./Navbar";
import Homelottie from "./home";

export default function Homepage() {
    return (
        <div>
            <Navbar/>
        <div className="flex items-center justify-center h-screen" style={{backgroundImage:"url('https://img.freepik.com/premium-vector/warehouse-vector-clipart-logistic-hub-with-box_353502-526.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715040000&semt=ais')",backgroundSize:'cover'}}>
          <div className="w-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-90" style={{ margin: '45px',width:'80%' }}>
        <section className="bg-white dark:bg-gray-900">
          <div className="flex flex-col-reverse lg:flex-row max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0" style={{margin:22}}>
            <div className="lg:col-span-7 mr-auto place-self-center" style={{width:'70%', marginRight:20,marginLeft:10}}>
              <h2 className=" font-extrabold text-4xl" style={{marginBottom:20,fontFamily: "cursive"}}>Simplifying Inventory, Amplifying Efficiency!</h2>
              <p className="text-lg" style={{fontFamily:"cursive"}}>Welcome to our Inventory Management System. We understand that managing a general store's inventory can be a complex task. That's why we've developed a solution that makes it easier than ever. Our system is designed to streamline your inventory management process, giving you more time to focus on what really matters - your customers.

</p>
            </div>
            <div className="lg:flex lg:mt-0">
              <Homelottie/>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
    );
}
