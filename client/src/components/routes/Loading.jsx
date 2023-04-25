import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGif from "../../assets/loading3.gif";
import { TypeAnimation } from "react-type-animation";



export default function Loading({path = "login"}) {
    //state
    const [ count, setCount ] = useState(4);

    //hooks
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000)
        //redirect once count is = 0 
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });
        //cleanup
        return () => clearInterval(interval);
    }, [count]);


    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <TypeAnimation className=' font-bold tracking-tight leading-tight text-[#d4e253] duration-700 font-pop'
                sequence={['Redirecting you in a moment . . .', 1000 ]}
                repeat={Infinity}
                />
            </div>
            <div className="">
                <img src={LoadingGif} alt="Loading" className="w-[400px]"></img>
            </div>
        </div>
    )

}