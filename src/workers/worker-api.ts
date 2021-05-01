import Worker from "worker-loader!./worker"
import * as Comlink from "comlink"
import type { fns } from "./worker"

const worker = Comlink.wrap<typeof fns>(new Worker())

export const toUpperCase = worker.toUpperCase
export const jsonDisp = worker.jsonDisp
