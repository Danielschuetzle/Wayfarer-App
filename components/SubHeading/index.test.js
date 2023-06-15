import SubHeading from ".";
import { render, screen } from "@testing-library/react";

test("renders 'We dolphinitely love coding!' as text content for the SubHeading component", () => {
  render(<SubHeading>We dolphinitely love coding!</SubHeading>);
  const element = screen.getByText("We dolphinitely love coding!");
  expect(element).toBeInTheDocument();
});
