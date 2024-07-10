import { Svg } from "./Svg";

export const SprintContentHeader2 = () => {
  return (
    <>
      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-2">
            Resource Name
          </th>
          <th scope="col" className="px-6 py-2">
            Date
          </th>
          <th scope="col" className="px-6 py-2">
            Hours
          </th>
        </tr>
      </thead>
    </>
  );
};

export const SprintContentHeader1 = () => {
  return (
    <>
      <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              Sprint Name
              <Svg />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              Start Date
              <Svg />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              End Date
              <Svg />
            </div>
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center text-black">
              Total Time
              <Svg />
            </div>
          </th>
        </tr>
      </thead>
    </>
  );
};
