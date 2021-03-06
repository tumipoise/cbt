import { handleError } from "./apiUtils";
import { api_url, app as api } from "./calls";
import { parseResponseError } from "./AdministratorCalls";

export const login = async ({ username, password }: any) => {
  try {
    const req = await api
      .body({ username, password })
      .post(api_url + "/user/signin");
    const { statusText, status } = req;
    const res = await req.json();
    parseResponseError({ res, status, statusText });
    localStorage["jwt"] = res.data.accessToken;
    localStorage["route"] = "student";
    api.headers({ Authorization: "Bearer " + localStorage["jwt"] });
    return { loaded: true, loggedIn: true, ...res.data };
  } catch (error) {
    handleError(error);
  }
};

export const verifyStudent = async () => {
  try {
    const def = {
      matric: "",
      loaded: true,
      loggedIn: false,
    };
    const route = localStorage["route"];
    const jwt = localStorage["jwt"];

    if (!route || route !== "student") {
      return def;
    }

    const req = await api
      .headers({ Authorization: `Bearer ${jwt}` })
      .get(`${api_url}/user/me`);
    const { status } = req;
    const res = await req.json();
    if (status >= 400) {
      delete localStorage["route"];
      return def;
    }
    return { ...res.data, loaded: true, loggedIn: true };
  } catch (error) {
    throw error;
  }
};

export const getExams = async () => {
  try {
    const req = await api
      .headers({ Authorization: "Bearer " + localStorage["jwt"] })
      .post(`${api_url}/user/exams`);
    const { status, statusText } = req;
    const res = await req.json();
    if (req.status === 404) {
      return {
        examNotFound: true,
      };
    }

    parseResponseError({ res, status, statusText });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const answerExam = async (answers: any) => {
  const req = await api
    .headers({ Authorization: "Bearer " + localStorage["jwt"] })
    .body({ answers })
    .put(`${api_url}/user/exams`);
  const res = await req.json();
  return res;
};

export const submitExam = async () => {
  const req = await api
    .headers({ Authorization: "Bearer " + localStorage["jwt"] })
    .delete(`${api_url}/user/exams`);
  const { status, statusText } = req;
  const res = await req.json();
  parseResponseError({ res, status, statusText });
  return null;
};

export const getInstructions = async () => {
  const req = await api
    .headers({ Authorization: "Bearer " + localStorage["jwt"] })
    .get(`${api_url}/user/exams`);
  const res = await req.json();
  if (req.status >= 500) {
    const error = new Error(res.message);
    error.name = req.statusText;
    throw error;
  }
  return res;
};
