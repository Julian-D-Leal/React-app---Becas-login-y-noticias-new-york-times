/** @format */

import axios from "axios";

import {
  GUEST_USER_LOADED,
  GUEST_USER_FAILED,
  ROOT_USER_LOADED,
  ROOT_USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  REGISTER_GUSER_SUCCESS,
  REGISTER_GUSER_FAILED,
  REGISTER_RUSER_SUCCESS,
  REGISTER_RUSER_FAILED,
} from "./types";

export const create_guestuser =
  (username, email, password, password2) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(username, email, password, password2);

    await axios
      .post(
        "https://restframeworkbecasandlogin.herokuapp.com/becas/signup/guest",
        body,
        config
      )
      .then((res) => {
        dispatch({
          type: REGISTER_GUSER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_GUSER_FAILED,
        });
        console.log(err.response.data);
      });
  };

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  const body = JSON.stringify(username, password);
  await axios
    .post(
      "https://restframeworkbecasandlogin.herokuapp.com/becas/login/",
      body,
      config
    )
    .then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILED,
      });
      alert("Credenciales incorrectas")
      console.log(err.response.data);
    });
};

export const getRootUser = () => async(dispatch, getState) => {
  const token = getState().auth.token;
  const is_guest = getState().auth.isGuest;
  const config = {
    headers: {
      "Content-Type": "application-json",
    },
  };

  if (token && !is_guest) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  await axios
    .get(
      "https://restframeworkbecasandlogin.herokuapp.com/becas/root/dashboard/",
      config
    )
    .then((res) => {
      dispatch({
        type: ROOT_USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ROOT_USER_FAILED,
      });
    });
};

export const getGuestUser = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  const is_guest = getState().auth.isGuest;
  const config = {
    headers: {
      "Content-Type": "application-json",
    },
  };

  if (token && is_guest) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  await axios
    .get(
      "https://restframeworkbecasandlogin.herokuapp.com/becas/guest/dashboard/",
      config
    )
    .then((res) => {
      dispatch({
        type: GUEST_USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GUEST_USER_FAILED,
      });
    });
};

export const logout = () => async(dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  await axios
    .post(
      "https://restframeworkbecasandlogin.herokuapp.com/becas/logout/",
      null,
      config
    )
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
