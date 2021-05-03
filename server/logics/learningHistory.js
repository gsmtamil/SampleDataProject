const learningHistoryModel = require("../database/mongodb").models
  .learningHistory;

/**
 *
 * @param {*} param0
 * @returns
 * report data for dashboard page
 */
const dashboardReport = ({ params, query, body } = {}) => {
  return learningHistoryModel.aggregate([
    { $unwind: "$records" },
    {
      $facet: {
        status_wise_count: [
          {
            $group: {
              _id: "$records.status",
              count: { $sum: 1 },
            },
          },
        ],
        course_wise_completion: [
          {
            $group: {
              _id: "$records.course_title",
              count: { $sum: 1 },
            },
          },
        ],
        country_wise_completion: [
          {
            $group: {
              _id: "$records.country",
              count: { $sum: 1 },
            },
          },
        ],
        training_provider_wise_completion: [
          {
            $group: {
              _id: "$records.training_provider",
              count: { $sum: 1 },
            },
          },
        ],
        year_wise_completion: [
          {
            $group: {
              _id: { $year: "$records.completed_on" },
              count: { $sum: 1 },
            },
          },
        ],
        year_wise_expiration: [
          {
            $group: {
              _id: { $year: "$records.valid_until" },
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
  ]);
};

const restGETMany = ({ params, query, body } = {}) => {
  const _entryTime = Date.now();

  let { page = 1, count = 20, searchName = "", searchValue = "" } = query;
  //  we can add more filter based on it's requirement

  const skip = (+page ? +page - 1 : +page) * +count;
  const limit = +count;

  let initialStage = [{ $unwind: "$records" }];

  if (searchName && searchValue) {
    initialStage.push({
      $match: { "records.training_provider": new RegExp(searchValue, "i") },
    });
  }

  let finalStages = [
    {
      $lookup: {
        from: "employees",
        localField: "delegate_id",
        foreignField: "delegate_id",
        as: "employeeData",
      },
    },
    {
      $unwind: "$employeeData",
    },
    {
      $project: {
        employeeId: "$employeeData.employee_id",
        firstName: "$first_name",
        courseName: "$records.course_title",
        courceId: "$records.course_code",
        country: "$recrds.country",
        trainingProvider: "$records.training_provider",
        completedAt: "$records.completed_on",
        ExpireAt: "$records.valid_until",
      },
    },
    { $skip: skip },
    { $limit: limit },
  ];
  let countStage = [
    {
      $count: "count",
    },
  ];
  let dataPromise = [].concat(initialStage, finalStages);
  let countPromise = [].concat(initialStage, countStage);

  return Promise.all([
    learningHistoryModel.aggregate(dataPromise),
    learningHistoryModel.aggregate(countPromise),
  ]).then(([data, count]) => ({
    generatedAt: new Date(),
    generatedIn: (Date.now() - _entryTime) / 1000 + " secs",
    total: count && count[0] ? count[0].count : 0,
    page: +page,
    count: data.length,
    data: data,
  }));
};

module.exports = {
  dashboardReport,
  restGETMany,
};
