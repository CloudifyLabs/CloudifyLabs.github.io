
const form = document.querySelector('.contactForm');
const successMsg = document.querySelector('#sendmessage');
const errorMsg = document.querySelector('#errormessage');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  let firstName, lastName, email, number, message;
  firstName = document.querySelector('#firstName').value;
  lastName = document.querySelector('#lastName').value;
  email = document.querySelector('#email').value;
  number = document.querySelector('#number').value;
  message = document.querySelector('#message').value;

  const data = {
    fields: {
      project: {
        key: 'CUF',
      },
      issuetype: {
        name: 'Lead',
      },
      summary: 'CloudifyLabs',
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone No: ${number}\nMessage: ${message}`,
              },
            ],
          },
        ],
      },
    },
  };

  // Make the AJAX request
  fetch('https://stg.cloudifytests.io/contactusform', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => {
      console.log("Response", response)
      if (response.id) {
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        form.reset();

        setTimeout(function() {
          successMsg.style.display = 'none';
        }, 3000);
      } else {
        successMsg.style.display = 'none';
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = 'An error occurred while submitting the form.';
      }
    })
    .catch(error => {
      successMsg.style.display = 'none';
      errorMsg.style.display = 'block';
      errorMsg.innerHTML = 'An error occurred while submitting the form.';
      console.error(error);
    });
});


