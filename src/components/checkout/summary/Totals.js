import React from "react";

const Totals = () => {
  return (
    <React.Fragment>
      <table className="data table table_totals">
        <caption className="table_caption">Order Summary</caption>
        <tbody>
          <tr className="totals sub">
            <th className="mark" scope="row">
              Cart Subtotal
            </th>
            <td className="amount">
              <span className="price">$358.00</span>
            </td>
          </tr>

          <tr className="totals shipping excl">
            <th className="mark" scope="row">
              <span className="label">Shipping</span>

              <span className="value">Flat Rate - Fixed</span>
            </th>
            <td className="amount border-0">
              <span className="price">$15.00</span>
            </td>
          </tr>

          <tr className="grand totals">
            <th className="mark" scope="row">
              <strong>Order Total</strong>
            </th>
            <td className="amount border-0">
              <strong>
                <span className="price">$373.00</span>
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Totals;
