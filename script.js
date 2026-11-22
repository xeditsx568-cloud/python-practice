"use strict";

const STORAGE_KEY = "pythonRecall.v3";
const SET_SIZE = 10;
const NEED = 2;

function lesson(id, topic, title, explain, exampleLines, shown, task, answerLines) {
  return {
    id: id,
    topic: topic,
    title: title,
    explain: explain,
    example: exampleLines.join("\n"),
    shown: shown,
    task: task,
    code: answerLines.join("\n")
  };
}

const LESSONS = [
  lesson(
    1,
    "Displaying text",
    "This is how to display text",
    "print sends text to the screen. The words go inside quotes. Those quotes are part of the command, and they do not appear on the screen.",
    ['print("Hello")'],
    "Hello",
    "Type a command that displays Goodbye.",
    ['print("Goodbye")']
  ),
  lesson(
    2,
    "Displaying text",
    "This is how to display a second line",
    "Each print starts a new line after it finishes. The first call shows Hello, then Python moves down, and the second call shows Python on the next line.",
    ['print("Hello")', 'print("Python")'],
    "Hello\nPython",
    "Type two commands. The first displays Red. The second displays Blue.",
    ['print("Red")', 'print("Blue")']
  ),
  lesson(
    3,
    "Displaying text",
    "This is how to display a number",
    "Text needs quotes. A number does not. The example displays a label, then the number 21 on the next line.",
    ['print("The total is")', "print(21)"],
    "The total is\n21",
    "Display the words The score is, then display the number 8 on the next line.",
    ['print("The score is")', "print(8)"]
  ),
  lesson(
    4,
    "Displaying text",
    "This is how to display two pieces of text on one line",
    "A comma between values inside print places one space between them. Both pieces stay on the same line.",
    ['print("Ada", "Lovelace")'],
    "Ada Lovelace",
    "Type a command that displays Grace and Hopper on one line, with a space between them.",
    ['print("Grace", "Hopper")']
  ),
  lesson(
    5,
    "Displaying text",
    "This is how to stay on the same line",
    "Normally print ends by moving to the next line. end=\" \" replaces that move with a single space, so the next print continues on the same line.",
    ['print("Hello", end=" ")', 'print("there")'],
    "Hello there",
    "Display Good, stay on that line with a space, then display morning. The screen should show Good morning.",
    ['print("Good", end=" ")', 'print("morning")']
  ),
  lesson(
    6,
    "Displaying text",
    "This is how to choose what goes between items",
    "sep is the separator print puts between items. sep=\", \" uses a comma and a space instead of the normal single space.",
    ['print("cat", "dog", "bird", sep=", ")'],
    "cat, dog, bird",
    "Display tea, cake, and milk on one line, with a comma and a space between them.",
    ['print("tea", "cake", "milk", sep=", ")']
  ),
  lesson(
    7,
    "Displaying text",
    "This is how to display a quote inside text",
    "A quote you want to show on the screen needs a backslash in front of it. The backslash itself is not displayed.",
    ['print("She said \\"Hi\\"")'],
    'She said "Hi"',
    "Type a command that displays He said \"Bye\", including those quotation marks.",
    ['print("He said \\"Bye\\"")']
  ),
  lesson(
    8,
    "Displaying text",
    "This is how to start a new line inside one piece of text",
    "\\n is one special character that means start a new line. One print can therefore show two lines.",
    ['print("First line\\nSecond line")'],
    "First line\nSecond line",
    "Type one command that displays Left on one line and Right on the next line.",
    ['print("Left\\nRight")']
  ),
  lesson(
    9,
    "Displaying text",
    "This is how to write a note that is not displayed",
    "A line that starts with # is a comment. Python skips it, so it never appears on the screen. Only the print line produces text.",
    ["# This note is for a person.", 'print("This line is shown")'],
    "This line is shown",
    "Write a comment that says Keep this note, then a command that displays Ready.",
    ["# Keep this note", 'print("Ready")']
  ),
  lesson(
    10,
    "Displaying text",
    "This is how to display a blank line",
    "print() with nothing inside displays no words, then moves down. Between two messages, that looks like a blank line.",
    ['print("Welcome")', "print()", 'print("Let us begin")'],
    "Welcome\n\nLet us begin",
    "Display Start, then a blank line, then Finish.",
    ['print("Start")', "print()", 'print("Finish")']
  ),
  lesson(
    11,
    "Variables",
    "This is how to make a variable",
    "A variable is a name that holds a value. The name has no quotes. The text it holds does. print(name) displays the stored text, not the word name.",
    ['name = "Ada"', "print(name)"],
    "Ada",
    "Make a variable called city that holds Paris, then display it.",
    ['city = "Paris"', "print(city)"]
  ),
  lesson(
    12,
    "Variables",
    "This is how to change a variable",
    "Using the same name again replaces the old value. After the second line, only the new value remains.",
    ['name = "Ada"', 'name = "Grace"', "print(name)"],
    "Grace",
    "Make a variable called city that first holds Paris, then change it to Rome, then display it.",
    ['city = "Paris"', 'city = "Rome"', "print(city)"]
  ),
  lesson(
    13,
    "Variables",
    "This is how to store text and a number",
    "One name can hold text, and another can hold a number. They stay separate. A number has no quotes.",
    ['city = "Paris"', "year = 2026", "print(city)", "print(year)"],
    "Paris\n2026",
    "Store London in a variable called place and 1800 in a variable called year. Display place, then year.",
    ['place = "London"', "year = 1800", "print(place)", "print(year)"]
  ),
  lesson(
    14,
    "Variables",
    "This is how to update a number",
    "The right side runs first. score + 5 uses the current value, then the result is stored back into score.",
    ["score = 10", "score = score + 5", "print(score)"],
    "15",
    "Start points at 4. Add 3 with points = points + 3, then display points.",
    ["points = 4", "points = points + 3", "print(points)"]
  ),
  lesson(
    15,
    "Variables",
    "This is how to add onto a variable in one step",
    "+= is the short way to add a number and save it back into the same name.",
    ["score = 10", "score += 5", "print(score)"],
    "15",
    "Start lives at 2. Add 4 with +=, then display lives.",
    ["lives = 2", "lives += 4", "print(lives)"]
  ),
  lesson(
    16,
    "Variables",
    "This is how to join text onto a variable",
    "A plus sign between two pieces of text sticks them together. It does not add a space unless that space is inside the quotes.",
    ['name = "Ada"', 'print("Hello, " + name)'],
    "Hello, Ada",
    "Store Sam in name, then display Bye, Sam by joining the text.",
    ['name = "Sam"', 'print("Bye, " + name)']
  ),
  lesson(
    17,
    "Variables",
    "This is how to place a variable inside a sentence",
    "An f before the quotes makes an f-string. Names inside curly braces are replaced by their values. The braces are not displayed.",
    ['name = "Ada"', "score = 10", 'print(f"{name} scored {score}")'],
    "Ada scored 10",
    "Store Lin in name and 7 in score. Display Lin scored 7 with an f-string.",
    ['name = "Lin"', "score = 7", 'print(f"{name} scored {score}")']
  ),
  lesson(
    18,
    "Variables",
    "This is how capital letters make a different name",
    "Name and name are different variables. Changing one does not change the other.",
    ['Name = "Ada"', 'name = "Grace"', "print(Name)", "print(name)"],
    "Ada\nGrace",
    "Store West in City and East in city. Display City, then city.",
    ['City = "West"', 'city = "East"', "print(City)", "print(city)"]
  ),
  lesson(
    19,
    "Variables",
    "This is how to save the result of a calculation",
    "The multiplication is worked out on the right, saved in a new name, and that saved result is what gets displayed.",
    ["price = 4", "count = 3", "total = price * count", "print(total)"],
    "12",
    "Store 6 in price and 2 in count. Save price times count in total, then display total.",
    ["price = 6", "count = 2", "total = price * count", "print(total)"]
  ),
  lesson(
    20,
    "Variables",
    "This is how to display a label and a value together",
    "The words stay in the sentence. The braces pull in the variables.",
    ['item = "tea"', "price = 4", 'print(f"One {item} costs {price}")'],
    "One tea costs 4",
    "Store cake in item and 9 in price. Display One cake costs 9 with an f-string.",
    ['item = "cake"', "price = 9", 'print(f"One {item} costs {price}")']
  ),
  lesson(
    21,
    "Numbers",
    "This is how to add, subtract, and multiply",
    "These three symbols do the everyday arithmetic. print displays the result, not the symbols.",
    ["print(7 + 2)", "print(7 - 2)", "print(7 * 2)"],
    "9\n5\n14",
    "Display 10 + 4, then 10 - 4, then 10 * 4, each on its own line.",
    ["print(10 + 4)", "print(10 - 4)", "print(10 * 4)"]
  ),
  lesson(
    22,
    "Numbers",
    "This is how the two kinds of division differ",
    "One slash keeps the decimal. Two slashes keep only how many whole times the second number fits, and drop the remainder.",
    ["print(7 / 2)", "print(7 // 2)"],
    "3.5\n3",
    "Display 11 / 2, then 11 // 2.",
    ["print(11 / 2)", "print(11 // 2)"]
  ),
  lesson(
    23,
    "Numbers",
    "This is how to get the remainder",
    "The % symbol gives what is left over after division. 7 divided by 2 leaves 1.",
    ["print(7 % 2)"],
    "1",
    "Type a command that displays the remainder of 10 divided by 3.",
    ["print(10 % 3)"]
  ),
  lesson(
    24,
    "Numbers",
    "This is how to raise a number to a power",
    "** means to the power of. 2 ** 3 is 2 × 2 × 2. A single * only multiplies once.",
    ["print(2 ** 3)"],
    "8",
    "Type a command that displays 3 to the power of 2.",
    ["print(3 ** 2)"]
  ),
  lesson(
    25,
    "Numbers",
    "This is how to do one part of a sum first",
    "Parentheses run before the rest of the line. Without them, multiplication happens before addition.",
    ["print((2 + 3) * 4)"],
    "20",
    "Type a command that adds 1 and 5 first, then multiplies the result by 3.",
    ["print((1 + 5) * 3)"]
  ),
  lesson(
    26,
    "Numbers",
    "This is how to multiply a variable in place",
    "*= multiplies the stored number and saves the result back into the same name.",
    ["apples = 3", "apples *= 2", "print(apples)"],
    "6",
    "Start boxes at 5. Multiply them by 3 with *=, then display boxes.",
    ["boxes = 5", "boxes *= 3", "print(boxes)"]
  ),
  lesson(
    27,
    "Numbers",
    "This is how to ask whether a comparison is true",
    "A comparison produces True or False. > means greater than, == means equal, and != means not equal.",
    ["print(10 > 3)", "print(10 == 10)", "print(10 != 4)"],
    "True\nTrue\nTrue",
    "Display whether 4 > 9, whether 4 == 4, and whether 4 != 4, each on its own line.",
    ["print(4 > 9)", "print(4 == 4)", "print(4 != 4)"]
  ),
  lesson(
    28,
    "Numbers",
    "This is how to compare a stored number",
    "The comparison uses the number stored in the variable. >= means greater than or equal to.",
    ["age = 20", "print(age >= 18)"],
    "True",
    "Store 15 in age, then display whether age is at least 18.",
    ["age = 15", "print(age >= 18)"]
  ),
  lesson(
    29,
    "Numbers",
    "This is how to use a decimal number",
    "A number with a decimal point is a float. Multiplying a float by a whole number gives a float, so the result keeps the decimal.",
    ["width = 2.5", "height = 4", "print(width * height)"],
    "10.0",
    "Store 1.5 in width and 2 in height, then display width times height.",
    ["width = 1.5", "height = 2", "print(width * height)"]
  ),
  lesson(
    30,
    "Numbers",
    "This is how to turn text into a whole number",
    "Digits inside quotes are still text. int() turns them into a number so you can do arithmetic.",
    ['text = "21"', "number = int(text)", "print(number + 1)"],
    "22",
    "Store the text 8 in text, turn it into a number, add 2, and display the result.",
    ['text = "8"', "number = int(text)", "print(number + 2)"]
  ),
  lesson(
    31,
    "Text",
    "This is how to count the characters in text",
    "len returns how many characters are in the text. The example word has six characters, so the screen shows 6.",
    ['word = "Python"', "print(len(word))"],
    "6",
    "Store code in word, then display how many characters it has.",
    ['word = "code"', "print(len(word))"]
  ),
  lesson(
    32,
    "Text",
    "This is how to pick one character",
    "Positions start at 0, not 1. Brackets pick one position.",
    ['word = "Python"', "print(word[0])", "print(word[1])"],
    "P\ny",
    "Store Boat in word. Display the first character, then the second character.",
    ['word = "Boat"', "print(word[0])", "print(word[1])"]
  ),
  lesson(
    33,
    "Text",
    "This is how to take a slice of text",
    "A slice keeps a stretch of characters. The start is included. The end is not. The example keeps the first three characters.",
    ['word = "Python"', "print(word[0:3])"],
    "Pyt",
    "Store Garden in word, then display the first four characters.",
    ['word = "Garden"', "print(word[0:4])"]
  ),
  lesson(
    34,
    "Text",
    "This is how to change the case of text",
    "lower() returns small letters. upper() returns capitals. The original text stays as it was.",
    ['word = "Python"', "print(word.lower())", "print(word.upper())"],
    "python\nPYTHON",
    "Store Hello in word. Display it in small letters, then in capitals.",
    ['word = "Hello"', "print(word.lower())", "print(word.upper())"]
  ),
  lesson(
    35,
    "Text",
    "This is how to remove spaces from the ends",
    "strip() returns the text without spaces at the beginning or the end. Spaces in the middle would stay.",
    ['messy = "  hello  "', "print(messy.strip())"],
    "hello",
    "Store the text \"  Bye  \" in messy, including the spaces at both ends. Display it with those end spaces removed.",
    ['messy = "  Bye  "', "print(messy.strip())"]
  ),
  lesson(
    36,
    "Text",
    "This is how to replace part of a text",
    "replace returns a new string. The first piece is swapped for the second. The rest stays the same.",
    ['sentence = "I like tea"', 'print(sentence.replace("tea", "code"))'],
    "I like code",
    "Store I like rain in sentence. Display it with rain replaced by sun.",
    ['sentence = "I like rain"', 'print(sentence.replace("rain", "sun"))']
  ),
  lesson(
    37,
    "Text",
    "This is how to split text into pieces",
    "split cuts at every separator and returns a list. Counting starts at 0, so [0] is the first piece and [2] is the third.",
    ['line = "red,green,blue"', 'parts = line.split(",")', "print(parts[0])", "print(parts[2])"],
    "red\nblue",
    "Split cat,dog,bird on commas. Display the first piece, then the third piece.",
    ['line = "cat,dog,bird"', 'parts = line.split(",")', "print(parts[0])", "print(parts[2])"]
  ),
  lesson(
    38,
    "Text",
    "This is how to join pieces into one text",
    "join places the text before the dot between the items. A comma and a space become the separator.",
    ['words = ["red", "green", "blue"]', 'print(", ".join(words))'],
    "red, green, blue",
    "Join the list one, two, and three with a comma and a space, then display the result.",
    ['words = ["one", "two", "three"]', 'print(", ".join(words))']
  ),
  lesson(
    39,
    "Text",
    "This is how to ask whether text contains a word",
    "in answers True when the smaller text appears inside the larger one. Capitals matter.",
    ['sentence = "I like Python"', 'print("Python" in sentence)', 'print("Java" in sentence)'],
    "True\nFalse",
    "Store I like tea in sentence. Display whether tea is in it, then whether cake is in it.",
    ['sentence = "I like tea"', 'print("tea" in sentence)', 'print("cake" in sentence)']
  ),
  lesson(
    40,
    "Text",
    "This is how to make the first letter a capital",
    "capitalize() returns a new string. The first letter becomes a capital and the other letters become small.",
    ['name = "ada"', "print(name.capitalize())"],
    "Ada",
    "Store sam in name, then display it with the first letter capital.",
    ['name = "sam"', "print(name.capitalize())"]
  ),
  lesson(
    41,
    "Decisions",
    "This is how to run a line only when a test is true",
    "if asks a question. The colon starts the block. The next line is indented by four spaces, and it runs only when the answer is yes.",
    ["score = 80", "if score >= 50:", '    print("Pass")'],
    "Pass",
    "Store 95 in mark. If mark is at least 40, display Yes.",
    ["mark = 95", "if mark >= 40:", '    print("Yes")']
  ),
  lesson(
    42,
    "Decisions",
    "This is how to choose between two paths",
    "else is the path for when the if test is false. Its line is indented too.",
    ["score = 40", "if score >= 50:", '    print("Pass")', "else:", '    print("Try again")'],
    "Try again",
    "Store 12 in temperature. If temperature is below 0, display Cold. Otherwise display Fine.",
    ["temperature = 12", "if temperature < 0:", '    print("Cold")', "else:", '    print("Fine")']
  ),
  lesson(
    43,
    "Decisions",
    "This is how to check a second question",
    "elif is checked only when the earlier if was false. else runs only when every test above it was false.",
    ["score = 85", "if score >= 90:", '    print("Excellent")', "elif score >= 50:", '    print("Pass")', "else:", '    print("Try again")'],
    "Pass",
    "Store 3 in level. If level is at least 5, display High. Else if it is at least 2, display Mid. Otherwise display Low.",
    ["level = 3", "if level >= 5:", '    print("High")', "elif level >= 2:", '    print("Mid")', "else:", '    print("Low")']
  ),
  lesson(
    44,
    "Decisions",
    "This is how to require two things to be true",
    "and is true only when both sides are true. If either side is false, the indented line does not run.",
    ["age = 17", "has_ticket = True", "if age >= 16 and has_ticket:", '    print("You can enter")'],
    "You can enter",
    "Store 21 in age and True in has_ticket. If age is at least 18 and has_ticket is true, display Welcome.",
    ["age = 21", "has_ticket = True", "if age >= 18 and has_ticket:", '    print("Welcome")']
  ),
  lesson(
    45,
    "Decisions",
    "This is how to accept either of two answers",
    "or is true when at least one side is true. One match is enough.",
    ['day = "Sunday"', 'if day == "Saturday" or day == "Sunday":', '    print("Weekend")'],
    "Weekend",
    "Store Friday in today. If today is Friday or Saturday, display Off.",
    ['today = "Friday"', 'if today == "Friday" or today == "Saturday":', '    print("Off")']
  ),
  lesson(
    46,
    "Decisions",
    "This is how to flip a yes-or-no value",
    "not turns True into False and False into True.",
    ["raining = False", "if not raining:", '    print("Go outside")'],
    "Go outside",
    "Store True in raining. If it is not raining, display Go outside. Otherwise display Stay in.",
    ["raining = True", "if not raining:", '    print("Go outside")', "else:", '    print("Stay in")']
  ),
  lesson(
    47,
    "Decisions",
    "This is how empty text fails a test",
    "Empty quotes count as false. Text with any characters counts as true.",
    ['name = ""', "if name:", '    print("Hello, " + name)', "else:", '    print("Hello, stranger")'],
    "Hello, stranger",
    "Store Mira in name. If name has text, display Hello, joined with that name. Otherwise display Hello, stranger.",
    ['name = "Mira"', "if name:", '    print("Hello, " + name)', "else:", '    print("Hello, stranger")']
  ),
  lesson(
    48,
    "Decisions",
    "This is how to run more than one line in a block",
    "Every indented line under the if belongs to the same decision. Both lines run when the test is true.",
    ["temperature = 30", "if temperature > 25:", '    print("Hot")', '    print("Drink water")'],
    "Hot\nDrink water",
    "Store 31 in heat. If heat is above 20, display Warm and then Rest.",
    ["heat = 31", "if heat > 20:", '    print("Warm")', '    print("Rest")']
  ),
  lesson(
    49,
    "Decisions",
    "This is how to use True and False directly",
    "True and False are ready-made values. A variable that already holds one of them can be used as the test.",
    ["logged_in = True", "if logged_in:", '    print("Welcome back")', "else:", '    print("Please sign in")'],
    "Welcome back",
    "Store False in logged_in. If logged_in is true, display Welcome back. Otherwise display Please sign in.",
    ["logged_in = False", "if logged_in:", '    print("Welcome back")', "else:", '    print("Please sign in")']
  ),
  lesson(
    50,
    "Decisions",
    "This is how to pick different text for one special case",
    "The if handles the one special value. else handles every other value. str() turns a number into text so it can be joined.",
    ["points = 3", "if points == 1:", '    print("1 point")', "else:", '    print(str(points) + " points")'],
    "3 points",
    "Store 1 in points. If points is exactly 1, display 1 point. Otherwise display the number joined to the word points.",
    ["points = 1", "if points == 1:", '    print("1 point")', "else:", '    print(str(points) + " points")']
  ),
  lesson(
    51,
    "Loops",
    "This is how to repeat an action for each item",
    "for visits one item at a time. The indented line runs once for each item.",
    ['for fruit in ["apple", "pear", "plum"]:', "    print(fruit)"],
    "apple\npear\nplum",
    "Display each of these on its own line: kiwi, mango, lime.",
    ['for fruit in ["kiwi", "mango", "lime"]:', "    print(fruit)"]
  ),
  lesson(
    52,
    "Loops",
    "This is how to repeat a count",
    "range(3) produces 0, 1, and 2. It stops before 3.",
    ["for number in range(3):", "    print(number)"],
    "0\n1\n2",
    "Use range to display 0, 1, 2, and 3, each on its own line.",
    ["for number in range(4):", "    print(number)"]
  ),
  lesson(
    53,
    "Loops",
    "This is how to start the count at 1",
    "range(start, stop) includes the start and stops before the second number.",
    ["for number in range(1, 4):", "    print(number)"],
    "1\n2\n3",
    "Use range to display 2, 3, and 4, each on its own line.",
    ["for number in range(2, 5):", "    print(number)"]
  ),
  lesson(
    54,
    "Loops",
    "This is how to add up a list",
    "total starts at 0. Each visit adds the current number. The print is not indented, so it runs once after the loop.",
    ["total = 0", "for number in [4, 5, 6]:", "    total = total + number", "print(total)"],
    "15",
    "Start total at 0. Add each of 1, 2, and 3. After the loop, display total.",
    ["total = 0", "for number in [1, 2, 3]:", "    total = total + number", "print(total)"]
  ),
  lesson(
    55,
    "Loops",
    "This is how to walk through each character",
    "A for loop can visit a string one character at a time.",
    ['word = "cat"', "for letter in word:", "    print(letter)"],
    "c\na\nt",
    "Store hi in word, then display each character on its own line.",
    ['word = "hi"', "for letter in word:", "    print(letter)"]
  ),
  lesson(
    56,
    "Loops",
    "This is how to repeat while a test stays true",
    "while checks its test before every visit. Something inside must change, or the loop will not end. A line after the loop runs once.",
    ["count = 3", "while count > 0:", "    print(count)", "    count = count - 1", 'print("Go")'],
    "3\n2\n1\nGo",
    "Start count at 2. While count is greater than 0, display it and then subtract 1. After the loop, display Go.",
    ["count = 2", "while count > 0:", "    print(count)", "    count = count - 1", 'print("Go")']
  ),
  lesson(
    57,
    "Loops",
    "This is how to print only some of the numbers",
    "A test inside the loop can decide which visits display something. number % 2 == 0 is true for even numbers.",
    ["for number in range(1, 6):", "    if number % 2 == 0:", "        print(number)"],
    "2\n4",
    "For numbers from 1 up to but not including 7, display the number when it is even.",
    ["for number in range(1, 7):", "    if number % 2 == 0:", "        print(number)"]
  ),
  lesson(
    58,
    "Loops",
    "This is how to get the position and the item",
    "enumerate pairs each item with its position, starting at 0. print places a space between the two values.",
    ['names = ["Ada", "Grace"]', "for index, name in enumerate(names):", "    print(index, name)"],
    "0 Ada\n1 Grace",
    "For the list Sam, Lin, display the position and the name on each line.",
    ['names = ["Sam", "Lin"]', "for index, name in enumerate(names):", "    print(index, name)"]
  ),
  lesson(
    59,
    "Loops",
    "This is how to stop a loop early",
    "break leaves the loop immediately. Lines after break in that visit do not run, and later numbers are not visited.",
    ["for number in range(5):", "    if number == 3:", "        break", "    print(number)"],
    "0\n1\n2",
    "For numbers from 0 up to but not including 6, stop when the number is 4, before printing it.",
    ["for number in range(6):", "    if number == 4:", "        break", "    print(number)"]
  ),
  lesson(
    60,
    "Loops",
    "This is how to skip one turn of a loop",
    "continue jumps to the next item. The loop itself keeps going.",
    ["for number in range(4):", "    if number == 2:", "        continue", "    print(number)"],
    "0\n1\n3",
    "For numbers from 0 up to but not including 5, skip 1 and display the others.",
    ["for number in range(5):", "    if number == 1:", "        continue", "    print(number)"]
  ),
  lesson(
    61,
    "Lists",
    "This is how to read the first and last item",
    "A list keeps items in order inside square brackets. [0] is the first item. [-1] is the last item.",
    ['colors = ["red", "green", "blue"]', "print(colors[0])", "print(colors[-1])"],
    "red\nblue",
    "From the list up, mid, down, display the first item and then the last item.",
    ['items = ["up", "mid", "down"]', "print(items[0])", "print(items[-1])"]
  ),
  lesson(
    62,
    "Lists",
    "This is how to add an item to the end",
    "append adds one item at the end. When a whole list is displayed, Python shows square brackets and single quotes around the text.",
    ['colors = ["red", "green"]', 'colors.append("blue")', "print(colors)"],
    "['red', 'green', 'blue']",
    "Start colors with gold and silver. Add bronze to the end, then display the list.",
    ['colors = ["gold", "silver"]', 'colors.append("bronze")', "print(colors)"]
  ),
  lesson(
    63,
    "Lists",
    "This is how to remove an item by its value",
    "remove deletes the first item equal to the value you give. The other items stay in the same order.",
    ['colors = ["red", "green", "blue"]', 'colors.remove("green")', "print(colors)"],
    "['red', 'blue']",
    "Start with gold, silver, and bronze. Remove silver, then display the list.",
    ['colors = ["gold", "silver", "bronze"]', 'colors.remove("silver")', "print(colors)"]
  ),
  lesson(
    64,
    "Lists",
    "This is how to count the items in a list",
    "len on a list counts items, not characters inside those items.",
    ['colors = ["red", "green", "blue"]', "print(len(colors))"],
    "3",
    "Store a and b in a list called items, then display how many items it has.",
    ['items = ["a", "b"]', "print(len(items))"]
  ),
  lesson(
    65,
    "Lists",
    "This is how to ask whether a list contains an item",
    "in looks through the list for an equal value. It does not change the list.",
    ['colors = ["red", "green", "blue"]', 'print("green" in colors)'],
    "True",
    "Store oak and pine in a list called trees. Display whether pine is in the list.",
    ['trees = ["oak", "pine"]', 'print("pine" in trees)']
  ),
  lesson(
    66,
    "Lists",
    "This is how to sort a list in place",
    "sort() rearranges the same list from smallest to largest. It does not hand back a new list.",
    ["scores = [3, 1, 2]", "scores.sort()", "print(scores)"],
    "[1, 2, 3]",
    "Store 8, 2, and 5 in scores. Sort that same list, then display it.",
    ["scores = [8, 2, 5]", "scores.sort()", "print(scores)"]
  ),
  lesson(
    67,
    "Lists",
    "This is how to find the smallest, largest, and total",
    "min returns the smallest item, max returns the largest, and sum adds the numbers. None of these change the list.",
    ["scores = [4, 7, 7, 2]", "print(min(scores))", "print(max(scores))", "print(sum(scores))"],
    "2\n7\n20",
    "For the list 9, 1, 3, display the smallest, then the largest, then the total.",
    ["scores = [9, 1, 3]", "print(min(scores))", "print(max(scores))", "print(sum(scores))"]
  ),
  lesson(
    68,
    "Lists",
    "This is how to copy a list before changing it",
    "[:] makes a new list with the same items. Changing the copy does not change the original.",
    ['names = ["Ada", "Grace"]', "copy = names[:]", 'copy.append("Lin")', "print(names)", "print(copy)"],
    "['Ada', 'Grace']\n['Ada', 'Grace', 'Lin']",
    "Store Sam and Lin in names. Copy the list. Add Max to the copy only. Display names, then the copy.",
    ['names = ["Sam", "Lin"]', "copy = names[:]", 'copy.append("Max")', "print(names)", "print(copy)"]
  ),
  lesson(
    69,
    "Lists",
    "This is how to read an item inside a list of lists",
    "The first pair of brackets picks an inner list. The second pair picks an item inside that list.",
    ["row = [1, 2]", "grid = [row, [3, 4]]", "print(grid[1][0])"],
    "3",
    "Make row hold 8 and 9. Make grid hold row and then 6 and 7. Display the first item of the second inner list.",
    ["row = [8, 9]", "grid = [row, [6, 7]]", "print(grid[1][0])"]
  ),
  lesson(
    70,
    "Lists",
    "This is how to get a sorted copy",
    "sorted() returns a new list and leaves the original in its old order.",
    ['words = ["pear", "apple", "plum"]', "ordered = sorted(words)", "print(ordered)", "print(words)"],
    "['apple', 'pear', 'plum']\n['pear', 'apple', 'plum']",
    "Store fig, date, and kiwi in words. Save a sorted copy in ordered. Display ordered, then words.",
    ['words = ["fig", "date", "kiwi"]', "ordered = sorted(words)", "print(ordered)", "print(words)"]
  ),
  lesson(
    71,
    "Functions",
    "This is how to define a function and call it",
    "def saves the indented steps. Those steps do not run until a later line calls the function.",
    ["def greet():", '    print("Hello")', "greet()"],
    "Hello",
    "Define a function called wave that displays Hi. Then call wave.",
    ["def wave():", '    print("Hi")', "wave()"]
  ),
  lesson(
    72,
    "Functions",
    "This is how to pass information into a function",
    "The name inside the parentheses waits for a value. The call fills that name for this one run.",
    ["def greet(name):", '    print("Hello, " + name)', 'greet("Ada")'],
    "Hello, Ada",
    "Define greet so it displays Bye, joined with the name it receives. Call it with Sam.",
    ["def greet(name):", '    print("Bye, " + name)', 'greet("Sam")']
  ),
  lesson(
    73,
    "Functions",
    "This is how to send a value back",
    "return hands a value back to the caller and leaves the function. The caller can save that value and display it.",
    ["def add(a, b):", "    return a + b", "result = add(2, 5)", "print(result)"],
    "7",
    "Define add so it returns the sum of a and b. Save add(3, 4) in result and display result.",
    ["def add(a, b):", "    return a + b", "result = add(3, 4)", "print(result)"]
  ),
  lesson(
    74,
    "Functions",
    "This is how to give a parameter a default",
    "A default is used when the caller does not supply that value. A supplied value replaces the default.",
    ["def greet(name=\"friend\"):", '    print("Hello, " + name)', "greet()", 'greet("Ada")'],
    "Hello, friend\nHello, Ada",
    "Define greet with a default name of friend, and make it display Hi, joined with the name. Call greet() with nothing, then call greet with Sam.",
    ["def greet(name=\"friend\"):", '    print("Hi, " + name)', "greet()", 'greet("Sam")']
  ),
  lesson(
    75,
    "Functions",
    "This is how to repeat text with a parameter",
    "Multiplying text repeats it. The function receives the text and how many times to repeat it.",
    ["def line(word, times):", "    print(word * times)", 'line("-", 4)'],
    "----",
    "Define line so it displays word repeated times times. Call line with a star and 3.",
    ["def line(word, times):", "    print(word * times)", 'line("*", 3)']
  ),
  lesson(
    76,
    "Functions",
    "This is how a function can answer True or False",
    "The function returns the comparison. The print calls outside the function display those answers.",
    ["def is_even(number):", "    return number % 2 == 0", "print(is_even(4))", "print(is_even(5))"],
    "True\nFalse",
    "Define is_even so it returns whether a number divides by 2 with nothing left over. Display is_even(6), then is_even(7).",
    ["def is_even(number):", "    return number % 2 == 0", "print(is_even(6))", "print(is_even(7))"]
  ),
  lesson(
    77,
    "Functions",
    "This is how a function can loop over a list",
    "The parameter receives the whole list. The loop adds each item, and return sends the total back.",
    ["def total(numbers):", "    result = 0", "    for number in numbers:", "        result = result + number", "    return result", "print(total([2, 3, 4]))"],
    "9",
    "Define total so it adds up a list and returns the sum. Display total of 5 and 5.",
    ["def total(numbers):", "    result = 0", "    for number in numbers:", "        result = result + number", "    return result", "print(total([5, 5]))"]
  ),
  lesson(
    78,
    "Functions",
    "This is how to name the arguments at the call",
    "At the call you can fill parameters by name, in any order.",
    ["def label(name, score):", '    return f"{name}: {score}"', 'print(label(score=10, name="Ada"))'],
    "Ada: 10",
    "Define label(name, score) so it returns an f-string of the name, a colon, a space, and the score. Display label with score 4 and name Sam, named in that order.",
    ["def label(name, score):", '    return f"{name}: {score}"', 'print(label(score=4, name="Sam"))']
  ),
  lesson(
    79,
    "Functions",
    "This is how to use a result inside another call",
    "Python works out the inside call first, then uses that result as the argument to the outside call.",
    ["def double(number):", "    return number * 2", "print(double(double(3)))"],
    "12",
    "Define triple so it returns the number times 3. Display triple of triple of 2.",
    ["def triple(number):", "    return number * 3", "print(triple(triple(2)))"]
  ),
  lesson(
    80,
    "Functions",
    "This is how a function can print several lines",
    "Every indented print belongs to the function. One call runs them from top to bottom.",
    ["def banner(text):", '    print("***")', "    print(text)", '    print("***")', 'banner("Hi")'],
    "***\nHi\n***",
    "Define banner so it displays three dashes, then the text, then three dashes. Call it with Go.",
    ["def banner(text):", '    print("---")', "    print(text)", '    print("---")', 'banner("Go")']
  ),
  lesson(
    81,
    "Dictionaries",
    "This is how to store a value under a label",
    "A dictionary pairs each key with a value. You look up the key, not a position.",
    ['person = {"name": "Ada", "city": "London"}', 'print(person["name"])'],
    "Ada",
    "Make a dictionary called person with name set to Sam and city set to Rome. Display the name.",
    ['person = {"name": "Sam", "city": "Rome"}', 'print(person["name"])']
  ),
  lesson(
    82,
    "Dictionaries",
    "This is how to add a new pair",
    "Using a key that is not there yet adds a new pair.",
    ['person = {"name": "Ada"}', 'person["city"] = "London"', 'print(person["city"])'],
    "London",
    "Start person as a dictionary whose name is Sam. Add the key job with the value cook. Display the job.",
    ['person = {"name": "Sam"}', 'person["job"] = "cook"', 'print(person["job"])']
  ),
  lesson(
    83,
    "Dictionaries",
    "This is how to change a value that is already stored",
    "Using a key that already exists replaces its value. The key stays.",
    ['person = {"name": "Ada", "city": "London"}', 'person["city"] = "Paris"', 'print(person["city"])'],
    "Paris",
    "Start person with name Sam and city Rome. Change the city to Oslo, then display the city.",
    ['person = {"name": "Sam", "city": "Rome"}', 'person["city"] = "Oslo"', 'print(person["city"])']
  ),
  lesson(
    84,
    "Dictionaries",
    "This is how to ask whether a key exists",
    "in on a dictionary checks the keys, not the values.",
    ['person = {"name": "Ada", "city": "London"}', 'print("city" in person)', 'print("age" in person)'],
    "True\nFalse",
    "For a dictionary with name Sam and job cook, display whether job is a key, then whether age is a key.",
    ['person = {"name": "Sam", "job": "cook"}', 'print("job" in person)', 'print("age" in person)']
  ),
  lesson(
    85,
    "Dictionaries",
    "This is how to walk through every pair",
    "A for loop over a dictionary visits the keys in the order they were added. The value is read with the key.",
    ['person = {"name": "Ada", "score": 10}', "for key in person:", "    print(key)", "    print(person[key])"],
    "name\nAda\nscore\n10",
    "For a dictionary with item tea and price 4, display each key and then its value.",
    ['info = {"item": "tea", "price": 4}', "for key in info:", "    print(key)", "    print(info[key])"]
  ),
  lesson(
    86,
    "Dictionaries",
    "This is how to look up a key that might be missing",
    "get returns the second argument when the key is missing, instead of stopping the program.",
    ['scores = {"Ada": 10, "Grace": 8}', 'print(scores.get("Lin", 0))'],
    "0",
    "For a dictionary with Sam 5 and Lin 3, display the result of looking up Max with a default of 0.",
    ['scores = {"Sam": 5, "Lin": 3}', 'print(scores.get("Max", 0))']
  ),
  lesson(
    87,
    "Dictionaries",
    "This is how to increase a number stored in a dictionary",
    "Read the current number, add to it, and save the result back under the same key.",
    ['scores = {"Ada": 10}', 'scores["Ada"] = scores["Ada"] + 1', 'print(scores["Ada"])'],
    "11",
    "Start scores with Sam set to 5. Add 2 to Sam's score, then display it.",
    ['scores = {"Sam": 5}', 'scores["Sam"] = scores["Sam"] + 2', 'print(scores["Sam"])']
  ),
  lesson(
    88,
    "Dictionaries",
    "This is how to count how many times each word appears",
    "The dictionary starts empty. For each word, get the current count, or 0 if it is new, then add 1.",
    ['words = ["tea", "tea", "code"]', "counts = {}", "for word in words:", "    counts[word] = counts.get(word, 0) + 1", 'print(counts["tea"])', 'print(counts["code"])'],
    "2\n1",
    "Count the words sun, sun, sun, and rain. Display the count for sun, then the count for rain.",
    ['words = ["sun", "sun", "sun", "rain"]', "counts = {}", "for word in words:", "    counts[word] = counts.get(word, 0) + 1", 'print(counts["sun"])', 'print(counts["rain"])']
  ),
  lesson(
    89,
    "Dictionaries",
    "This is how to delete a pair",
    "del removes the key and its value. A later membership test can show that the key is gone.",
    ['person = {"name": "Ada", "city": "London"}', 'del person["city"]', 'print("city" in person)'],
    "False",
    "Start person with name Sam and job cook. Delete job. Display whether job is still a key.",
    ['person = {"name": "Sam", "job": "cook"}', 'del person["job"]', 'print("job" in person)']
  ),
  lesson(
    90,
    "Dictionaries",
    "This is how to combine two dictionaries",
    "The | operator builds a new dictionary with the pairs from both sides. It does not change the original two.",
    ['user = {"name": "Ada"}', 'settings = {"theme": "dark"}', "profile = user | settings", 'print(profile["name"])', 'print(profile["theme"])'],
    "Ada\ndark",
    "Combine a dictionary whose name is Sam with a dictionary whose lang is en. Display the name, then the lang.",
    ['user = {"name": "Sam"}', 'settings = {"lang": "en"}', "profile = user | settings", 'print(profile["name"])', 'print(profile["lang"])']
  ),
  lesson(
    91,
    "Building programs",
    "This is how to store a pair that should not change",
    "A tuple keeps items in order and is written with parentheses. You read an item by its position.",
    ["point = (3, 4)", "print(point[0])", "print(point[1])"],
    "3\n4",
    "Store the pair 8, 1 in point. Display the first item, then the second item.",
    ["point = (8, 1)", "print(point[0])", "print(point[1])"]
  ),
  lesson(
    92,
    "Building programs",
    "This is how to unpack a pair into two names",
    "Two names on the left receive the two values on the right, in order.",
    ["x, y = (3, 4)", "print(x)", "print(y)"],
    "3\n4",
    "Unpack the pair 9, 2 into a and b. Display a, then b.",
    ["a, b = (9, 2)", "print(a)", "print(b)"]
  ),
  lesson(
    93,
    "Building programs",
    "This is how a set keeps each value once",
    "A set drops duplicates. len then counts the values that remain.",
    ['tags = {"python", "code", "python"}', "print(len(tags))"],
    "2",
    "Make a set called tags that contains red, blue, and red again. Display how many items it keeps.",
    ['tags = {"red", "blue", "red"}', "print(len(tags))"]
  ),
  lesson(
    94,
    "Building programs",
    "This is how to add to a set",
    "add puts a value into the set. If that value is already there, the set does not grow.",
    ['tags = {"python", "code"}', 'tags.add("loops")', 'print("loops" in tags)'],
    "True",
    "Start tags with red and blue. Add green. Display whether green is in the set.",
    ['tags = {"red", "blue"}', 'tags.add("green")', 'print("green" in tags)']
  ),
  lesson(
    95,
    "Building programs",
    "This is how to read a line that a person types",
    "input displays its prompt and waits. The typed line comes back as text. In the example, the person types Ada, and the program then displays Hello, Ada.",
    ['name = input("Name: ")', 'print("Hello, " + name)'],
    "Name: Ada\nHello, Ada",
    "Ask with the prompt City: and store the answer in city. Then display Visit, joined with a space and that city. You type the program, not a sample conversation.",
    ['city = input("City: ")', 'print("Visit " + city)']
  ),
  lesson(
    96,
    "Building programs",
    "This is how to read a number that a person types",
    "input always returns text. int() turns digits into a number so arithmetic works. In the example, the person types 20 and the program displays 21.",
    ['age_text = input("Age: ")', "age = int(age_text)", "print(age + 1)"],
    "Age: 20\n21",
    "Ask with the prompt Year: and store the answer in year_text. Turn it into a number called year, then display that number plus 10.",
    ['year_text = input("Year: ")', "year = int(year_text)", "print(year + 10)"]
  ),
  lesson(
    97,
    "Building programs",
    "This is how the program continues after bad text",
    "try watches a block that might fail. except runs instead of stopping the program when the named error happens.",
    ["try:", '    print(int("hello"))', "except ValueError:", '    print("That was not a whole number")'],
    "That was not a whole number",
    "Try to display int of the text 12. If that fails with ValueError, display That was not a whole number.",
    ["try:", '    print(int("12"))', "except ValueError:", '    print("That was not a whole number")']
  ),
  lesson(
    98,
    "Building programs",
    "This is how to save text and read it back",
    "write_text saves text into a file. read_text brings that text back, and print displays it.",
    ["from pathlib import Path", 'Path("note.txt").write_text("Remember this")', 'print(Path("note.txt").read_text())'],
    "Remember this",
    "Save the text Bring a pen into a file called list.txt, read it back, and display it.",
    ["from pathlib import Path", 'Path("list.txt").write_text("Bring a pen")', 'print(Path("list.txt").read_text())']
  ),
  lesson(
    99,
    "Building programs",
    "This is how to use a tool from the math module",
    "import loads tools that are not available at the start. math.sqrt returns a square root as a decimal number.",
    ["import math", "print(math.sqrt(16))"],
    "4.0",
    "Import math and display the square root of 9.",
    ["import math", "print(math.sqrt(9))"]
  ),
  lesson(
    100,
    "Building programs",
    "This is how to make a simple object",
    "class describes a kind of object. A method is a function that belongs to it. self is the object itself and is filled in automatically.",
    ["class Greeter:", "    def hello(self, name):", '        return "Hello, " + name', "bot = Greeter()", 'print(bot.hello("Ada"))'],
    "Hello, Ada",
    "Define Greeter with a hello method that returns Bye, joined with the name. Make an object called bot and display bot.hello with Sam.",
    ["class Greeter:", "    def hello(self, name):", '        return "Bye, " + name', "bot = Greeter()", 'print(bot.hello("Sam"))']
  )
];

