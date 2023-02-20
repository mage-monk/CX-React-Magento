import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerOrders } from "../../../api/customer";
import MagentoConfig from "../../../config/Magento";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import Card from "../../ui/card/Card";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const Orders = () => {
  const dispatch = useDispatch();
  const [rw, setRw] = useState([]);
  const loading = useSelector((state) => state.customer.loading);
  const customer = useSelector((state) => state.customer.customer);
  const customerId = sessionStorage.getItem("id");
  const adminToken = MagentoConfig.authentication.integration.access_token;

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "increment_id",
      headerName: "Increment ID",
      type: "number",
      width: 110,
    },
    {
      field: "customer_firstname",
      headerName: "First name",
      width: 100,
    },
    {
      field: "customer_lastname",
      headerName: "Last name",
      width: 100,
    },
    {
      field: "customer_email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      type: "number",
      width: 100,
    },
    {
      field: "shipping_amount",
      headerName: "Shipping",
      type: "number",
      width: 100,
    },
    {
      field: "discount_amount",
      headerName: "Discount",
      type: "number",
      width: 100,
    },
    {
      field: "grand_total",
      headerName: "Grand Total",
      type: "number",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      width: 100,
      valueOptions: [
        { value: "", label: "--Please Select--" },
        { value: "canceled", label: "Canceled" },
        { value: "closed", label: "Closed" },
        { value: "complete", label: "Complete" },
        { value: "pending", label: "Pending" },
        { value: "processing", label: "Processing" },
      ],
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 150,
      type: "date",
    },
    {
      width: 100,
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <Link
          to={`/customer/order/${params.row.id}`}
          state={{ corder: params.row.id }}
        >
          <BsBoxArrowInUpRight size={20} />
        </Link>,
      ],
    },

    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

  let rows = [];
  const orderRows = [];

  useEffect(() => {
    if (customerId && adminToken) {
      dispatch(customerOrders(customerId, adminToken)).then(function (orders) {
        if (orders?.items?.length > 0) {
          orders.items.map((order) => {
            orderRows.push({
              id: order.entity_id,
              increment_id: order.increment_id,
              customer_firstname: order.customer_firstname,
              customer_lastname: order.customer_lastname,
              customer_email: order.customer_email,
              subtotal: order.subtotal,
              shipping_amount: order.shipping_amount,
              discount_amount: order.discount_amount,
              grand_total: order.grand_total,
              status: order.status,
              created_at: order.created_at,
            });
          });
        }
        setRw(orderRows);
      });
    }
  }, [customerId]);
  if (rw.length > 0) {
    rows = rows.concat(rw);
  }
  return (
    <React.Fragment>
      {loading && (
        <div className="addto__overlay">
          <div className="w-100 d-flex justify-content-center align-items-center">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      {!loading && rw.length > 0 && (
        <Card className="p-20 mb-20 clearfix rounded-0">
          <div className="c-header-title checkout_title">My Orders</div>
          <Box sx={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Orders;
