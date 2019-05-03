const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

const searchStates = async searchText => {
  const res = await fetch("https://gist.githubusercontent.com/bradtraversy/20dee7787486d10db3bd1f55fae5fdf4/raw/2c06c44dcea55ecbb6fbf20edfd240ec6373b688/state_capitals.json");
  const states = await res.json();

  let matches = states.filter(state => {
    const reg = new RegExp(`^${searchText}`, "gi");
    return state.name.match(reg) || state.abbr.match(reg);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputhtml(matches);
  //   console.log(matches);
};

const outputhtml = matches => {
  if (matches.length > 0) {
    let html = matches
      .map(
        match => `
        <div class="card card-body mb-1">
        <h4>${match.name} ${match.abbr} <span class="text-primary">${
          match.capital
        }</span></h4>
        <small>Lat: ${match.lat}/ Long: ${match.long}</small>
        </div>`
      )
      .join("");

    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
