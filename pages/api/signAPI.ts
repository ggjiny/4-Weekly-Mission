import axios from 'axios';
const BASE_URL = 'https://bootcamp-api.codeit.kr/api';

export async function postLoginForm(formData: { email: string; password: string }) {
  try {
    const response = await axios.post(`${BASE_URL}/sign-in`, formData);
    if (response.status === 200) return response.data;
    else if (response.status === 400) console.log('등록되지 않은 사용자 입니다.');
  } catch (error) {
    console.error('로그인 오류입니다.', error);
  }
}

export async function postCheckEmail(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/check-email`, { email });
    return response.data;
  } catch (error) {
    console.error('이미 사용중인 이메일입니다.', error);
  }
}

export async function postRegisterForm(formData: { email: string; password: string }) {
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, formData);
    return response.data;
  } catch (error) {
    console.error('회원가입 오류입니다.', error);
  }
}
