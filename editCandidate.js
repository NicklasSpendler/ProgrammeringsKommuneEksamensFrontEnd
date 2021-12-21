init();

function init() {
    initPartySelector();
    
}

selectPartySelectorElem = document.querySelector("#sltParti");

function initPartySelector(){
    fetch("http://localhost:8080/politicalParty")
    .then(response => response.json())
    .then(result => {
        result.forEach(data => {
            let party_item = `<option class="option" value="${data.partyID}">${data.partyName}</option>`;
            selectPartySelectorElem.insertAdjacentHTML("beforeend", party_item);
        });
        fetchData();
    })
}


function getCandidateID() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const candidate_id = urlParams.get('candidate_id')
    return candidate_id;
}

function fetchData() {
    fetch(`http://localhost:8080/candidate/${getCandidateID()}`)
    .then(response => response.json())
    .then(result => setData(result));
}

function setData(data){
    console.log(data);
    document.querySelector(".editForm__name").value = data.candidateName
    document.querySelector(".editForm__amountOfVotes").value = data.numberOfVotes

    let options = document.querySelectorAll(".option")

    console.log(options);

    document.querySelector(".editForm__party").value = data.party.partyID;
}


document.querySelector(".editForm__submit").addEventListener("click", async function (e) {
    e.preventDefault()
    // ta' fat i formen fra html'en
    const form = document.querySelector("#frmEditCandidate")
    const candidateID = getCandidateID();
    const urlEditActivity = "http://localhost:8080/candidate/"+candidateID;
  
    try {
      const formData = new FormData(form);
      const plainFormData = Object.fromEntries(formData.entries());
      console.log(plainFormData);
        const json = {
            "candidateName": plainFormData.candiateName,
            "numberOfVotes": plainFormData.amountOfVotes,
            "party": {"partyID": plainFormData.partyID}
        }
      const jsonString = JSON.stringify(json);
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonString
      }
      const response = await fetch(urlEditActivity, fetchOptions);
      if (!response.ok) {
        console.log("det gik ikke godt");
      } else {
        console.log("det gik godt")
        // Husk at implemanter dette
        //document.querySelector(".msg").innerHTML = "Udstyr er opdateret. Du vil blive ledt tilbage til den forrige side om 3 sek."
        alert("Kandidat ændret")
      }
  
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  })