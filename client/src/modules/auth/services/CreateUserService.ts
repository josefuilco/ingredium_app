import { User } from "../models/User";

export async function CreateUserService(user: User): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
}