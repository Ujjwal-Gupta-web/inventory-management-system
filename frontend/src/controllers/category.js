const base = "https://api-inventory-management.herokuapp.com";

export const get_categories = async () => {
    const res = await fetch(`${base}/category/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const get_category_by_id = async (obj) => {
    const res = await fetch(`${base}/category/${obj._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const add_category = async (obj) => {
    const res = await fetch(`${base}/category/`, {
      method: "POST",
      body:JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const update_category = async (obj) => {
    const res = await fetch(`${base}/category/`, {
      method: "PUT",
      body:JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const delete_category = async (obj) => {
    const res = await fetch(`${base}/category/${obj._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};
