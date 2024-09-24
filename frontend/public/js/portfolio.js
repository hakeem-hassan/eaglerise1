const userId = 'USER_ID_HERE';  // Replace with logged-in user ID
const apiBaseUrl = 'http://localhost:3000/api';

// Fetch portfolio on page load
window.onload = () => {
    fetchPortfolio();
};

// Add stock to portfolio
document.getElementById('portfolio-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const stockSymbol = document.getElementById('symbol').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    const stockData = {
        userId,
        stocks: [
            {
                symbol: stockSymbol,
                quantity: quantity,
                purchasePrice: price,
            },
        ],
    };

    try {
        const response = await fetch(`${apiBaseUrl}/portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stockData),
        });

        if (response.ok) {
            alert('Stock added to your portfolio');
            fetchPortfolio(); // Refresh the portfolio display
        } else {
            alert('Error adding stock to portfolio');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Fetch portfolio and display it
async function fetchPortfolio() {
    try {
        const response = await fetch(`${apiBaseUrl}/portfolio/${userId}`);
        const portfolio = await response.json();

        const portfolioList = document.getElementById('portfolio-list');
        portfolioList.innerHTML = ''; // Clear current portfolio display

        portfolio.stocks.forEach((stock, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${stock.symbol} - ${stock.quantity} shares at $${stock.purchasePrice}
                <button onclick="editStock(${index}, '${stock.symbol}', ${stock.quantity}, ${stock.purchasePrice})">Edit</button>
                <button onclick="deleteStock('${stock.symbol}')">Delete</button>
            `;
            portfolioList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching portfolio:', error);
    }
}

// Edit stock (pre-fill form for update)
function editStock(index, symbol, quantity, price) {
    document.getElementById('update-symbol').value = symbol;
    document.getElementById('update-quantity').value = quantity;
    document.getElementById('update-price').value = price;

    // Show update form
    document.getElementById('update-section').style.display = 'block';
}

// Update stock in portfolio
document.getElementById('update-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const symbol = document.getElementById('update-symbol').value;
    const quantity = document.getElementById('update-quantity').value;
    const price = document.getElementById('update-price').value;

    const stockData = {
        userId,
        stocks: [
            {
                symbol,
                quantity,
                purchasePrice: price,
            },
        ],
    };

    try {
        const response = await fetch(`${apiBaseUrl}/portfolio/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stockData),
        });

        if (response.ok) {
            alert('Stock updated successfully');
            document.getElementById('update-section').style.display = 'none'; // Hide update form
            fetchPortfolio(); // Refresh portfolio
        } else {
            alert('Error updating stock');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Delete stock from portfolio
async function deleteStock(symbol) {
    if (confirm(`Are you sure you want to remove ${symbol} from your portfolio?`)) {
        try {
            const stockData = {
                userId,
                stocks: [
                    {
                        symbol,
                    },
                ],
            };

            const response = await fetch(`${apiBaseUrl}/portfolio/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stockData),
            });

            if (response.ok) {
                alert('Stock removed from portfolio');
                fetchPortfolio(); // Refresh portfolio
            } else {
                alert('Error removing stock from portfolio');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
