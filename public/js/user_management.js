const loader = document.getElementById('loader');
const user_management_tbody = document.getElementById('user_management_tbody');
const user_management_table = document.getElementById('user_management_table');


async function getAllUsers() {

    try {

        user_management_table.classList.add('active');
        loader.classList.add('active');

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/user`, config)


        if (data) {

            console.log(data);

            user_management_table.classList.remove('active');
            loader.classList.remove('active');

            let users = '';
            data?.forEach((val) => {
                users += `
                    <tr class="bg-white border-b ">
                        <td class="px-4 py-4">${val.User_ID}</td>
                        <td class="px-4 py-4 text-black font-medium uppercase text-[13px]">${val.Name}</td>
                        <td class="px-4 py-4">
                            <a href='mailto:${val.Email}' class='flex hover:text-blue-600 hover:underline'>
                                ${val.Email}
                                <svg fill="#000000" width="10px" height="10px" viewBox="0 0 24 24" id="up-right" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><line id="primary" x1="18.36" y1="5.64" x2="5" y2="19" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><polyline id="primary-2" data-name="primary" points="9 5 19 5 19 14.9" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline></svg>
                            </a>
                        </td>
                        <td class="px-4 py-4">
                            <a href='tel:${val.Phone}' class='flex hover:text-blue-600 hover:underline'>
                                ${val.Phone}
                                <svg fill="#000000" width="10px" height="10px" viewBox="0 0 24 24" id="up-right" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><line id="primary" x1="18.36" y1="5.64" x2="5" y2="19" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><polyline id="primary-2" data-name="primary" points="9 5 19 5 19 14.9" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline></svg>
                            </a>
                        </td>
                        <td class="px-4 py-4 text-black font-medium">${val.Role}</td>
                        <td class="px-3 py-3 flex items-center">
                            <a href="/user-update?{% for key, value in row.items() %}{{ key }}={{ value }}{% if not loop.last %}&{% endif %}{% endfor %}"
                                class="font-medium text-green-600 hover:underline" id="user_edit_tooltip">
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
                            <a href="/user-management-delete?{% for key, value in row.items() %}{{ key }}={{ value }}{% if not loop.last %}&{% endif %}{% endfor %}"
                                class="ml-6 font-medium text-green-600 hover:underline" id="user_delete_tooltip">
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
                            </a>

                            <a href="/user-rest?{% for key, value in row.items() %}{{ key }}={{ value }}{% if not loop.last %}&{% endif %}{% endfor %}"
                                class="ml-6 font-medium  hover:underline" id="user_reset_password_tooltip">
                                <svg fill="#000000" width="26px" height="26px" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <title>Lock Reset</title>
                                    <path
                                        d="M13.16,3.17A8.83,8.83,0,1,1,5.76,16.8l1.4-1.11a7.05,7.05,0,1,0-1-4.57H8.6L5.3,14.41,2,11.12H4.38a8.83,8.83,0,0,1,8.78-7.95m2.57,7.21a.81.81,0,0,1,.81.81v3.9a.82.82,0,0,1-.82.82H11a.79.79,0,0,1-.75-.82V11a.79.79,0,0,1,.74-.81V9.46a2.39,2.39,0,0,1,2.71-2.37A2.47,2.47,0,0,1,15.8,9.57v.81m-1.11-.84A1.22,1.22,0,0,0,14,8.4a1.29,1.29,0,0,0-1.86,1.09v.89h2.57Z" />
                                </svg>
                            </a>
                        </td>
                    </tr>
                `;
            })

            user_management_tbody.innerHTML = users;
        }

    } catch (error) {

        const resErr = error.response && error.response.data.message ? error.response.data.message : error.message
        console.log(resErr);
    }
}

getAllUsers();