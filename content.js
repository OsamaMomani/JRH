
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ready() {
    while (document.readyState != "complete")
        await sleep(50);
}


function sendRes(course, i){
    chrome.runtime.sendMessage({
        "course" : course,
        "i": i
    })
}

async function start(interval, courses, alarm, i) {
    let log = ""
    for (let course of courses) {
        if (document.getElementById("aspnetForm").children[4].children[2].children[1] != undefined)
            if (document.getElementById("aspnetForm").children[4].children[2].children[1].children[0].children[3].children[0].children[0].children[0].children[1].children[1].id == "ctl00_cphBody_btnAvailableSections")
                document.getElementById("aspnetForm").children[4].children[2].children[1].children[0].children[3].children[0].children[0].children[0].children[1].children[0].value = course; // get Viewstat first
            else
                document.getElementById("aspnetForm").children[4].children[2].children[1].children[0].children[3].children[0].children[0].children[0].children[1].children[1].value = course;
        else
            if (document.getElementById("aspnetForm").children[5].children[2].children[1].children[0].children[3].children[0].children[0].children[0].children[1].children[1].id == "ctl00_cphBody_btnAvailableSections")
                document.getElementById("aspnetForm").children[5].children[2].children[1].children[0].children[3].children[0].children[0].children[0].children[1].children[0].value = course; // get Viewstat first
            else
                document.getElementById("aspnetForm").children[5].children[2].children[1].children[0].children[3].children[0].children[0].children[0].children[1].children[1].value = course;
        //document.body.prepend("1");
        await sleep(interval/3);
        document.getElementById("ctl00_cphBody_btnAvailableSections").click();
        await ready();
        //document.body.prepend("2");
        sendRes(course,i)
        await sleep(interval/3);
        //document.body.prepend("******" + interval );

        //document.body.prepend(" " + course + " ");

        await ready();
        if (document.getElementById("aspnetForm").children[8] != undefined)
            document.getElementById("aspnetForm").lastChild.lastChild.lastChild.lastChild.click();

        if (document.getElementById("aspnetForm").children[8] != undefined)
            document.getElementById("aspnetForm").lastChild.lastChild.lastChild.lastChild.click();


        //document.body.prepend("3 //////////////////////////////////////////////////////////////////");
        await ready();

        await sleep(interval/3);
        log += " " + course;
    }
    return log;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    start(message['interval'], message['courses'], message['alarm'], message['i'])

    return true;
})
