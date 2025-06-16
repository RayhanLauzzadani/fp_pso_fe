// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import RegisterForm from "../RegisterForm";
// import "@testing-library/jest-dom";

// // Mock Firebase
// jest.mock("@/lib/firebaseConfig", () => ({
//   auth: {},
// }));

// jest.mock("firebase/auth", () => ({
//   createUserWithEmailAndPassword: jest.fn(),
//   updateProfile: jest.fn(),
// }));

// describe("RegisterForm", () => {
//   it("renders form fields", () => {
//     render(<RegisterForm />);

//     expect(screen.getByText(/Register to DooIT/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
//   });

//   it("shows alert when passwords do not match", async () => {
//     window.alert = jest.fn();

//     render(<RegisterForm />);

//     const user = userEvent.setup();

//     // ISI semua field yang required → supaya form valid di HTML5 level
//     await user.type(screen.getByLabelText(/Full Name/i), "John Doe");
//     await user.type(screen.getByLabelText(/Email/i), "john@example.com");
//     await user.type(screen.getByLabelText(/^Password$/i), "abc123");
//     await user.type(screen.getByLabelText(/Confirm Password/i), "different");

//     // Click Register
//     await user.click(screen.getByRole("button", { name: /Register/i }));

//     // Alert
//     expect(window.alert).toHaveBeenCalledWith("Passwords do not match!");
//   });
// });
