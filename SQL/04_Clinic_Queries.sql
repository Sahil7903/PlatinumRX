SELECT sales_channel, SUM(amount) as total_revenue
FROM clinic_sales
WHERE strftime('%Y', datetime) = '2021'
GROUP BY sales_channel;

SELECT uid, SUM(amount) as total_spent
FROM clinic_sales
WHERE strftime('%Y', datetime) = '2021'
GROUP BY uid
ORDER BY total_spent DESC
LIMIT 10;

WITH MonthlyRevenue AS (
    SELECT strftime('%m', datetime) as month, SUM(amount) as revenue
    FROM clinic_sales
    WHERE strftime('%Y', datetime) = '2021'
    GROUP BY month
),
MonthlyExpense AS (
    SELECT strftime('%m', datetime) as month, SUM(amount) as expense
    FROM expenses
    WHERE strftime('%Y', datetime) = '2021'
    GROUP BY month
)
SELECT 
    r.month, 
    COALESCE(r.revenue, 0) as revenue, 
    COALESCE(e.expense, 0) as expense,
    (COALESCE(r.revenue, 0) - COALESCE(e.expense, 0)) as profit,
    CASE WHEN (COALESCE(r.revenue, 0) - COALESCE(e.expense, 0)) > 0 THEN 'profitable' ELSE 'not-profitable' END as status
FROM MonthlyRevenue r
LEFT JOIN MonthlyExpense e ON r.month = e.month;

WITH ClinicProfit AS (
    SELECT 
        c.city,
        c.clinic_name,
        (SUM(COALESCE(s.amount, 0)) - (SELECT SUM(amount) FROM expenses e WHERE e.cid = c.cid AND strftime('%m', e.datetime) = '09' AND strftime('%Y', e.datetime) = '2021')) as profit
    FROM clinics c
    LEFT JOIN clinic_sales s ON c.cid = s.cid
    WHERE strftime('%m', s.datetime) = '09' AND strftime('%Y', s.datetime) = '2021'
    GROUP BY c.city, c.clinic_name
)
SELECT city, clinic_name, profit
FROM (
    SELECT city, clinic_name, profit,
           RANK() OVER(PARTITION BY city ORDER BY profit DESC) as rnk
    FROM ClinicProfit
) t
WHERE rnk = 1;

WITH ClinicProfit AS (
    SELECT 
        c.state,
        c.clinic_name,
        (SUM(COALESCE(s.amount, 0)) - (SELECT SUM(amount) FROM expenses e WHERE e.cid = c.cid AND strftime('%m', e.datetime) = '09' AND strftime('%Y', e.datetime) = '2021')) as profit
    FROM clinics c
    LEFT JOIN clinic_sales s ON c.cid = s.cid
    WHERE strftime('%m', s.datetime) = '09' AND strftime('%Y', s.datetime) = '2021'
    GROUP BY c.state, c.clinic_name
)
SELECT state, clinic_name, profit
FROM (
    SELECT state, clinic_name, profit,
           RANK() OVER(PARTITION BY state ORDER BY profit ASC) as rnk
    FROM ClinicProfit
) t
WHERE rnk = 2;
