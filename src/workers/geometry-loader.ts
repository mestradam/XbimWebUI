﻿import { ModelGeometry } from "../model-geometry";
import { Message, MessageType } from '../message';

//only run following script if this is created as a Dedicated Worker
if (self && self instanceof DedicatedWorkerGlobalScope) {
    var worker = self as DedicatedWorkerGlobalScope;
    worker.onmessage = function (e: MessageEvent) {
        let model = e.data.model;
        let headers = e.data.headers;
        let geometry = new ModelGeometry();

        geometry.onerror = function (msg) {
            const message: Message = {
                type: MessageType.FAILED,
                message: msg,
                percent: 0,
            }
            worker.postMessage(message);
            console.error(msg);
            worker.close();
        }

        geometry.onloaded = function () {
            try {
                let result = {};
                let transferable = [];
                for (let i in geometry) {
                    if (!geometry.hasOwnProperty(i))
                        continue

                    let prop = geometry[i];
                    //ignore functions and private members when creating transferable message object
                    if (typeof prop === "function" || i.startsWith("_"))
                        continue;

                    //building message object containing values but no functions or anything
                    result[i] = prop

                    //create array of transferable objects for all typed arrays. Browsers which support Transferable interface will speed this up massively
                    if (ArrayBuffer.isView(prop))
                        transferable.push(prop.buffer);
                }

                //post the object and pass through all transferable objects
                const message: Message = {
                    type: MessageType.COMPLETED,
                    message: "Completed",
                    percent: 100,
                    result: result
                }
                worker.postMessage(message, transferable);
                worker.close();
            } catch (e) {
                const message: Message = {
                    type: MessageType.FAILED,
                    message: e,
                    percent: 0,
                }
                worker.postMessage(message);
                console.error(e);
                worker.close();
            }
        };
        geometry.load(model, headers, (message) => {
            worker.postMessage(message);
        });
    };
}
