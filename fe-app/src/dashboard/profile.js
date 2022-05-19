import { useSelector } from "react-redux";

const documentTypeConst = {
  pan: "Pan Card",
  adhaar: "Adhaar Card",
  passport: "Passport",
};

function Profile() {
  const selectedData = useSelector((state) => state.loginData.user);

  return (
    <div className="p-1">
      <p>
        <img
          alt="Profile Image"
          style={{ width: "50%", height: "auto" }}
          src={selectedData.photoPath}
        />
      </p>
      <h2>{selectedData.name}</h2>
      <p>
        <strong>USER ID: </strong> {selectedData._id}
      </p>
      <p>
        <strong>Address: </strong> {selectedData.address}
      </p>
      <p>
        <strong>Email: </strong> {selectedData.email}
      </p>
      <p>
        <strong>Document : </strong>{" "}
        {documentTypeConst[selectedData.documentType]}
      </p>
      <p>
        <img
          alt="Document Image"
          style={{ width: "100%", height: "auto" }}
          src={selectedData.documentPath}
        />
      </p>
    </div>
  );
}

export default Profile;
