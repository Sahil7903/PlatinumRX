# Spreadsheet Proficiency Solutions

This document explains the solutions for the spreadsheet tasks using Excel/Google Sheets.

## Task 1: Populate 'ticket_created_at' in Feedbacks Table

**Goal:** Bring the `created_at` date from the `ticket` sheet into the `feedbacks` sheet using `cms_id` as the key.

### Solution:
In the `feedbacks` sheet, in the `ticket_created_at` column (assuming it's column D and data starts at row 2):

**Using VLOOKUP:**
```excel
=VLOOKUP(A2, 'ticket'!E:B, 2, FALSE)
```
*Logic:*
- `A2`: The `cms_id` in the feedbacks sheet.
- `'ticket'!E:B`: The range in the ticket sheet where column E is `cms_id` and column B is `created_at`. (Note: VLOOKUP requires the lookup column to be the first in the range, so you might need to reorder columns or use INDEX-MATCH).

**Using INDEX-MATCH (Better):**
```excel
=INDEX('ticket'!B:B, MATCH(A2, 'ticket'!E:E, 0))
```
*Logic:*
- `INDEX('ticket'!B:B, ...)`: Returns the value from the `created_at` column.
- `MATCH(A2, 'ticket'!E:E, 0)`: Finds the row number where the `cms_id` matches.

---

## Task 2: Outlet-wise Count of Tickets

**Goal:** Count tickets created and closed on the same day and same hour.

### Step 1: Helper Columns in 'ticket' sheet
1. **Same Day?** (Column F):
   ```excel
   =INT(B2)=INT(C2)
   ```
   *Logic:* `INT()` extracts the date part from a timestamp. If they are equal, it's the same day.

2. **Same Hour?** (Column G):
   ```excel
   =AND(INT(B2)=INT(C2), HOUR(B2)=HOUR(C2))
   ```
   *Logic:* Checks if it's the same day AND the `HOUR()` part matches.

### Step 2: Counting by Outlet
Use a **Pivot Table** or **COUNTIFS**.

**a. Same Day Count:**
```excel
=COUNTIFS('ticket'!D:D, outlet_id, 'ticket'!F:F, TRUE)
```

**b. Same Hour Count:**
```excel
=COUNTIFS('ticket'!D:D, outlet_id, 'ticket'!G:G, TRUE)
```

---

## Data Structure Reference

### Ticket Sheet
| ticket_id | created_at | closed_at | outlet_id | cms_id |
|-----------|------------|-----------|-----------|--------|
| isu-sjd-457| 2021-08-19 16:45:43 | 2021-08-22 12:33:32 | wrqy-juv-978 | vew-iuvd-12 |

### Feedbacks Sheet
| cms_id | feedback_at | feedback_rating | ticket_created_at |
|--------|-------------|-----------------|-------------------|
| vew-iuvd-12 | 2021-08-21 13:26:48 | 3 | (Filled via Formula) |
