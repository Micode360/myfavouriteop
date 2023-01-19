import React from "react";

interface gaphInterface {
    name: string;
    users: number;
    percentageVal: number;
 }

const ColumnChart = ({graphData}:any) => {
    
    return (
              <div className="bg-[#333f50] h-[15rem] my-4 md:my-8 w-[100%] grid grid-cols-4 px-2">
                {
                    graphData.map((data:gaphInterface, index: React.Key | null | undefined)=>(
                        <div className="relative px-2 pt-4 flex flex-col justify-end" key={index}>
                        <div className="bg-[#4e505f] md:w-[60%]" style={{height:data.percentageVal}}></div>
                        <div className="absolute bottom-[-25px]">{data.name.charAt(0).toUpperCase()}{data.name.slice(1, Infinity)}</div>
                    </div>
                      )
                   )
                }
                
              </div>
    );
}


export default ColumnChart;