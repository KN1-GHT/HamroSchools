const schools = [
    { name: "School A", location: "City X" },
    { name: "School B", location: "City Y" },
    { name: "School C", location: "City X" },
    { name: "College D", location: "City Z" }
  ];
  
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchResults = document.getElementById("search-results");
  
  searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    const query = searchInput.value.toLowerCase();
    const results = schools.filter(function(school) {
      return school.name.toLowerCase().includes(query);
    });
    displayResults(results);
  });
  
  function displayResults(results) {
    searchResults.innerHTML = "";
    if (results.length > 0) {
      results.forEach(function(result) {
        const div = document.createElement("div");
        div.textContent = result.name + " (" + result.location + ")";
        searchResults.appendChild(div);
      });
    } else {
      const div = document.createElement("div");
      div.textContent = "No results found.";
      searchResults.appendChild(div);
    }
    searchResults.style.display = "block";
  }
  