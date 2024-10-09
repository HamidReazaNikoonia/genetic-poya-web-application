import axios from "axios";

const BASE_URL = "http://localhost:9000/v1";

export const getPosts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getPost = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const createPost = async (post) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const editPost = async (post) => {
  const res = await fetch(`${BASE_URL}/${post.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
};

/**
 * API function to send mobile number
 * @param {mobile, name, email?} data
 */
export const sendMobileNumber = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/login-otp`, data);
  return response;
};

/**
 * API function to send otp code
 * @param {otpCode, userId} data
 */
export const sendOtpCode = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/validate-otp`, data);

  // save token

  if (response.status === 200 && response.data) {
    // console.log(response.data.tokens.access.token);
    localStorage.setItem(
      "GenPoya-Atoken",
      response.data?.tokens?.access?.token
    );
  }
  return response;
};



/**
 * Consult API
 * 
 *
 */




/**
 * API function For Create Consult
 * @param data
 * 
 * POST /v1/consult
 */

export const createConsult = async (data) => {
  const response = await axios.post(`${BASE_URL}/consult`, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("GenPoya-Atoken")
    }
  });
  return response;
};