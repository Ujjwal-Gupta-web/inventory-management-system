const base = "http://localhost:5000";


export const get_user = async () => {
  const res = await fetch(`${base}/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "token":localStorage.getItem("user")
    },
  });
  const ans = await res.json();
  return ans;
};

export const login_user = async (obj) => {
    const res = await fetch(`${base}/user/login`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const ans = await res.json();
    return ans;
};

export const signup_user = async (obj) => {
    const res = await fetch(`${base}/user/signup`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const ans = await res.json();
    return ans;
};

export const update_user = async (obj) => {
    const res = await fetch(`${base}/user/`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const update_password = async (obj) => {
    const res = await fetch(`${base}/user/change_password`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const forgot_password = async (obj) => {
    const res = await fetch(`${base}/user/forgot_password`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      },
    });
    const ans = await res.json();
    return ans;
};
