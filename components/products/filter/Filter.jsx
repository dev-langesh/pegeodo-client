import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  applyFilter,
  changeFilterOptions,
} from "../../../src/features/filter/filterSlice";

const initialState = {
  name: "",
  category: "",
  price: "",
};

export default function Filter() {
  const [filterOptions, setFilterOptions] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(changeFilterOptions(formData));
    dispatch(applyFilter(true));
    setFormData(initialState);
  }

  return (
    <>
      <div
        onClick={() => setFilterOptions(true)}
        className="text-white bg-indigo-500 p-2 rounded transform hover:-translate-y-[2px] cursor-pointer transition-all duration-150 absolute top-20 left-4"
      >
        <FilterListIcon />
      </div>
      <section
        className={`absolute transform ${
          filterOptions ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } z-10 left-4 top-6 transition-all duration-200`}
      >
        <form
          onSubmit={submitHandler}
          className="bg-white p-5 shadow-xl rounded border-t-4 border-indigo-500"
        >
          <section className="flex justify-between items-center">
            <h1 className="text-lg font-slab font-medium text-gray-500 tracking-wide">
              Filter
            </h1>
            <IconButton
              onClick={() => setFilterOptions(false)}
              sx={{ color: "blue" }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>{" "}
            </IconButton>
          </section>
          <div className="flex flex-col items-center space-y-4 p-2">
            <TextField
              onChange={changeHandler}
              name="name"
              variant="standard"
              label="Plant Name"
            />
            <TextField
              onChange={changeHandler}
              name="category"
              variant="standard"
              label="Category"
            />
            <TextField
              onChange={changeHandler}
              name="price"
              variant="standard"
              label="Price"
              type="number"
            />
            <Button type="submit" fullWidth>
              Apply
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
