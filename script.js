let presentingIssues;


async function createButtonsPop() {
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
            const presentingIssue = issue.name;
            issue.symptoms.forEach(symptom => {
                const symptomCheckbox = document.createElement('input');
                symptomCheckbox.type = 'checkbox';
                symptomCheckbox.classList.add('btn-check');
                symptomCheckbox.name = presentingIssue.toLowerCase();
                symptomCheckbox.id = symptom.name.toLowerCase();
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

async function createButtonsPresentingIssues() {
    try {
        const response = await fetch('/api/populations');
        const data = await response.json();
        
        const populations = data.populations;
        createButtons2(populations);
    } catch (error) {
        console.error('Error fetching presenting issues:', error);
    }
}

const container2 = document.querySelector('.populations');

const createButtons2 = (data) => {
    try {
        data.forEach(population => {
            const pop = population.name;
            const populationsSelect = document.createElement('select');
            populationsSelect.type = 'select';
            populationsSelect.classList.add('form-select');
            populationsSelect.name = 'pop';
            populationsSelect.id = pop.toLowerCase();
            populationsSelect.value = pop;
            populationsSelect.autocomplete = 'off';

            const populationsLabel = document.createElement('label');
            populationsLabel.textContent = pop;


            const option0 = document.createElement('option');
            option0.textContent = 'N/A';
            option0.value = 0;
            populationsSelect.appendChild(option0);
            const option1 = document.createElement('option');
            option1.textContent = 'Not imporant';
            option1.value = 1;
            populationsSelect.appendChild(option1);
            const option2 = document.createElement('option');
            option2.textContent = 'Important';
            option2.value = 2;
            populationsSelect.appendChild(option2);
            const option3 = document.createElement('option');
            option3.textContent = 'Extremely imporant';
            option3.value = 3;
            populationsSelect.appendChild(option3);
            

            container2.appendChild(populationsLabel);
            container2.appendChild(populationsSelect);

            

        });
    } catch (error) {
        console.error('Error creating buttons:', error);
        console.log('Data:', data);
        console.log('createButtons2 called with data:', data);
    };
};

window.addEventListener('load', myInit, true); function myInit(){
    createButtonsPop();
    createButtonsPresentingIssues();
}
      