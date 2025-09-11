const User = require('./models/User');

async function seedUsers() 
{
  const count = await User.countDocuments();
  if (count === 0) 
  {
    await User.create([
      { firstName: 'Admin', lastName: 'Testowy', role: 'admin' },
      { firstName: 'Dev', lastName: 'Developer', role: 'developer' },
      { firstName: 'Ops', lastName: 'Devops', role: 'devops' }
    ]);
    console.log('Mock users seeded');
  }
}

module.exports = seedUsers;
