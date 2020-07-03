import axios from "axios";
import { getCookie } from "./storage";
import { toast } from "react-toastify";
import { values } from "lodash";
import jsPDF from "jspdf";
import "jspdf-autotable";

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

export const getCategory = async () => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/allcategory`,
    });
    return result.data.category;
  } catch (error) {
    return false;
  }
};

export const checkFileSize = (event) => {
  let files = event.target.files;
  let size = 1000000;
  let err = "";
  for (var x = 0; x < files.length; x++) {
    if (files[x].size > size) {
      //err += files[x].type + "is too large, please pick a smaller file\n";
      return false;
    }
  }
  if (err !== "") {
    event.target.value = null;
    console.log(err);
    return false;
  }

  return true;
};

export const checkMimeType = (event) => {
  //getting file object
  let files = event.target.files;
  //console.log(files);

  //define message container
  let err = "";
  // list allow mime type
  const types = ["image/png", "image/jpeg", "image/gif"];
  // loop access array
  for (let x = 0; x < files.length; x++) {
    // compare file type find doesn't matach
    if (types.every((type) => files[x].type !== type)) {
      // create error message and assign to container
      err += files[x].type + " is not a supported format\n";
      return false;
    }
  }

  if (err !== "") {
    // if message not same old that mean has error
    event.target.value = null; // discard selected file
    toast.error("Error Found.");
    console.log(err);
    return false;
  }
  return true;
};

export const onSubmit = async (
  e,
  title,
  description,
  price,
  category,
  photo,
  setValues,
  setError,
  setPhoto,
) => {
  e.preventDefault();

  setError({});

  let data = new FormData();
  data.append("title", title);
  data.append("description", description);
  data.append("price", price);
  data.append("category", category);
  data.append("file", photo);
  const token = getCookie("token");
  //console.log(token);

  data.append("token", token);

  try {
    console.log(data);

    await axios.post(`${process.env.REACT_APP_API_URL}/addproduct`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Product Added Successfully.");
    setValues({
      title: "",
      description: "",
      price: "",
      category: "",
      buttonText: "Submit",
    });
    setPhoto({});
    return true;
  } catch (err) {
    setError(err.response.data.error);

    toast.error("Sorry Failed to add");
    return false;
  }
};

export const getAllProducts = async () => {
  //console.log(company_id);

  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/getallproduct`,
    });

    if (result) {
      return result.data.product;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const placeOrder = async (
  e,
  number,
  address,
  orders,
  total,
  setValues,
) => {
  e.preventDefault();

  setValues({ ...values, buttonText: "Requesting" });
  try {
    let result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/placeorder`,
      data: { number, address, orders, price: total },
    });
    toast.success("Order Confirmed Successfully");
    setValues({
      number: "",
      address: "",
      buttonText: "Submit",
    });
    window.$("#exampleModalContent").modal("hide");

    return true;
  } catch (error) {
    toast.error("Sorry Order Failed to be Placed.");
    setValues({ ...values, buttonText: "Submit" });
    return false;
  }
};

export const getAllOrders = async () => {
  try {
    let result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/getallorder`,
    });

    if (result) {
      return result.data.product;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const updateProduct = async (_id, stats) => {
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/updateproductstatus`,
      data: {
        _id,
        stats,
      },
    });

    if (result) {
      return result.data.message;
    }
  } catch (e) {
    return e.response.data.error;
  }
};

export const invoice = (orders, products) => {
  const doc = new jsPDF();
  let today = new Date();
  let dd = today.getDate();

  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  let title = [];
  let quant = [];
  let prices = [];
  let col = ["Product Name", "Quantity", "Price"];
  let temp;

  products.map((p) => {
    temp = [p.product.title, p.quantity, p.price * p.quantity];
    title.push(temp);
  });
  //cartItems.reduce((sum, current) => sum + current.price * current.quantity, 0);

  const totalAmount = products.reduce(
    (sum, current) => sum + current.quantity * current.price,
    0,
  );

  // It can parse html:
  // <table id="my-table"><!-- ... --></table>
  doc.autoTable({ html: "#my-table" });

  doc.autoTable({
    body: [[process.env.COMPANY_NAME, "", "", ""]],
  });

  // Or use javascript directly:
  doc.autoTable({
    body: [
      ["Recevier Information :", "", "", "Order ID #"],
      ["Receiver Address and Phone Number", "", "", ""],
      [orders.address, "", "", orders.orderId],
      [orders.number, "", "", dd + "/" + mm + "/" + yyyy],
    ],
    theme: "grid",
  });

  doc.autoTable(col, title, { theme: "grid" });

  doc.autoTable({
    body: [["Total Amount", totalAmount]],
    theme: "grid",
  });

  // doc.autoTable({
  //   body: [
  //     ["Product Name :", "", "Quantity", "Price"],

  //   ],
  //   theme: "grid",
  // });

  // doc.autoTable({
  //   body: [["", "", "", ""]],
  // });

  // doc.autoTable({
  //   body: [
  //     ["Marchent Information :"],
  //     [marchent.name],
  //     [marchent.address],
  //     [marchent.phone],
  //   ],
  //   theme: "plain",
  // });

  // doc.autoTable({
  //   body: [["", "", "", ""]],
  // });

  // doc.autoTable({
  //   head: [["Product Description", "", "", "Amount"]],
  //   body: [
  //     [description, "", "", amount],

  //     ["Delivery Charge", "", "", cost],
  //     ["Total Bill", "", "", cost + amount],
  //   ],
  //   theme: "grid",
  // });

  doc.save("Order.pdf");
};
