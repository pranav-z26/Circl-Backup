import React from "react";

const ConnectionsCard = ({ data }) => {
  return (
    <>
      <div className="flex flex-col w-3/5 justify-center my-10 mx-auto">
        {data &&
          data.map(
            ({ _id, firstName, lastName, photoUrl, age, gender, skills }) => (
              <div
                key={_id}
                className="border-sky-500 m-5 p-5 rounded-lg flex items-center gap-8 bg-base-300"
              >
                <div className="mx-10">
                  <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2 w-1/3">
                  <div className="text-2xl text-yellow-400">{`${firstName} ${lastName}`}</div>
                  <div>{`Age: ${age}`}</div>
                  <div>{`Gender: ${gender}`}</div>
                  <div>Know's about:</div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(skills) && skills.length > 0 ? (
                      skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-sky-100 text-sky-800 text-sm px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">
                        No skills listed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default ConnectionsCard;
