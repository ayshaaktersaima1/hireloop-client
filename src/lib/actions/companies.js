'use server'

import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {

    return serverMutation('/api/companies', newCompanyData);

}
// export const createCompany = async (newCompanyData) => {
//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(newCompanyData)
//     })
//     return res.json();
// }