async function fetchPresentingIssues() {
    try {
        const response = await fetch('/api/presenting-issues');
        const data = await response.json();
        
        const presentingIssues = data.presentingIssues;
        createButtons(presentingIssues);
    } catch (error) {
        console.error('Error fetching presenting issues:', error);
    }
}

const createButtons = (data) => {
    const container = document.querySelector('.presentingIssues');

    try {
        for (const issueName in data) {
            const issue = data[issueName];
            issue.symptoms.forEach(symptom => {
                const symptomCheckbox = document.createElement('input');
                symptomCheckbox.type = 'checkbox';
                symptomCheckbox.classList.add('btn-check');
                symptomCheckbox.name = issueName.toLowerCase();
                symptomCheckbox.id = symptom.name.toLowerCase(); // Replace spaces with hyphens for the ID
                symptomCheckbox.value = symptom.name;
                symptomCheckbox.autocomplete = 'off';

                const symptomLabel = document.createElement('label');
                symptomLabel.textContent = symptom.name;
                symptomLabel.classList.add('btn', 'btn-outline-primary', 'mb-2');
                symptomLabel.setAttribute('for', symptomCheckbox.id);

                container.appendChild(symptomCheckbox);
                container.appendChild(symptomLabel);
            });
        }
    } catch (error) {
        console.error('Error creating buttons:', error);
        console.log('Data:', data);
    }
}


window.addEventListener('load', fetchPresentingIssues);
