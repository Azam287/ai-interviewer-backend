const INSERT_MEMBER = (queryData) => {
  const keyList = Object.keys(queryData);
  const queryKeys = keyList?.reduce((acc, curr) => `${acc},${curr}`);
  const queryValues = keyList.reduce(
    (acc, _, index) => (index === 0 ? `$${index + 1}` : `${acc},$${index + 1}`),
    ""
  );

  return `INSERT INTO public.members (${queryKeys}) VALUES (${queryValues}) RETURNING *;`;
};

module.exports = {
  INSERT_MEMBER,
};
