SELECT user_id, room_no
FROM (
    SELECT user_id, room_no, 
           ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY booking_date DESC) as rn
    FROM bookings
) t
WHERE rn = 1;

SELECT b.booking_id, SUM(bc.item_quantity * i.item_rate) as total_billing_amount
FROM bookings b
JOIN booking_commercials bc ON b.booking_id = bc.booking_id
JOIN items i ON bc.item_id = i.item_id
WHERE b.booking_date >= '2021-11-01' AND b.booking_date < '2021-12-01'
GROUP BY b.booking_id;

SELECT bc.bill_id, SUM(bc.item_quantity * i.item_rate) as bill_amount
FROM booking_commercials bc
JOIN items i ON bc.item_id = i.item_id
WHERE bc.bill_date >= '2021-10-01' AND bc.bill_date < '2021-11-01'
GROUP BY bc.bill_id
HAVING SUM(bc.item_quantity * i.item_rate) > 1000;

WITH MonthlyItemStats AS (
    SELECT 
        strftime('%m', bc.bill_date) as month,
        i.item_name,
        SUM(bc.item_quantity) as total_qty,
        RANK() OVER(PARTITION BY strftime('%m', bc.bill_date) ORDER BY SUM(bc.item_quantity) DESC) as rank_desc,
        RANK() OVER(PARTITION BY strftime('%m', bc.bill_date) ORDER BY SUM(bc.item_quantity) ASC) as rank_asc
    FROM booking_commercials bc
    JOIN items i ON bc.item_id = i.item_id
    WHERE bc.bill_date >= '2021-01-01' AND bc.bill_date < '2022-01-01'
    GROUP BY month, i.item_name
)
SELECT month, item_name, total_qty,
       CASE WHEN rank_desc = 1 THEN 'Most Ordered' ELSE 'Least Ordered' END as status
FROM MonthlyItemStats
WHERE rank_desc = 1 OR rank_asc = 1;

WITH MonthlyBills AS (
    SELECT 
        strftime('%m', bc.bill_date) as month,
        b.user_id,
        bc.bill_id,
        SUM(bc.item_quantity * i.item_rate) as bill_value
    FROM booking_commercials bc
    JOIN bookings b ON bc.booking_id = b.booking_id
    JOIN items i ON bc.item_id = i.item_id
    WHERE bc.bill_date >= '2021-01-01' AND bc.bill_date < '2022-01-01'
    GROUP BY month, b.user_id, bc.bill_id
),
RankedBills AS (
    SELECT month, user_id, bill_value,
           DENSE_RANK() OVER(PARTITION BY month ORDER BY bill_value DESC) as rnk
    FROM MonthlyBills
)
SELECT month, user_id, bill_value
FROM RankedBills
WHERE rnk = 2;