// One card at a time. Older saves are read and never written.

const PRACTICE_KEY = "pythonPractice.v1";
const ACADEMY_KEY = "jarvisAcademy.v1";
const RECALL_KEYS = ["pythonRecall.v3", "pythonRecall.v2", "pythonRecall.v1"];
const FLASH_KEY = "pythonFlashcards.v1";

const view = { more: false, sheet: false, topic: "", result: null };
let progress = freshProgress();
let legacy = { streaks: {}, flash: "" };
let academy = { checks: {}, drafts: {}, early: false };

function browserStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (error) {
    return null;
  }
}

function freshProgress() {
  return { version: 1, place: "", pathPlace: "s1", done: {}, drafts: {}, hints: {}, early: false };
}

function plainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}

function loadProgress() {
  const store = browserStorage();
  const raw = store ? store.getItem(PRACTICE_KEY) : null;
  if (!raw) return freshProgress();
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("shape");
    const next = freshProgress();
    next.place = typeof data.place === "string" ? data.place : "";
    next.pathPlace = typeof data.pathPlace === "string" && data.pathPlace ? data.pathPlace : "s1";
    next.done = plainObject(data.done);
    next.drafts = plainObject(data.drafts);
    next.hints = plainObject(data.hints);
    next.early = Boolean(data.early);
    return next;
  } catch (error) {
    try {
      if (store && !store.getItem(PRACTICE_KEY + ".unreadable")) {
        store.setItem(PRACTICE_KEY + ".unreadable", raw);
      }
    } catch (ignored) {
      ignored;
    }
    return freshProgress();
  }
}

