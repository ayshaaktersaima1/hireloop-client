'use server'

import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {


    return serverMutation('/api/jobs', newJobData);
}





// export const createJob = async (newJobData) => {

//     const res = await fetch(`${baseUrl}/api/jobs`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(newJobData)
//     });

//     return res.json();

// }