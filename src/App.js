import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";
import { supabase } from "./utils/supabase/supabase.utils";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import ProfilePage from "./routes/profile-page/profile-page";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setUserFromSession = async (session) => {
      const user = session?.user;

      if (!user) {
        dispatch(setCurrentUser(null));
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }
      console.log("Fetched profile:", profile);

      const userData = {
        uid: user.id,
        email: user.email,
        displayName: profile.display_name,
        mobileNumber: profile.mobile_number,
        city: profile.city,
        streetName: profile.street_name,
        buildingNumber: profile.building_number,
        district: profile.district,
        governorate: profile.governorate,
        landmark: profile.landmark,
        addressType: profile.address_type,
        createdAt: profile.created_at,
      };
      console.log("Dispatching setCurrentUser with:", userData);
      dispatch(setCurrentUser(userData));
    };

    // Handle an already existing session on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserFromSession(session);
    });

    // Listen for future auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserFromSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="youraccount/*" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