function saveProgress() {
  const store = browserStorage();
  if (store) store.setItem(PRACTICE_KEY, JSON.stringify(progress));
}

function loadLegacy() {
  const streaks = {};
  RECALL_KEYS.forEach((key) => {
    try {
      const store = browserStorage();
      const data = JSON.parse((store && store.getItem(key)) || "null");
      const box = data && data.streaks;
      if (!box || typeof box !== "object") return;
      Object.keys(box).forEach((id) => {
        streaks[id] = Math.max(streaks[id] || 0, Number(box[id]) || 0);
      });
    } catch (error) {
      streaks.kept = true;
    }
  });
  let flash = "";
  try {
    const store = browserStorage();
    const raw = store ? store.getItem(FLASH_KEY) : null;
    if (raw) {
      const data = JSON.parse(raw);
      const box = data && typeof data === "object" ? (data.cards || data.progress || data) : null;
      const count = box && typeof box === "object" ? Object.keys(box).length : 0;
      flash = count
        ? count + " older flashcard entries stay saved in this browser."
        : "An older flashcard save stays in this browser.";
    }
  } catch (error) {
    flash = "An older flashcard save stays in this browser.";
  }
  return { streaks: streaks, flash: flash };
}

function loadAcademy() {
  const empty = { checks: {}, drafts: {}, early: false };
  const store = browserStorage();
  if (!store) return empty;
  try {
    const data = JSON.parse(store.getItem(ACADEMY_KEY) || "null");
    if (!data || typeof data !== "object" || Array.isArray(data)) return empty;
    return {
      checks: data.checks && typeof data.checks === "object" ? data.checks : {},
      drafts: data.drafts && typeof data.drafts === "object" ? data.drafts : {},
      early: Boolean(data.earlySetsMarked)
    };
  } catch (error) {
    return empty;
  }
}

