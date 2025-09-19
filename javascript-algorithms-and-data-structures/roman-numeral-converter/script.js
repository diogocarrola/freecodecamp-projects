document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('number');
    const convertButton = document.getElementById('convert-btn');
    const outputDiv = document.getElementById('output');

    // Roman numeral mapping
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    function convertToRoman(num) {
        let result = '';
        let remaining = num;
        
        // Convert using the mapping
        for (const { value, numeral } of romanNumerals) {
            while (remaining >= value) {
                result += numeral;
                remaining -= value;
            }
        }
        
        return result;
    }

    function handleConversion() {
        const inputValue = numberInput.value.trim();
        
        // Check if input is empty
        if (inputValue === '') {
            displayOutput('Please enter a valid number', 'error');
            return;
        }
        
        const number = parseInt(inputValue, 10);
        
        // Check if valid number
        if (isNaN(number)) {
            displayOutput('Please enter a valid number', 'error');
            return;
        }
        
        // Check range
        if (number < 1) {
            displayOutput('Please enter a number greater than or equal to 1', 'error');
            return;
        }
        
        if (number >= 4000) {
            displayOutput('Please enter a number less than or equal to 3999', 'error');
            return;
        }
        
        // Convert to Roman numeral
        const roman = convertToRoman(number);
        displayOutput(roman, 'success');
    }

    function displayOutput(text, type) {
        // Clear previous output
        outputDiv.innerHTML = '';
        
        // Create output element
        const outputElement = document.createElement('div');
        outputElement.className = `output-content output-${type}`;
        
        // Create output text
        const outputText = document.createElement('div');
        outputText.className = 'output-text';
        outputText.textContent = text;
        
        // Add to output element
        outputElement.appendChild(outputText);
        
        // Add to output div
        outputDiv.appendChild(outputElement);
    }

    // Event listeners
    convertButton.addEventListener('click', handleConversion);
    
    // Allow Enter key to trigger conversion
    numberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleConversion();
        }
    });

    // Focus the input on load
    numberInput.focus();
});