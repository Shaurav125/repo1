/**
 * Handles visitor counting logic.
 * Uses localStorage to persist the total count.
 * Increments every time the page is loaded (no session check).
 */

const STORAGE_KEY = 'dr_mithilesh_visitor_total';
const BASE_VISITORS = 0; // Start from 0 as requested

export const getAndIncrementVisitorCount = (): string => {
  // 1. Get current total from local storage
  let currentTotal = localStorage.getItem(STORAGE_KEY);
  let count = currentTotal ? parseInt(currentTotal, 10) : BASE_VISITORS;

  // Safety check for data corruption
  if (isNaN(count)) {
    count = BASE_VISITORS;
  }

  // 2. Always increment on load (per user request)
  count++;
  
  // 3. Save new total
  localStorage.setItem(STORAGE_KEY, count.toString());

  // Format with commas
  return count.toLocaleString();
};

export const getCurrentCount = (): string => {
   let currentTotal = localStorage.getItem(STORAGE_KEY);
   let count = currentTotal ? parseInt(currentTotal, 10) : BASE_VISITORS;
   if (isNaN(count)) count = BASE_VISITORS;
   return count.toLocaleString();
}