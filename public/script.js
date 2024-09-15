document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pizzaId = urlParams.get('id');

    if (pizzaId) {
        fetch(`/api/menu/${pizzaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(item => {
                const pizzaDetails = document.getElementById('pizza-details');
                pizzaDetails.innerHTML = `
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    <p>Price: $${item.price}</p>
                    <img src="${item.img_path}" alt="${item.name}">
                `;
                document.getElementById('pizza-id').value = item.id;
            })
            .catch(error => {
                console.error('Error fetching pizza details:', error);
                document.getElementById('pizza-details').innerHTML = '<p>Error loading pizza details.</p>';
            });
    }

    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());

        // Log form data for debugging
        console.log('Form data:', data);

        // Validate form data
        if (!data.address || !data.menuItemId || !data.quantity) {
            alert('Please fill in all required fields.');
            return;
        }

        fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Order placed successfully!');
                window.location.href = 'menu.html';
            } else {
                alert('Error placing order. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        });
    });
});
