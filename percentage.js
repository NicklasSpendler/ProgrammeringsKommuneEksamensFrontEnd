let tableCotentElem = document.querySelector(".table__content");

let votes = {
    "totalVotes": 0}

let arrayOfParties = [{
    "party": "Socialdemokratiet",
    "votes": 0,
    "percentage": 0
},{
    "party": "Det Konservative Folkeparti",
    "votes": 0,
    "percentage": 0
},{
    "party": "SF, Socialistisk Folkeparti",
    "votes": 0,
    "percentage": 0
},{
    "party": "Dansk Folkeparti",
    "votes": 0,
    "percentage": 0
},{
    "party": "Venstre, Danmarks Liberale Parti",
    "votes": 0,
    "percentage": 0
},{
    "party": "Enhedslisten + De rød Grønne",
    "votes": 0,
    "percentage": 0
}
]

init();
function init (){
    getAllVotes();
}

function getAllVotes() {
    fetch("http://localhost:8080/candidate")
    .then(response => response.json())
    .then(result => {
        getVotes(result);
    })
}

function getVotes(data) {
    data.forEach(element => {
        votes.totalVotes += element.numberOfVotes;

        if(element.party.partyID == 1){
            arrayOfParties[0].votes += element.numberOfVotes
        }else if (element.party.partyID == 2){
            arrayOfParties[1].votes += element.numberOfVotes
        }else if (element.party.partyID == 3){
            arrayOfParties[2].votes += element.numberOfVotes
        }else if (element.party.partyID == 4){
            arrayOfParties[3].votes += element.numberOfVotes
        }else if(element.party.partyID == 5){
            arrayOfParties[4].votes += element.numberOfVotes
        }else if(element.party.partyID == 6){
            arrayOfParties[5].votes += element.numberOfVotes
        }
    });
    getPartyPercentage();
}

function getPartyPercentage() {
    arrayOfParties.forEach((element, irr) => {
        let partyPercentage = (element.votes / votes.totalVotes) * 100
        arrayOfParties[irr].percentage = Math.round(partyPercentage)
    });
    console.log(arrayOfParties);

    renderParties();
}

function renderParties() {
    arrayOfParties.sort((a, b) => {
        return  b.votes - a.votes 
    });
    arrayOfParties.forEach(element => {
        let tableItemNode = document.querySelector(".cloneNode__tableItem");

        let cloneNode = tableItemNode.cloneNode(true);
    
        cloneNode.classList.remove("hidden");

        let partyNameElem = cloneNode.querySelector(".item__partyName p");
        partyNameElem.textContent = element.party;

        let partyVotes = cloneNode.querySelector(".item__amountOfVotes p");
        partyVotes.textContent = element.votes;

        let percentage = cloneNode.querySelector(".item__percentage p");
        percentage.textContent = element.percentage + "%";

        tableCotentElem.appendChild(cloneNode);
    });

}