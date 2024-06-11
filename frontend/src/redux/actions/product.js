import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct = (
  {name,
  description,
  category,
  tags,
  originalPrice,
  discountPrice,
  stock,
  shopId,
  shoe_size,
  images}
) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    // Create a new FormData instance
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('originalPrice', originalPrice);
    formData.append('discountPrice', discountPrice);
    formData.append('stock', stock);
    formData.append('shopId', shopId);
    formData.append('shoe_size', shoe_size);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // Send the form data using axios
    const { data } = await axios.post(
      `${server}/product/create-product`,
      formData,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
