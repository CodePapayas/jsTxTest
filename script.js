document.addEventListener('DOMContentLoaded', function () {
    const popButtons = document.querySelectorAll('.populations button');

    // popButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         let value = button.getAttribute('value');
    //         value = value === "0" ? "1" : "0"; // Toggle value between 0 and 1
    //         button.setAttribute('value', value);
    //         button.classList.toggle('btn-primary');
    //         button.classList.toggle('btn-outline-primary');
    //     });
    // });

    // const symptomsButtons = document.querySelectorAll('.presenting-issues button');

    // symptomsButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         let value = button.getAttribute('value');
    //         value = value === "0" ? "1" : "0"; // Toggle value between 0 and 1
    //         button.setAttribute('value', value);
    //         button.classList.toggle('btn-primary');
    //         button.classList.toggle('btn-outline-primary');
    //     });
    // });
    function toggleElement_malePref() {
        const element = document.getElementById('malePref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_femalePref() {
        const element = document.getElementById('femalePref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_nonBinaryPref() {
        const element = document.getElementById('nonBinaryPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_pocPref() {
        const element = document.getElementById('pocPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_children0_4Pref() {
        const element = document.getElementById('children0_4Pref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_children5_12Pref() {
        const element = document.getElementById('children5_12Pref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_children13_17Pref() {
        const element = document.getElementById('children13_17Pref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_age18_30Pref() {
        const element = document.getElementById('age18_30Pref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_age31_55Pref() {
        const element = document.getElementById('age31_55Pref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_age56plusPref() {
        const element = document.getElementById('age56plusPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_lgbtqia2sPref() {
        const element = document.getElementById('lgbtqia2sPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_spiritualPref() {
        const element = document.getElementById('spiritualPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_genderAffirmationPref() {
        const element = document.getElementById('genderAffirmationPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_physicalHealthPref() {
        const element = document.getElementById('physicalHealthPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_pregnantPostpartumPref() {
        const element = document.getElementById('pregnantPostpartumPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_substanceUsePref() {
        const element = document.getElementById('substanceUsePref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_reunificationPref() {
        const element = document.getElementById('reunificationPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_courtDHSPref() {
        const element = document.getElementById('courtDHSPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_traumaPref() {
        const element = document.getElementById('traumaPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_survivorsPref() {
        const element = document.getElementById('survivorsPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    function toggleElement_griefPref() {
        const element = document.getElementById('griefPref');
        const isDisplayed = window.getComputedStyle(element).display !== "none";
        element.style.display = isDisplayed ? "none" : "block";
    }
    
    

    document.getElementById('malePreference').addEventListener('click', () => toggleElement_malePref());
    document.getElementById('femalePreference').addEventListener('click', () => toggleElement_femalePref());
    document.getElementById('nonBinaryPreference').addEventListener('click', () => toggleElement_nonBinaryPref());
    document.getElementById('pocPreference').addEventListener('click', () => toggleElement_pocPref());
    document.getElementById('children0_4Preference').addEventListener('click', () => toggleElement_children0_4Pref());
    document.getElementById('children5_12Preference').addEventListener('click', () => toggleElement_children5_12Pref());
    document.getElementById('children13_17Preference').addEventListener('click', () => toggleElement_children13_17Pref());
    document.getElementById('age18_30Preference').addEventListener('click', () => toggleElement_age18_30Pref());
    document.getElementById('age31_55Preference').addEventListener('click', () => toggleElement_age31_55Pref());
    document.getElementById('age56plusPreference').addEventListener('click', () => toggleElement_age56plusPref());
    document.getElementById('lgbtqia2sPreference').addEventListener('click', () => toggleElement_lgbtqia2sPref());
    document.getElementById('spiritualPreference').addEventListener('click', () => toggleElement_spiritualPref());
    document.getElementById('genderAffirmationPreference').addEventListener('click', () => toggleElement_genderAffirmationPref());
    document.getElementById('physicalHealthPreference').addEventListener('click', () => toggleElement_physicalHealthPref());
    document.getElementById('pregnantPostpartumPreference').addEventListener('click', () => toggleElement_pregnantPostpartumPref());
    document.getElementById('substanceUsePreference').addEventListener('click', () => toggleElement_substanceUsePref());
    document.getElementById('reunificationPreference').addEventListener('click', () => toggleElement_reunificationPref());
    document.getElementById('courtDHSPreference').addEventListener('click', () => toggleElement_courtDHSPref());
    document.getElementById('traumaPreference').addEventListener('click', () => toggleElement_traumaPref());
    document.getElementById('survivorsPreference').addEventListener('click', () => toggleElement_survivorsPref());
    document.getElementById('griefPreference').addEventListener('click', () => toggleElement_griefPref());
    
    document.getElementById('formSubmitButton').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Correctly collect 'pop' and 'symptoms' values from buttons
        const popValues = Array.from(document.querySelectorAll('.populations'))
            .map(button => button.getAttribute('value'));
        const symptomsValues = Array.from(document.querySelectorAll('.presenting-issues'))
            .map(button => button.getAttribute('value'));

        // Append these values to your form data
        const formData = new FormData(document.getElementById('clientForm'));
        formData.append('pop', JSON.stringify(popValues));
        formData.append('symptoms', JSON.stringify(symptomsValues));

        // Prepare to submit the form data

        // Use the original form submission method or adjust as necessary
        document.getElementById('clientForm').submit(); // Programmatically submit the form
    });
});
