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
        data.forEach(presentingIssue => {
            const symptom = presentingIssue.name;
            const presentingIssuesSelect = document.createElement('select');
            presentingIssuesSelect.type = 'select';
            presentingIssuesSelect.classList.add('form-select');
            presentingIssuesSelect.name = 'symptoms';
            presentingIssuesSelect.id = symptom.toLowerCase();
            presentingIssuesSelect.value = symptom;
            presentingIssuesSelect.autocomplete = 'off';

            const presentingIssuesLabel = document.createElement('label');
            presentingIssuesLabel.textContent = symptom;

            //const k = 4;

            const option0 = document.createElement('option');
            option0.textContent = 'Not an impact';
            option0.value = 0;
            presentingIssuesSelect.appendChild(option0);
            const option1 = document.createElement('option');
            option1.textContent = 'Minor impact on daily life';
            option1.value = 1;
            presentingIssuesSelect.appendChild(option1);
            const option2 = document.createElement('option');
            option2.textContent = 'Noticable impact on daily life';
            option2.value = 2;
            presentingIssuesSelect.appendChild(option2);
            const option3 = document.createElement('option');
            option3.textContent = 'Causing major disruptions in daily life';
            option3.value = 3;
            presentingIssuesSelect.appendChild(option3);
            

            container.appendChild(presentingIssuesLabel);
            container.appendChild(presentingIssuesSelect);

            

        });
    } catch (error) {
        console.error('Error creating buttons:', error);
        console.log('Data:', data);
        console.log('createButtons2 called with data:', data);
    };
        
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

            const k = 4;

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
            option3.textContent = 'Extremely important';
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
      