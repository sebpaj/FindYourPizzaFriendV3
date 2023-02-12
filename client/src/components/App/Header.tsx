import { styled } from "@mui/material/styles";

const HeaderH1Styled = styled("h1")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#333",
  color: "#1E88E5",
  fontSize: "20px",
  padding: "10px",
  boxSizing: "border-box",
  zIndex: 1,
});

interface Props {
  emailAddress: string;
}

const HeaderH1 = (props: Props) => {
  const { emailAddress } = props;
  return (
    <HeaderH1Styled>
      <h1>Welcome {emailAddress} !</h1>
    </HeaderH1Styled>
  );
};

export default HeaderH1;
