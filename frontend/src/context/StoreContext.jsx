import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

function StoreContextProvider(props) {
  const [cartItem, setCartItem] = useState({});
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  async function addToCart(itemId) {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  }
  async function removeCart(itemId) {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  }

  function getTotalCartAmount() {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((food) => food._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  }

  async function fetchFoodList() {
    await axios
      .get("http://localhost:4000/api/food/list")
      .then((res) => {
        if (res.data.success) {
          setFoodList(res.data.foods);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadCart(token) {
    await axios
      .post(url + "/api/cart/get", {}, { headers: { token } })
      .then((res) => {
        if (res.data.success) {
          setCartItem(res.data.cartData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCart(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const ContextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
