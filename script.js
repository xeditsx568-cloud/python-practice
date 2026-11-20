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

const DRILLS = LESSONS;

const stats = document.querySelector("#stats");
const dots = document.querySelector("#dots");
const panel = document.querySelector("#panel");
const actions = document.querySelector("#actions");

const state = loadState();

function loadState() {
  const fresh = { streaks: {}, setIndex: 0, piecePos: 0, phase: "teach" };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return fresh;
    fresh.streaks = saved.streaks || {};
    fresh.setIndex = clampSet(saved.setIndex || 0);
    fresh.piecePos = saved.piecePos || 0;
    fresh.phase = saved.phase === "type" || saved.phase === "done" ? saved.phase : "teach";
  } catch (error) {
    return fresh;
  }
  const unlocked = highestUnlocked(fresh.streaks);
  if (fresh.setIndex > unlocked) fresh.setIndex = unlocked;
  return fresh;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    streaks: state.streaks,
    setIndex: state.setIndex,
    piecePos: state.piecePos,
    phase: state.phase
  }));
}

function setCount() {
  return Math.ceil(DRILLS.length / SET_SIZE);
}

function currentSet() {
  const start = state.setIndex * SET_SIZE;
  return DRILLS.slice(start, start + SET_SIZE);
}

function streakOf(drill) {
  return state.streaks[String(drill.id)] || 0;
}

function setIsComplete(index, streaks) {
  const saved = streaks || state.streaks;
  const start = index * SET_SIZE;
  const group = DRILLS.slice(start, start + SET_SIZE);
  return group.length > 0 && group.every((drill) => (saved[String(drill.id)] || 0) >= NEED);
}

function highestUnlocked(streaks) {
  const saved = streaks || state.streaks;
  let index = 0;
  while (index < setCount() - 1 && setIsComplete(index, saved)) index += 1;
  return index;
}

function clampSet(index) {
  if (index < 0) return 0;
  if (index >= setCount()) return Math.max(0, setCount() - 1);
  return index;
}

function normalize(code) {
  return code.replace(/\r\n/g, "\n").replace(/\t/g, "    ").split("\n").map((line) => line.trimEnd()).join("\n").trim();
}

function firstDifference(typed, expected) {
  const got = normalize(typed).split("\n");
  const need = normalize(expected).split("\n");
  const length = Math.max(got.length, need.length);
  for (let i = 0; i < length; i += 1) {
    if (got[i] === need[i]) continue;
    if (got[i] === undefined) return "Missing line " + (i + 1) + ":\n" + need[i];
    if (need[i] === undefined) return "Extra line " + (i + 1) + ":\n" + got[i];
    return "Line " + (i + 1) + " is different.\nYou typed: " + got[i] + "\nNeeded:    " + need[i];
  }
  return "The program does not match yet.";
}

function lineNote(line) {
  const text = line.trim();
  if (text === "") return "A blank line does nothing. It only separates the code for a reader.";
  if (text.startsWith("#")) return "Python ignores this comment. It is a note for a person.";
  if (text === "pass") return "pass is a placeholder. The block is valid, and nothing happens.";
  if (text === "try:") return "try starts a block that might fail. If it fails, Python jumps to except instead of stopping.";
  if (text.startsWith("except")) return "except runs only when the matching error happens in the try block.";
  if (text.startsWith("del ")) return "del removes that name, or that key and its value.";
  if (text.startsWith("print(")) return "print shows the value in the parentheses. The quotes around text are not shown.";
  if (/^if .+\:$/.test(text)) return "if asks a yes-or-no question. The indented lines under it run only when the answer is yes.";
  if (/^elif .+\:$/.test(text)) return "elif is another question, checked only when every earlier test in the chain was false.";
  if (text === "else:") return "else runs when the tests above it were all false.";
  if (/^for .+\:$/.test(text)) return "for visits one item at a time. The indented lines repeat for each item.";
  if (/^while .+\:$/.test(text)) return "while repeats the indented lines while its test stays true. Something inside must change, or the loop will not end.";
  if (/^def .+:$/.test(text)) return "def saves a function. The indented body does not run until a later line calls the function.";
  if (/^class .+:$/.test(text)) return "class describes a kind of object. The methods under it run later, on an instance.";
  if (text.startsWith("return")) return "return hands a value back to the caller and leaves the function immediately.";
  if (text.startsWith("import ") || text.startsWith("from ")) return "This line loads a name from another module so the program can use it.";
  if (/^\w[\w]*\s*(\+|-|\*|\/)?=\s*[^=]/.test(text) && !text.includes("==")) return "The name on the left now refers to the value on the right. The right side is worked out first.";
  if (line.startsWith(" ") || line.startsWith("\t")) return "The indent puts this line inside the block above it.";
  return "";
}

