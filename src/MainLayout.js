import { CChart } from '@coreui/react-chartjs';
import './App.css';
import { useEffect, useState } from 'react';
import BasicTable from './table';
import { useSearchParams } from 'react-router-dom';

const getOrdersAndReshape = async (vendorID, setGraph, setTable) => {
  // Get Orders
  const orders = await fetch(
    `http://localhost:5000/vendor/orders?vendorID=${vendorID}`,
  )
    .then((response) => response.json())
    .catch((error) => {
      // Handle any errors
      console.error('An error occurred:', error);
    });

  // Create Dict For Table and Graph
  let monthlySales = {};
  let orderCounts = {};

  if (orders[0]) {
    for (let order of orders) {
      const date = new Date(parseInt(order.date));
      const dateUsed = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (monthlySales.hasOwnProperty(dateUsed)) {
        monthlySales[dateUsed] += order.quantity;
      } else {
        // If the product doesn't exist, initialize the order count
        monthlySales[dateUsed] = order.quantity;
      }
      if (orderCounts.hasOwnProperty(order.product_name)) {
        orderCounts[order.product_name] += order.quantity;
      } else {
        // If the product doesn't exist, initialize the order count
        orderCounts[order.product_name] = order.quantity;
      }
    }
    // Add to States
    setTable(orderCounts);
    setGraph(monthlySales);
  }
};

function MainLayout() {
  const [graph, setGraph] = useState();
  const [table, setTable] = useState();
  const [searchParams] = useSearchParams();
  const vendorID = searchParams.get('vendorID');

  useEffect(() => {
    getOrdersAndReshape(vendorID, setGraph, setTable);
  }, []);

  return (
    <div style={{ margin: 40 }} className="App">
      {graph ? (
        <div style={{ marginTop: 20 }}>
          <CChart
            type="bar"
            data={{
              labels: Object.keys(graph),
              datasets: [
                {
                  label: 'Count',
                  backgroundColor: [
                    '#808080',
                    '#3cb44b',
                    '#ffe119',
                    '#4363d8',
                    '#f58231',
                    '#911eb4',
                    '#46f0f0',
                    '#f032e6',
                    '#bcf60c',
                    '#fabebe',
                    '#008080',
                    '#e6beff',
                  ],
                  data: Object.values(graph),
                },
              ],
            }}
          />{' '}
        </div>
      ) : (
        ''
      )}
      {table ? (
        <div style={{ marginTop: 60 }}>
          <BasicTable rows={table} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default MainLayout;
