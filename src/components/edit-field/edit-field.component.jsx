import { Link } from "react-router-dom";
import { EditBTN, EditFieldContainer, ShowUserInfo } from "./edit-field.styles";

const EditField = ({ label, field, accessToken, address }) => {
  console.log(field, "field");
  return (
    <EditFieldContainer>
      <ShowUserInfo>
        <strong htmlFor="">{label}:</strong>
        {address ? (
          <span>
            {field?.governorate}, {field?.city},{field?.district},
            {field?.streetName}, {field?.landmark}, {field?.buildingNumber}
          </span>
        ) : (
          <span>{field}</span>
        )}
      </ShowUserInfo>
      <Link to={`${accessToken}`}>Edit</Link>
    </EditFieldContainer>
  );
};

export default EditField;