function clear(node) {
  node.replaceChildren();
}

function addText(parent, className, text) {
  const el = document.createElement("p");
  el.className = className;
  el.textContent = text;
  parent.appendChild(el);
  return el;
}

function addCode(parent, code, extraClass) {
  const pre = document.createElement("pre");
  if (extraClass) pre.className = extraClass;
  pre.textContent = code;
  parent.appendChild(pre);
}

function addHeading(text) {
  const heading = document.createElement("h2");
  heading.textContent = text;
  panel.appendChild(heading);
}

function addButton(label, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", onClick);
  actions.appendChild(button);
  return button;
}

function renderDots(group) {
  clear(dots);
  group.forEach((drill) => {
    const dot = document.createElement("span");
    const streak = streakOf(drill);
    dot.className = "dot" + (streak >= NEED ? " done" : streak === 1 ? " half" : "");
    dots.appendChild(dot);
  });
}

function render() {
  const group = currentSet();
  const done = group.every((drill) => streakOf(drill) >= NEED);
  if (done) state.phase = "done";
  const remembered = group.filter((drill) => streakOf(drill) >= NEED).length;
  stats.textContent = "Set " + (state.setIndex + 1) + " of " + setCount() + " · " + remembered + " of " + group.length + " known by heart";
  renderDots(group);
  clear(panel);
  clear(actions);

  if (state.phase === "done") {
    renderDone(group);
    return;
  }
  const drill = group[Math.min(state.piecePos, group.length - 1)];
  if (streakOf(drill) >= NEED) {
    const next = group.findIndex((item) => streakOf(item) < NEED);
    state.piecePos = next === -1 ? 0 : next;
  }
  const current = group[state.piecePos];
  if (state.phase === "teach" || streakOf(current) === 0 && state.phase !== "type") {
    state.phase = streakOf(current) === 0 ? "teach" : state.phase;
  }
  if (state.phase === "teach") renderTeach(current, group);
  else renderType(current, group);
}

function renderTeach(drill, group) {
  addText(panel, "kicker", drill.topic + " · Piece " + (state.piecePos + 1) + " of " + group.length + " · Lesson");
  addText(panel, "goal", drill.title);
  addText(panel, "prose", drill.explain);
  addHeading("Example");
  addCode(panel, drill.example);
  addHeading("What that example displays");
  addCode(panel, drill.shown, "sample");
  const notes = drill.example.split("\n").map((line) => ({ line: line, note: lineNote(line) })).filter((item) => item.note);
  if (notes.length) {
    addHeading("Line by line");
    const list = document.createElement("ul");
    list.className = "lines";
    notes.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = (item.line.trim() || "(blank line)") + " — " + item.note;
      list.appendChild(li);
    });
    panel.appendChild(list);
  }
  addHeading("Your task");
  addText(panel, "task", drill.task);
  addText(panel, "note", "Do not copy the example. Write a new program for the task. You need two correct attempts: this one, and a later one from memory.");
  addButton("Hide the example and try the task", "primary", () => {
    state.phase = "type";
    saveState();
    render();
    const box = document.querySelector("#attempt");
    if (box) box.focus();
  });
}