function academyPassed(id) {
  const item = academy.checks[id];
  return Boolean(item && (item.status === "built" || item.status === "skipped"));
}

function isDone(id) {
  if (progress.done[id]) return true;
  const mapped = { s1: "m1-input", s2: "m1-reply", s4: "m1-exit", s5: "m1-build", s6: "m1-debug" }[id];
  if (mapped && academyPassed(mapped)) return true;
  if (id.charAt(0) === "r") {
    const number = Number(id.slice(1));
    if ((progress.early || academy.early) && number <= 30) return true;
    if ((Number(legacy.streaks[String(number)]) || 0) >= 2) return true;
    if (academyPassed("p" + number)) return true;
  }
  return false;
}

function draftOf(id) {
  if (typeof progress.drafts[id] === "string") return progress.drafts[id];
  const mapped = { s1: "m1-input", s2: "m1-reply", s4: "m1-exit", s5: "m1-build", s6: "m1-debug" }[id];
  if (mapped && typeof academy.drafts[mapped] === "string") return academy.drafts[mapped];
  if (id.charAt(0) === "r" && typeof academy.drafts["p" + id.slice(1)] === "string") {
    return academy.drafts["p" + id.slice(1)];
  }
  return "";
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[ch]));
}

function normalize(code) {
  return String(code).replace(/\r\n/g, "\n").replace(/\t/g, "    ").split("\n").map((line) => line.trimEnd()).join("\n").trim();
}

