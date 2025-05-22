const GET_ORGANIZATION_BY_QUERY = (queryData) => {
  const filterKeys = Object.keys(queryData);
  const whereClause =
    filterKeys.length > 0
      ? `WHERE ${filterKeys
          .map((key, index) => `"${key}" = $${index + 1}`)
          .join(" AND ")}`
      : "";
  const query = `
        SELECT *
        FROM organizations
        ${whereClause}
      `;
  return query;
};

module.exports = {
  GET_ORGANIZATION_BY_QUERY,
};
