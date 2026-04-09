def convert_minutes(total_minutes):
    if not isinstance(total_minutes, int) or total_minutes < 0:
        return "Invalid input. Please provide a non-negative integer."
    
    hours = total_minutes // 60
    minutes = total_minutes % 60
    
    h_str = "hr" if hours == 1 else "hrs"
    m_str = "minute" if minutes == 1 else "minutes"
    
    if hours == 0:
        return f"{minutes} {m_str}"
    elif minutes == 0:
        return f"{hours} {h_str}"
    else:
        return f"{hours} {h_str} {minutes} {m_str}"

if __name__ == "__main__":
    print(f"130 minutes -> {convert_minutes(130)}")
    print(f"110 minutes -> {convert_minutes(110)}")
    print(f"60 minutes -> {convert_minutes(60)}")
    print(f"45 minutes -> {convert_minutes(45)}")
