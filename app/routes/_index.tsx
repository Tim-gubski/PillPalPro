import { Button } from "./../components/ui/button";
import { motion } from "framer-motion";
import Anim from "./../core/animation";
import { Link } from "@remix-run/react";


const parent = Anim.opacity(2).stagger(0.2).spring(50, 0, 10).delay_children(0.4).build();
const child = Anim.bounceY(32).spring_child(100, 20, 1).as();

export default function Index() {
    return <div className="font-sf w-screen flex flex-col items-center bg-no-repeat bg-contain">
        <motion.div className="w-screen h-screen flex flex-col gap-3 justify-center items-center bg-no-repeat bg-cover" variants={parent} initial="inactive" animate="active"  style={{
            backgroundImage: "url('/images/PILLS.png')",   
            backgroundPositionX: "50%",
        }}>
            <motion.div className="tracking-tight text-center font-black text-[8.5rem]" style={{
                textShadow: '0 0 64px rgba(0, 128, 255, 0.8)'
            }} variants={child}>
                PillPal Pro
            </motion.div>

            <motion.div variants={child} className="tracking-tight leading-[4rem] text-center text-[3rem]">
                the pill counter you didn't ask for
                <br />
                (duh, it's for your grandparents)
            </motion.div>

            <motion.div variants={child}>
                <Button asChild variant="ghost" className="text-[3rem] p-[4rem] my-[2rem] underline font-medium">
                    <Link to="/dashboard/PillBox1">To Dashboard</Link>
                </Button>
            </motion.div>
        </motion.div>
    </div>
}