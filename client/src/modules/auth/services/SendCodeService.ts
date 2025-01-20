export async function SendCodeService(email: string): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:3000/api/codes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Failed to send code');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error sending code:', error);
    return false;
  }
}