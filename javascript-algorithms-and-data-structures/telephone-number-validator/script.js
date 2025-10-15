document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const checkBtn = document.getElementById('check-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultsDiv = document.getElementById('results-div');

    function validatePhoneNumber(phone) {
        // Regular expression for valid US phone numbers
        // Allows: 1 optional, area code required, various formats
        const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
        return regex.test(phone);
    }

    function checkPhoneNumber() {
        const phoneNumber = userInput.value.trim();
        
        // Check if input is empty
        if (phoneNumber === '') {
            alert('Please provide a phone number');
            return;
        }
        
        // Validate the phone number
        const isValid = validatePhoneNumber(phoneNumber);
        
        // Display result
        displayResult(phoneNumber, isValid);
    }

    function displayResult(phoneNumber, isValid) {
        // Create result element
        const resultElement = document.createElement('div');
        resultElement.className = `result-item ${isValid ? 'result-valid' : 'result-invalid'}`;
        
        // Create text
        const text = document.createElement('div');
        text.className = 'result-text';
        text.textContent = `${isValid ? 'Valid US number' : 'Invalid US number'}: ${phoneNumber}`;
        
        // Add to result element
        resultElement.appendChild(text);
        
        // Add to results div
        resultsDiv.appendChild(resultElement);
        
        // Clear input field
        userInput.value = '';
        userInput.focus();
    }

    function clearResults() {
        // Clear all results from #results-div
        resultsDiv.innerHTML = '';
    }

    // Event listeners
    checkBtn.addEventListener('click', checkPhoneNumber);
    clearBtn.addEventListener('click', clearResults);
    
    // Allow Enter key to trigger validation
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPhoneNumber();
        }
    });

    // Focus the input on load
    userInput.focus();
});