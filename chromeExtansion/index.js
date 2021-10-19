let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");

const ulEl = document.getElementById("ul-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads(myLeads);
}

inputBtn.addEventListener("click", function () {
  console.log("button clicked");
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads(myLeads);
});

delBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  ulEl.innerHTML = "";
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //let activeTab = tabs[0];
    //let activeTabId = activeTab.id;
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});

function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    if (leads[i].startsWith("https://")) {
      listItems += `
    <li> 
        <a target='_blank'  href='${leads[i]}'>
        ${leads[i]}
        </a> 
    </li>
    `;
    } else {
      listItems += `
    <li> 
        <a target='_blank'  href=' ${"https://" + leads[i]}'>
        ${leads[i]}
        </a> 
    </li>
    `;
    }
  }

  ulEl.innerHTML = listItems;
}
