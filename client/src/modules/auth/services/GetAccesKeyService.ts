export async function GetAccessKeyService(code: string): Promise<{ success: boolean, authorization: string }> {
  try {
      const response = await fetch(`http://localhost:3000/api/codes/${code}`);
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const authorization = response.headers.get('Authorization');

      const data = await response.json();
      return {
        success: data.success,
        authorization: authorization ?? ''
      };
  } catch (error) {
      console.error('Failed to fetch access key:', error);
      throw error;
  }
}