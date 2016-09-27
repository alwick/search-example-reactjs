import expect from 'expect';
import employeeFilter from '../employeeFilter';

describe('Employee Filter tests.', () => {
    it('Filter returns person based on all-caps name.', () => {
        const people = [{
            firstName: "Amy",
            lastName: "Wood"
        },
        {
            firstName: "Bobby",
            lastName: "Wood"
        }];

        const filtered = employeeFilter.filter(people, 'AMY');

        expect(filtered.length).toEqual(1, 'Should find one person');
        expect(filtered[0].firstName).toEqual('Amy');
    });
});
