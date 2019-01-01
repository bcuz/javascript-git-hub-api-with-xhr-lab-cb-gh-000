function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        // what a pain!
        '"' + 'data-user="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {

  // let str =
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${document.getElementById('username').value}/repos`);
  req.send();

  return false
}


function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}


function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li>" + commit.author.login + " <strong>" +
        commit.commit.author.name +
        "</strong> - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}
