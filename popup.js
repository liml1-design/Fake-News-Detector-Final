let calcScore = document.getElementById('calcScore');
let resultDoc = document.getElementById('result');
result.style.display = "none";
let resultText = document.createElement("b");

calcScore.addEventListener("click", async () => {
//get current active tab
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

        try{
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        let domain = url.match(/\.([^./]+)\./)[1];
        this.detectScore(domain);        
        

        }
        catch(error) {
            alert(error);
        }

    
    });
    
});


function detectScore(company) {

    fetch("./values.json")
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {

            if(data.hasOwnProperty(company))
            {
                let score = data[company][0].reli;
                if(score == 1)
                {
                    score = 'This is a reliable website.';
                }
                else if(score == 2)
                {
                    score = 'Take this website with a grain of salt';
                }
                else if(score == 3)
                {
                    score = 'This site constains fake or satirical news.';
                }
                resultText.innerText = score;
                resultDoc.append(resultText);
                resultDoc.style.display = "block";
               }
            else
            {
                resultText.innerText = 'Sorry, but this website is not in our database.'
                resultDoc.append(resultText);
                resultDoc.style.display = "block";
            }
        })
        .catch(function(error) {
            alert('Error: ' + error.message);
        });
    }
