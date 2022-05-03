const form = document.querySelector("#github-form")

form.addEventListener('submit', (event) => {
  event.preventDefault()
  //data we want to pass to the form
  event.target[0].value
  fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
  .then(response => response.json())
  .then(user => {
    //login, avatar_url, url
    const userList = document.querySelector("#user-list")
    userList.innerhtml = ""
    user.items.map(item => {
      const li = document.createElement("li")
      const h2 = document.createElement("h2")
      h2.textContent = item.login
      h2.addEventListener('click', e => showUserRepos(item.login, e))
      const img = document.createElement("img")
      img.src = item.avatar_url

      
      li.append(h2, img)
      userList.append(li)
    })
  })
  form.reset()
})
function showUserRepos(username, e) {
  const reposList = document.getElementById("repos-list")
  //clear the list out
  reposList.innerHTML = ""
  e.preventDefault()
  //console.log("username", username)
  fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(response => response.map(repos => {
    const li = document.createElement('li')
    const h1 = document.createElement('h1')
    h1.textContent = repos.name
    
    li.append(h1)
    reposList.append(li)
  }))
}

