import React from "react";
import { shallow } from "enzyme";
import EmployerDash from "../sections/employer-dash//EmployerDash.js";

describe("EmployerDash component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EmployerDash />);
  });

  it("renders the component without errors", () => {
    const component = wrapper.find(".employer-dash");
    expect(component.length).toBe(1);
  });

  it("renders the monthly report table", () => {
    const table = wrapper.find("table");
    const th = table.find("thead").find("th");
    const td = table.find("tbody").find("td");
    expect(table.length).toBe(1);
    expect(th.length).toBe(3);
    expect(td.length).toBe(0);
  });

  it("renders the add employee form", () => {
    const form = wrapper.find("form");
    const label = form.find("label");
    const input = form.find("input");
    const button = form.find("button");
    expect(form.length).toBe(1);
    expect(label.length).toBe(2);
    expect(input.length).toBe(2);
    expect(button.length).toBe(1);
  });

  it("adds a new employee to the list when the form is submitted", () => {
    const form = wrapper.find("form");
    const nameInput = form.find("#name");
    const hoursInput = form.find("#monthlyHours");
    const submitButton = form.find("button[type='submit']");
    const mockEvent = { preventDefault: jest.fn() };
    nameInput.simulate("change", { target: { value: "John Doe" } });
    hoursInput.simulate("change", { target: { value: 160 } });
    submitButton.simulate("submit", mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    const updatedEmployees = JSON.parse(localStorage.getItem("employees"));
    expect(updatedEmployees.length).toBe(1);
    expect(updatedEmployees[0].name).toBe("New Employee");
    expect(updatedEmployees[0].hours).toEqual([]);
  });
});
