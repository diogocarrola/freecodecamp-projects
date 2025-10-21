// Global variables
let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// Currency values in cents
const currencyValues = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
};

// DOM elements
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDueDiv = document.getElementById('change-due');
const priceDisplay = document.getElementById('price-display');
const drawerDisplay = document.getElementById('drawer-display');

// Initialize display
function initializeDisplay() {
    // Display current price
    priceDisplay.textContent = price.toFixed(2);
    
    // Display cash drawer
    updateDrawerDisplay();
}

// Update cash drawer display
function updateDrawerDisplay() {
    drawerDisplay.innerHTML = '';
    cid.forEach(item => {
        const drawerItem = document.createElement('div');
        drawerItem.className = 'drawer-item';
        
        const currencySpan = document.createElement('span');
        currencySpan.className = 'drawer-currency';
        currencySpan.textContent = item[0];
        
        const amountSpan = document.createElement('span');
        amountSpan.className = 'drawer-amount';
        amountSpan.textContent = `$${item[1].toFixed(2)}`;
        
        drawerItem.appendChild(currencySpan);
        drawerItem.appendChild(amountSpan);
        drawerDisplay.appendChild(drawerItem);
    });
}

// Calculate change
function calculateChange() {
    const cash = parseFloat(cashInput.value);
    
    // Check if cash is less than price
    if (cash < price) {
        alert('Customer does not have enough money to purchase the item');
        return;
    }
    
    // Check if exact cash
    if (cash === price) {
        changeDueDiv.textContent = 'No change due - customer paid with exact cash';
        changeDueDiv.className = 'change-due';
        return;
    }
    
    const changeDue = Math.round((cash - price) * 100); // Convert to cents
    const totalCID = Math.round(cid.reduce((sum, item) => sum + item[1] * 100, 0));
    
    // Check if drawer has enough total cash
    if (totalCID < changeDue) {
        changeDueDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
        changeDueDiv.className = 'change-due status-insufficient';
        return;
    }
    
    // Calculate exact change
    const changeResult = [];
    let remainingChange = changeDue;
    
    // Create a copy of cid for calculation
    const cidCopy = cid.map(item => [...item]);
    
    // Calculate from highest to lowest denomination
    for (let i = cidCopy.length - 1; i >= 0; i--) {
        const [currency, amount] = cidCopy[i];
        const currencyValue = currencyValues[currency];
        const availableAmount = Math.round(amount * 100);
        
        let currencyCount = 0;
        let remainingAvailable = availableAmount;
        
        // Use this currency while we need more change and have it available
        while (remainingChange >= currencyValue && remainingAvailable >= currencyValue) {
            remainingChange -= currencyValue;
            remainingAvailable -= currencyValue;
            currencyCount++;
        }
        
        if (currencyCount > 0) {
            const currencyTotal = currencyCount * currencyValue / 100;
            changeResult.push([currency, currencyTotal]);
            cidCopy[i][1] = remainingAvailable / 100;
        }
    }
    
    // Check if exact change could be given
    if (remainingChange > 0) {
        changeDueDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
        changeDueDiv.className = 'change-due status-insufficient';
        return;
    }
    
    // Calculate total change given
    const totalChangeGiven = changeResult.reduce((sum, item) => sum + item[1], 0);
    const totalCIDAfter = cidCopy.reduce((sum, item) => sum + item[1], 0);
    
    // Determine status
    let status = 'OPEN';
    let resultText = 'Status: OPEN';
    
    if (totalCIDAfter === 0) {
        status = 'CLOSED';
        resultText = 'Status: CLOSED';
        // For CLOSED status, show all denominations even if zero
        changeResult.length = 0;
        cid.forEach(item => {
            if (item[1] > 0) {
                changeResult.push([item[0], item[1]]);
            }
        });
    }
    
    // Sort change result for OPEN status (highest to lowest)
    if (status === 'OPEN') {
        changeResult.sort((a, b) => currencyValues[b[0]] - currencyValues[a[0]]);
    }
    
    // Build result string
    changeResult.forEach(item => {
        resultText += ` ${item[0]}: $${item[1].toFixed(2)}`;
    });
    
    // Update display
    changeDueDiv.textContent = resultText;
    changeDueDiv.className = `change-due status-${status.toLowerCase()}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeDisplay();
    
    purchaseBtn.addEventListener('click', calculateChange);
    
    // Allow Enter key to trigger purchase
    cashInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateChange();
        }
    });
    
    // Focus the input on load
    cashInput.focus();
});