function insertElementIntoDomFromString(String) {
    let mydiv = document.createElement("div");
    mydiv.innerHTML = String;
    return mydiv.firstElementChild;
}

let parametersBox = document.getElementById("parametersBox");
let requestJsonBox = document.getElementById("requestJsonBox");
let Content = document.getElementById("Content");
Content.style.display = "none";

let get = document.getElementById("get");
get.addEventListener("click", () => {
    Content.style.display = "none";
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "none";
})

let post = document.getElementById("post");
post.addEventListener("click", () => {
    Content.style.display = "block";
    requestJsonBox.style.display = "block";
})



parametersBox.style.display = "none";
requestJsonBox.style.display = "none";

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "block";
})

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block";
})




let addedParamCount = 0;

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {

    let string = ` <div class="form-row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
    </div>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam">-</button>
    </div>`;


    let newParamElement = insertElementIntoDomFromString(string);

    let params = document.getElementById("params");
    params.appendChild(newParamElement);


    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        })
    }

    addedParamCount++;

})

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {

    let responseJsonText = document.getElementById("responseJsonText");
    responseJsonText.innerText = "Please wait for fetching data...";


    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    //*****************OR*******************
    // let get = document.getElementById("get");
    // let post = document.getElementById("post");
    // let requestType= (post.checked) ? (post.value) : (get.value);
    // console.log(requestType);
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    if (contentType == "params") {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {

            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
                console.log(data);
            }
        }
        data = JSON.stringify(data);

    } else {
        data = document.getElementById("requestJsonText").value;
    }

    // console.log('URL is ', url);
    // console.log('requestType is ', requestType);
    // console.log('contentType is ', contentType);
    // console.log('data is ', data);

    if (requestType == "GET") {

        let responseJsonText = document.getElementById("responseJsonText");

        fetch(url, {
            method: "GET",
        })
            // Handle success
            .then(response => response.text())  // convert to json
            .then((json) => responseJsonText.innerHTML = json)
            .catch(err => responseJsonText.innerHTML = ('Request Failed', err))// Catch errors   //print data to console
    }
    else {
        fetch(url, {
            method: "POST",
            body: data,
            headers: { "Content-type": "application/json;charset=UTF-8" }
        })
                  // Handle success
                .then(response => response.text())  // convert to json
                .then(json => responseJsonText.innerHTML = json)    //print data to console
                .catch(err => responseJsonText.innerHTML = ('Request Failed', err)) // Catch errors

    }

})
