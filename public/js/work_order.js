const work_order_tbody = document.getElementById('work_order_tbody');
const work_order_table = document.getElementById('work_order_table');
const loader = document.getElementById('loader');
const wo_search = document.getElementById('wo_search');
const wo_refresh_btn = document.getElementById('wo_refresh_btn');



const notyf = new Notyf();

wo_refresh_btn.addEventListener('click', () => {
    getAllWorkOrders();
})



wo_search.addEventListener('keyup', async(e) => {
    e.preventDefault();

    try {

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/work-orders`, config)

        const filter = data.filter(item => {
            return Object.values(item).join('').toLowerCase().includes(wo_search.value.toLowerCase())
        })

        if (filter) {

            let workOrders = '';
            filter.forEach((val, index) => {
                workOrders += `
                    <tr class="bg-white border-b whitespace-nowrap">
                        <td class="px-4 py-4 font-medium text-black">${index + 1}</td>
                        <td class="px-4 py-4">${val.PlanID}</td>
                        <td class="px-4 py-4">${val.Shift}</td>
                        <td class="px-4 py-4 font-medium text-black">${val.Machine_No}</td>
                        <td class="px-4 py-4">${val.Part_No}</td>
                        <td class="px-4 py-4">${val.Shot_Plan}</td>
                        <td class="px-4 py-4">${val.Rejection_Plan}</td>
                        <td class="px-4 py-4">${val.Operator}</td>
                        <td class="px-4 py-4">${val.Date.value}</td>
                        <td class="px-3 py-3 flex items-center ">
                            <a href='/work-order-update/${val.PlanID}'
                                class="font-medium text-green-600 hover:underline" id="edit_work_order">
                                <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                                        stroke="blue" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
                                        stroke="blue" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path opacity="0.4"
                                        d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899"
                                        stroke="blue" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                            <button
                                onclick="work_order_delete('${val.PlanID}')"
                                class="ml-6 font-medium text-green-600 hover:underline" id="delete_work_order">
                                <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                                        stroke="red" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path opacity="0.34"
                                        d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                                        stroke="red" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M18.8504 9.14014L18.2004 19.2101C18.0904 20.7801 18.0004 22.0001 15.2104 22.0001H8.79039C6.00039 22.0001 5.91039 20.7801 5.80039 19.2101L5.15039 9.14014"
                                        stroke="red" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path opacity="0.34" d="M10.3301 16.5H13.6601" stroke="red" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path opacity="0.34" d="M9.5 12.5H14.5" stroke="red" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                
                `;
            })

            work_order_tbody.innerHTML = workOrders;
        } else {

            notyf.error({
                message: 'Something wrong!',
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                },
                dismissible: true
            })
        }

    } catch (error) {
        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        notyf.error({
            message: resErr,
            duration: 5000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true
        })
    }
})


async function getAllWorkOrders() {

    try {

        work_order_table.classList.add('active');
        loader.classList.add('active');
        
        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/work-orders`, config)


        if (data) {

            work_order_table.classList.remove('active');
            loader.classList.remove('active');

            let workOrders = '';
            data.forEach((val, index) => {
                workOrders += `
                    <tr class="bg-white border-b whitespace-nowrap">
                        <td class="px-4 py-4 font-medium text-black">${index + 1}</td>
                        <td class="px-4 py-4 ">${val.PlanID}</td>
                        <td class="px-4 py-4 ">${val.Shift}</td>
                        <td class="px-4 py-4 font-medium text-black ">${val.Machine_No}</td>
                        <td class="px-4 py-4 ">${val.Part_No}</td>
                        <td class="px-4 py-4 ">${val.Shot_Plan}</td>
                        <td class="px-4 py-4 ">${val.Rejection_Plan}</td>
                        <td class="px-4 py-4 ">${val.Operator}</td>
                        <td class="px-4 py-4 ">${val.Date.value}</td>
                        <td class="px-3 py-3 flex items-center  ">
                            <a href='/work-order-update/${val.PlanID}'
                                class="font-medium text-green-600 hover:underline" id="edit_work_order">
                                <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4"
                                        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                                        stroke="blue" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
                                        stroke="blue" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path opacity="0.4"
                                        d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899"
                                        stroke="blue" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </a>
                            <button
                                onclick="work_order_delete('${val.PlanID}')"
                                class="ml-6 font-medium text-green-600 hover:underline" id="delete_work_order">
                                <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                                        stroke="red" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path opacity="0.34"
                                        d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                                        stroke="red" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M18.8504 9.14014L18.2004 19.2101C18.0904 20.7801 18.0004 22.0001 15.2104 22.0001H8.79039C6.00039 22.0001 5.91039 20.7801 5.80039 19.2101L5.15039 9.14014"
                                        stroke="red" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path opacity="0.34" d="M10.3301 16.5H13.6601" stroke="red" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path opacity="0.34" d="M9.5 12.5H14.5" stroke="red" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                
                `;
            })

            work_order_tbody.innerHTML = workOrders;
        }else{

            loader.classList.remove('active');
            notyf.error({
                message: 'Something wrong!',
                duration: 5000,
                position: {
                    x: 'right',
                    y: 'top',
                },
                dismissible: true
            })
        }

    } catch (error) {
        loader.classList.remove('active');
        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        notyf.error({
            message: resErr,
            duration: 5000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true
        })
    }
}

getAllWorkOrders();




async function work_order_delete(id){

    try {
        
        if (id) {

            const a_token = sessionStorage.getItem('alubee');

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${a_token}`
                }
            }

            const { data } = await axios.delete(`${hostUrl}/work-order/${id}`, config);

            if (data?.success) {
                getAllWorkOrders();

            } else {

                notyf.error({
                    message: 'Something went wrong to delete!',
                    duration: 3000,
                    position: {
                        x: 'right',
                        y: 'top',
                    },
                    dismissible: true
                })
            }

        } else {

            notyf.error({
                message: 'ID is required to delete!',
                duration: 3000,
                position: {
                    x: 'right',
                    y: 'top',
                },
                dismissible: true
            })
        }

    } catch (error) {
        
        loader.classList.remove('active');
        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        notyf.error({
            message: resErr,
            duration: 5000,
            position: {
                x: 'right',
                y: 'top',
            },
            dismissible: true
        })
    }

    
}


