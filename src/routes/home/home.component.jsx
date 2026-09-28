import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";
// import DC_SHOP_DATA2 from "../../DC_SHOP_DATA2.js";
import { supabase } from "../../utils/supabase/supabase.utils";
import Button from "../../components/button/button.component";

const Home = () => {
  const testCreateOrder = async () => {
    const items = [
      {
        product_id: 4,
        quantity: 1,
        size: "XXXXXXL",
        color: "Invisible Purple",
      },
    ];

    const shippingAddress = {
      fullName: "Rick Shanchez",
      mobileNumber: "+201550453346",
      streetName: "somwhere",
      buildingNumber: "10",
      city: "Alabama",
      district: "Alexandria",
      governorate: "California",
      landmark: "whereever",
      addressType: "home",
    };

    const { data, error } = await supabase.rpc("create_order", {
      p_items: items,
      p_shipping_address: shippingAddress,
      p_shipping_cost: 0,
    });

    if (error) {
      console.error("ORDER ERROR:", error);
      return;
    }

    console.log("ORDER CREATED:", data);
  };
  const spliceIntoSmallerArray = (DC_SHOP_DATA2) => {
    const splicedArray = Object.keys(DC_SHOP_DATA2).reduce((acc, group) => {
      const { title, items } = DC_SHOP_DATA2[group];
      acc[title.toLowerCase()] = items.splice(5, 10);
      return acc;
    }, {});
    const jsonString = JSON.stringify(splicedArray, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "spliceIntoSmallerArray.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return splicedArray;
  };

  // function ExportObjectButton() {
  //   const handleDownload = () => {
  //     const myData = spliceIntoSmallerArray(DC_SHOP_DATA2);
  //     const jsonString = JSON.stringify(myData, null, 2);

  //     const blob = new Blob([jsonString], { type: "application/json" });

  //     const url = URL.createObjectURL(blob);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "spliceIntoSmallerArray.json";
  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);
  //   };

  //   return <button onClick={handleDownload}>Export Object to File</button>;
  // }

  return (
    <div>
      <Directory />
      <Outlet />
      {/* <Button onClick={testCreateOrder}>Test Create Order</Button> */}
      {/* <button
        onClick={() => console.log(spliceIntoSmallerArray(DC_SHOP_DATA2))}
      >
        Splice JSON
      </button> */}
      {/* <button onClick={() => downloadObjectAsJson()}>Copy Outside</button> */}
      {/* <ExportObjectButton /> */}
    </div>
  );
};

export default Home;
