import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { motion } from "framer-motion";
import Anim from "./../core/animation";
import { Link, useParams } from "@remix-run/react";
import OpenAI from "openai";
import { updateData, useData } from "./../core/useData";
import { useEffect, useState } from "react";
import { response } from "./../core/gpt";
import { Button } from "./../components/ui/button";

const child = Anim.bounceY(32).spring_child(100, 10).as();

type BlockParams = {
    docId: string;
}

export type DocSchema = {
    name: "string",
    takeTime: number,
    takeTimeInterval: number,
    time: number,
}
export default function Block() {
    const { docId } = useParams();
    const data = useData<DocSchema>(`/PillBoxes/${docId}`);
    const [eff, setEff] = useState<string>();
    const [dir, setDir] = useState<string>();
    const [war, setWar] = useState<string>();

    useEffect(() => {
        if (!data) return;

        if (!eff) response(`tell me about strictly the positive effects of ${data?.name}`).then(v => {
            setEff(v.message.content ?? "");
        })
        
        if (!dir) response(`tell me strictly about the drug use directions of ${data?.name}`).then(v => {
            setDir(v.message.content ?? "");
        })

        if (!war) response(`tell me strictly the warnings and side effects of ${data?.name}`).then(v => {
            setWar(v.message.content ?? "");
        })
    }, [data])

    return <div className="w-11/12 flex-1 p-[2vw] flex flex-col items-center">
        <div className="flex flex-row items-center relative w-fit text-[6rem] font-black">
            { data?.name }
            <div className="absolute right-0 m-auto w-[calc(100%+48px)]" onClick={() => {
                const newName = prompt("Enter a new pill name")

                updateData(`/PillBoxes/${docId}`, {
                    name: newName
                })
                setEff("")
                setDir("")
                setWar("")
            }}>
                <FaEdit size={32} />
            </div>
        </div>
        <div className="flex flex-row relative w-fit text-[1.5rem] font-light" onClick={() => {
            const newInterval = prompt("Enter new interval")

            updateData(`/PillBoxes/${docId}`, {
                takeTimeInterval: Number.parseInt(newInterval ?? "10")
            })
        }}>
            <span className="font-medium">Interval</span>: {data?.takeTimeInterval} seconds
        </div>
        <motion.div variants={child} className="w-full flex flex-col p-[2.5vw] mt-[2rem] gap-[1rem] rounded-2xl border-gray-200 border-2 shadow-xl">
            <div className="flex flex-row items-center gap-[0.5rem]">
                <BsFillQuestionCircleFill size={40} />
                <div className="text-[2rem] font-medium">
                    Effects
                </div>
            </div>
            <div className="text-[1.5rem]">
                {eff}
            </div>
        </motion.div>
        <motion.div variants={child} className="w-full flex flex-col p-[2.5vw] mt-[2rem] gap-[1rem] rounded-2xl border-gray-200 border-2 shadow-xl">
            <div className="flex flex-row items-center gap-[0.5rem]">
                <IoIosCheckmarkCircle size={40} />
                <div className="text-[2rem] font-medium">
                    Directions
                </div>
            </div>
            <div className="text-[1.5rem]">
                {dir}
            </div>
        </motion.div>
        <motion.div variants={child} className="w-full flex flex-col p-[2.5vw] mt-[2rem] gap-[1rem] rounded-2xl border-gray-200 border-2 shadow-xl">
            <div className="flex flex-row items-center gap-[0.5rem]">
                <IoIosWarning size={40} />
                <div className="text-[2rem] font-medium">
                    Warning 
                </div>
            </div>
            <div className="text-[1.5rem] leading-[2.25rem]">
                {war}
            </div>
        </motion.div>
        <Button className="mt-[2rem] self-start text-[1.5rem] p-[2rem]" variant="outline" onClick={() => {
            console.log("clonk")
            updateData(`/PillBoxes/${docId}`, {
                takeTime: Math.floor((Date.now() / 1000) + (data?.takeTimeInterval ?? 0))
            })
        }}>
            (test) add {data?.takeTimeInterval} seconds
        </Button>
    </div>
}