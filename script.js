/* Country List from https://randomuser.me/documentation (Nationalities section). 
   countryList object sorted by value.*/
let countryList = [
  { code: "", value: "Any" },
  { code: "AU", value: "Australia" },
  { code: "BR", value: "Brazil" },
  { code: "CA", value: "Canada" },
  { code: "DK", value: "Denmark" },
  { code: "FI", value: "Finland" },
  { code: "FR", value: "France" },
  { code: "DE", value: "Germany" },
  { code: "IR", value: "Iran" },
  { code: "IE", value: "Ireland" },
  { code: "NL", value: "Netherlands" },
  { code: "NZ", value: "New Zealand" },
  { code: "NO", value: "Norway" },
  { code: "ES", value: "Spain" },
  { code: "CH", value: "Switzerland" },
  { code: "TR", value: "Turkey" },
  { code: "GB", value: "United Kingdom" },
  { code: "US", value: "United States" },
];

//Default URL
let url = "https://randomuser.me/api/?results=12";

//Fetch the data 
const loadData = async (url) => {
  var cardRow = document.getElementById("card-row");
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      var content = "";
      // Loop through each person
      data.results.forEach((person) => {
        // Construct the country flag variable for MDB country flag icon
        var countryFlag = person.location.country
          .replace(/\s+/g, "-")
          .toLowerCase();
        countryFlag = "flag" + " flag-" + countryFlag;

        // Build the HTML card
        const col = `
              <div class="col-md-4 col-xl-3 my-3 text-center">
                <div class="card mx-auto style="width: 25rem;"">
                    <img class="card-img-top" src="${person.picture.large}">
                    <div class="card-body text-start">
                        <P class="name">${person.name.title}. ${person.name.first} ${person.name.last}</P>
                        <hr/>
                        <p class="email"><i class="bi bi-envelope-fill"></i> ${person.email} </p>
                        <p class="phone"><i class="bi bi-telephone-fill"></i> ${person.phone} </p>
                        <p class="location"><i class="${countryFlag}"></i>${person.location.city}, ${person.location.country} </p>
                    </div>
                </div>
              </div>      
              `;

        content += col;
      });

      cardRow.innerHTML = content;
    } else {
      console.log("FAILED!");
      console.log("STATUS: " + res.status);
    }
  } catch (err) {
    console.log("FAILED!");
    console.log("STATUS: " + err);
  }
};

// Build the country menu dropdown <li> part dynamically
let countryDropDownUl = document.getElementById("country-menu");

countryList.forEach((country) => {
  // Add "-" to 2 word country. Eg. United Kingdom -> united-kingdom.
  // This is used  to build Flags icon from MDB  - <i class="flag flag-united-kingdom"></i>

  let countryFlag = country.value.replace(/\s+/g, "-").toLowerCase();
  let li = `
              <li><button class="dropdown-item" type="button" id=${country.code}><i class="flag flag-${countryFlag}"></i>${country.value}</button></li>
    `;
  countryDropDownUl.innerHTML += li;
});

// Gender button group- click even handling [event delegation]
document.getElementById("gender").addEventListener("click", function (e) {
  var urlPart2 = "&gender=" + e.target.value;
  var urlGender = url + urlPart2;
  loadData(urlGender);
});

// Country dropdown group- click even handling [event delegation]
document.getElementById("country-menu").addEventListener("click", function (e) {
  var urlPart2 = "&nat=" + e.target.id;
  var urlCountry = url + urlPart2;
  loadData(urlCountry);
});

loadData(url);

// Handle refresh button
document.getElementById("btn-refresh").addEventListener("click", function (e) {
  location.reload();
});
