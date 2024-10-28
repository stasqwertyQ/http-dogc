    async function loadBreeds() {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        const breedList = document.getElementById('breedList');

        Object.keys(data.message).forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedList.appendChild(option);
        });
        }

        async function searchDog() {
        const breed = document.getElementById('breedList').value;
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (!breed) {
            resultsDiv.innerHTML = '<p>Please select a breed.</p>';
            return;
        }

        try {
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
            if (!response.ok) throw new Error('Breed not found');
            
            const data = await response.json();

            const dogDiv = document.createElement('div');
            dogDiv.className = 'dog-info';
            dogDiv.innerHTML = `
            <h2>${breed.charAt(0).toUpperCase() + breed.slice(1)}</h2>
            <p><strong>Image:</strong><br><img src="${data.message}" alt="${breed}" width="200"></p>
            `;
            resultsDiv.appendChild(dogDiv);
        } catch (error) {
            resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
        }

        loadBreeds();