const listRepos = async username => {
    const repos = await fetch(
        `https://api.github.com/users/${username}/repos?type=owner`
    )
        .then(res => res.json())
        .catch(err => console.error(err))

    const markup = repos
        .map(
            repo => `
            <li>
                <a href="${repo.html_url}">${repo.name}</a>
                (<span style="height: 30px;">🌠</span>${repo.stargazers_count})
            </li>
        `
        )
        .join('')

    const content = document.getElementById('content')

    content.innerHTML = `<ul>${markup}</ul>`
}

const form = document.querySelector('.control')
const input = document.querySelector('input')
const button = document.querySelector('button')

button.addEventListener('click', () => {
    const userName = input.value

    if (userName) {
        listRepos(userName)
    }
    else {
        const errorMessage = document.createElement('p')
        errorMessage.textContent = 'Please Type a User Name'
        form.appendChild(errorMessage)
    }
})