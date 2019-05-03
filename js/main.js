const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

const searchStates = async searchText => {
  const res = await fetch("https://gist.githubusercontent.com/jpriebe/d62a45e29f24e843c974/raw/b1d3066d245e742018bce56e41788ac7afa60e29/us_state_capitals.json");
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
