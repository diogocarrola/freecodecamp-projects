document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const checkButton = document.getElementById('check-btn');
    const resultDiv = document.getElementById('result');

    function isPalindrome(str) {
        // Remove all non-alphanumeric characters and convert to lowercase
        const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        
        // Check if the cleaned string is a palindrome
        const reversedStr = cleanedStr.split('').reverse().join('');
        return cleanedStr === reversedStr;
    }

    function checkPalindrome() {
        const inputValue = textInput.value.trim();
        
        // Check if input is empty
        if (inputValue === '') {
            alert('Please input a value');
            return;
        }
        
        // Check if it's a palindrome
        const palindrome = isPalindrome(inputValue);
        
        // Display result
        displayResult(inputValue, palindrome);
    }

    function displayResult(input, isPalindrome) {
        // Clear previous result
        resultDiv.innerHTML = '';
        
        // Create result element
        const resultElement = document.createElement('div');
        resultElement.className = `result-content ${isPalindrome ? 'result-palindrome' : 'result-not-palindrome'}`;
        
        // Create result content
        const resultText = document.createElement('div');
        resultText.className = 'result-text';
        resultText.textContent = `${input} ${isPalindrome ? 'is a palindrome' : 'is not a palindrome'}`;
        
        // Add to result element
        resultElement.appendChild(resultText);
        
        // Add to result div
        resultDiv.appendChild(resultElement);
    }

    // Event listeners
    checkButton.addEventListener('click', checkPalindrome);
    
    // Allow Enter key to trigger check
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPalindrome();
        }
    });

    // Focus the input on load
    textInput.focus();
});