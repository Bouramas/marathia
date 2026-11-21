// Seasonal minimum-stay rules, determined by the CHECK-IN date (YYYY-MM-DD).
//  - July & August: 3 nights minimum, any weekday.
//  - June & September: 1 night for Mon–Thu check-in, 2 nights for Fri–Sun check-in.
//  - Other months: 1 night.
export function minNights(checkIn: string): number {
  const [y, m, d] = checkIn.split('-').map(Number)
  if (m === 7 || m === 8) return 3
  if (m === 6 || m === 9) {
    const dow = new Date(y, m - 1, d).getDay() // 0 Sun … 6 Sat
    return dow === 0 || dow === 5 || dow === 6 ? 2 : 1
  }
  return 1
}
