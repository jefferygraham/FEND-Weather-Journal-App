/* Global Variables */
const apiKey = '&appid=a5a4bf35aa8908ea93d343892af46b30';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
const getDate = () => {
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate;
}

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const content = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    getWeatherData(baseUrl, zip, apiKey)
        .then(function (data) {
            let temp = data.main.temp;
            postData('/addEntry', { temp: temp, content: content, date: getDate() });
        })
        .then(
            updateUI()
        )
}

const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('date').innerHTML = allData.date;
    }
    catch (error) {
        console.log(error)
    }
}

const getWeatherData = async (baseUrl, zip, apiKey) => {
    const res = await fetch(baseUrl + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log("error", error);
    }
}




