/* Global Variables */
const content = document.getElementById('feelings').value;
const apiKey = 'a5a4bf35aa8908ea93d343892af46b30';
const zip = document.getElementById('zip').value;

// Create a new date instance dynamically with JS
const getDate = () => {
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate;
}
const performAction = () => {
    const fetchData = async () => {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`);
        let data = await response.json();
        return data;
    }

    fetchData()
        .then(data => console.log(data))
        .catch(reason => console.log(reason.message))
}

document.getElementById('generate').addEventListener('click', performAction);





