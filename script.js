const usernameInput = document.getElementById('usernameInput');
const userDetailsContainer = document.getElementById('userDetailsContainer');
const repositoriesList = document.getElementById('repositoriesList');
const pagination = document.getElementById('pagination');

const perPage = 10;
let currentPage = 1;

async function getRepositories() {
    const username = usernameInput.value;

    // API request to GitHub
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const response = await fetch(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`);
    const repositories = await response.json();

    const user = await userResponse.json();
    displayRepositories(repositories);
    displayUserDetails(user);
    displayPagination(result.totalPages);
}
 
function displayUserDetails(user) {
    // Clear previous results
    userDetailsContainer.innerHTML = '';

    // Display user details
    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');

    const userImage = document.createElement('img');
    userImage.src = user.avatar_url;
    userImage.alt = user.login;
    userImage.classList.add('user-image');
    userContainer.appendChild(userImage);

    const userName = document.createElement('h2');
    userName.innerText = user.login;
    userContainer.appendChild(userName);
     
    const userLink = document.createElement('a');
    userLink.href = user.html_url;
    userLink.innerText = `http://github.com/${user.login}`;
    userContainer.appendChild(userLink);

    userDetailsContainer.appendChild(userContainer);

}

function displayRepositories(repositories) {
    
    repositoriesList.innerHTML = '';

    
    repositories.forEach(repository => {
        
        const repoContainer = document.createElement('div');
        repoContainer.classList.add('repository-container');

        const repoHeader = document.createElement('h3');
        repoHeader.innerText = repository.name;
        repoContainer.appendChild(repoHeader);

        
        
        const repoDescription = document.createElement('p');
        repoDescription.innerText = repository.description || 'No description ';
        repoContainer.appendChild(repoDescription);
          
        const languagesContainer = document.createElement('div');
        languagesContainer.classList.add('languages-container');

        if (repository.language) {
            const languages = repository.language.split(',').map(lang => lang.trim());
            languages.forEach(language => {
                const languageBadge = document.createElement('span');
                languageBadge.classList.add('language-badge');
                languageBadge.innerText = language;
                languagesContainer.appendChild(languageBadge);
            });
        } else {
            const noLanguagesBadge = document.createElement('span');
            noLanguagesBadge.classList.add('language-badge');
            noLanguagesBadge.innerText = 'No languages specified';
            languagesContainer.appendChild(noLanguagesBadge);
        }

        repoContainer.appendChild(languagesContainer);
        repositoriesList.appendChild(repoContainer);
    });
}
function displayPagination(totalPages) {
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            getRepositories();
        });
        pagination.appendChild(pageButton);
    }
}
getRepositories();