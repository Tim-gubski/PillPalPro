import { useEffect, useState } from "react"
import { ref, onValue, update } from "firebase/database";
import { db } from "./../root";

export function useData<T>(path: string) {
    const [data, setData] = useState<T>();

    useEffect(() => {
        const dataRef = ref(db, path);
        const unsub = onValue(dataRef, (snap) => {
            setData(snap.val() as T);
        })

        return unsub;
    }, [path])

    return data;
}

export function updateData(path: string, updates: any) {
    

    update(ref(db, path), updates).then((v) =>{
        console.log("updated")
    })
}