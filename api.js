let search_key_word = '';
const encodeParameters = function(params) {
    const strArray = [];
    for(const key in params) {
        if(params.hasOwnProperty(key)) {
            const paramString = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            strArray.push(paramString);
        }
    };
    return strArray.join("&");
};

function callback(json) {
    if (json.query && json.query.pages && json.query.pages[0] && json.query.pages[0].extract) {
        document.getElementById('search_result').innerHTML = json.query.pages[0].extract;
    } else {
        document.getElementById('search_result').innerHTML = 'No data in wikipedia about ' + search_key_word;
    };

    document.getElementById('mask').style.display = 'none';
}

function getInfo(keyword) {
    const query = keyword;
    search_key_word = keyword;
    const parameters = {
        format: "json",
        formatversion: 2,
        action: "query",
        prop: "extracts",
        titles: query,
        indexpageids: "",
        redirects: "",
    };

    const base_url = "https://en.wikipedia.org/w/api.php";
    const query_url = base_url + '?' + encodeParameters(parameters) + '&callback=callback';

    const jsonpObj = document.getElementById('jsonp');
    if (jsonpObj) {
        jsonpObj.parentNode.removeChild(jsonpObj);
    }

    document.getElementById('search_tip').innerHTML = 'Search word: ' + keyword;
    document.getElementById('mask').style.display = 'block';
    
    const scr = document.createElement('script');
    scr.setAttribute('type','text/javascript');
    scr.setAttribute('src',query_url);
    scr.setAttribute('id','jsonp');
    document.getElementsByTagName('head')[0].appendChild(scr);
};

window.onload = function() {
    document.getElementById('search_button').onclick = function() {
        const query = document.getElementById('search_word').value;
        getInfo(query);
    }
}