import React from "react";

const Totals = (props) => {
  const totals = props?.totals || [];
  let subtotal = 0;
  let discount = 0;
  let shipping = 0;
  let grandTotal = 0;
  totals.forEach((total) => {
    if (total.code === "subtotal") {
      subtotal = total.value;
    }
    if (total.code === "discount") {
      discount = total.value.toString().replace("-", "");
    }
    if (total.code === "shipping") {
      shipping = total.value;
    }
    if (total.code === "grand_total") {
      grandTotal = total.value;
    }
  });
  return (
    <React.Fragment>
      {totals.length > 0 && (
        <table className="data table table_totals">
          <caption className="table_caption">Order Summary</caption>
          <tbody>
            <tr className="totals sub">
              <th className="mark" scope="row">
                Cart Subtotal
              </th>
              <td className="amount">
                <span className="price">${subtotal}</span>
              </td>
            </tr>
            <tr className="totals shipping excl">
              <th className="mark" scope="row">
                <span className="label">Shipping</span>
                <span className="value">Flat Rate - Fixed</span>
              </th>
              <td className="amount border-0">
                <span className="price">${shipping}</span>
              </td>
            </tr>
            <tr className="totals">
              <th className="mark" scope="row">
                <span className="label">Discount</span>
              </th>
              <td className="amount border-0">
                <span className="price">${discount}</span>
              </td>
            </tr>
            <tr className="grand totals">
              <th className="mark" scope="row">
                <strong>Order Total</strong>
              </th>
              <td className="amount border-0">
                <strong>
                  <span className="price">${grandTotal}</span>
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default Totals;
