let form
let reposList

document.addEventListener("DOMContentLoaded", () =>{
    form = document.getElementById("github-form")
    form.addEventListener("submit", function (e) {
            let search = document.getElementById("search").value
            e.preventDefault()
            form.reset()

        //searches name with space and joins them
        fullName = search.split(" ").join("")
            fetch("https://api.github.com/users/"+fullName)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                document.getElementById("repos-list").innerHTML = 
                `
                <h1 style="text-align: center">${data.login}</h1>
                <img style="border-radius: 50px 0 50px 0" src=${data.avatar_url}>
                <h2 style="text-align: center"><a target="_blank" href=${data.html_url}>Git Me!</a></h2>
                `
            })
            fetch("https://api.github.com/users/"+fullName+'/repos')
            .then((resp)=>resp.json())
            .then((data2)=>{
                data2.forEach(repos => {
                    repos.name
                    reposList = document.querySelector("#repos-list")
                    let li = document.createElement("li")
                    li.textContent = `${repos.name}`
                    reposList.appendChild(li)
                })
            })
        })
    

})

