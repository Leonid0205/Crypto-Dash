import { ScaleLoader } from "react-spinners";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto 50px auto",
};

const Spinner = ({ color = "#537aab" }) => {
  return (
    <div>
      <ScaleLoader
        color={color}
        height={40}
        width={8}
        barCount={7}
        margin={3}
        cssOverride={override}
        aria-label="Loading..."
      />
    </div>
  );
};

export default Spinner;
