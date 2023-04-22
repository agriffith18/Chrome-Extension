document.addEventListener("DOMContentLoaded", () => {
  let config;

  fetch("config.json")
    .then((response) => response.json())
    .then((data) => {
      config = data;
      concertFetch();
    })
    .catch((err) => console.error(err));

  const h1 = document.createElement("h1");
  let ul = document.createElement("ul");

  h1.innerText = "Concerts in San Jose";
  ul.setAttribute("id", "concerts");

  document.body.appendChild(h1);
  document.querySelector("body").appendChild(ul);

  // fetch the concert data
  // inside use a helper function to append the information. helper func is outside fetch func

  const concertFetch = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": config.api_key,
        "X-RapidAPI-Host": "concerts-artists-events-tracker.p.rapidapi.com",
      },
    };

    fetch(
      "https://concerts-artists-events-tracker.p.rapidapi.com/location?name=San%20Jose&minDate=2023-04-21&maxDate=2023-04-28&page=1",
      options
    )
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .then((response) => helperFunc(response))
      .catch((err) => console.error(err));
  };

  const helperFunc = (data) => {
    for (const key in data) {
      if (key === "data") {
        // console.log(data[key]);
        for (let i = 0; i < data[key].length; i++) {
          //   console.log(data[key][i].description);

          // create another ul
          const innerUl = document.createElement("ul");
          // create another line with a li and anchor tag with the src link usng inner html
          const innerLi = document.createElement("li");
          innerLi.innerHTML = `<a href=${data[key][i].location.sameAs}>Venue</a>`;
          innerUl.appendChild(innerLi);

          // append the link to the ul
          // then append the ul to the description const li

          const li = document.createElement("li");
          let description = data[key][i].description;

          for (let i = description.length; i >= 0; i--) {
            if (description[i] === "a") {
              let oldDate = description.slice(i + 3);
              // console.log(oldDate);
              const date = new Date(oldDate).toDateString();
              //   date.toString();
              //   date.toDateString();
              description = description.replace(oldDate, date);
              console.log(description);
              li.innerText = `${description}`;
      

              ul.appendChild(li);
              break;
            }
       
          }
          li.appendChild(innerUl);
        }
      }
    }
  };
});
