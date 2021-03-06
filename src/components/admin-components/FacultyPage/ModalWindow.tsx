import React, { useState } from "react";
import { TextField } from "../common/InputField";
import { toast } from "react-toastify";

export const AddFacultyWindow = ({
  handleModalClose,
  createFaculty,
  faculty,
}: any) => {
  const [input, setInput] = useState({ faculty: "" });

  const handleInputs = (ev: any) => {
    const { name, value } = ev.target;
    setInput({ ...input, [name]: value });
  };

  const handleCreateFaculty = async () => {
    try {
      await createFaculty(input.faculty);
      toast.success(`${input.faculty} Faculty was Successfully Added`, {
        position: "top-center",
      });
      handleModalClose();
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <div className="text-center profile">
      <h3>Add a new Faculty</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField
          name="faculty"
          handleInputs={handleInputs}
          placeholder="Enter Faculty name here"
        />

        <div className="">
          <button className="btn btn-primary" onClick={handleModalClose}>
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={handleCreateFaculty}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export const AddDepartmentWindow = ({
  handleModalClose,
  faculty,
  createDepartment,
}: any) => {
  const [input, setInput] = useState({ department: "" });

  const handleInputs = (ev: any) => {
    const { name, value } = ev.target;
    setInput({ ...input, [name]: value });
  };
  const handleCreateDepartment = async () => {
    if (
      Object.values(faculty.departments).filter(
        (a: any) => a.department === input.department
      ).length > 0
    ) {
      toast.warning(`${input.department} Department Exists`, {
        position: "top-center",
      });
      return;
    }

    try {
      await createDepartment(faculty._id, input.department);
      toast.success(
        `${input.department} Department was Successfully Added to ${faculty.faculty} Faculty`,
        { position: "top-center" }
      );
      handleModalClose();
    } catch (error) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <div className="text-center profile">
      <h3>
        <span style={{ textTransform: "capitalize" }}>{faculty.faculty}:</span>{" "}
        <br /> <span style={{ fontSize: "20px" }}>Add New Department</span>
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField
          name="department"
          placeholder="Enter Department name here"
          handleInputs={handleInputs}
        />

        <div className="">
          <button className="btn btn-primary" onClick={handleModalClose}>
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={handleCreateDepartment}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
