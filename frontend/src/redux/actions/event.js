import axios from "axios";
import { server } from "../../server";

// create event
export const createevent = (
  {
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    images,
    shopId,
    start_Date,
    Finish_Date,
  }
) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });
    console.log("Data: ", images);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    formData.append("shopId", shopId);
    formData.append("start_Date", start_Date);
    formData.append("Finish_Date", Finish_Date);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log("FormData: ", ...formData);
    const { data } = await axios.post(
      `${server}/event/create-event`,
      formData,
      config
    );
    console.log("Returned Data: ", data);
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsShopRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAlleventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });

    console.log("Event ID: ", id);

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`
      // {
      //   withCredentials: true,
      // }
    );

    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    console.log("All Events: ", data)
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};
