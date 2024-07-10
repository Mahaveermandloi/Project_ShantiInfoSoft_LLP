import React from "react";

const FilterUsingDate = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>
      <div className="flex justify-between lg:mt-0 mt-3 lg:justify-end gap-5 lg:mr-10">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="text-xs">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-300 px-2 py-1 rounded-md text-gray-900 whitespace-nowrap"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="end-date" className="text-xs">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-300 px-2 py-1 rounded-md text-gray-900 whitespace-nowrap"
          />
        </div>
      </div>
    </>
  );
};

export default FilterUsingDate;
