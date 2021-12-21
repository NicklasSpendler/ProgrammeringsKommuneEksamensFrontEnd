let data;

let searchInputElem = document.querySelector(".searchInput");

let tableCotentElem = document.querySelector(".table__content");

let opacityWindowElem = document.querySelector(".opacityWindow");
let createCandidateBoxElem = document.querySelector(".createCandidateBox");

init();
function init() {
    initTable();

    initPartySelector();
}


selectPartySelectorElem = document.querySelector("#sltParti");

function initPartySelector(){
    fetch("http://localhost:8080/politicalParty")
    .then(response => response.json())
    .then(result => {
        result.forEach(data => {
            let party_item = `<option value="${data.partyID}">${data.partyName}</option>`;
            selectPartySelectorElem.insertAdjacentHTML("beforeend", party_item);
        });
    })
}


function initTable() {
    fetch("http://localhost:8080/candidate")
    .then(response => response.json())
    .then(result => {
        data = result;
        renderAllData(data);
        console.log(data);
    })
}

function renderAllData(){
    data.forEach(element => {
        renderTable(element)
    });
}

function renderTable(element) {

    let tableItemNode = document.querySelector(".cloneNode__tableItem");

    let cloneNode = tableItemNode.cloneNode(true);

    cloneNode.classList.remove("hidden");

    
    let nodeName = cloneNode.querySelector(".item__candidateName p");
    nodeName.textContent = element.candidateName;

    let nodePartyName = cloneNode.querySelector(".item__partyName p");
    nodePartyName.textContent = element.party.partyName;

    let nodeAmountOfVotes = cloneNode.querySelector(".item__amountOfVotes p");
    nodeAmountOfVotes.textContent = element.numberOfVotes;

    let nodeEditButton = cloneNode.querySelector(".item__edit");
    nodeEditButton.href = `editCandidate.html?candidate_id=${element.candidateID}`

    let nodeDeleteButton = cloneNode.querySelector(".item__delete");
    nodeDeleteButton.addEventListener("click",  async function(e) {
        e.preventDefault();


        const url = "http://localhost:8080/candidate/" + element.candidateID;

        const fetchOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: ""
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          console.log("det gik ikke godt");
        }
        if (response.ok) {
          cloneNode.remove();
        }
    });


    tableCotentElem.appendChild(cloneNode);
}


// Search function
let searchTerm;
let searchResult;

searchInputElem.addEventListener("input", (e) => {
    tableCotentElem.innerHTML = "";
    searchTerm = searchInputElem.value.toLowerCase();
    
    if (searchInputElem.value != "") {
        searchResult = data.filter((element) => {

            if(element.candidateName.toLowerCase().includes(searchTerm) ||
            element.numberOfVotes.toString().includes(searchTerm) ||
            element.party.partyName.toString().toLowerCase().includes(searchTerm)) {
                return element;
            }
        })

        
        searchResult.forEach(result => {
            renderTable(result)
        })


    } else {
        data.forEach(result => {
            renderTable(result);
        })
        
    }
})



addCandidateFormElem = document.querySelector(".addCandidateForm");

addCandidateFormElem.addEventListener("submit", async function(e){
    e.preventDefault();

    form = addCandidateFormElem;
    const url = addCandidateFormElem.action;

    try {
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());

        const json = {
            candidateName: plainFormData.candidateName,
            numberOfVotes: plainFormData.amountOfVotes,
            party: {
                "partyID": plainFormData.partyID
            }
        }

        const jsonString = JSON.stringify(json);
        
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonString
        }
        const response = await fetch(url, fetchOptions);
        if(!response.ok) {
            console.log('Det var satans >:(')
        }else{
            opacityWindowElem.style.display = "none";
            createCandidateBoxElem.style.display = "none";
            renderTable(json)
            alert("Kandidat oprettet")
        }
    } catch (error) {
        alert(error.message);
    }

})


/*
addPartyFormElem = document.querySelector(".addParty")


addPartyFormElem.addEventListener("submit", async function(e) {
    e.preventDefault();

    form = addPartyFormElem;
    const url = addPartyFormElem.action;

    try {
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
        console.log('');
        const jsonString = JSON.stringify(plainFormData);
        console.log(jsonString)
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonString
        }
        const response = await fetch(url, fetchOptions);
        if(!response.ok) {
            console.log('Det var satans >:(')
        }else{
            opacityWindowElem.style.display = "none";
            createPartyBoxElem.style.display = "none";
            alert("Parti oprettet")
        }
    } catch (error) {
        alert(error.message);
    }

})


// open window for create parti
document.querySelector(".openCreatePartiWindow").addEventListener("click", ()=> {
    opacityWindowElem.style.display = "block";
    createPartyBoxElem.style.display = "block";
})
*/
//close window for create parti
document.querySelector(".boxClose").addEventListener("click", ()=> {
    opacityWindowElem.style.display = "none";
    createCandidateBoxElem.style.display = "none";
})

document.querySelector(".openCandidateWindow").addEventListener("click", ()=> {
    opacityWindowElem.style.display = "block";
    createCandidateBoxElem.style.display = "block";
})


//sort by partyName
document.querySelector(".header__partyName").addEventListener("click", ()=> {

    tableCotentElem.innerHTML = "";

    data.sort((a, b) => {
        let fa = a.party.partyName.toLowerCase(),
            fb = b.party.partyName.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    data.forEach(element => {
        renderTable(element);
    });
})

document.querySelector(".header__antalStemmer").addEventListener("click", ()=> {

    tableCotentElem.innerHTML = "";

    
    
    data.sort((a, b) => {
        return  b.numberOfVotes - a.numberOfVotes 
    });

    

    data.forEach(element => {
        renderTable(element);
    });
})

document.querySelector(".header__name").addEventListener("click", ()=> {

    tableCotentElem.innerHTML = "";

    data.sort((a, b) => {
        let fa = a.candidateName.toLowerCase(),
            fb = b.candidateName.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });


    data.forEach(element => {
        renderTable(element);
    });
    
})