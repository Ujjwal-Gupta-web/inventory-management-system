const base = "http://localhost:5000";

export const get_products = async () => {
    const res = await fetch(`${base}/product/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const get_product_by_id = async (obj) => {
    const res = await fetch(`${base}/product/${obj._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const get_product_by_category_id = async (obj) => {
    const res = await fetch(`${base}/product/category/${obj.category_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};

export const add_product = async (obj) => {
    const res = await fetch(`${base}/product/`, {
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

export const update_product = async (obj) => {
    const res = await fetch(`${base}/product/`, {
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

export const increment_product_quantity = async (obj) => {
    const res = await fetch(`${base}/product/increment_quantity`, {
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

export const decrement_product_quantity = async (obj) => {
    const res = await fetch(`${base}/product/decrement_quantity`, {
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

export const delete_product = async (obj) => {
    const res = await fetch(`${base}/product/${obj._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token":localStorage.getItem("user")
      },
    });
    const ans = await res.json();
    return ans;
};
