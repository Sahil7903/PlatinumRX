def remove_duplicates(input_string):
    if not isinstance(input_string, str):
        return "Invalid input. Please provide a string."
    
    unique_string = ""
    for char in input_string:
        if char not in unique_string:
            unique_string += char
            
    return unique_string

if __name__ == "__main__":
    test_str = "platinumrx assignment"
    result = remove_duplicates(test_str)
    print(f"Original: '{test_str}'")
    print(f"Unique:   '{result}'")
    
    test_str2 = "hello world"
    print(f"Original: '{test_str2}' -> Unique: '{remove_duplicates(test_str2)}'")
