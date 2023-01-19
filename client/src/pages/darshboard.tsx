import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import ColumnChart from "../components/columnChart";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks"
import Api from "../api/fetchRequests";
import ENV from "../config/env";
import { graph } from "../store/authorized";


 interface gaphInterface {
    name: string;
    users: number;
    percentageVal: number;
 }

const Darshboard = () => {
  let baseUrl = ENV.BASE_URL;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pageStatus, setPageStatus] = useState<string>("pending");
  const [loading, setLoading] = useState<boolean>(false);
  const { auth, authorized } = useAppSelector((state)=>state);
  const graphData = authorized.graph;
//console.log(graphData, "authorized")

  useEffect(()=>{
    if(!auth.isLoggedIn)navigate("/login");
    else setPageStatus("Authorized")


    Api.Get(`/os/graphinfo`)
    .then(
      response=> dispatch(graph(response.data)),
      error => setLoading(true) // sets page to a load
      )
  },[auth, baseUrl, dispatch, navigate])

  if(pageStatus === "pending") {
      return (
        <div className="flex flex-col items-center justify-center"></div>
      )
  }else {
    return (
      <main className="pb-6">
        <Header />
          {
            loading?
              <section className="h-[45vw] text-center">
                <h2 className="my-8">Something went wrong. Check your  internet conection and reload page.</h2>
                  <a href="/" className="bg-blue-400 rounded py-2 px-4">Reload</a>
              </section>
            :
            <>
        <section className="flex flex-col px-4 xl:px-10 xl:mx-20 md:grid md:grid-cols-3">
          <div className="md:col-span-2">
            {graphData.length < 1? 
            <div className="animate-pulse w-full h-[15rem] bg-[#32323e] my-4 md:my-8 px-2"></div>
            :
            <ColumnChart graphData={graphData} />
            }
            <section className="mt-10 md:mt-12">
                {
                  graphData.length < 1?
                  <div className="animate-pulse flex flex-col">
                    <div className="w-full  bg-[#32323e] h-[5rem] mb-4"></div>
                    <div className="w-full  bg-[#32323e] h-[5rem] mb-4"></div>
                    <div className="w-full  bg-[#32323e] h-[5rem] mb-4"></div>
                  </div>
                  :graphData.map((data:gaphInterface, index)=>(
                        <div className="w-full shadow bg-[#32323e] py-4 px-2 mb-2 border-[1px] border-[#63470d] flex flex-col" key={index}>
                        <h1 className="text-[1.5rem] md:text-[1.2rem]">{data.name.charAt(0).toUpperCase()}{data.name.slice(1, Infinity)}</h1>
                        <span className="text-[#f14483] text-[0.9rem] md:text-[0.7rem] mt-2">
                          {data.users} users
                        </span>
                      </div>
                      )
                   )
                }
            </section>
          </div>
          <div className="mt-8 px-4 max-h-[40vw]">
            <div className="hidden md:block md:w-full md:h-full bg-[#32323e] md:py-4 md:px-2">
              
              <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
                  Notifications
              </div>
            </div>
          </div>
        </section>
          <Footer />
            </>
          }
      
      </main>
    );
  }
};

export default Darshboard;
