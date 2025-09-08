import User from './models/User';

const seedUsers = async () => 
{
    const count = await User.countDocuments();
    if (count === 0) {
        await User.create([
            { firstName: 'Admin1', lastName: 'Testowy', role: 'admin' },
            { firstName: 'Dev1', lastName: 'Developer', role: 'developer' },
            { firstName: 'Ops1', lastName: 'Devops', role: 'devops' }
        ]);
        console.log('Mock users seeded');
    }
};

export default seedUsers;