function renderType(drill, group) {
  const recall = streakOf(drill) >= 1;
  addText(panel, "kicker", drill.topic + " · Piece " + (state.piecePos + 1) + " of " + group.length + (recall ? " · From memory" : " · Your turn"));
  addText(panel, "goal", drill.task);
  addText(panel, "prose", recall ? "Type the program again without looking back at the example." : "Use the same idea as the example. Do not copy the example.");
  const label = document.createElement("label");
  label.htmlFor = "attempt";
  label.textContent = "Type your program";
  panel.appendChild(label);
  const box = document.createElement("textarea");
  box.id = "attempt";
  box.spellcheck = false;
  box.setAttribute("autocomplete", "off");
  box.rows = Math.max(6, drill.code.split("\n").length + 1);
  panel.appendChild(box);
  const result = addText(panel, "result", "");
  addButton("Check", "primary", () => checkAttempt(drill, group, box, result));
  addButton("Show the lesson", "", () => {
    state.streaks[String(drill.id)] = 0;
    state.phase = "teach";
    saveState();
    render();
  });
  box.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.ctrlKey) checkAttempt(drill, group, box, result);
  });
  box.focus();
}

function checkAttempt(drill, group, box, result) {
  if (normalize(box.value) === "") {
    result.className = "result bad";
    result.textContent = "Type the program first.";
    return;
  }
  if (normalize(box.value) === normalize(drill.example)) {
    state.streaks[String(drill.id)] = 0;
    state.phase = "type";
    saveState();
    result.className = "result bad";
    result.textContent = "That is the example. Do not copy it.\n" + drill.task;
    renderDots(group);
    const remembered = group.filter((item) => streakOf(item) >= NEED).length;
    stats.textContent = "Set " + (state.setIndex + 1) + " of " + setCount() + " · " + remembered + " of " + group.length + " known by heart";
    return;
  }
  if (normalize(box.value) !== normalize(drill.code)) {
    state.streaks[String(drill.id)] = 0;
    state.phase = "type";
    saveState();
    result.className = "result bad";
    result.textContent = "Not yet.\n" + firstDifference(box.value, drill.code) + "\n\nFix it and check again, or show the lesson and start this piece over.";
    renderDots(group);
    const remembered = group.filter((item) => streakOf(item) >= NEED).length;
    stats.textContent = "Set " + (state.setIndex + 1) + " of " + setCount() + " · " + remembered + " of " + group.length + " known by heart";
    return;
  }
  const nextStreak = streakOf(drill) + 1;
  state.streaks[String(drill.id)] = nextStreak;
  if (group.every((item) => streakOf(item) >= NEED)) {
    state.phase = "done";
    saveState();
    render();
    return;
  }
  let next = -1;
  for (let offset = 1; offset <= group.length; offset += 1) {
    const index = (state.piecePos + offset) % group.length;
    if (streakOf(group[index]) < NEED) {
      next = index;
      break;
    }
  }
  state.piecePos = next;
  state.phase = streakOf(group[next]) === 0 ? "teach" : "type";
  saveState();
  render();
}

function renderDone(group) {
  addText(panel, "kicker", "Set " + (state.setIndex + 1) + " complete");
  addText(panel, "goal", "You typed all " + group.length + " programs correctly twice.");
  addText(panel, "prose", "The second time was from memory. You can practice this set again, or open the next ten.");
  if (state.setIndex < setCount() - 1) {
    addButton("Start the next 10", "primary", () => {
      state.setIndex += 1;
      state.piecePos = 0;
      state.phase = "teach";
      saveState();
      render();
    });
  }
  addButton("Practice this set again", "", () => {
    group.forEach((drill) => {
      delete state.streaks[String(drill.id)];
    });
    state.piecePos = 0;
    state.phase = "teach";
    saveState();
    render();
  });
  if (state.setIndex > 0) {
    addButton("Review the previous set", "", () => {
      state.setIndex -= 1;
      state.piecePos = 0;
      state.phase = setIsComplete(state.setIndex) ? "done" : "teach";
      saveState();
      render();
    });
  }
}

render();
