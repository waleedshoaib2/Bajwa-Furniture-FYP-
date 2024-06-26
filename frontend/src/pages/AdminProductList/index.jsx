import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetProducts, adminDeleteProduct } from "../../lib/axiosAPI";
import { logout } from "../../redux/action/apiUserAction";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import AdminSidebar from "../AdminDashboard/AdminSidebar";
import Testing from "../Testing/Testing";
export default function AdminProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = React.useState(true);
  const [error, setError] = React.useState();

  let { userInfo } = useSelector((state) => state.user);
  let [products, setProducts] = React.useState([]);

  const getAllProducts = useCallback(() => {
    adminGetProducts(userInfo)
      .then(function (res) {
        setPending(false);
        console.log(res.data);
        setProducts(res.data);
        console.log(products);
      })
      .catch(function (error) {
        setPending(false);
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  }, [dispatch, userInfo]);

  const deleteProduct = (productID) => {
    window.scrollTo(0, 0);
    adminDeleteProduct(userInfo, productID)
      .then(function (res) {
        getAllProducts();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          setError(error.response.data.message);
        }
      });
  };

  const handleDelete = (productID) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      deleteProduct(productID);
    }
  };

  React.useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Testing />

        <div className="admin-list">
          <DisplayPending pending={pending} />
          <div className="admin-list__container">
            {error ? <Alert severity="error">{error}</Alert> : null}
            <div
              className="admin-add-button"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/admin/createproduct");
              }}
            >
              Add New Product
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>Rs {product.price}</td>
                      <td>{product.category}</td>
                      <td>
                        <img
                          src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/edit.png"
                          alt="edit_icon"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/admin/editproduct/${product._id}`);
                          }}
                        />
                        <img
                          onClick={() => handleDelete(product._id)}
                          src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/delete.png"
                          alt="edit_icon"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
