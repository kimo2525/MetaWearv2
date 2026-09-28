import { useSelector } from "react-redux";
import BreadCrumb from "../../components/bread-crumb/bread-crumb.compnent";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Route, Routes } from "react-router-dom";
import ProfilePageComponent from "../../components/profile-page-component/profile-page.component";
import EditName from "../edit-name/edit-name";
import EditEmail from "../edit-email/edit-email";
import EditMobile from "../edit-number/edit-number";
import EditPassword from "../edit-password/edit-password";
import EditAddress from "../edit-address/edit-address";

const ProfilePage = () => {
  const links = [];

  const currentUser = useSelector(selectCurrentUser);

  return (
    <Routes>
      <Route index element={<ProfilePageComponent />} />
      <Route
        path="editname"
        element={<EditName currentName={currentUser?.displayName || ""} />}
      />
      <Route
        path="editemail"
        element={<EditEmail currentName={currentUser?.email || ""} />}
      />
      <Route path="editmobilenumber" element={<EditMobile />} />
      <Route path="editpassword" element={<EditPassword />} />
      <Route path="editaddress" element={<EditAddress />} />
    </Routes>
  );
};

export default ProfilePage;
