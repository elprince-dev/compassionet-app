export const links = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "Search",
    route: "/Search",
  },
  {
    title: "Activity",
    route: "/Activity",
  },
  {
    title: "Share Kindness",
    route: "/Share-kindness",
  },
  {
    title: "Communities",
    route: "/Communities",
  },
  {
    title: "Profile",
    route: "/Profile",
  },
];
const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePic: "",
};
export const formFields = [
  { name: "first_name", label: "First Name", type: "text" },
  { name: "last_name", label: "Last Name", type: "text" },
  { name: "username", label: "Username", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirm_password", label: "Confirm Password", type: "password" },
  { name: "profile_pic", label: "Profile Picture", type: "file" },
];
