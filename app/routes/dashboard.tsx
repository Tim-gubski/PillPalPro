import { Link, Outlet, useLocation, useNavigate } from "@remix-run/react";
import { Button } from "./../components/ui/button";
import { motion } from "framer-motion";

import { FaClock } from "react-icons/fa";
import Anim from "./../core/animation";
import { useData } from "./../core/useData";
import { DocSchema } from "./dashboard.$docId";
import { useEffect, useState } from "react";

const boxes = [
    "PillBox1",
    "PillBox2",
    "PillBox3",
    "PillBox4",
]

const parent = Anim.bounceY(32).spring(100, 0, 10).stagger(0.2).build();

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (auth) return;
        
        const pass = prompt("Password pwease")

        if (!auth && pass !== "andyiscool") {
            navigate("/")
        }
        setAuth(true)
    }, [])

    return <div className="relative font-sf h-screen bg-no-repeat bg-cover" style={{
        backgroundImage: "url('/images/PILLS.png')",   
        backgroundPositionX: "50%",
    }}>
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30 flex flex-col justify-center items-center">
            <motion.div variants={parent} initial="inactive" animate="active" className="bg-white w-11/12 h-5/6 rounded-[2rem] relative flex flex-col py-[5vw] items-center shadow-2xl">
                <Outlet key={location.pathname} />
                <div id="row-of-things" className="absolute bottom-[2vw] w-fit grid grid-cols-4 gap-[1rem]">
                    { boxes.map((v, i) => <Panel key={"pillbox" + i} number={i + 1} docId={v} />)}
                </div>
            </motion.div>
        </div>
    </div>
}

function timeUntil(secondsUtc: number) {
    const nowUtc = Math.floor(Date.now() / 1000)

    let remainingSeconds = secondsUtc - nowUtc;

    if (remainingSeconds < 0) return "00:00:00";

    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds %= 3600;

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    // Format the time as HH:MM:SS
    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    ].join(':');

    return formattedTime;
}

function RealtimeClock(props: {
    time: number
}) {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setCounter(counter + 1)
        }, 1000)
    }, [counter])

    return <div>
        {timeUntil(props.time)}
    </div>
}

function Panel(props: {
    onClick?: any,
    docId?: any,
    number?: any,
}) {

    const data = useData<DocSchema>(`/PillBoxes/${props.docId}`);
    return <div className="flex flex-col items-center">
        <Button asChild>
            <Link to={`/dashboard/${props.docId}`} className="h-[12rem] aspect-[1/1] rounded-[26px]">
                <div className="relative h-full flex flex-col justify-center items-center gap-[2rem]">
                    <div className="h-fit text-[4rem] font-bold">
                        {props.number}
                    </div>
                    <div className="absolute bottom-[1rem] text-[1.25rem] font-regular">
                        {data?.name}
                    </div>
                </div>
            </Link>
        </Button>
        <div className="relative w-fit flex flex-row justify-center items-center gap-[0.5rem] p-[0.5rem] text-[1rem] font-bold">
            {<RealtimeClock time={data?.takeTime ?? 0} />}
            <div className="absolute left-0 transform -translate-x-full">
                <FaClock size={24} />
            </div>
        </div>
    </div>
}