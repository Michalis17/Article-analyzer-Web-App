export async function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value

  if (formText) {
    try {
      const responseData = await sendDataToServer('/analysis', { input: formText});
      console.log('Response from server:', responseData);
      // handle the response data as needed

      document.getElementById('polarity').innerHTML = responseData[0]
      document.getElementById('subjectivity').innerHTML = responseData[1]
      document.getElementById('content').innerHTML = responseData[2]

    } catch(error) {
      console.log('Error sending user input to server:', error);
    }
    console.log(sendDataToServer('/analysis', { input: formText }));
  }
  console.log("::: Form Submitted :::")
  document.getElementById('form-box').reset();
  fetch('http://localhost:3000/test')
    .then(res => res.json())
    .then(function (res) {
      document.getElementById('mockAPI').innerHTML = res.message
    })



}

// Function to send a POST request to the server
export const sendDataToServer = async (serverUrl, articleUrl) => {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleUrl),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const responseData = await response.json();
    return responseData;
    console.log('Response from server:', responseData);
  } catch (error) {
    console.error('Error sending data to server:', error);
  }
};
