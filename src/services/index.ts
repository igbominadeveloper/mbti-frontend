import { UserResponseObject } from "@/types";

const apiUrl = process.env.VUE_APP_API_URL;

export const getQuestions = (): Promise<Response> =>
  fetch(`${apiUrl}/questions`);

export const submitResponse = (
  response: UserResponseObject
): Promise<Response> =>
  fetch(`${apiUrl}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(response)
  });

export const getUserMbti = (email: string): Promise<Response> =>
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });
