const notification_container = document.getElementById('notification_container');
const loader = document.getElementById('loader');
const notification_search = document.getElementById('notification_search');
const notification_refresh_btn = document.getElementById('notification_refresh_btn');


const notyf = new Notyf();


notification_refresh_btn.addEventListener('click', () => {
    getNotifications();
})


notification_search.addEventListener('keyup', async (e) => {
    e.preventDefault();

    try {

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/all-notification`, config)

        const filter = data.filter(item => {
            return Object.values(item).join('').toLowerCase().includes(notification_search.value.toLowerCase())
        })

        if (filter.length > 0) {

            notification_container.style.display = 'block';

            let output = '';

            filter?.forEach((val) => {
                const time = new Date(val.date)
                const utcTime = `${time.getUTCFullYear()}-${time.getUTCMonth() + 1}-${time.getUTCDate()} ${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;

                output += `
                    <div class="bg-white">
                        <div class="flex p-2 border-b">
                            <div class=" w-9 h-9 flex uppercase items-center bg-[#ddeee5] text-sm font-bold text-center flex justify-center hover:bg-[#00a651] hover:text-white cursor-pointer p-1.5 rounded-full profile_div">
                                ${val.name.charAt(0)}
                            </div>
                            <div class="ml-3">
                                <div class="text-sm font-medium capitalize">${val.name}</div>
                                <div class="text-[13.5px] font-bold"> ${val.reference} - <span class="${val.action === 'Create' ? "text-green-500 uppercase" : val.action === 'Update' ? "text-blue-500 uppercase" : val.action === 'Delete' ? "text-red-500 uppercase" : "text-black uppercase"}">${val.action}</span></div>
                                <div class="text-xs text-gray-400">${timeAgo(utcTime)} - ${utcTime}</div>
                            </div>
                        </div>
                    </div>
                `
            })

            notification_container.innerHTML = output;

        } else {
            notification_container.style.display = 'block';
            notification_container.innerHTML = `<div class='text-center my-5 font-bold text-gray-600'> No Notifications Match Your Search</div>`;
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






async function getNotifications() {

    try {

        loader.classList.add('active');
        notification_container.style.display = 'none';

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/all-notification`, config)

        if (data.length > 0) {

            loader.classList.remove('active');
            notification_container.style.display = 'block';

            let output = '';

            data?.forEach((val) => {
                const time = new Date(val.date)
                const utcTime = `${time.getUTCFullYear()}-${time.getUTCMonth() + 1}-${time.getUTCDate()} ${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;

                output += `
                    <div class="bg-white">
                        <div class="flex p-2 border-b">
                            <div class=" w-9 h-9 flex uppercase items-center bg-[#ddeee5] text-sm font-bold text-center flex justify-center hover:bg-[#00a651] hover:text-white cursor-pointer p-1.5 rounded-full profile_div">
                                ${val.name.charAt(0)}
                            </div>
                            <div class="ml-3">
                                <div class="text-sm font-medium capitalize">${val.name}</div>
                                <div class="text-[13.5px] font-bold"> ${val.reference} - <span class="${val.action === 'Create' ? "text-green-500 uppercase" : val.action === 'Update' ? "text-blue-500 uppercase" : val.action === 'Delete' ? "text-red-500 uppercase" : "text-black uppercase"}">${val.action}</span></div>
                                <div class="text-xs text-gray-400">${timeAgo(utcTime)} - ${utcTime}</div>
                            </div>
                        </div>
                    </div>
                `
            })

            notification_container.innerHTML = output;

        } else {
            loader.classList.remove('active');
            notification_container.style.display = 'block';
            notification_container.innerHTML = `<div class='text-center my-5 font-bold text-gray-600'>No Results Found</div>`;
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

getNotifications();




function timeAgo(input) {
    const date = (input instanceof Date) ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return formatter.format(Math.round(delta), key);
        }
    }
}
