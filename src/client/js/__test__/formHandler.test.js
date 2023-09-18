import { handleSubmit, sendDataToServer } from "../formHandler.js"


describe('sendDataToServer', () => {

    // Tests that the function sends a POST request to the server with valid input and receives a successful response
    it('should send a POST request to the server with valid input and receive a successful response', async () => {
      // Arrange
      const serverUrl = '/analysis';
      const articleUrl = { input: 'valid input' };
      const expectedResponse = { success: true };

      // Mock the fetch function
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expectedResponse),
        })
      );

      // Act
      const response = await sendDataToServer(serverUrl, articleUrl);

      // Assert
      expect(response).toEqual(expectedResponse);
      expect(fetch).toHaveBeenCalledWith(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleUrl),
      });
    });

    // Tests that the function sends a POST request to the server with invalid input and receives an error response
    it('should send a POST request to the server with invalid input and receive an error response', async () => {
      // Arrange
      const serverUrl = '/analysis';
      const articleUrl = { input: 'invalid input' };

      // Mock the fetch function to return a non-ok response
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ error: 'Network response was not ok.' }),
        })
      );

      // Act
      const result = await sendDataToServer(serverUrl, articleUrl);

      // Assert
      expect(result).toBeUndefined();
    });

    // Tests that the function handles an empty response from the server
    it('should handle an empty response from the server', async () => {
      // Arrange
      const serverUrl = '/analysis';
      const articleUrl = { input: 'valid input' };

      // Act
      const response = await sendDataToServer(serverUrl, articleUrl);

      // Assert
      expect(response).toBeUndefined();
    });
});