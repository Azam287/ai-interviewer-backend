const INSERT_ORGANIZATION = `
    INSERT INTO public.organizations (name, address, team_size, email)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

module.exports = {
  INSERT_ORGANIZATION,
};
