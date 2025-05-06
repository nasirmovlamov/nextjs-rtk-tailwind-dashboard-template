import { convertToDDMMYYYY } from '../convertToDDMMYYYY';

test('convertToDDMMYYYY', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-03-15');
    expect(convertToDDMMYYYY(date)).toBe('15/03/2024');
  });

  it('should pad single digit day and month with leading zeros', () => {
    const date = new Date('2024-01-05');
    expect(convertToDDMMYYYY(date)).toBe('05/01/2024');
  });

  it('should handle last day of the year', () => {
    const date = new Date('2024-12-31');
    expect(convertToDDMMYYYY(date)).toBe('31/12/2024');
  });

  it('should handle first day of the year', () => {
    const date = new Date('2024-01-01');
    expect(convertToDDMMYYYY(date)).toBe('01/01/2024');
  });
});
