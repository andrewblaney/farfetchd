console.log("SCRAPEING TWEETS");

function scrape() {
    return Array.from(document.querySelectorAll('.tweet-text'));
}

function insertSpanTag(original, result)
{
    let position = original.indexOf(result.claim);

    if (position !== -1)
    {
        let color = result.isFact ? "good" : "bad";
        return original.substr(0, position) +
            `<span class='factter-tag ${color}'>`
            + result.claim
            + '</span>'
            + original.substr(position).replace(result.claim, "");
    }

    return original;
}

function addPendingTag(node) {
    node.classList.add('factter');
    node.classList.add('factter-pending');
}

function removePendingTag(node) {
    node.classList.remove('factter-pending');
}

function callFactCheckingAPI(text) {
    // return fetch('https://jsonplaceholder.typicode.com/todos/' + Math.floor(Math.random() * 200))
    //     .then(response => response.json())

    return new Promise((resolve) => {
        resolve({
            "original": "",
            "claim": "and",
            "isFact": Math.random() >= 0.5
        })
    });
}

function applyFactCheck(result, node) {
    node.innerHTML = insertSpanTag(node.innerText, result);
}


function checkTweet(node) {
    callFactCheckingAPI(node.innerText).then((result) => {
        removePendingTag(node);
        applyFactCheck(result, node);
    });

}

function start() {
    let tweets = scrape();
    tweets.forEach(t => addPendingTag(t));
    tweets.forEach(t => checkTweet(t));
}

setTimeout(start, 2000);
