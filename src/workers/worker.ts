/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Comlink from "comlink"

export const fns = {
    toUpperCase(msg: string): string {
        return msg.toUpperCase()
    },
    jsonDisp(e: any): string {
        let temp1 = ""
        e.map((r: any) => {
            let temp = r[0].replace(/\D/g, "")
            temp = temp.substring(0, 7)
            console.log(temp)
            temp1 += temp + " "
        })

        return temp1
    },
}

Comlink.expose(fns)
