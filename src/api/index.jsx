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
      Authorization: "Bearer " + localStorage.getItem("GenPoya-Atoken"),
    },
  });
  return response;
};

/**
 * API function For Create Reference
 * @param data
 *
 * POST /v1/consult
 */

export const createReference = async (data) => {
  const response = await axios.post(`${BASE_URL}/reference`, data, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("GenPoya-Atoken"),
    },
  });
  return response;
};

/**
 * API function For get Reference By Id
 * @param data
 *
 */

export const getReferenceById = async ({ referenceId }) => {
  const response = await axios.get(`${BASE_URL}/reference/${referenceId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("GenPoya-Atoken"),
    },
  });
  return response;
};

/**
 * API function For get All Time Slots
 * @Query currentTimeSlot => Date
 *
 */

export const getAllAvailableTimeSlots = async ({ currentTimeSlot }) => {
  const response = await axios.get(
    `${BASE_URL}/admin/time-slot?date=${currentTimeSlot}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("GenPoya-Atoken"),
      },
    }
  );
  return response;
};

/**
 * API function For Implement Session Date and type (Update Reference)
 * @param {consult_reason, ref_type, time_slot_id, reference_id}
 *
 * POST /v1/reference/:reference_id
 */

export const implementSessionAndUpdateReference = async ({
  consult_reason,
  ref_type,
  time_slot_id,
  reference_id,
}) => {
  const response = await axios.post(
    `${BASE_URL}/reference/${reference_id}`,
    { ref_type, time_slot_id, consult_reason },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("GenPoya-Atoken"),
      },
    }
  );
  return response;
};
