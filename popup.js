let running = false;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("btn").addEventListener('click', onclick, false)
    function onclick() {

        options = {
            "interval": parseFloat(document.getElementById("interval").value) * 1000,
            "courses": document.getElementById("courses").value.split(','),
            "alarm": document.getElementById("alarm").checked,
            "i": 0
        }
        if (running) {
            document.getElementById("btn").innerText = "Start";
            running = false;
        }
        else {
            document.getElementById("log").innerHTML += "<br>";
            document.getElementById("btn").innerText = "Stop";
            running = true;
            start();
        }

    }


    chrome.runtime.onMessage.addListener((message) => {
        if (message["course"])
            document.getElementById("log").innerHTML += "//" + message["course"] + "("+ message["i"] +")//"
    })


    async function start() {
        let i = 1
        while (running) {
            options["i"] = i
            chrome.tabs.query({ currentWindow: true, active: true },
                (tabs) => chrome.tabs.sendMessage(tabs[0].id, options)
            )
//            document.getElementById("log").innerHTML +=  options["interval"]
                i+=1

            await new Promise(resolve => setTimeout(resolve,
                (options["interval"] * options["courses"].length
                    + options["courses"].length * 3000)))
document.getElementById("log").innerHTML+= "<br>"
        }

    }
}
    , false)