function stripComments(code) {
  return normalize(code).split("\n").map((line) => {
    let quotes = 0;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === "\"" || ch === "'") quotes += 1;
      if (ch === "#" && quotes % 2 === 0) return line.slice(0, i);
    }
    return line;
  }).join("\n");
}

function fail(text) {
  return { ok: false, text: text };
}

function pass(text) {
  return { ok: true, text: text };
}

function copiedExample(code, example) {
  if (!example) return false;
  return normalize(code).replace(/'/g, "\"") === normalize(example).replace(/'/g, "\"");
}

function checkInput(code) {
  const n = stripComments(code);
  if (!n) return fail("Write the line first.");
  if (/title\s*=\s*input/i.test(n) || copiedExample(code, "title = input(\"Title: \")")) {
    return fail("That copies the example. Store the line in command.");
  }
  if (!/command\s*=\s*input\s*\(\s*["']You: ["']\s*\)(?:\.strip\(\s*\))?/.test(n)) {
    if (!/command\s*=/.test(n)) return fail("Store the result in command.");
    if (!/input\s*\(/.test(n)) return fail("Call input to read the line.");
    return fail("The prompt should be You: with a space before the quote ends.");
  }
  return pass("You can read a command. JARVIS asks this every turn. Python was not run.");
}

function checkReply(code) {
  const n = stripComments(code);
  if (!n) return fail("Write the test first.");
  if (/password|Door unlocked/i.test(n)) return fail("That copies the door. Test command, and answer as JARVIS.");
  if (!/if\s+command(?:\.strip\(\s*\))?(?:\.lower\(\s*\))?\s*==\s*["']hello["']\s*:/.test(n)) {
    return fail("Use if, compare command with hello, and end that line with a colon.");
  }
  if (!/At your service/.test(n)) return fail("The reply should include At your service.");
  if (!/^[ \t]+print/m.test(n)) return fail("Indent the print line with four spaces.");
  return pass("You can answer hello. JARVIS uses if to choose a reply. Python was not run.");
}

function checkExit(code) {
  const n = stripComments(code);
  if (!n) return fail("Write the exit test first.");
  if (/Survey closed|answer\.lower/.test(n)) return fail("That copies the survey. Test command, and say Goodbye.");
  if (!/\.lower\s*\(\s*\)/.test(n) || !/["']exit["']/.test(n)) return fail("Compare command.lower() with exit.");
  if (!/Goodbye/.test(n)) return fail("Print a line that includes Goodbye.");
  if (!/^[ \t]+break/m.test(n)) return fail("Indent break under the exit test. Printing goodbye does not stop a loop.");
  return pass("You can stop the loop. JARVIS uses break when the person says exit. Python was not run.");
}

function checkLoop(code) {
  const n = stripComments(code);
  if (!n) return fail("Write the loop first.");
  if (/Order:|Noted|Closed/.test(n)) return fail("That copies the cafe. Use You: and JARVIS replies.");
  if (!/while\s+True\s*:/.test(n)) return fail("Start with while True:.");
  if (!/command\s*=\s*input\s*\(\s*["']You: ["']\s*\)(?:\.strip\(\s*\))?/.test(n)) return fail("Inside the loop, ask with You: and store command.");
  if (!/\.lower\s*\(\s*\)/.test(n) || !/["']exit["']/.test(n)) return fail("Match exit with .lower(), so Exit counts too.");
  if (!/Goodbye/.test(n) || !/^[ \t]+break/m.test(n)) return fail("On exit, print Goodbye and indent break under that test.");
  if (!/["']hello["']/.test(n) || !/At your service/.test(n)) return fail("On hello, print At your service.");
  if (!/\belse\b/.test(n) || !/I heard you/.test(n)) return fail("Use else to print JARVIS: I heard you.");
  return pass("You have the basic loop. Python was not run.");
}

function checkReplyFn(code) {
  const n = stripComments(code);
  if (!n) return fail("Write the function first.");
  if (/def\s+label\s*\(|Item:/.test(n)) return fail("That copies the label. Define reply, and return JARVIS lines.");
  if (!/def\s+reply\s*\(\s*command\s*\)\s*:/.test(n)) return fail("Define reply(command), and end that line with a colon.");
  if (!/^[ \t]+return/m.test(n)) return fail("Indent return under the function.");
  if (!/\.lower\s*\(\s*\)/.test(n) || !/["']hello["']/.test(n)) return fail("Test command.lower() against hello.");
  if (!/At your service/.test(n)) return fail("Return a line that includes At your service.");
  if (!/\belse\b/.test(n) || !/I heard you/.test(n)) return fail("Use else to return JARVIS: I heard you.");
  return pass("You can return a reply. The loop can print reply(command). Python was not run.");
}

function checkChoice(picked, answer, wrong, success) {
  if (!picked) return fail("Choose one.");
  if (picked !== answer) return fail(wrong);
  return pass(success);
}

function reviewCheck(code, lesson) {
  const got = normalize(code).replace(/'/g, "\"");
  if (!got) return fail("Write the task first.");
  if (got === normalize(lesson.example).replace(/'/g, "\"")) return fail("That copies the example. Use the words in the task.");
  const need = normalize(lesson.code).replace(/'/g, "\"");
  if (got === need) return pass("That matches. Python was not run.");
  const gotLines = got.split("\n");
  const needLines = need.split("\n");
  const length = Math.max(gotLines.length, needLines.length);
  for (let i = 0; i < length; i += 1) {
    if (gotLines[i] !== needLines[i]) return fail("Line " + (i + 1) + " does not match the task yet.");
  }
  return fail("Not the task yet.");
}

function reviewHints(lesson) {
  const lines = lesson.code.split("\n");
  const word = lines[0].split(/[\s(]/)[0];
  return [
    "Use the words in the task. The example uses different ones.",
    "You need " + lines.length + (lines.length === 1 ? " line." : " lines."),
    "Start with " + word + "."
  ];
}

function lines(list) {
  return list.join("\n");
}

const STEPS = [
  {
    id: "s1",
    kind: "write",
    kicker: "Reading input",
    title: "Read a command",
    explain: "input() reads one line from the person. Store that line in a variable.",
    more: "The words in quotes are the prompt. They are shown first. The variable receives what the person types.",
    example: "title = input(\"Title: \")",
    exampleNote: "A library desk. Your prompt asks for a command.",
    task: "Store the line in command. The prompt is You: with a space before the quote ends.",
    hints: [
      "The variable is command, not title.",
      "Call input, and put the prompt in quotes.",
      "command = input(\"You: \")"
    ],
    learned: "You can read a command.",
    check: checkInput
  },
  {
    id: "s2",
    kind: "write",
    kicker: "Decisions",
    title: "Answer hello",
    explain: "if runs the indented line only when the test is true. End the test with a colon.",
    more: "Four spaces show that the next line belongs to the if.",
    example: lines(["if password == \"open\":", "    print(\"Door unlocked\")"]),
    exampleNote: "A door, not the assistant.",
    task: "If command is hello, print JARVIS: At your service.",
    hints: [
      "Compare command with hello.",
      "End the if line with a colon, then indent print.",
      "The printed text includes At your service."
    ],
    learned: "You can answer hello.",
    check: checkReply
  },
  {
    id: "s3",
    kind: "choice",
    kicker: "Predict",
    title: "Which line prints?",
    explain: "else runs when the if test is false. Only one branch prints.",
    example: lines([
      "command = \"hello\"",
      "if command == \"exit\":",
      "    print(\"Goodbye\")",
      "else:",
      "    print(\"Still here\")"
    ]),
    exampleNote: "Read this. What appears?",
    choices: ["Goodbye", "Still here", "Both lines"],
    answer: "Still here",
    hints: [
      "command is hello.",
      "The if looks for exit.",
      "else prints Still here."
    ],
    learned: "else is the backup reply.",
    wrong: "Only one branch runs.",
    success: "else is the backup. JARVIS uses it for a command it does not know."
  },
  {
    id: "s4",
    kind: "write",
    kicker: "Loops",
    title: "Leave the loop",
    explain: "break leaves a loop. .lower() lets Exit and EXIT match exit.",
    more: "A goodbye message does not stop the loop by itself.",
    example: lines([
      "if answer.lower() == \"n\":",
      "    print(\"Survey closed\")",
      "    break"
    ]),
    exampleNote: "A survey. Yours looks for exit.",
    task: "If command.lower() is exit, print JARVIS: Goodbye. and then break.",
    hints: [
      "Call .lower() on command.",
      "Print a line that includes Goodbye.",
      "Put break on the next indented line."
    ],
    learned: "You can stop the loop.",
    check: checkExit
  },
  {
    id: "s5",
    kind: "write",
    kicker: "Build",
    title: "The assistant",
    explain: "Ask, answer, then ask again, until the person says exit.",
    more: "Indent the lines inside the loop. Indent again inside if, elif, and else.",
    example: lines([
      "while True:",
      "    item = input(\"Order: \")",
      "    if item == \"done\":",
      "        print(\"Closed\")",
      "        break",
      "    else:",
      "        print(\"Noted\")"
    ]),
    exampleNote: "A cafe closes. Your loop is the assistant.",
    task: "Prompt with You: . exit in any caps prints JARVIS: Goodbye. and breaks. hello prints JARVIS: At your service. Anything else prints JARVIS: I heard you.",
    hints: [
      "Start with while True: and read command inside it.",
      "The exit branch needs .lower() and break.",
      "Use else for JARVIS: I heard you."
    ],
    learned: "You have the basic command loop.",
    after: "To see it, save this as assistant.py and run python assistant.py on your computer. Leave main.py alone.",
    check: checkLoop
  },
  {
    id: "s6",
    kind: "write",
    kicker: "Debugging",
    title: "Fix the loop",
    explain: "Exit will not match Exit, and the last print runs every time.",
    more: "Use .lower() and break for exit. Answer hello. Put the other reply under else.",
    task: "Change the code so those two bugs are gone, and hello gets an answer.",
    seed: lines([
      "while True:",
      "    command = input(\"You: \")",
      "    if command == \"exit\":",
      "        print(\"JARVIS: Goodbye.\")",
      "    print(\"JARVIS: I heard you.\")"
    ]),
    hints: [
      "command == \"exit\" misses Exit. Call .lower().",
      "break has to be indented under the exit test.",
      "The fallback belongs under else, after a hello branch."
    ],
    learned: "You can repair the stop and the fallback.",
    check: checkLoop
  },
  {
    id: "s7",
    kind: "choice",
    kicker: "Predict",
    title: "Two turns",
    explain: "Capitals matter on a test that does not use .lower().",
    example: lines([
      "while True:",
      "    command = input(\"You: \")",
      "    if command.lower() == \"exit\":",
      "        print(\"JARVIS: Goodbye.\")",
      "        break",
      "    elif command == \"hello\":",
      "        print(\"JARVIS: At your service.\")",
      "    else:",
      "        print(\"JARVIS: I heard you.\")"
    ]),
    exampleNote: "The person types Hello, then exit.",
    choices: [
      "At your service, then Goodbye",
      "I heard you, then Goodbye",
      "Only Goodbye"
    ],
    answer: "I heard you, then Goodbye",
    hints: [
      "The hello test does not use .lower().",
      "Hello fails that test, so else runs.",
      "exit matches next, then the loop stops."
    ],
    learned: "A hello test can miss Hello.",
    wrong: "Look at which test uses .lower().",
    success: "Hello missed the hello test. exit matched because of .lower()."
  },
  {
    id: "s8",
    kind: "write",
    kicker: "Functions",
    title: "Return a reply",
    explain: "return sends text back. The function does not have to print it.",
    more: "The loop can print that text later.",
    example: lines(["def label(word):", "    return \"Item: \" + word"]),
    exampleNote: "A label maker. Yours answers the person.",
    task: "Define reply(command). If command.lower() is hello, return JARVIS: At your service. Otherwise return JARVIS: I heard you.",
    hints: [
      "def reply(command):",
      "Use return, not print.",
      "else returns the I heard you line."
    ],
    learned: "You can return a reply from a function.",
    check: checkReplyFn
  }
];

function endItem() {
  const learned = STEPS.filter((step) => isDone(step.id)).map((step) => step.learned);
  return {
    id: "end",
    kind: "end",
    kicker: "So far",
    title: learned.length ? "What you can do" : "Nothing checked yet",
    explain: learned.length
      ? "These are the steps you actually passed. Next alone does not count."
      : "Go back and check a step. Moving ahead does not mark it done.",
    learnedList: learned
  };
}

function niceTitle(title) {
  const short = title.replace(/^This is how to /, "");
  return short.charAt(0).toUpperCase() + short.slice(1);
}

function reviewItem(lesson) {
  return {
    id: "r" + lesson.id,
    kind: "write",
    topic: lesson.topic,
    kicker: lesson.topic,
    title: niceTitle(lesson.title),
    explain: lesson.explain,
    example: lesson.example,
    exampleNote: lesson.shown ? "Example prints: " + lesson.shown : "Different values from the task.",
    task: lesson.task,
    hints: reviewHints(lesson),
    learned: "Done.",
    check: (code) => reviewCheck(code, lesson)
  };
}

function current() {
  if (progress.place === "end") return endItem();
  const step = STEPS.find((item) => item.id === progress.place);
  if (step) return step;
  if (progress.place && progress.place.charAt(0) === "r") {
    const lesson = LESSONS.find((item) => "r" + item.id === progress.place);
    if (lesson) return reviewItem(lesson);
  }
  return STEPS[0];
}

function neighbors(id) {
  if (id === "end") return { prev: STEPS[STEPS.length - 1].id, next: "" };
  const stepIndex = STEPS.findIndex((item) => item.id === id);
  if (stepIndex >= 0) {
    return {
      prev: stepIndex > 0 ? STEPS[stepIndex - 1].id : "",
      next: stepIndex < STEPS.length - 1 ? STEPS[stepIndex + 1].id : "end"
    };
  }
  const index = LESSONS.findIndex((item) => "r" + item.id === id);
  const practice = progress.pathPlace || "s1";
  if (index >= 0) {
    return {
      prev: index > 0 ? "r" + LESSONS[index - 1].id : practice,
      next: index < LESSONS.length - 1 ? "r" + LESSONS[index + 1].id : practice
    };
  }
  return { prev: "", next: "s2" };
}

function position(item) {
  if (item.id === "end") {
    const done = STEPS.filter((step) => isDone(step.id)).length;
    return { label: done + " passed", value: done, total: STEPS.length };
  }
  const stepIndex = STEPS.findIndex((step) => step.id === item.id);
  if (stepIndex >= 0) return { label: (stepIndex + 1) + " / " + STEPS.length, value: stepIndex + 1, total: STEPS.length };
  const lesson = LESSONS.find((entry) => "r" + entry.id === item.id);
  const group = LESSONS.filter((entry) => entry.topic === (lesson ? lesson.topic : ""));
  const index = group.findIndex((entry) => lesson && entry.id === lesson.id);
  return { label: (index + 1) + " / " + group.length, value: index + 1, total: group.length || 1 };
}

function firstOpenStep() {
  const next = STEPS.find((step) => !isDone(step.id));
  return next ? next.id : "end";
}

function go(id) {
  if (!id) return;
  progress.place = id;
  if (id.charAt(0) === "s") progress.pathPlace = id;
  view.more = false;
  view.sheet = false;
  view.result = null;
  saveProgress();
  render();
}

function topics() {
  const list = [];
  LESSONS.forEach((lesson) => {
    let group = null;
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].name === lesson.topic) group = list[i];
    }
    if (!group) {
      group = { name: lesson.topic, ids: [] };
      list.push(group);
    }
    group.ids.push(lesson.id);
  });
  return list;
}

function earlyOpen() {
  return LESSONS.slice(0, 30).some((lesson) => !isDone("r" + lesson.id));
}

function renderSheet() {
  const here = current().id;
  const practice = STEPS.map((step) => {
    const tick = isDone(step.id) ? "<span class=\"tick\">Done</span>" : "";
    const currentAttr = step.id === here ? " aria-current=\"true\"" : "";
    return "<button type=\"button\" class=\"jump\" data-act=\"go\" data-go=\"" + step.id + "\"" + currentAttr + "><span>" + esc(step.title) + "</span>" + tick + "</button>";
  }).join("");
  const review = topics().map((group) => {
    const done = group.ids.filter((id) => isDone("r" + id)).length;
    const open = view.topic === group.name;
    const head = "<button type=\"button\" class=\"jump\" data-act=\"topic\" data-topic=\"" + esc(group.name) + "\"><span>" + esc(group.name) + "</span><span>" + done + "/" + group.ids.length + "</span></button>";
    if (!open) return head;
    const items = group.ids.map((id) => {
      const lesson = LESSONS.find((entry) => entry.id === id);
      const tick = isDone("r" + id) ? "<span class=\"tick\">Done</span>" : "";
      const currentAttr = "r" + id === here ? " aria-current=\"true\"" : "";
      return "<button type=\"button\" class=\"jump sub\" data-act=\"go\" data-go=\"r" + id + "\"" + currentAttr + "><span>" + esc(niceTitle(lesson.title)) + "</span>" + tick + "</button>";
    }).join("");
    return head + items;
  }).join("");
  const mark = earlyOpen() ? "<button type=\"button\" class=\"mark\" data-act=\"early\">Mark first 3 topics done</button>" : "";
  const flash = legacy.flash ? "<p class=\"flash\">" + esc(legacy.flash) + "</p>" : "";
  return "<div class=\"sheet\"><div class=\"panel\"><div class=\"handle\"></div><h2>Lessons</h2><p class=\"section\">Practice</p>" + practice + "<p class=\"section\">Review</p>" + review + mark + flash + "</div></div>";
}

function cardBody(item) {
  if (item.kind === "end") {
    const list = item.learnedList.length
      ? item.learnedList.map((line) => "<p class=\"learned\">" + esc(line) + "</p>").join("")
      : "";
    return "<h2>" + esc(item.title) + "</h2><p class=\"lead\">" + esc(item.explain) + "</p>" + list;
  }
  const more = item.more ? "<button type=\"button\" class=\"more\" data-act=\"more\">" + (view.more ? "Less" : "More") + "</button>" + (view.more ? "<p class=\"extra\">" + esc(item.more) + "</p>" : "") : "";
  const learned = isDone(item.id) ? "<p class=\"learned\">" + esc(item.learned) + "</p>" : "";
  const example = item.example ? "<p class=\"label\">Example</p><pre>" + esc(item.example) + "</pre>" + (item.exampleNote ? "<p class=\"note\">" + esc(item.exampleNote) + "</p>" : "") : "";
  const task = item.task ? "<p class=\"task\">" + esc(item.task) + "</p>" : "";
  const used = Number(progress.hints[item.id]) || 0;
  const hints = (item.hints || []).slice(0, used).map((hint) => "<p class=\"hint\">" + esc(hint) + "</p>").join("");
  const after = item.after && isDone(item.id) ? "<p class=\"after\">" + esc(item.after) + "</p>" : "";
  let choices = "";
  if (item.kind === "choice") {
    const picked = draftOf(item.id);
    choices = item.choices.map((choice) => {
      const pressed = picked === choice ? " aria-pressed=\"true\"" : " aria-pressed=\"false\"";
      return "<button type=\"button\" class=\"choice\" data-act=\"choice\" data-choice=\"" + esc(choice) + "\"" + pressed + ">" + esc(choice) + "</button>";
    }).join("");
  }
  return learned + "<h2>" + esc(item.title) + "</h2><p class=\"lead\">" + esc(item.explain) + "</p>" + more + example + task + choices + hints + after;
}

function keysHtml(item) {
  if (!item || item.kind !== "write") return "";
  const keys = [
    ["()", "Parentheses"],
    ["[]", "Brackets"],
    ["{}", "Braces"],
    [":", "Colon"],
    ["=", "Equals"],
    ["\"", "Quote"],
    ["#", "Comment"],
    ["indent", "Indent"],
    ["outdent", "Unindent"]
  ];
  return "<div class=\"keys\">" + keys.map((pair) => {
    const label = pair[0] === "indent" || pair[0] === "outdent" ? pair[1] : pair[0];
    return "<button type=\"button\" data-ins=\"" + esc(pair[0]) + "\" aria-label=\"" + esc(pair[1]) + "\">" + esc(label) + "</button>";
  }).join("") + "</div>";
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  const item = current();
  const spot = position(item);
  const near = neighbors(item.id);
  const width = Math.max(0, Math.min(100, Math.round((spot.value / spot.total) * 100)));
  const doneMark = item.id !== "end" && isDone(item.id) ? " · Done" : "";
  const feedback = view.result ? "<p class=\"feedback " + (view.result.ok ? "good" : "bad") + "\">" + esc(view.result.text) + "</p>" : "<p class=\"feedback\"></p>";
  const actions = item.kind === "end"
    ? "<div class=\"actions\"><button type=\"button\" class=\"primary only\" data-act=\"open-sheet\">Review</button></div>"
    : "<div class=\"actions\"><button type=\"button\" data-act=\"hint\">Hint</button><button type=\"button\" class=\"primary\" data-act=\"check\">Check</button><button type=\"button\" data-act=\"next\">Next</button></div>";
  const editor = item.kind === "write"
    ? "<textarea id=\"code\" aria-label=\"Your code\" spellcheck=\"false\" autocapitalize=\"off\" autocomplete=\"off\" autocorrect=\"off\"></textarea>"
    : "";
  app.innerHTML = "<main class=\"wrap\">" +
    "<header class=\"top\"><button type=\"button\" class=\"text\" data-act=\"back\"" + (near.prev ? "" : " disabled") + ">Back</button><h1>Python Practice</h1><button type=\"button\" class=\"text lessons\" data-act=\"open-sheet\">Lessons</button></header>" +
    "<div class=\"meta\"><span>" + esc(item.kicker) + doneMark + "</span><span>" + esc(spot.label) + "</span></div>" +
    "<div class=\"progress\"><span style=\"width:" + width + "%\"></span></div>" +
    "<article class=\"card\">" + cardBody(item) + editor + "</article></main>" +
    "<div class=\"dock\">" + feedback + keysHtml(item) + actions + "</div>" +
    (view.sheet ? renderSheet() : "");
  const box = document.getElementById("code");
  if (box) box.value = draftOf(item.id) || item.seed || "";
  liftDock();
}

function grade() {
  const item = current();
  if (item.kind === "end") return;
  const box = document.getElementById("code");
  const value = box ? box.value : draftOf(item.id);
  if (box) progress.drafts[item.id] = value;
  const outcome = item.kind === "choice"
    ? checkChoice(value, item.answer, item.wrong, item.success)
    : item.check(value);
  if (outcome.ok) progress.done[item.id] = true;
  else if (isDone(item.id)) {
    outcome.text = outcome.text + " Your earlier pass stays saved.";
  }
  view.result = outcome;
  saveProgress();
  render();
}

function showHint() {
  const item = current();
  if (!item.hints) return;
  const used = Number(progress.hints[item.id]) || 0;
  if (used < item.hints.length) progress.hints[item.id] = used + 1;
  saveProgress();
  render();
}

function insertAt(kind) {
  const box = document.getElementById("code");
  if (!box) return;
  const start = box.selectionStart;
  const end = box.selectionEnd;
  const selected = box.value.slice(start, end);
  const pairs = { "()": ")", "[]": "]", "{}": "}", "\"": "\"" };
  if (kind === "indent" || kind === "outdent") {
    const lineStart = box.value.lastIndexOf("\n", start - 1) + 1;
    const lineEnd = box.value.indexOf("\n", end);
    const endPos = lineEnd === -1 ? box.value.length : lineEnd;
    const next = box.value.slice(lineStart, endPos).split("\n").map((line) => {
      return kind === "indent" ? "    " + line : line.replace(/^ {1,4}/, "");
    }).join("\n");
    box.setRangeText(next, lineStart, endPos, "end");
  } else if (pairs[kind]) {
    box.setRangeText(kind.charAt(0) + selected + pairs[kind], start, end, "end");
    const cursor = selected ? start + selected.length + 2 : start + 1;
    box.selectionStart = box.selectionEnd = cursor;
  } else {
    box.setRangeText(kind, start, end, "end");
  }
  progress.drafts[current().id] = box.value;
  view.result = null;
  saveProgress();
  const feedback = document.querySelector(".feedback");
  if (feedback) {
    feedback.textContent = "";
    feedback.className = "feedback";
  }
  box.focus();
}

function onClick(event) {
  const ins = event.target.closest("[data-ins]");
  if (ins) {
    insertAt(ins.getAttribute("data-ins"));
    return;
  }
  if (event.target.classList && event.target.classList.contains("sheet")) {
    view.sheet = false;
    render();
    return;
  }
  const el = event.target.closest("[data-act]");
  if (!el || el.disabled) return;
  const act = el.getAttribute("data-act");
  if (act === "hint") showHint();
  else if (act === "check") grade();
  else if (act === "next") go(neighbors(current().id).next);
  else if (act === "back") go(neighbors(current().id).prev);
  else if (act === "go") go(el.getAttribute("data-go"));
  else if (act === "open-sheet") {
    const item = current();
    view.sheet = true;
    if (item.topic) view.topic = item.topic;
    render();
  } else if (act === "topic") {
    const name = el.getAttribute("data-topic");
    view.topic = view.topic === name ? "" : name;
    render();
  } else if (act === "more") {
    view.more = !view.more;
    render();
  } else if (act === "choice") {
    const item = current();
    progress.drafts[item.id] = el.getAttribute("data-choice");
    view.result = null;
    saveProgress();
    render();
  } else if (act === "early") {
    progress.early = true;
    saveProgress();
    render();
  }
}

function onKey(event) {
  if (event.target.id !== "code" || event.key !== "Tab") return;
  event.preventDefault();
  insertAt(event.shiftKey ? "outdent" : "indent");
}

function onInput(event) {
  if (event.target.id !== "code") return;
  progress.drafts[current().id] = event.target.value;
  view.result = null;
  const feedback = document.querySelector(".feedback");
  if (feedback) {
    feedback.textContent = "";
    feedback.className = "feedback";
  }
  saveProgress();
}

function liftDock() {
  const dock = document.querySelector(".dock");
  const wrap = document.querySelector(".wrap");
  if (!dock || !wrap) return;
  const viewport = window.visualViewport;
  const overlap = viewport ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0;
  dock.style.bottom = overlap + "px";
  wrap.style.paddingBottom = (dock.offsetHeight + 16) + "px";
}

function boot() {
  progress = loadProgress();
  legacy = loadLegacy();
  academy = loadAcademy();
  if (!progress.place) {
    progress.place = firstOpenStep();
    if (progress.place.charAt(0) === "s") progress.pathPlace = progress.place;
    saveProgress();
  }
  const app = document.getElementById("app");
  app.addEventListener("click", onClick);
  app.addEventListener("keydown", onKey);
  app.addEventListener("input", onInput);
  app.addEventListener("mousedown", (event) => {
    if (event.target.closest("[data-ins]")) event.preventDefault();
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", liftDock);
    window.visualViewport.addEventListener("scroll", liftDock);
  }
  window.addEventListener("resize", liftDock);
  render();
}

if (typeof document !== "undefined" && document.getElementById("app")) boot();
