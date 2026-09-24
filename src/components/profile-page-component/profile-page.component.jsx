import { useSelector } from "react-redux";
import BreadCrumb from "../bread-crumb/bread-crumb.compnent";
import EditField from "../edit-field/edit-field.component";

import {
  InnerComponentContainer,
  ProfilePageComponentContainer,
} from "./profile-page-compnent.styles";

import { selectCurrentUser } from "../../store/user/user.selector";

const ProfilePageComponent = () => {
  const links = [];

  const currentUser = useSelector(selectCurrentUser);
  // console.log(currentUser, "currentUser");

  return (
    <ProfilePageComponentContainer>
      <InnerComponentContainer>
        <EditField
          accessToken={"name/editname"}
          address={false}
          label="Name"
          field={
            currentUser?.displayName ? currentUser?.displayName : "Your Name"
          }
        />
        <hr />
        <EditField
          accessToken={"email/editemail"}
          address={false}
          label="Email"
          field={
            currentUser?.email ? currentUser?.email : "something@something.com"
          }
        />
        <hr />
        <EditField
          accessToken={"mobile/editmobilenumber"}
          address={false}
          label="Mobile number"
          field={
            currentUser?.mobileNumber ? currentUser?.mobileNumber : "023456789"
          }
        />
        <hr />
        <EditField
          accessToken={"password/editpassword"}
          label="Password"
          field="***********"
          address={false}
        />
        <hr />
        <EditField
          accessToken={"address/editaddress"}
          label="Address"
          address={true}
          field={currentUser ? currentUser : "Your Address"}
        />
      </InnerComponentContainer>
    </ProfilePageComponentContainer>
  );
};

export default ProfilePageComponent;
