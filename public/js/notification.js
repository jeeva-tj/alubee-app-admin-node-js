const notification_btn = document.getElementById('notification_btn');
const notification_box = document.getElementById('notification_box');
const notification_details = document.getElementById('notification_details');
const notification_loader = document.getElementById('notification_loader');
const notification_count = document.getElementById('notification_count');


notification_btn.addEventListener('click', () => {
    notification_box.classList.toggle('active')
})


async function getNotification() {

    try {

        notification_loader.classList.add('active');

        const a_token = sessionStorage.getItem('alubee');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${a_token}`
            }
        }

        const { data } = await axios.get(`${hostUrl}/notification`, config)

        if (data.length > 0) {

            notification_loader.classList.remove('active');

            notification_count.innerHTML =  data[0]?.['today_notification_count'] ? `${data[0]?.['today_notification_count']} Notification` : "0 Notification";

            let output = '';
            
            data?.forEach((val) => {

                const time = new Date(val.Date.value)
                const utcTime = `${time.getUTCFullYear()}-${time.getUTCMonth() + 1}-${time.getUTCDate()} ${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`;

                output += `
                    <div class="flex p-2 border-b">
                        <div class=" w-9 h-9 flex uppercase items-center bg-[#ddeee5] text-sm font-bold text-center flex justify-center hover:bg-[#00a651] hover:text-white cursor-pointer p-1.5 rounded-full profile_div">
                            ${val.Name.charAt(0)}
                        </div>
                        <div class="ml-3">
                            <div class="text-sm font-medium capitalize">${val.Name}</div>
                            <div class="text-[13.5px] font-bold"> ${val.Reference} - <span class="${val.Action === 'Create' ? "text-green-500 uppercase" : val.Action === 'Update' ? "text-blue-500 uppercase" : val.Action === 'Delete' ? "text-red-500 uppercase" : "text-black uppercase"}">${val.Action}</span></div>
                            <div class="text-xs text-gray-400">${timeAgo(utcTime)}</div>
                        </div>
                    </div>
                `
            })

            notification_details.innerHTML = output;
        
        } else {
            notification_loader.classList.remove('active');
            notification_details.innerHTML = `<div class="text-gray-400 text-sm text-center mb-3">Empty</div>`;
            notification_count.innerHTML = "0 Notification"
        }

    } catch (error) {

        notification_loader.classList.remove('active');
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

getNotification();




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
