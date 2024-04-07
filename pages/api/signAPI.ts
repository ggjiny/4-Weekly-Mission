import axios from 'axios';
const BASE_URL = 'https://bootcamp-api.codeit.kr/api';

export async function postLoginForm(formData: { email: string; password: string }) {
  try {
    const response = await axios.post(`${BASE_URL}/sign-in`, formData);
    if (response.status === 200) return response.data;
    else if (response.status === 400) console.log('등록되지 않은 사용자 입니다.');
  } catch (error) {
    console.error('Failed to post login form:', error);
  }
}
