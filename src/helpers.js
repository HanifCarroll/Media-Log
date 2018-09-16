export const extractServices = arr => {
  let services = ["All Services"];

  arr.forEach(el => {
    if (!services.includes(el.fields.service)) services.push(el.fields.service);
  });

  services = services.map(service => ({ text: service, value: service }));

  return services;
};

export const extractUsers = arr => {
  let users = ["All Users"];

  arr.forEach(el => {
    if (!users.includes(el.fields.user)) users.push(el.fields.user);
  });

  users = users.map(user => ({ text: user, value: user }));

  return users;
};
