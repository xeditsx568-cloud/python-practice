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

// JARVIS Academy. The practice lessons above stay as optional review.
// Progress is stored only under jarvisAcademy.v1. Older keys are read, never written.

const ACADEMY_KEY = "jarvisAcademy.v1";
const LEGACY_RECALL = ["pythonRecall.v3", "pythonRecall.v2", "pythonRecall.v1"];
const LEGACY_CARDS = "pythonFlashcards.v1";

function browserStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (error) {
    return null;
  }
}

const view = { page: "home", tab: "lesson", choice: "" };
let toast = "";
let legacy = { streaks: {}, flashNote: "" };
let progress = freshProgress();

function freshProgress() {
  return {
    version: 1,
    checks: {},
    drafts: {},
    earlySetsMarked: false,
    lastDay: "",
    streak: 0,
    goalDay: "",
    goalDone: false,
    achievements: [],
    resume: ""
  };
}

function todayKey() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

function dayDiff(from, to) {
  const a = new Date(from + "T12:00:00");
  const b = new Date(to + "T12:00:00");
  return Math.round((b - a) / 86400000);
}

function loadLegacy() {
  const streaks = {};
  LEGACY_RECALL.forEach((key) => {
    try {
      const store = browserStorage();
      const data = JSON.parse((store && store.getItem(key)) || "null");
      if (!data || typeof data.streaks !== "object" || !data.streaks) return;
      Object.keys(data.streaks).forEach((id) => {
        const value = Number(data.streaks[id]) || 0;
        streaks[id] = Math.max(streaks[id] || 0, value);
      });
    } catch (error) {
      streaks.broken = streaks.broken || true;
    }
  });
  let flashNote = "";
  try {
    const store = browserStorage();
    const raw = store ? store.getItem(LEGACY_CARDS) : null;
    if (raw) {
      const data = JSON.parse(raw);
      const box = data && typeof data === "object" ? (data.cards || data.progress || data) : null;
      const count = box && typeof box === "object" ? Object.keys(box).length : 0;
      flashNote = count
        ? "An older flashcard save is still in this browser (" + count + " stored entries). This upgrade does not delete it."
        : "An older flashcard save is still in this browser. This upgrade does not delete it.";
    }
  } catch (error) {
    flashNote = "An older flashcard save is still in this browser. This upgrade does not delete it.";
  }
  legacy = { streaks: streaks, flashNote: flashNote };
}

function loadProgress() {
  const store = browserStorage();
  const raw = store ? store.getItem(ACADEMY_KEY) : null;
  if (!raw) return freshProgress();
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("shape");
    const next = freshProgress();
    next.checks = data.checks && typeof data.checks === "object" ? data.checks : {};
    next.drafts = data.drafts && typeof data.drafts === "object" ? data.drafts : {};
    next.earlySetsMarked = Boolean(data.earlySetsMarked);
    next.lastDay = typeof data.lastDay === "string" ? data.lastDay : "";
    next.streak = Number(data.streak) || 0;
    next.goalDay = typeof data.goalDay === "string" ? data.goalDay : "";
    next.goalDone = Boolean(data.goalDone);
    next.achievements = Array.isArray(data.achievements) ? data.achievements.filter((item) => typeof item === "string") : [];
    next.resume = typeof data.resume === "string" ? data.resume : "";
    if (next.goalDay !== todayKey()) next.goalDone = false;
    return next;
  } catch (error) {
    try {
      if (store && !store.getItem(ACADEMY_KEY + ".unreadable")) {
        store.setItem(ACADEMY_KEY + ".unreadable", raw);
      }
    } catch (ignored) {
      ignored;
    }
    return freshProgress();
  }
}

function saveProgress() {
  const store = browserStorage();
  if (store) store.setItem(ACADEMY_KEY, JSON.stringify(progress));
}

function entry(id) {
  if (!progress.checks[id] || typeof progress.checks[id] !== "object") {
    progress.checks[id] = { status: "", ranLocal: false, revealed: false, hints: 0 };
  }
  return progress.checks[id];
}

function noteActivity() {
  const today = todayKey();
  if (progress.lastDay !== today) {
    const gap = progress.lastDay ? dayDiff(progress.lastDay, today) : 0;
    progress.streak = gap === 1 ? progress.streak + 1 : 1;
    progress.lastDay = today;
  }
  if (progress.goalDay !== today) {
    progress.goalDay = today;
    progress.goalDone = false;
  }
  progress.goalDone = true;
}

function award(id) {
  if (progress.achievements.indexOf(id) === -1) progress.achievements.push(id);
}

function markBuilt(id, achievement) {
  const item = entry(id);
  if (item.status !== "built") noteActivity();
  item.status = "built";
  if (achievement) award(achievement);
  saveProgress();
}

function markSkipped(id) {
  const item = entry(id);
  if (item.status === "built") return;
  if (item.status !== "skipped") noteActivity();
  item.status = "skipped";
  saveProgress();
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

function result(ok, messages) {
  return { ok: ok, messages: messages };
}

function checkChoice(cp, selected) {
  if (!selected) return result(false, ["Choose an answer first."]);
  if (selected !== cp.answer) return result(false, [cp.wrong || "That choice does not fit this assistant."]);
  return result(true, [cp.success]);
}

function has(code, pattern) {
  return pattern.test(code);
}

function checkM1Input(code) {
  const n = stripComments(code);
  if (/title\s*=\s*input/i.test(n)) return result(false, ["That is the library example. Store the answer in command, and ask with You: "]);
  if (!/command\s*=\s*input\s*\(\s*["']You:\s*["']\s*\)(?:\.strip\(\s*\))?/.test(n)) {
    return result(false, ["Write one assignment. Call input with the prompt You: and store it in command. Quotes may be single or double."]);
  }
  return result(true, ["You can now read one command from a person. This was a pattern check. Python was not run."]);
}

function checkM1Reply(code) {
  const n = stripComments(code);
  const messages = [];
  if (/Password|Door unlocked/.test(n)) messages.push("That is the door example. Your test should look at command, and the reply should mention JARVIS.");
  if (!/if\s+command(?:\.strip\(\s*\))?\s*==\s*["']hello["']\s*:/.test(n) && !/if\s+command(?:\.strip\(\s*\))?\.lower\(\s*\)\s*==\s*["']hello["']\s*:/.test(n)) {
    messages.push("Use if, compare command with hello, and end that line with a colon.");
  }
  if (!/print\s*\([\s\S]*At your service/.test(n)) messages.push("Print a reply that contains At your service.");
  if (!/^ {4,}print/m.test(n) && !/^\tprint/m.test(n)) messages.push("Indent the print line so it belongs to the if.");
  return result(messages.length === 0, messages.length ? messages : ["You can answer hello. This was a pattern check. Python was not run."]);
}

function checkM1Exit(code) {
  const n = stripComments(code);
  const messages = [];
  if (/More\?|Survey closed/.test(n)) messages.push("That is the survey example. This branch should look for exit and say JARVIS: Goodbye.");
  if (!/lower\s*\(\s*\)/.test(n) || !/["']exit["']/.test(n)) messages.push("Use .lower() so Exit and EXIT count, and compare with exit.");
  if (!/Goodbye/.test(n)) messages.push("Print a goodbye that includes the word Goodbye.");
  if (!/\bbreak\b/.test(n)) messages.push("Add break so the loop can stop. Printing goodbye does not leave the loop by itself.");
  return result(messages.length === 0, messages.length ? messages : ["You can leave the loop on purpose. This was a pattern check. Python was not run."]);
}

function checkM1Build(code) {
  const n = stripComments(code);
  const messages = [];
  if (/Order:|Noted/.test(n)) messages.push("That still copies the cafe example. The prompt should be You: and the replies should be JARVIS lines.");
  if (!/while\s+True\s*:/.test(n)) messages.push("Use while True: so the assistant keeps listening until break.");
  if (!/command\s*=\s*input\s*\(\s*["']You:\s*["']\s*\)/.test(n)) messages.push("Inside the loop, store input(\"You: \") in command.");
  if (!/lower\s*\(\s*\)/.test(n) || !/["']exit["']/.test(n)) messages.push("Treat exit in any capitalisation by using .lower().");
  if (!/\bbreak\b/.test(n)) messages.push("break should run for exit.");
  if (!/Goodbye/.test(n)) messages.push("The exit reply needs to include Goodbye.");
  if (!/["']hello["']/.test(n) || !/At your service/.test(n)) messages.push("Add a hello branch whose reply includes At your service.");
  if (!/I heard you/.test(n)) messages.push("Add the fallback reply JARVIS: I heard you.");
  if (!/\belse\b/.test(n)) messages.push("Use else for the fallback so it does not also run for hello.");
  return result(messages.length === 0, messages.length ? messages : ["You have written a working command loop on paper. You can now process a user command and stop when asked. This browser did not run it."]);
}

function checkM1Debug(code) {
  const checked = checkM1Build(code);
  if (!checked.ok) return checked;
  if (/if\s+command\s*==\s*["']exit["']/.test(stripComments(code)) && !/lower\s*\(\s*\)/.test(stripComments(code))) {
    return result(false, ["The old bug is still there: command == \"exit\" misses Exit. Use .lower()."]);
  }
  return result(true, ["You repaired the loop: exit can stop it, and the fallback does not talk over goodbye. This was a pattern check. Python was not run."]);
}

function checkM2Function(code) {
  const n = stripComments(code);
  const messages = [];
  if (/def\s+label\s*\(/.test(n) || /Box:/.test(n)) messages.push("That is the box example. Define reply(command) instead.");
  if (!/def\s+reply\s*\(\s*command\s*\)\s*:/.test(n)) messages.push("Start with def reply(command):");
  if (!/return\b/.test(n)) messages.push("return the text. Do not only print it inside the function.");
  if (!/At your service/.test(n) || !/I heard you/.test(n)) messages.push("Return At your service for hello, and I heard you otherwise.");
  if (!/["']hello["']/.test(n)) messages.push("Test the command for hello.");
  return result(messages.length === 0, messages.length ? messages : ["You can now put a reply in a function and hand it back. This was a pattern check. Python was not run."]);
}

function checkM2Elif(code) {
  const n = stripComments(code);
  const messages = [];
  if (!/def\s+reply\s*\(\s*command\s*\)\s*:/.test(n)) messages.push("Keep the function named reply(command).");
  if (!/\belif\b/.test(n)) messages.push("Use elif for the extra commands so only one branch runs.");
  if (!/["']help["']/.test(n) || !/["']time["']/.test(n)) messages.push("Handle both help and time.");
  if (!/commands are hello, help, and time/.test(n)) messages.push("The help reply should include: commands are hello, help, and time");
  if (!/I have no clock yet/.test(n)) messages.push("The time reply should include: I have no clock yet");
  return result(messages.length === 0, messages.length ? messages : ["You can now recognise more than one command. This was a pattern check. Python was not run."]);
}

function checkM2Import(code) {
  const n = stripComments(code);
  const messages = [];
  if (/math\.sqrt/.test(n) && !/datetime/.test(n)) messages.push("That is the math example. This task imports datetime.");
  if (!/import\s+datetime/.test(n)) messages.push("Add import datetime.");
  if (!/def\s+current_hour\s*\(\s*\)\s*:/.test(n)) messages.push("Define current_hour().");
  if (!/datetime\.datetime\.now\s*\(\s*\)/.test(n) && !/datetime\.now\s*\(\s*\)/.test(n)) messages.push("Call datetime.datetime.now() and return its hour.");
  if (!/return\b/.test(n) || !/\.hour\b/.test(n)) messages.push("Return the hour attribute from the current time.");
  return result(messages.length === 0, messages.length ? messages : ["You can import a standard library tool and return one piece of it. This was a pattern check. Python was not run."]);
}

function checkM2Wire(code) {
  const n = stripComments(code);
  const messages = [];
  if (!/while\s+True\s*:/.test(n)) messages.push("The assistant still needs while True.");
  if (!/input\s*\(/.test(n)) messages.push("Keep asking with input inside the loop.");
  if (!/reply\s*\(\s*command\s*\)/.test(n)) messages.push("Call reply(command) instead of putting every print in the loop.");
  if (!/print\s*\(/.test(n)) messages.push("Print the text that reply returns.");
  if (!/\bbreak\b/.test(n) || !/["']exit["']/.test(n)) messages.push("Keep an exit test that breaks.");
  return result(messages.length === 0, messages.length ? messages : ["The loop now asks a function what to say. This was a pattern check. Python was not run."]);
}

function checkM3Write(code) {
  const n = stripComments(code);
  const messages = [];
  if (/colors\s*=/.test(n) && !/subprocess/.test(n)) messages.push("That is the color example. This task uses subprocess and a whitelist of apps.");
  if (!/import\s+subprocess/.test(n)) messages.push("Import subprocess.");
  if (/shell\s*=\s*True/.test(n) || /os\.system\s*\(/.test(n)) messages.push("Do not use shell=True or os.system. Pass a list such as [\"notepad.exe\"] to Popen.");
  if (!/notepad\.exe/.test(n) || !/calc\.exe/.test(n)) messages.push("The whitelist should include notepad.exe and calc.exe only.");
  if (!/def\s+open_app\s*\(/.test(n)) messages.push("Define open_app.");
  if (!/Popen\s*\(/.test(n)) messages.push("Call subprocess.Popen with the list from the whitelist.");
  if (!/Opening/.test(n)) messages.push("Return a message that starts with Opening when the app is allowed.");
  if (!/not in/.test(n) && !/not\s+ALLOWED/.test(n) && !/\.get\s*\(/.test(n)) messages.push("Refuse a name that is not in the whitelist.");
  return result(messages.length === 0, messages.length ? messages : ["You wrote a launcher that can only open the apps you listed. This was a pattern check. Nothing was launched."]);
}

function checkM3Wire(code) {
  const n = stripComments(code);
  const messages = [];
  if (!/startswith\s*\(\s*["']open ["']\s*\)/.test(n) && !/startswith\s*\(\s*["']open["']\s*\)/.test(n)) messages.push("Test whether the lowercased command starts with open.");
  if (!/split\s*\(/.test(n)) messages.push("Use split() to take the app name after open.");
  if (!/open_app\s*\(/.test(n)) messages.push("Call open_app with that name.");
  return result(messages.length === 0, messages.length ? messages : ["A typed command can now ask your whitelist launcher to run. This was a pattern check. No app was opened."]);
}

function checkM4Messages(code) {
  const n = stripComments(code);
  const messages = [];
  if (/item["']?\s*:/.test(n) && !/role/.test(n)) messages.push("That looks like the grocery example. Build a messages list with role and content.");
  if (!/messages\s*=/.test(n)) messages.push("Store the list in messages.");
  if (!/["']system["']/.test(n) || !/["']user["']/.test(n)) messages.push("Include one system dictionary and one user dictionary.");
  if (!/["']role["']/.test(n) || !/["']content["']/.test(n)) messages.push("Each dictionary needs role and content.");
  if (!/JARVIS/.test(n)) messages.push("The system content should describe JARVIS.");
  if (!/\bcommand\b/.test(n)) messages.push("The user content should be the command variable, not a fixed sentence.");
  return result(messages.length === 0, messages.length ? messages : ["You can now shape one turn as data. This was a pattern check. Ollama was not called."]);
}

function checkM4Call(code) {
  const n = stripComments(code);
  const messages = [];
  if (/catalog\.lookup/.test(n)) messages.push("That is the catalog example. Call ollama.chat.");
  if (!/import\s+ollama/.test(n)) messages.push("Import ollama.");
  if (!/ollama\.chat\s*\(/.test(n)) messages.push("Call ollama.chat.");
  if (!/qwen3:8b/.test(n)) messages.push("Set the model keyword to qwen3:8b.");
  if (!/messages\s*=\s*messages/.test(n)) messages.push("Pass messages=messages.");
  if (!/think\s*=\s*False/.test(n)) messages.push("Pass think=False so the reply is not hidden reasoning.");
  if (!/\[["']message["']\]\s*\[["']content["']\]/.test(n)) messages.push("Read response[\"message\"][\"content\"].");
  return result(messages.length === 0, messages.length ? messages : ["You wrote the local model call. This browser did not contact Ollama. Run it on your computer when Ollama is already running."]);
}

function appended(code, role, value) {
  const pattern = new RegExp("append\\s*\\(\\s*\\{[\\s\\S]*?[\"']" + role + "[\"'][\\s\\S]*?\\b" + value + "\\b[\\s\\S]*?\\}|append\\s*\\(\\s*\\{[\\s\\S]*?\\b" + value + "\\b[\\s\\S]*?[\"']" + role + "[\"'][\\s\\S]*?\\}");
  return pattern.test(code);
}

function checkM5Append(code) {
  const n = stripComments(code);
  const messages = [];
  if (/["']item["']/.test(n) && !/["']role["']/.test(n)) messages.push("That is the shopping example. Append role and content.");
  const user = appended(n, "user", "command");
  const bot = appended(n, "assistant", "reply");
  if (!user) messages.push("Append a user dictionary whose content is command.");
  if (!bot) messages.push("Append an assistant dictionary whose content is reply.");
  return result(messages.length === 0, messages.length ? messages : ["You can keep this turn in the same list you send next time. This was a pattern check. Nothing was saved to disk."]);
}

function checkM5Save(code) {
  const n = stripComments(code);
  const messages = [];
  if (/scores\.txt/.test(n)) messages.push("That is the score example. Write messages to memory.json.");
  if (!/import\s+json/.test(n)) messages.push("Import json.");
  if (!/memory\.json/.test(n)) messages.push("Use the file name memory.json.");
  if (!/json\.dump/.test(n)) messages.push("Use json.dump or json.dumps with messages.");
  if (!/\bmessages\b/.test(n)) messages.push("Save the messages list, not a single string.");
  return result(messages.length === 0, messages.length ? messages : ["You wrote a save step for the conversation. This browser did not create a file."]);
}

function checkM5Load(code) {
  const n = stripComments(code);
  const messages = [];
  if (!/memory\.json/.test(n)) messages.push("Read memory.json.");
  if (!/json\.loads?\s*\(/.test(n)) messages.push("Use json.load or json.loads.");
  if (!/\[\s*\]/.test(n)) messages.push("If the file is missing, start messages as an empty list.");
  return result(messages.length === 0, messages.length ? messages : ["You wrote a load step. This browser did not read a file. The exists-or-empty choice is only checked by pattern."]);
}

function checkM6Say(code) {
  const n = stripComments(code);
  const messages = [];
  if (/def\s+show\s*\(/.test(n) && !/pyttsx3/.test(n)) messages.push("That is the print example. Import pyttsx3 and define say.");
  if (!/import\s+pyttsx3/.test(n)) messages.push("Import pyttsx3.");
  if (!/def\s+say\s*\(\s*text\s*\)\s*:/.test(n)) messages.push("Define say(text).");
  if (!/\.say\s*\(\s*text\s*\)/.test(n)) messages.push("Call the engine's say method with text.");
  if (!/runAndWait\s*\(/.test(n)) messages.push("Call runAndWait() so the speech finishes.");
  return result(messages.length === 0, messages.length ? messages : ["You wrote a speak function. This site did not speak and did not install anything. The library has to be installed on your computer before it can run."]);
}

function checkM6Plan(code) {
  const comments = normalize(code).split("\n").filter((line) => line.trim().indexOf("#") === 0);
  const blob = comments.join(" ").toLowerCase();
  if (comments.length < 2) return result(false, ["Write at least two comment lines. This is a plan, not a microphone test."]);
  if (!/microphone|speech_recognition|listen/.test(blob)) return result(false, ["Mention where listening will happen: microphone, listen, or speech_recognition."]);
  return result(true, ["You planned the listening step. The microphone was not opened."]);
}

function checkM7Html(code) {
  const n = code.toLowerCase();
  const messages = [];
  if (!/<textarea\b|<input\b/.test(n)) messages.push("Add a textarea or input for the command.");
  if (!/<button\b/.test(n)) messages.push("Add a button.");
  if (!/id\s*=\s*["']messages["']|class\s*=\s*["']messages["']/.test(n)) messages.push("Add an element whose id or class is messages.");
  return result(messages.length === 0, messages.length ? messages : ["The page has the three pieces of a chat shell. This check only looked at the tags. It did not open the page or run JavaScript."]);
}

function checkM8Outline(code) {
  const comments = normalize(code).split("\n").map((line) => line.trim()).filter((line) => line.indexOf("#") === 0);
  const blob = comments.join(" ").toLowerCase();
  const messages = [];
  if (comments.length < 4) messages.push("Write at least four comment lines, one idea per line.");
  if (!/input|command/.test(blob)) messages.push("Include the step that reads a command.");
  if (!/ollama|model|qwen/.test(blob)) messages.push("Include the step that asks the local model.");
  if (!/exit|quit|stop/.test(blob)) messages.push("Include how the loop stops.");
  if (!/memory|message|history/.test(blob)) messages.push("Include where the turn is remembered.");
  return result(messages.length === 0, messages.length ? messages : ["You wrote your own map of one turn. This is a design check. A full assistant was not built or run."]);
}

function practicePassed(code, lesson) {
  const got = normalize(code).replace(/'/g, "\"");
  const need = normalize(lesson.code).replace(/'/g, "\"");
  if (got === need) return result(true, ["That matches the task. Single and double quotes both count. Python was not run."]);
  return result(false, [firstDifference(code, lesson.code)]);
}

function firstDifference(typed, expected) {
  const got = normalize(typed).replace(/'/g, "\"").split("\n");
  const need = normalize(expected).replace(/'/g, "\"").split("\n");
  const length = Math.max(got.length, need.length);
  for (let i = 0; i < length; i += 1) {
    if (got[i] === need[i]) continue;
    if (got[i] === undefined) return "Missing line " + (i + 1) + ": " + need[i];
    if (need[i] === undefined) return "Extra line " + (i + 1) + ": " + got[i];
    return "Line " + (i + 1) + " is different. You typed: " + got[i] + " Needed: " + need[i];
  }
  return "The program does not match the task yet.";
}

const CHECKS = {
  "m1-input": checkM1Input,
  "m1-reply": checkM1Reply,
  "m1-exit": checkM1Exit,
  "m1-build": checkM1Build,
  "m1-debug": checkM1Debug,
  "m2-function": checkM2Function,
  "m2-elif": checkM2Elif,
  "m2-import": checkM2Import,
  "m2-wire": checkM2Wire,
  "m3-write": checkM3Write,
  "m3-wire": checkM3Wire,
  "m4-messages": checkM4Messages,
  "m4-call": checkM4Call,
  "m5-append": checkM5Append,
  "m5-save": checkM5Save,
  "m5-load": checkM5Load,
  "m6-say": checkM6Say,
  "m6-plan": checkM6Plan,
  "m7-html": checkM7Html,
  "m8-outline": checkM8Outline
};

function cp(id, minutes, title, outcome, fields) {
  const item = {
    id: id,
    minutes: minutes,
    title: title,
    outcome: outcome,
    type: fields.type || "write",
    building: fields.building,
    why: fields.why,
    concept: fields.concept,
    exampleTitle: fields.exampleTitle || "",
    example: fields.example || "",
    exampleNote: fields.exampleNote || "",
    broken: fields.broken || "",
    syntax: fields.syntax || [],
    discover: fields.discover || "",
    challenge: fields.challenge,
    hints: fields.hints || [],
    solution: fields.solution || "",
    limits: fields.limits || "This check looks at the shape of what you typed. It does not run Python.",
    success: fields.success,
    wrong: fields.wrong || "",
    answer: fields.answer || "",
    options: fields.options || [],
    local: fields.local || null,
    achievement: fields.achievement || ""
  };
  return item;
}

const MISSIONS = [
  {
    id: "m1",
    number: 1,
    title: "My first interactive assistant",
    promise: "A text program that reads a command, answers, and exits.",
    summary: "You will write the skeleton every later JARVIS piece hangs on: ask, decide, reply, repeat, stop.",
    checkpoints: [
      cp("m1-shape", 4, "Choose how an assistant listens", "You can explain why one question is not an assistant.", {
        type: "choice",
        building: "A program that stays open and waits for the next command.",
        why: "If the program asks once and ends, it is a form. JARVIS has to stay in the conversation until you dismiss it.",
        concept: "A loop repeats a block. Inside it, input pauses for one line. A test later decides whether to break, which means leave the loop.",
        challenge: "Which structure can be a text assistant?",
        options: [
          { id: "a", text: "Ask one question, print one reply, then let the program end." },
          { id: "b", text: "Keep asking for a command, reply, and repeat until the person says exit." },
          { id: "c", text: "Store every sentence a person might ever say, and hope the next one is on the list." }
        ],
        answer: "b",
        wrong: "One question ends too soon. A giant list cannot hold every sentence. The assistant needs a repeat-until-exit loop.",
        success: "You can explain the shape: listen, reply, repeat, and leave only when asked. No code was run.",
        limits: "This is a decision, not a code execution."
      }),
      cp("m1-input", 5, "Ask for a command", "You can read one line into a variable.", {
        building: "The line that waits for the person.",
        why: "Without input, the assistant can only talk to itself.",
        concept: "input shows a prompt and returns the line the person types, as text. The name on the left of = stores that text.",
        exampleTitle: "A library desk, not JARVIS",
        example: "title = input(\"Title: \")\nprint(\"Looking up\", title)",
        exampleNote: "If the person types Dune, the screen shows Looking up Dune. Your assistant asks for a command, not a book.",
        syntax: [
          ["input(prompt)", "Pauses, shows the prompt, and returns one line of text."],
          ["=", "Works out the right side, then points the name on the left at that result."],
          ["\"You: \"", "The quotes make text. They are not shown as part of the answer the person types."]
        ],
        discover: "In a terminal opened on your computer, run python, then type help(input). In Cursor, type input( and read the popup. This page cannot open that help for you.",
        challenge: "Write one line that asks with the prompt You: and stores the answer in a variable named command.",
        hints: [
          "The library example used title and Title:. You need different names.",
          "The function that pauses for a line is input.",
          "The variable is command. The prompt inside the quotes is You: "
        ],
        solution: "command = input(\"You: \")",
        success: "You can now read one command from a person.",
        achievement: "read-command"
      }),
      cp("m1-reply", 5, "Answer hello", "You can choose one reply with if.", {
        building: "A branch that recognises one command.",
        why: "An assistant that prints the same line every time is only an echo.",
        concept: "if runs the indented lines only when the test is true. == compares two values. A colon starts the block. Four spaces show what is inside it.",
        exampleTitle: "A door, not JARVIS",
        example: "word = input(\"Password: \")\nif word == \"open\":\n    print(\"Door unlocked\")",
        exampleNote: "The print is indented, so it belongs to the if. Your test should use the command you already stored, and a JARVIS reply.",
        syntax: [
          ["if test:", "Ask a yes-or-no question. The colon is required."],
          ["==", "Equal. One = stores a value. Two = compare."],
          ["indent", "Four spaces put the next line inside the if."]
        ],
        discover: "If a block fails, Python usually prints IndentationError or points at the line above the colon. Read that line first.",
        challenge: "command is already stored. Write an if that prints JARVIS: At your service. when command is exactly hello. Indent the print.",
        hints: [
          "Do not ask for a password. The variable is already called command.",
          "Compare with == and the text hello.",
          "The print must be indented under the if, and the reply contains At your service."
        ],
        solution: "if command == \"hello\":\n    print(\"JARVIS: At your service.\")",
        success: "You can answer hello.",
        achievement: "hello-branch"
      }),
      cp("m1-exit", 5, "Leave when asked", "You can stop a loop with break.", {
        building: "The dismiss command.",
        why: "while True never ends by itself. You need an explicit way out, or the assistant traps the person.",
        concept: "while True repeats forever. break leaves that loop immediately. .lower() returns a lowercase copy so Exit and exit can share one test.",
        exampleTitle: "A survey, not JARVIS",
        example: "while True:\n    answer = input(\"More? \")\n    if answer.lower() == \"no\":\n        print(\"Survey closed\")\n        break",
        exampleNote: "The survey stops on no. Your assistant stops on exit and says goodbye.",
        syntax: [
          ["while True:", "Repeat until something inside breaks."],
          [".lower()", "A method on text. It does not change the original variable unless you store it back."],
          ["break", "Leave the nearest loop now."]
        ],
        discover: "Type help(str.lower) in a local Python prompt to see the method. This page does not run help.",
        challenge: "Write the exit branch only. If a lowercased command is exit, print JARVIS: Goodbye. and break.",
        hints: [
          "The survey looked for no. You are looking for exit.",
          "Call .lower() on command before comparing.",
          "Print the goodbye, then break. Both lines are indented under the if."
        ],
        solution: "if command.lower() == \"exit\":\n    print(\"JARVIS: Goodbye.\")\n    break",
        success: "You can leave the loop on purpose.",
        achievement: "exit-loop"
      }),
      cp("m1-build", 7, "Build the command loop", "You have a first assistant you can run locally.", {
        building: "The whole first prototype, in one program.",
        why: "The pieces only become an assistant when they share one loop. This is the Build Complete moment for Mission 1.",
        concept: "Put the ask, the exit test, the hello test, and a fallback in that order. else runs when the hello test is false. Exit should break before hello is considered, so goodbye is the last line.",
        exampleTitle: "What you are not copying",
        example: "order = \"\"\nwhile order != \"done\":\n    order = input(\"Order: \")\n    print(\"Noted:\", order)",
        exampleNote: "A cafe can stop by comparing the loop test. Your assistant uses while True and break, because later missions will add more commands than one word.",
        syntax: [
          ["else:", "The path when the if above it was false."],
          ["print(\"text\")", "Shows that text, then moves to the next line."]
        ],
        discover: "When you run this locally, a traceback names the file and line. Read the last line of the traceback first.",
        challenge: "Write the whole assistant. Use while True. Ask with You: and store command. If exit is typed in any capitalisation, print JARVIS: Goodbye. and break. If hello is typed in any capitalisation, print JARVIS: At your service. Otherwise print JARVIS: I heard you.",
        hints: [
          "The first line of the loop is the input line from the earlier checkpoint.",
          "Test exit before hello, and break only in the exit branch.",
          "else belongs to the hello test, not to the exit test, so goodbye does not also print I heard you."
        ],
        solution: "while True:\n    command = input(\"You: \")\n    if command.lower() == \"exit\":\n        print(\"JARVIS: Goodbye.\")\n        break\n    if command.lower() == \"hello\":\n        print(\"JARVIS: At your service.\")\n    else:\n        print(\"JARVIS: I heard you.\")",
        local: {
          title: "Run it on your computer",
          steps: [
            "This website cannot run Python.",
            "Create a new file named assistant.py. Do not replace main.py.",
            "Paste the program you wrote.",
            "In the terminal, run: python assistant.py",
            "Type hello, then type exit.",
            "You should see the greeting, then goodbye, then the program stops."
          ]
        },
        success: "Build complete: you wrote a command loop. You can now process a user command and stop when asked.",
        achievement: "command-loop"
      }),
      cp("m1-debug", 4, "Repair a stuck assistant", "You can see why a loop fails to stop.", {
        building: "A fix for a broken copy of the assistant.",
        why: "Real programs fail in small ways: the wrong comparison, or a line that is not inside the branch you meant.",
        concept: "Python runs from top to bottom inside the loop. A print that is not indented under if runs every time. == \"exit\" is false for Exit.",
        broken: "while True:\n    command = input(\"You: \")\n    if command == \"exit\":\n        print(\"JARVIS: Goodbye.\")\n    print(\"JARVIS: I heard you.\")",
        exampleTitle: "What is wrong, without the fix",
        example: "The goodbye print does not stop the loop.\nThe following print is not inside an else, so it also runs after goodbye.\nExit with a capital E never matches.",
        exampleNote: "Describe the bugs in your head, then write a corrected whole program. Do not paste the broken one back.",
        syntax: [
          ["else", "Stops the fallback from running after a matched command."],
          ["break", "The only line here that ends while True."]
        ],
        discover: "Add print(repr(command)) temporarily on your computer if a comparison surprises you. repr shows hidden spaces. Remove it after.",
        challenge: "Write a corrected assistant with the same replies as the build: goodbye and break on any capitalisation of exit, the service line for hello, and I heard you only as the fallback.",
        hints: [
          "The second print in the broken program needs to move under else.",
          "break is missing, so goodbye never ends the loop.",
          "Compare command.lower() with exit, not the raw command."
        ],
        solution: "while True:\n    command = input(\"You: \")\n    if command.lower() == \"exit\":\n        print(\"JARVIS: Goodbye.\")\n        break\n    if command.lower() == \"hello\":\n        print(\"JARVIS: At your service.\")\n    else:\n        print(\"JARVIS: I heard you.\")",
        success: "You repaired the loop.",
        achievement: "debugger"
      })
    ]
  },
  {
    id: "m2",
    number: 2,
    title: "Give JARVIS useful commands",
    promise: "One function that recognises several commands, called from the loop.",
    summary: "Functions keep the loop readable. Importing datetime shows how a module gives you a tool you did not write.",
    checkpoints: [
      cp("m2-function", 6, "Hand a reply back", "You can return text from a function.", {
        building: "A function the loop can ask.",
        why: "If every reply is pasted inside the loop, the next command makes a mess. A function has a name, receives the command, and returns the line to print.",
        concept: "def stores the function. It does not run until you call it. return sends a value back and leaves the function. The caller can print that value.",
        exampleTitle: "A label maker, not JARVIS",
        example: "def label(item):\n    return \"Box: \" + item\n\nprint(label(\"tea\"))",
        exampleNote: "label returns text. It does not print. Your function is reply, and it receives command.",
        syntax: [
          ["def name(parameter):", "Save steps under a name. The parameter is filled by the call."],
          ["return", "Hand a value back and leave the function immediately."],
          ["reply(command)", "A call. command here is the argument."]
        ],
        discover: "If you see None printed, the function reached its end without return. Python returns None in that case.",
        challenge: "Define reply(command). If the lowercased command is hello, return JARVIS: At your service. Otherwise return JARVIS: I heard you. Do not print inside the function.",
        hints: [
          "The example function is label. Yours is reply.",
          "Use return, not print, so the loop can decide how to show the text.",
          "else should return the fallback sentence."
        ],
        solution: "def reply(command):\n    if command.lower() == \"hello\":\n        return \"JARVIS: At your service.\"\n    return \"JARVIS: I heard you.\"",
        success: "You can put a reply in a function and hand it back.",
        achievement: "functions"
      }),
      cp("m2-elif", 7, "Recognise help and time", "You can choose among several commands.", {
        building: "A reply function with more than one command.",
        why: "elif is how one function picks exactly one path. A stack of separate if blocks can run more than one reply.",
        concept: "elif is tested only when every earlier test failed. The order is the design: exit is handled by the loop, not by this function, because exit has to break.",
        exampleTitle: "A shop sign, not JARVIS",
        example: "def sign(day):\n    if day == \"mon\":\n        return \"Closed\"\n    elif day == \"sat\":\n        return \"Short hours\"\n    else:\n        return \"Open\"",
        exampleNote: "Only one string comes back. Your tests are hello, help, and time.",
        syntax: [
          ["elif test:", "Another question, only if the if above was false."],
          ["else:", "Everything that matched none of the tests."]
        ],
        discover: "Swap two branches on your computer if the wrong reply appears. The first true test wins.",
        challenge: "Write reply(command) with if and elif. hello returns JARVIS: At your service. help returns JARVIS: commands are hello, help, and time. time returns JARVIS: I have no clock yet. Anything else returns JARVIS: I heard you.",
        hints: [
          "Use elif so help does not also fall into time.",
          "Compare the lowercased command.",
          "The help sentence must include: commands are hello, help, and time"
        ],
        solution: "def reply(command):\n    text = command.lower()\n    if text == \"hello\":\n        return \"JARVIS: At your service.\"\n    elif text == \"help\":\n        return \"JARVIS: commands are hello, help, and time\"\n    elif text == \"time\":\n        return \"JARVIS: I have no clock yet\"\n    return \"JARVIS: I heard you.\"",
        success: "You can recognise more than one command.",
        achievement: "many-commands"
      }),
      cp("m2-import", 6, "Use a tool from the standard library", "You can import datetime and return the hour.", {
        building: "A real clock reading, still separate from the assistant loop.",
        why: "You do not write the clock. import loads a module Python already shipped. You then use its names.",
        concept: "import datetime loads the module. datetime.datetime.now() returns the current local time. .hour is a number from 0 to 23.",
        exampleTitle: "A square root, not a clock",
        example: "import math\nprint(math.sqrt(9))",
        exampleNote: "math.sqrt is a tool inside the math module. datetime is a different module. The square root prints 3.0.",
        syntax: [
          ["import datetime", "Load the module. The name datetime then refers to it."],
          ["datetime.datetime.now()", "The module contains a class also named datetime. now() asks that class for the current time."],
          [".hour", "An attribute of the time object."]
        ],
        discover: "Locally, import datetime then help(datetime.datetime.now). This page cannot call help.",
        challenge: "Import datetime. Define current_hour() so it returns the hour from datetime.datetime.now(). Do not print inside the function.",
        hints: [
          "The example imported math. You import datetime.",
          "now() is called on datetime.datetime.",
          "Return the hour. Do not return the whole timestamp unless you also take .hour."
        ],
        solution: "import datetime\n\ndef current_hour():\n    return datetime.datetime.now().hour",
        success: "You can import a standard library tool and return one piece of it.",
        achievement: "imports"
      }),
      cp("m2-wire", 7, "Let the loop ask the function", "The loop prints whatever reply returns.", {
        building: "The assistant loop, thinner than before.",
        why: "The loop should decide when to stop. The function should decide what to say. Mixing those makes the next mission harder.",
        concept: "print(reply(command)) shows the returned text. Exit is still a special case before that call, because a returned string cannot break the loop.",
        exampleTitle: "A caller, not the assistant",
        example: "def box(item):\n    return \"Box: \" + item\n\nprint(box(\"tea\"))",
        exampleNote: "The call is in the print. Your call is reply(command), inside the loop, and only when the person did not exit.",
        syntax: [
          ["print(reply(command))", "Call the function, then print what it returns."]
        ],
        discover: "If the program prints None, reply did not return a string.",
        challenge: "Write the loop again. On exit, print JARVIS: Goodbye. and break. Otherwise print whatever reply(command) returns. You may assume reply already exists above this loop.",
        hints: [
          "Do not paste the body of reply into the loop.",
          "The exit test happens before the call.",
          "print receives the call reply(command)."
        ],
        solution: "while True:\n    command = input(\"You: \")\n    if command.lower() == \"exit\":\n        print(\"JARVIS: Goodbye.\")\n        break\n    print(reply(command))",
        local: {
          title: "Run the pieces together",
          steps: [
            "Put reply and the loop in assistant.py. Leave main.py alone.",
            "Run python assistant.py",
            "Try hello, help, time, a nonsense word, then exit."
          ]
        },
        success: "The loop now asks a function what to say.",
        achievement: "wired-commands"
      })
    ]
  },
  {
    id: "m3",
    number: 3,
    title: "Make JARVIS control Windows",
    promise: "A whitelist that can open Notepad or Calculator and refuses everything else.",
    summary: "Launching programs is powerful. The safe version names the allowed files yourself and never passes a typed sentence to the shell.",
    checkpoints: [
      cp("m3-choice", 5, "Choose the safe launch", "You can reject a command that runs whatever the person typed.", {
        type: "choice",
        building: "A boundary around Windows.",
        why: "subprocess can start another program. If you hand it the raw sentence the person typed, they can start anything, not only Notepad.",
        concept: "Popen([\"notepad.exe\"]) starts that one program. The list is the program plus its own arguments. shell=True and os.system ask the Windows shell to interpret a string. A typed string does not belong there.",
        challenge: "Which call is safe for an assistant that opens only apps you listed?",
        options: [
          { id: "a", text: "subprocess.Popen([\"notepad.exe\"]) using a name you looked up in your own whitelist." },
          { id: "b", text: "subprocess with shell=True and the raw command the person just typed." },
          { id: "c", text: "os.system with the person's whole sentence." }
        ],
        answer: "a",
        wrong: "shell=True and os.system will treat typed text as a Windows command. The list form starts only the program you named.",
        success: "You can tell a whitelist launch from a shell command. Nothing was opened.",
        limits: "This is a decision. No program was started.",
        achievement: "safe-choice"
      }),
      cp("m3-write", 8, "Write the whitelist", "You can open only Notepad or Calculator.", {
        building: "open_app(name), which refuses unknown names.",
        why: "The assistant should not invent new permissions. You write the allowed names in a dictionary, then launch only a list you typed yourself.",
        concept: "A dictionary maps your word notepad to the list [\"notepad.exe\"]. in tests the keys. subprocess.Popen starts the list. Returning a string lets the assistant tell the person what happened.",
        exampleTitle: "A color lookup, not Windows",
        example: "colors = {\"tea\": \"green\"}\n\ndef paint(name):\n    if name not in colors:\n        return \"unknown\"\n    return colors[name]",
        exampleNote: "paint only knows the keys you wrote. open_app will know notepad and calc, and those values are lists for Popen.",
        syntax: [
          ["import subprocess", "Load the launcher module."],
          ["{\"notepad\": [\"notepad.exe\"]}", "A key you chose, and the exact program list."],
          ["subprocess.Popen(command_list)", "Start that program. Do not set shell=True."]
        ],
        discover: "On your computer, the official subprocess docs describe Popen and why shell=True is easy to misuse. This page is not those docs.",
        challenge: "Import subprocess. Make ALLOWED map notepad to [\"notepad.exe\"] and calc to [\"calc.exe\"]. Define open_app(name). If name is not allowed, return That app is not allowed. Otherwise Popen the list and return Opening plus the name.",
        hints: [
          "Do not copy the colors dictionary. The module is subprocess.",
          "Values in ALLOWED are lists, because Popen wants a list.",
          "Refuse first. Only then call Popen. Never set shell=True."
        ],
        solution: "import subprocess\n\nALLOWED = {\n    \"notepad\": [\"notepad.exe\"],\n    \"calc\": [\"calc.exe\"]\n}\n\ndef open_app(name):\n    if name not in ALLOWED:\n        return \"That app is not allowed.\"\n    subprocess.Popen(ALLOWED[name])\n    return \"Opening \" + name",
        local: {
          title: "Try the whitelist locally",
          steps: [
            "Run this on your computer only if you want Notepad or Calculator to open.",
            "Call open_app(\"notepad\") and then open_app(\"cmd\").",
            "Notepad may open. cmd must be refused. This page cannot see that happen."
          ]
        },
        success: "You wrote a launcher that can only open the apps you listed.",
        achievement: "windows-safe"
      }),
      cp("m3-wire", 6, "Connect the open command", "The assistant can pass one whitelisted word to open_app.", {
        building: "The branch for a sentence such as open notepad.",
        why: "The person types a sentence. You take one word after open and pass only that word. You do not pass the whole sentence to Windows.",
        concept: "startswith tests a prefix. split() breaks the line on spaces. The second word is index 1. Print whatever open_app returns.",
        exampleTitle: "A prefix, not a launcher",
        example: "line = \"color tea\"\nif line.startswith(\"color \"):\n    name = line.split()[1]\n    print(name)",
        exampleNote: "This only prints tea. Your prefix is open, and you call open_app.",
        syntax: [
          [".startswith(\"open \")", "True when the text begins with those characters, including the space."],
          [".split()", "Returns a list of words. [1] is the second word."]
        ],
        discover: "If the person types only open, [1] does not exist and Python raises IndexError. You can guard with len(parts) < 2 later.",
        challenge: "Write the branch. If command.lower() starts with open and a space, take the second word and print open_app of that word.",
        hints: [
          "Lowercase the command before startswith.",
          "split()[1] is the app word, such as notepad.",
          "Pass that word to open_app. Do not pass the whole command to Popen."
        ],
        solution: "if command.lower().startswith(\"open \"):\n    name = command.lower().split()[1]\n    print(open_app(name))",
        success: "A typed command can now ask your whitelist launcher to run.",
        achievement: "open-command"
      })
    ]
  },
  {
    id: "m4",
    number: 4,
    title: "Connect local AI",
    promise: "A written call to your local Ollama model qwen3:8b.",
    summary: "The model stays on your computer. This site only checks that you wrote the call. It never contacts Ollama.",
    checkpoints: [
      cp("m4-messages", 6, "Turn a turn into data", "You can build the messages list a chat model expects.", {
        building: "The list you will send with one user command.",
        why: "The model does not see your variables unless you put them in the list. Each item is a dictionary with a role and content.",
        concept: "role is who spoke: system sets behavior, user is the person. content is the text. The user content should be the command variable so each turn can differ.",
        exampleTitle: "A grocery line, not a chat",
        example: "cart = [{\"item\": \"tea\", \"qty\": 2}]",
        exampleNote: "A dictionary can hold any labels. The model expects the labels role and content.",
        syntax: [
          ["{\"role\": \"user\", \"content\": command}", "One turn. command is the variable, so it is not inside extra quotes."],
          ["[item, item]", "A list keeps the turns in order."]
        ],
        discover: "Your existing main.py already builds a messages list. Read it. This exercise writes a small version in assistant.py and does not edit main.py.",
        challenge: "Create messages as a list. First dictionary: role system, and content that includes the word JARVIS. Second dictionary: role user, and content set to the command variable.",
        hints: [
          "Do not use item and qty. The keys are role and content.",
          "The system content is a sentence. The user content is the name command, without quotes around the name.",
          "Both dictionaries sit inside one list assigned to messages."
        ],
        solution: "messages = [\n    {\"role\": \"system\", \"content\": \"You are JARVIS. Answer clearly and briefly.\"},\n    {\"role\": \"user\", \"content\": command}\n]",
        success: "You can shape one turn as data.",
        achievement: "messages"
      }),
      cp("m4-call", 8, "Call qwen3:8b", "You wrote the Ollama call your computer can run later.", {
        building: "The three lines that ask the local model.",
        why: "ollama.chat sends the list and returns a dictionary. think=False asks this model not to hide the answer behind a reasoning trace. The reply text is nested under message, then content.",
        concept: "Keyword arguments name each input, the same idea as section=\"tea\" in the example. You did not write the model. You call a function the ollama package provides, and only if that package is installed and Ollama is running.",
        exampleTitle: "Keyword arguments, not Ollama",
        example: "reply = catalog.lookup(section=\"tea\", items=shelf)",
        exampleNote: "section and items are parameter names. Your parameter names are model, messages, and think.",
        syntax: [
          ["import ollama", "Load the Python package that talks to the Ollama app."],
          ["model=\"qwen3:8b\"", "The model you already installed locally."],
          ["think=False", "Skip the hidden reasoning trace on this model."],
          ["response[\"message\"][\"content\"]", "Two lookups. First the message dictionary, then the text."]
        ],
        discover: "On your computer, the Ollama Python library documents chat. This website does not call it.",
        challenge: "Import ollama. Call ollama.chat with model qwen3:8b, messages=messages, and think=False. Store it in response. Then set reply to response[\"message\"][\"content\"].",
        hints: [
          "The example function is catalog.lookup. Yours is ollama.chat.",
          "All three keywords are required for this task: model, messages, and think.",
          "The text is not response itself. It is inside message, then content."
        ],
        solution: "import ollama\n\nresponse = ollama.chat(model=\"qwen3:8b\", messages=messages, think=False)\nreply = response[\"message\"][\"content\"]",
        local: {
          title: "This call needs your computer",
          steps: [
            "Ollama must already be running, with qwen3:8b pulled.",
            "The ollama Python package must be installed.",
            "Put the messages list and this call in assistant.py, then run that file.",
            "This website cannot see Ollama and will not claim the model answered."
          ]
        },
        success: "You wrote the local model call.",
        achievement: "ollama-call",
        limits: "Pattern check only. Ollama was not contacted."
      }),
      cp("m4-local", 5, "Know what the browser cannot do", "You can say where the model actually runs.", {
        type: "choice",
        building: "A true picture of this website versus your PC.",
        why: "A green check on the call would be a lie if the model never saw it. The call runs only where Ollama is installed.",
        concept: "GitHub Pages sends HTML, CSS, and JavaScript. It does not run your Python and it does not open a port to the Ollama app on your PC.",
        challenge: "Where does qwen3:8b answer?",
        options: [
          { id: "a", text: "Inside this website, as soon as the pattern check passes." },
          { id: "b", text: "On your computer, when you run Python and the Ollama app is already running." },
          { id: "c", text: "On GitHub's servers, using main.py from the repository." }
        ],
        answer: "b",
        wrong: "Passing a pattern check only means the text looks right. GitHub Pages does not run main.py or Ollama.",
        success: "You can separate a written call from a model that actually answered.",
        limits: "This is a decision. No model was called.",
        achievement: "honest-model"
      })
    ]
  },
  {
    id: "m5",
    number: 5,
    title: "Remember conversations",
    promise: "A list that keeps turns, plus a written save and load for memory.json.",
    summary: "Short-term memory is the list you already send. Persistent memory is that list written to a file and read back.",
    checkpoints: [
      cp("m5-append", 6, "Keep this turn", "You can append the user line and the assistant line.", {
        building: "Two new dictionaries on the messages list.",
        why: "If you only send the latest command, the model cannot refer to earlier answers. append adds to the same list.",
        concept: "append changes the list in place. The first dictionary is the person. The second is the assistant, using the reply you already have.",
        exampleTitle: "A shopping cart, not a chat",
        example: "cart = []\ncart.append({\"item\": \"tea\", \"qty\": 1})",
        exampleNote: "append adds one dictionary. You will add two, with role and content.",
        syntax: [
          [".append(item)", "Add one item to the end of the list."],
          ["{\"role\": \"assistant\", \"content\": reply}", "The model's answer, stored the same way as the user's command."]
        ],
        discover: "Print the length of messages before and after append when you run this locally. The length should grow by two.",
        challenge: "Append a user dictionary whose content is command. Then append an assistant dictionary whose content is reply.",
        hints: [
          "Do not append item and qty.",
          "The first role is user. The second role is assistant.",
          "content for the user is the variable command. content for the assistant is the variable reply."
        ],
        solution: "messages.append({\"role\": \"user\", \"content\": command})\nmessages.append({\"role\": \"assistant\", \"content\": reply})",
        success: "You can keep this turn in the list you send next time.",
        achievement: "memory"
      }),
      cp("m5-save", 7, "Save the list", "You wrote a file save. The file was not created here.", {
        building: "memory.json on disk.",
        why: "A list disappears when the program ends. json can turn the list into text a file can hold.",
        concept: "json.dumps returns a string. json.dump writes straight to a file object. Either is acceptable if the file is memory.json and the value is messages.",
        exampleTitle: "A score file, not memory",
        example: "from pathlib import Path\nPath(\"scores.txt\").write_text(\"10\")",
        exampleNote: "That writes one plain line. Your file should be JSON so the roles survive.",
        syntax: [
          ["import json", "Load the JSON tools."],
          ["json.dumps(messages)", "Make a JSON string from the list."],
          ["Path(\"memory.json\").write_text(text)", "Replace the file with that text."]
        ],
        discover: "After a local run, open memory.json. If you see role and content, the save worked. This page will not open the file.",
        challenge: "Import json. Save messages into a file named memory.json. Use json.dump or json.dumps. You may use pathlib or open().",
        hints: [
          "The example file name is scores.txt. Yours is memory.json.",
          "Pass messages to json, not a sentence you invent.",
          "write_text needs a string, so dumps is the pair for Path. dump is the pair for an open file."
        ],
        solution: "import json\nfrom pathlib import Path\nPath(\"memory.json\").write_text(json.dumps(messages))",
        success: "You wrote a save step for the conversation.",
        achievement: "saved-memory",
        limits: "Pattern check only. No file was written in the browser."
      }),
      cp("m5-load", 6, "Start from the file when it exists", "You wrote a load that falls back to an empty list.", {
        building: "The startup that restores messages.",
        why: "A save is useless if the next run ignores the file. The first run has no file yet, so the fallback is an empty list.",
        concept: "exists or a try around the open tells you the file is there. json.loads reads a string. json.load reads a file object. The names differ by one s.",
        exampleTitle: "A missing score, not a chat",
        example: "from pathlib import Path\nif Path(\"scores.txt\").exists():\n    text = Path(\"scores.txt\").read_text()\nelse:\n    text = \"0\"",
        exampleNote: "The shape is the same: if the file exists, read it, else start empty. Your file is memory.json and the result is a list.",
        syntax: [
          ["json.loads(text)", "Parse a JSON string into Python data."],
          ["else", "The path for the first run, before the file exists."]
        ],
        discover: "JSONDecodeError means the file is not valid JSON. Do not hide that error until you have seen it once locally.",
        challenge: "If memory.json exists, set messages from json.load or json.loads. Otherwise set messages to an empty list.",
        hints: [
          "The example uses scores.txt. You use memory.json.",
          "loads wants text. load wants a file.",
          "The empty fallback is [], not 0."
        ],
        solution: "import json\nfrom pathlib import Path\nfile = Path(\"memory.json\")\nif file.exists():\n    messages = json.loads(file.read_text())\nelse:\n    messages = []",
        success: "You wrote a load step.",
        achievement: "loaded-memory",
        limits: "Pattern check only. No file was read."
      })
    ]
  },
  {
    id: "m6",
    number: 6,
    title: "Add voice",
    promise: "A speak function, plus an honest plan for the microphone.",
    summary: "Speaking and listening are different libraries. This site does not use your microphone.",
    checkpoints: [
      cp("m6-choice", 4, "Separate speaking from listening", "You know which library does which job.", {
        type: "choice",
        building: "A map of the two voice jobs.",
        why: "One library that plays sound cannot hear you. Treating input() as a microphone will only read the keyboard.",
        concept: "pyttsx3 talks through the speakers on your computer. The SpeechRecognition package, imported as speech_recognition, is a common way to ask a microphone library for a phrase. Both need to be installed locally. This page does not install them and does not open a microphone.",
        challenge: "Which statement is true?",
        options: [
          { id: "a", text: "pyttsx3 speaks. SpeechRecognition is for listening. This website uses neither." },
          { id: "b", text: "input() already hears the microphone, so no library is needed." },
          { id: "c", text: "Passing the pattern check will make this browser talk." }
        ],
        answer: "a",
        wrong: "input() reads the keyboard. This browser does not start speech when a check passes.",
        success: "You separated speaking, listening, and this website. The microphone was not opened.",
        limits: "This is a decision.",
        achievement: "voice-map"
      }),
      cp("m6-say", 7, "Write say(text)", "You wrote a local text-to-speech function.", {
        building: "A function the assistant can call after it has a reply.",
        why: "The model returns text. say is the step that plays that text. It is ordinary Python that happens to call a library.",
        concept: "pyttsx3.init() prepares an engine. say queues one phrase. runAndWait plays the queue and returns when it finishes.",
        exampleTitle: "A print wrapper, not speech",
        example: "def show(text):\n    print(text)",
        exampleNote: "show only uses the screen. say should not be a renamed print. It has to call the engine.",
        syntax: [
          ["import pyttsx3", "Load the library after you have installed it on your computer."],
          ["engine.say(text)", "Queue the words."],
          ["engine.runAndWait()", "Speak and block until the phrase ends."]
        ],
        discover: "Install and test pyttsx3 in a local terminal before trusting it. This page cannot install packages.",
        challenge: "Import pyttsx3. Define say(text). Create the engine, queue text, and call runAndWait.",
        hints: [
          "Do not define show, and do not only print.",
          "init is a function on pyttsx3.",
          "say and runAndWait are both needed. say alone only queues words."
        ],
        solution: "import pyttsx3\n\ndef say(text):\n    engine = pyttsx3.init()\n    engine.say(text)\n    engine.runAndWait()",
        local: {
          title: "Hear it only on your computer",
          steps: [
            "Install pyttsx3 locally if you want sound.",
            "Call say(\"At your service\") from assistant.py.",
            "This website did not play audio."
          ]
        },
        success: "You wrote a speak function.",
        achievement: "voice-say",
        limits: "Pattern check only. Nothing was spoken."
      }),
      cp("m6-plan", 5, "Plan the microphone", "You wrote where listening will go. Listening did not start.", {
        building: "A comment plan you can follow later.",
        why: "Microphone setup on Windows is fiddly. Planning the function boundary now stops you from stuffing audio code into the model call.",
        concept: "A later function can be named listen and return a string, the same kind of value input returns. The rest of the assistant should not care whether the string came from a keyboard or a microphone.",
        exampleTitle: "The boundary",
        example: "command = input(\"You: \")\n# later: command = listen()",
        exampleNote: "The loop still receives a string. You are writing the plan, not the recorder.",
        syntax: [
          ["#", "A comment. Python ignores it. Use it for the plan."]
        ],
        discover: "When you are ready locally, read the SpeechRecognition docs for Microphone and listen. Do not grant this website microphone permission. It has no listener.",
        challenge: "Write at least two comment lines. Describe a future listen step, and mention microphone, listen, or speech_recognition. Do not claim this page recorded you.",
        hints: [
          "Start each plan line with #.",
          "Say what listen will return: a string the loop already understands.",
          "Name the library or the microphone so the plan is specific."
        ],
        solution: "# listen() will use speech_recognition and the microphone.\n# It should return a string, like input, and leave the model call alone.",
        success: "You planned the listening step.",
        achievement: "voice-plan",
        limits: "Comment check only. The microphone was not opened."
      })
    ]
  },
  {
    id: "m7",
    number: 7,
    title: "Create a simple web interface",
    promise: "Chat-page markup, and a clear reason the model stays in Python.",
    summary: "HTML can draw the chat. It does not become your Ollama server just by being published.",
    checkpoints: [
      cp("m7-html", 8, "Mark up a chat shell", "You can write the three visible pieces of a chat page.", {
        building: "A tiny page: a place for messages, a field, and a button.",
        why: "The browser draws HTML. Before any JavaScript, the person needs somewhere to read, somewhere to type, and something to press.",
        concept: "textarea is a multiline field. button is the control. An element with id messages is the empty transcript JavaScript could later append to. This exercise stops at the markup.",
        exampleTitle: "A search box, not a chat",
        example: "<form>\n  <input id=\"q\">\n  <button>Search</button>\n</form>",
        exampleNote: "A search form has a field and a button, but nowhere to keep a conversation. Your page needs an element named messages.",
        syntax: [
          ["<textarea>", "A box for more than one line."],
          ["<button>", "A control the person can press."],
          ["id=\"messages\"", "A name JavaScript can find later. The quotes are part of HTML."]
        ],
        discover: "In Cursor, create chat.html and open it in a browser on your computer. This check will not open it.",
        challenge: "Write HTML with a textarea or input, a button, and an element whose id or class is messages.",
        hints: [
          "The example has no messages area. Add one.",
          "The field can be textarea, which fits a command better than a one-line search.",
          "The id must be the word messages."
        ],
        solution: "<div id=\"messages\"></div>\n<textarea id=\"command\"></textarea>\n<button type=\"button\">Send</button>",
        success: "The page has the three pieces of a chat shell.",
        achievement: "chat-page",
        limits: "The check looks for tags. It does not render the page or run JavaScript."
      }),
      cp("m7-choice", 5, "Keep the model behind Python", "You know a published page cannot see Ollama on your PC.", {
        type: "choice",
        building: "The boundary between the page and the assistant.",
        why: "HTML and JavaScript on GitHub Pages are public files. Your model is a program on your computer. Publishing the page does not connect them.",
        concept: "A later local Python server could offer a private page on your machine. That server would be the piece allowed to import ollama. The static page alone cannot.",
        challenge: "You publish this academy on GitHub Pages. Where should ollama.chat live?",
        options: [
          { id: "a", text: "In the public JavaScript, because the browser will find Ollama on your PC by itself." },
          { id: "b", text: "In the Python program on your computer. A static published page cannot reach your local Ollama." },
          { id: "c", text: "Inside the HTML tags. The browser runs Python from a div." }
        ],
        answer: "b",
        wrong: "The browser does not run your Python, and a public page does not automatically see a program bound to your computer.",
        success: "You can explain the boundary: the page draws the chat, Python on your computer talks to the model.",
        limits: "This is a decision. No server was started.",
        achievement: "frontend-boundary"
      }),
      cp("m7-local", 5, "Open the page yourself", "You know how to view the file without calling it a running chat.", {
        type: "choice",
        building: "A local preview habit.",
        why: "Double-clicking an HTML file shows the markup. It still does not connect to Ollama. Pretending the preview is the assistant would skip the Python work.",
        concept: "A static file has no backend. Buttons do nothing until you write JavaScript, and that JavaScript still should not be where the model key or the local model call lives.",
        challenge: "You open chat.html in a browser and see the box and the button. What do you have?",
        options: [
          { id: "a", text: "A visible shell. The button is not an assistant until a program answers." },
          { id: "b", text: "A finished JARVIS, because the button exists." },
          { id: "c", text: "Proof that GitHub ran your Python." }
        ],
        answer: "a",
        wrong: "A button is a control, not a conversation. Opening a file does not run main.py.",
        success: "You can look at a chat shell without calling it a working assistant.",
        limits: "This is a decision. The file was not opened by this check.",
        achievement: "preview-honest"
      })
    ]
  },
  {
    id: "m8",
    number: 8,
    title: "Combine everything",
    promise: "Your own map of one assistant turn, not a pasted final JARVIS.",
    summary: "The last mission checks that you can order the pieces and describe them. It does not generate a finished assistant for you.",
    checkpoints: [
      cp("m8-order", 5, "Order one turn", "You can put the pieces in an order that makes sense.", {
        type: "choice",
        building: "The sequence inside the loop.",
        why: "A model cannot answer a command you have not read. Speech cannot play a reply you have not received. Memory cannot store a turn that has not happened.",
        concept: "Read, remember the user line, ask the model, remember the reply, then show or speak it. Exit is the escape before the model call.",
        challenge: "Which order is one turn of the assistant?",
        options: [
          { id: "a", text: "Speak, then ask the model, then read the command." },
          { id: "b", text: "Read the command, store the user turn, ask the model, store the reply, then print or speak." },
          { id: "c", text: "Ask the model to invent the command, then exit immediately." }
        ],
        answer: "b",
        wrong: "The person speaks or types first. The model answers second. Showing the reply is last.",
        success: "You can walk one turn in order.",
        limits: "This is a decision. The pieces were not assembled or run.",
        achievement: "ordered-turn"
      }),
      cp("m8-outline", 8, "Write the map in your own comments", "You described a turn without pasting a finished assistant.", {
        building: "A comment outline you could rebuild from.",
        why: "If you can name the steps, you can rebuild them in a new file. Copying a full program would skip that.",
        concept: "Comments start with #. Write one step on each line: read, remember, ask the model, remember, show, and how exit stops the loop. Use your own words.",
        exampleTitle: "A shopping outline, not JARVIS",
        example: "# ask for the item\n# add it to the cart\n# stop when the person says done",
        exampleNote: "That is the shape of an outline. Your nouns are the assistant's: command, memory, model, exit.",
        syntax: [
          ["#", "Python ignores the rest of the line."]
        ],
        discover: "After the outline, rebuild assistant.py from it on your computer. Compare with main.py only after you have tried. Do not replace main.py until you mean to.",
        challenge: "Write at least four comment lines. Mention reading a command, the local model, memory or messages, and how the loop stops.",
        hints: [
          "Every line can start with #.",
          "Use the word ollama, model, or qwen somewhere.",
          "Say what happens on exit, in words, not by pasting the whole loop."
        ],
        solution: "# read a command with input\n# if it is exit, stop the loop\n# append the command to messages\n# ask the local ollama model\n# append the reply, then print or speak it",
        success: "You wrote your own map of one turn.",
        achievement: "architect",
        limits: "This checks comments, not a running assistant."
      }),
      cp("m8-honest", 5, "Mark what you have actually run", "You can tell a written plan from a tested assistant.", {
        type: "choice",
        building: "An honest finish line.",
        why: "The point of the academy is that you can rebuild JARVIS. A checkbox on a website is not the rebuild.",
        concept: "Pattern checks look at text. A local run is python assistant.py in your terminal, with Ollama running if you want a model answer. Voice and Windows launches are real only when you see or hear them.",
        challenge: "What is true after you finish every pattern check on this site?",
        options: [
          { id: "a", text: "You have a tested JARVIS with voice, memory, and Windows control, because the checks passed." },
          { id: "b", text: "You have written the pieces and the map. They count as run only for the parts you actually started on your computer." },
          { id: "c", text: "main.py was changed by the website and is now the finished assistant." }
        ],
        answer: "b",
        wrong: "This site does not run Python, does not edit main.py, and does not turn a pattern check into a tested voice assistant.",
        success: "You can finish the map without pretending the assistant already ran.",
        limits: "This is a decision. main.py was not modified.",
        achievement: "honest-finish"
      })
    ]
  }
];

const ACHIEVEMENTS = {
  "read-command": "You can read a command into a variable.",
  "hello-branch": "You can answer hello.",
  "exit-loop": "You can stop a loop on purpose.",
  "command-loop": "You have written a working command loop.",
  "debugger": "You repaired a loop that would not stop.",
  "functions": "You can return a reply from a function.",
  "many-commands": "You can branch across several commands.",
  "imports": "You can import a standard library tool.",
  "wired-commands": "The loop can ask a function what to say.",
  "safe-choice": "You rejected a launch that runs typed text.",
  "windows-safe": "You wrote a whitelist launcher. Nothing was opened here.",
  "open-command": "An open command can reach that whitelist.",
  "messages": "You can shape a chat turn as data.",
  "ollama-call": "You wrote a qwen3:8b call. Ollama was not contacted.",
  "honest-model": "You know the model runs on your computer, not in this page.",
  "memory": "You can append both sides of a turn.",
  "saved-memory": "You wrote a save step. No file was created here.",
  "loaded-memory": "You wrote a load step. No file was read here.",
  "voice-map": "You separated speaking from listening.",
  "voice-say": "You wrote say(text). Nothing was spoken here.",
  "voice-plan": "You planned the microphone. It was not opened.",
  "chat-page": "You marked up a chat shell. It was not opened here.",
  "frontend-boundary": "You kept the model call out of the public page.",
  "preview-honest": "You can preview HTML without calling it JARVIS.",
  "ordered-turn": "You can order one turn of the assistant.",
  "architect": "You wrote a map you can rebuild from.",
  "honest-finish": "You can tell a written plan from a tested run."
};

function allMissionChecks() {
  const list = [];
  MISSIONS.forEach((mission) => {
    mission.checkpoints.forEach((item) => {
      list.push(Object.assign({ missionId: mission.id, missionTitle: mission.title, missionNumber: mission.number }, item));
    });
  });
  return list;
}

function missionById(id) {
  return MISSIONS.filter((mission) => mission.id === id)[0] || null;
}

function checkpointById(id) {
  if (id.indexOf("p") === 0 && id !== "practice") {
    const lesson = LESSONS.filter((item) => String(item.id) === id.slice(1))[0];
    if (!lesson) return null;
    return practiceCheckpoint(lesson);
  }
  return allMissionChecks().filter((item) => item.id === id)[0] || null;
}

function practiceCheckpoint(lesson) {
  return {
    id: "p" + lesson.id,
    minutes: 4,
    title: lesson.title,
    outcome: lesson.task,
    type: "write",
    missionId: "practice",
    missionTitle: "Practice set",
    missionNumber: 0,
    practice: true,
    lessonId: lesson.id,
    topic: lesson.topic,
    building: "A short practice task from the review library.",
    why: "These tasks stay available so you can revisit an idea without restarting the missions.",
    concept: lesson.explain,
    exampleTitle: "Example, not the task",
    example: lesson.example,
    exampleNote: lesson.shown ? "That example displays:\n" + lesson.shown : "",
    syntax: [],
    discover: "Use the task's names, not the example's names.",
    challenge: lesson.task,
    hints: [
      "The example and the task use different words. Type the task.",
      "Match the shape of the example: the same kind of line, with the task's values.",
      "Count the lines the task asks for before you check."
    ],
    solution: lesson.code,
    limits: "Practice accepts the task text with single or double quotes. It is still a text match, not a Python run. Replaying does not erase a completed task.",
    success: "That matches the practice task.",
    local: null,
    achievement: ""
  };
}

function statusOf(id) {
  const item = progress.checks[id];
  return item && item.status ? item.status : "";
}

function practiceDone(lessonId) {
  const legacyDone = (Number(legacy.streaks[String(lessonId)]) || 0) >= 2;
  const marked = progress.earlySetsMarked && lessonId <= 30;
  const now = statusOf("p" + lessonId);
  return legacyDone || marked || now === "built" || now === "skipped";
}

function missionStats(mission) {
  const total = mission.checkpoints.length;
  const done = mission.checkpoints.filter((item) => {
    const status = statusOf(item.id);
    return status === "built" || status === "skipped";
  }).length;
  const minutes = mission.checkpoints.reduce((sum, item) => sum + item.minutes, 0);
  return { total: total, done: done, minutes: minutes };
}

function nextIncomplete() {
  const found = allMissionChecks().filter((item) => {
    const status = statusOf(item.id);
    return status !== "built" && status !== "skipped";
  })[0];
  return found || allMissionChecks()[0];
}

function draftOf(id) {
  return typeof progress.drafts[id] === "string" ? progress.drafts[id] : "";
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  const pages = { home: renderHome, mission: renderMission, check: renderCheck, practice: renderPractice, set: renderSet };
  app.innerHTML = shell((pages[view.page] || renderHome)());
  const box = document.getElementById("code");
  if (box) {
    box.value = draftOf(view.id);
    const wide = window.matchMedia("(min-width: 900px)").matches;
    if (view.tab === "code" || wide) box.focus();
  }
  const search = document.getElementById("finder");
  if (search && view.page === "home") search.value = view.query || "";
}

function shell(body) {
  return "<div class=\"shell\">" +
    "<header class=\"top\">" +
      "<div><button class=\"quiet\" data-act=\"home\"><p class=\"brand\">JARVIS Academy</p></button><p class=\"tag\">Write the assistant. Don't copy the example.</p></div>" +
      "<div class=\"top-actions\">" +
        "<button data-act=\"save\" type=\"button\">Save progress</button>" +
        "<button data-act=\"resume\" type=\"button\">Resume</button>" +
      "</div>" +
    "</header>" +
    "<p class=\"toast\" id=\"toast\">" + esc(toast) + "</p>" +
    body +
  "</div>";
}

function renderHome() {
  const checks = allMissionChecks();
  const done = checks.filter((item) => {
    const status = statusOf(item.id);
    return status === "built" || status === "skipped";
  }).length;
  const legacyCount = LESSONS.filter((lesson) => (Number(legacy.streaks[String(lesson.id)]) || 0) >= 2).length;
  const earlyMapped = LESSONS.slice(0, 30).every((lesson) => (Number(legacy.streaks[String(lesson.id)]) || 0) >= 2);
  const goal = progress.goalDay === todayKey() && progress.goalDone;
  const resume = checkpointById(progress.resume);
  const cards = MISSIONS.map((mission) => {
    const stats = missionStats(mission);
    const label = stats.done === stats.total ? "Set complete" : stats.done ? stats.done + " of " + stats.total : "Not started";
    return "<article class=\"mission\">" +
      "<header><span class=\"num\">Mission " + mission.number + "</span><span class=\"badge" + (stats.done === stats.total ? " done" : "") + "\">" + label + "</span></header>" +
      "<h2>" + esc(mission.title) + "</h2>" +
      "<p>" + esc(mission.promise) + "</p>" +
      "<p class=\"muted\">About " + stats.minutes + " min · " + esc(mission.summary) + "</p>" +
      "<button class=\"primary\" type=\"button\" data-act=\"mission\" data-id=\"" + mission.id + "\">Open</button>" +
    "</article>";
  }).join("");
  const earned = progress.achievements.map((id) => "<li>" + esc(ACHIEVEMENTS[id] || id) + "</li>").join("");
  return "<section class=\"card hero\">" +
      "<p class=\"kicker\">Dashboard</p>" +
      "<h1>Build a real assistant, one piece you write yourself.</h1>" +
      "<p>Mission 1 is a text assistant you can finish in about half an hour. Later missions add commands, a safe Windows launcher, your local model, memory, voice, and a chat page.</p>" +
      "<div class=\"statline\"><span>" + done + " of " + checks.length + " mission checkpoints</span><span>" + (progress.streak ? progress.streak + " day streak" : "No streak yet") + "</span><span>" + (goal ? "Today's goal is done." : "Today's goal: one checkpoint.") + "</span></div>" +
      "<div class=\"bar\" aria-hidden=\"true\"><span style=\"width:" + Math.round((done / checks.length) * 100) + "%\"></span></div>" +
      "<div class=\"row\" style=\"margin-top:14px\">" +
        "<button class=\"primary\" type=\"button\" data-act=\"resume\">" + (resume ? "Resume: " + esc(resume.title) : "Start Mission 1") + "</button>" +
        "<button type=\"button\" data-act=\"practice\">Practice sets</button>" +
      "</div>" +
    "</section>" +
    "<section class=\"card\" style=\"margin-bottom:12px\">" +
      "<h2>Find a lesson</h2>" +
      "<input id=\"finder\" class=\"search\" type=\"search\" placeholder=\"Search missions or practice\" aria-label=\"Search the curriculum\">" +
      "<div id=\"results\"></div>" +
    "</section>" +
    "<section class=\"grid missions\">" + cards + "</section>" +
    "<section class=\"card\" style=\"margin-top:12px\">" +
      "<h2>Practice you already did</h2>" +
      "<p class=\"muted\">" + legacyCount + " of 100 practice pieces are already recorded on this device. That record is only read. It is not reset.</p>" +
      (legacy.flashNote ? "<p class=\"muted\">" + esc(legacy.flashNote) + "</p>" : "") +
      (earlyMapped || progress.earlySetsMarked
        ? "<p>Sets 1–3 show as complete" + (earlyMapped ? " from your saved practice." : " because you marked them.") + " Opening them again will not clear that.</p>"
        : "<p>If you already finished the first three sets and this page cannot see that save, mark them complete. This does not erase older saves.</p><button type=\"button\" data-act=\"mark-early\">Mark sets 1–3 complete</button>") +
    "</section>" +
    "<section class=\"card\" style=\"margin-top:12px\">" +
      "<h2>What the checks mean</h2>" +
      "<p>A pass means the text has the pieces the lesson asked for. It does not mean Python, Ollama, a microphone, or Windows ran. Those steps are labeled and happen in Cursor, on your computer. main.py is never changed by this site.</p>" +
      (earned ? "<h3>So far</h3><ul class=\"syntax\">" + earned + "</ul>" : "<p class=\"muted\">Finish a checkpoint by writing it, and the exact skill will be listed here. Skipping a lesson does not add that line.</p>") +
    "</section>";
}

function renderMission() {
  const mission = missionById(view.id) || MISSIONS[0];
  const stats = missionStats(mission);
  const items = mission.checkpoints.map((item, index) => {
    const status = statusOf(item.id);
    const badge = status === "built" ? "<span class=\"badge done\">Written</span>" : status === "skipped" ? "<span class=\"badge skip\">Already knew</span>" : "<span class=\"badge\">" + item.minutes + " min</span>";
    return "<li><button class=\"check\" type=\"button\" data-act=\"check\" data-id=\"" + item.id + "\"><span class=\"split\"><strong>" + (index + 1) + ". " + esc(item.title) + "</strong>" + badge + "</span><span class=\"muted\">" + esc(item.outcome) + "</span></button></li>";
  }).join("");
  const built = statusOf("m1-build") === "built" && mission.id === "m1";
  return "<button type=\"button\" data-act=\"home\">Back to dashboard</button>" +
    "<section class=\"card hero\">" +
      "<p class=\"kicker\">Mission " + mission.number + " · about " + stats.minutes + " min · " + stats.done + " of " + stats.total + "</p>" +
      "<h1>" + esc(mission.title) + "</h1>" +
      "<p>" + esc(mission.promise) + "</p>" +
      "<p class=\"muted\">" + esc(mission.summary) + "</p>" +
      (built ? "<p>Build complete: the command loop is written. Run it locally before calling it tested.</p>" : "") +
    "</section>" +
    "<ol class=\"list\">" + items + "</ol>";
}

function renderPractice() {
  const sets = [];
  for (let i = 0; i < LESSONS.length; i += 10) sets.push(LESSONS.slice(i, i + 10));
  const cards = sets.map((group, index) => {
    const done = group.filter((lesson) => practiceDone(lesson.id)).length;
    return "<article class=\"mission\"><header><span class=\"num\">Set " + (index + 1) + "</span><span class=\"badge" + (done === group.length ? " done" : "") + "\">" + done + " of " + group.length + "</span></header><h2>" + esc(group[0].topic) + "</h2><button type=\"button\" data-act=\"set\" data-id=\"" + index + "\">Open set</button></article>";
  }).join("");
  return "<button type=\"button\" data-act=\"home\">Back to dashboard</button>" +
    "<section class=\"card hero\"><p class=\"kicker\">Optional review</p><h1>Practice sets</h1><p>These are short tasks, not the mission path. The example and the task are different. Completed sets stay complete when you replay them.</p></section>" +
    "<section class=\"grid missions\">" + cards + "</section>";
}

function renderSet() {
  const index = Number(view.id) || 0;
  const group = LESSONS.slice(index * 10, index * 10 + 10);
  const items = group.map((lesson) => {
    const done = practiceDone(lesson.id);
    return "<li><button class=\"piece\" type=\"button\" data-act=\"check\" data-id=\"p" + lesson.id + "\"><span class=\"split\"><strong>" + esc(lesson.title) + "</strong>" + (done ? "<span class=\"badge done\">Done</span>" : "") + "</span><span class=\"muted\">" + esc(lesson.topic) + "</span></button></li>";
  }).join("");
  return "<button type=\"button\" data-act=\"practice\">All practice sets</button>" +
    "<section class=\"card hero\"><p class=\"kicker\">Set " + (index + 1) + "</p><h1>" + esc(group[0] ? group[0].topic : "Practice") + "</h1><p class=\"muted\">Jump to any piece. Nothing here is locked.</p></section>" +
    "<ol class=\"list\">" + items + "</ol>";
}

function renderCheck() {
  const item = checkpointById(view.id);
  if (!item) return "<p>That lesson is not on this page.</p><button type=\"button\" data-act=\"home\">Dashboard</button>";
  progress.resume = item.id;
  saveProgress();
  const state = entry(item.id);
  const tab = view.tab || "lesson";
  const back = item.practice ? "set" : "mission";
  const backId = item.practice ? String(Math.floor((item.lessonId - 1) / 10)) : item.missionId;
  const lessonPane = "<section class=\"pane\" id=\"pane-lesson\"" + (tab === "lesson" ? "" : " hidden") + ">" +
      "<h2>What you are building</h2><p>" + esc(item.building) + "</p>" +
      "<h2>Why it matters</h2><p>" + esc(item.why) + "</p>" +
      "<h2>The idea</h2><p>" + esc(item.concept) + "</p>" +
      (item.broken ? "<h2>Broken program</h2><pre class=\"broken\">" + esc(item.broken) + "</pre>" : "") +
      (item.example ? "<h2>" + esc(item.exampleTitle || "Example") + "</h2><pre>" + esc(item.example) + "</pre>" : "") +
      (item.exampleNote ? "<p class=\"note\">" + esc(item.exampleNote) + "</p>" : "") +
      (item.syntax.length ? "<h2>New pieces</h2><ul class=\"syntax\">" + item.syntax.map((pair) => "<li><code>" + esc(pair[0]) + "</code> — " + esc(pair[1]) + "</li>").join("") + "</ul>" : "") +
      (item.discover ? "<h2>How to look it up</h2><p>" + esc(item.discover) + "</p>" : "") +
    "</section>";
  const hintButtons = item.hints.map((hint, index) => "<button type=\"button\" data-act=\"hint\" data-id=\"" + index + "\"" + (state.hints > index ? " disabled" : "") + ">Hint " + (index + 1) + "</button>").join("");
  const shownHints = item.hints.slice(0, state.hints).map((hint) => "<li>" + esc(hint) + "</li>").join("");
  const taskPane = "<section class=\"pane\" id=\"pane-task\"" + (tab === "task" ? "" : " hidden") + ">" +
      "<h2>Your task</h2><p>" + esc(item.challenge) + "</p>" +
      (item.type === "choice" ? "<div class=\"option-list\">" + item.options.map((option) => "<button type=\"button\" class=\"option\" data-act=\"choice\" data-id=\"" + esc(option.id) + "\" aria-pressed=\"" + (view.choice === option.id ? "true" : "false") + "\">" + esc(option.text) + "</button>").join("") + "</div>" : "<p class=\"note\">Use the Code tab to write it. The example stays different on purpose.</p>") +
      "<div class=\"row\">" + hintButtons + "</div>" +
      (shownHints ? "<ul class=\"syntax\">" + shownHints + "</ul>" : "") +
      (state.revealed && item.solution ? "<h2>One possible solution</h2><pre>" + esc(item.solution) + "</pre><p class=\"note\">Looking at this does not mark the checkpoint complete and does not mean it ran.</p>" : "") +
    "</section>";
  const keys = item.type === "write" ? "<div class=\"keys\" aria-label=\"Code keys\">" +
      [["()", "()"], ["[]", "[]"], ["{}", "{}"], [":", ":"], ["=", "="], ["\"", "\""], ["#", "#"], ["Indent", "indent"], ["Unindent", "outdent"]].map((pair) => "<button type=\"button\" data-act=\"insert\" data-key=\"" + esc(pair[1]) + "\">" + esc(pair[0]) + "</button>").join("") +
    "</div><textarea id=\"code\" spellcheck=\"false\" autocapitalize=\"off\" autocomplete=\"off\" autocorrect=\"off\" aria-label=\"Your code\"></textarea>" : "";
  const local = item.local && state.status === "built" ? "<section class=\"card\" style=\"margin-top:10px\"><h2>" + esc(item.local.title) + "</h2><ol class=\"syntax\">" + item.local.steps.map((step) => "<li>" + esc(step) + "</li>").join("") + "</ol>" + (state.ranLocal ? "<p>You reported a local run. This site did not watch the terminal.</p>" : "<button type=\"button\" data-act=\"ran\">I ran this on my computer</button>") + "</section>" : "";
  const statusLine = state.status === "built" ? "Written. Replaying will not clear it." : state.status === "skipped" ? "Marked already known. Not tested." : "Not complete yet.";
  const codePane = "<section class=\"pane code-sticky\" id=\"pane-code\"" + (tab === "code" ? "" : " hidden") + ">" +
      "<div class=\"editor\"><h2>" + (item.type === "choice" ? "Check the choice" : "Write it") + "</h2>" +
      "<p class=\"note\">" + esc(statusLine) + "</p>" +
      keys +
      "<p class=\"note\">" + esc(item.limits) + "</p>" +
      "<div class=\"row\">" +
        "<button class=\"primary\" type=\"button\" data-act=\"grade\">Check</button>" +
        "<button type=\"button\" data-act=\"skip\">I already know this</button>" +
        (item.solution ? "<button class=\"quiet\" type=\"button\" data-act=\"reveal\">Show one possible solution</button>" : "") +
      "</div>" +
      "<div id=\"result\" class=\"result\" aria-live=\"polite\"></div>" +
      local +
      "</div></section>";
  return "<div class=\"row\"><button type=\"button\" data-act=\"" + back + "\" data-id=\"" + esc(backId) + "\">Back</button>" +
      "<button type=\"button\" data-act=\"next\">Next</button></div>" +
    "<section class=\"card hero\"><p class=\"kicker\">" + esc(item.missionTitle) + " · " + item.minutes + " min</p><h1>" + esc(item.title) + "</h1><p>" + esc(item.outcome) + "</p></section>" +
    "<div class=\"tabs\" role=\"tablist\">" +
      ["lesson", "task", "code"].map((name) => "<button type=\"button\" data-act=\"tab\" data-id=\"" + name + "\" aria-selected=\"" + (tab === name ? "true" : "false") + "\">" + name[0].toUpperCase() + name.slice(1) + "</button>").join("") +
    "</div>" +
    "<div class=\"layout wide\">" + lessonPane + taskPane + codePane + "</div>";
}

function renderSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return "";
  const missionHits = allMissionChecks().filter((item) => (item.title + " " + item.challenge + " " + item.missionTitle).toLowerCase().indexOf(q) !== -1).slice(0, 8);
  const practiceHits = LESSONS.filter((lesson) => (lesson.title + " " + lesson.topic + " " + lesson.task).toLowerCase().indexOf(q) !== -1).slice(0, 8);
  const a = missionHits.map((item) => "<li><button class=\"piece\" type=\"button\" data-act=\"check\" data-id=\"" + item.id + "\">Mission " + item.missionNumber + " · " + esc(item.title) + "</button></li>").join("");
  const b = practiceHits.map((lesson) => "<li><button class=\"piece\" type=\"button\" data-act=\"check\" data-id=\"p" + lesson.id + "\">Practice · " + esc(lesson.title) + "</button></li>").join("");
  if (!a && !b) return "<p class=\"muted\">Nothing matches.</p>";
  return "<ul class=\"list\">" + a + b + "</ul>";
}

function showResult(check) {
  const node = document.getElementById("result");
  if (!node) return;
  node.className = "result " + (check.ok ? "good" : "bad");
  node.innerHTML = "<p>" + esc(check.ok ? "Pattern check passed." : "Not yet.") + "</p><ul>" + check.messages.map((message) => "<li>" + esc(message) + "</li>").join("") + "</ul>";
}

function grade() {
  const item = checkpointById(view.id);
  if (!item) return;
  const code = document.getElementById("code");
  const written = code ? code.value : "";
  if (code) progress.drafts[item.id] = written;
  let check;
  if (item.type === "choice") check = checkChoice(item, view.choice);
  else if (item.practice) {
    const lesson = LESSONS.filter((lessonItem) => lessonItem.id === item.lessonId)[0];
    check = practicePassed(written, lesson);
  } else if (CHECKS[item.id]) check = CHECKS[item.id](written);
  else check = result(false, ["This checkpoint has no checker yet."]);
  const already = statusOf(item.id);
  if (check.ok && already !== "built") markBuilt(item.id, item.achievement);
  else saveProgress();
  if (check.ok && already === "built") check.messages.unshift("This checkpoint was already complete. That status stays.");
  if (!check.ok && (already === "built" || already === "skipped")) {
    check.messages.unshift("Your completed status stays. This attempt is separate.");
  }
  if (check.ok) {
    render();
    showResult(check);
  } else {
    showResult(check);
  }
}

function insertKey(box, key) {
  const start = box.selectionStart;
  const end = box.selectionEnd;
  const selected = box.value.slice(start, end);
  if (key === "indent") {
    if (selected.indexOf("\n") !== -1) {
      const lineStart = box.value.lastIndexOf("\n", start - 1) + 1;
      const block = box.value.slice(lineStart, end).replace(/^/gm, "    ");
      box.setRangeText(block, lineStart, end, "end");
    } else {
      box.setRangeText("    ", start, end, "end");
    }
  } else if (key === "outdent") {
    const lineStart = box.value.lastIndexOf("\n", start - 1) + 1;
    if (box.value.slice(lineStart, lineStart + 4) === "    ") box.setRangeText("", lineStart, lineStart + 4, "end");
  } else if (key === "()" || key === "[]" || key === "{}") {
    const open = key[0];
    const close = key[1];
    box.setRangeText(open + selected + close, start, end, "end");
    if (!selected) box.selectionStart = box.selectionEnd = start + 1;
  } else {
    box.setRangeText(key, start, end, "end");
  }
  progress.drafts[view.id] = box.value;
  saveProgress();
  box.focus();
}

function moveNext() {
  const list = allMissionChecks();
  const index = list.findIndex((item) => item.id === view.id);
  if (index === -1) {
    const lessonIndex = LESSONS.findIndex((lesson) => "p" + lesson.id === view.id);
    const nextLesson = LESSONS[lessonIndex + 1];
    if (nextLesson) {
      view.page = "check";
      view.id = "p" + nextLesson.id;
      view.tab = "lesson";
      view.choice = "";
    }
    return;
  }
  const next = list[index + 1];
  if (!next) {
    view.page = "mission";
    view.id = list[index].missionId;
    return;
  }
  view.page = "check";
  view.id = next.id;
  view.tab = "lesson";
  view.choice = "";
}

function boot() {
  loadLegacy();
  progress = loadProgress();
  const app = document.getElementById("app");
  if (!app) return;
  app.addEventListener("click", (event) => {
    const button = event.target.closest("[data-act]");
    if (!button) return;
    const act = button.dataset.act;
    const id = button.dataset.id || "";
    if (act === "home") view.page = "home";
    else if (act === "mission") { view.page = "mission"; view.id = id; }
    else if (act === "practice") view.page = "practice";
    else if (act === "set") { view.page = "set"; view.id = id; }
    else if (act === "check") {
      view.page = "check";
      view.id = id;
      view.tab = "lesson";
      view.choice = "";
      progress.resume = id;
      saveProgress();
    }
    else if (act === "tab") view.tab = id;
    else if (act === "choice") { view.choice = id; view.tab = "task"; }
    else if (act === "hint") {
      const item = entry(view.id);
      item.hints = Math.max(item.hints, Number(id) + 1);
      saveProgress();
      view.tab = "task";
    } else if (act === "grade") { grade(); return; }
    else if (act === "skip") { markSkipped(view.id); toast = "Marked as already known. Nothing was tested."; }
    else if (act === "reveal") { entry(view.id).revealed = true; saveProgress(); view.tab = "task"; }
    else if (act === "ran") { entry(view.id).ranLocal = true; saveProgress(); toast = "Recorded as your report. The terminal was not checked."; }
    else if (act === "save") { saveProgress(); toast = "Saved on this device."; }
    else if (act === "resume") {
      const target = checkpointById(progress.resume) || nextIncomplete();
      view.page = "check";
      view.id = target.id;
      view.tab = "lesson";
    } else if (act === "mark-early") { progress.earlySetsMarked = true; saveProgress(); toast = "Sets 1–3 are marked complete. Older saves were not changed."; }
    else if (act === "next") moveNext();
    else if (act === "insert") {
      const box = document.getElementById("code");
      if (box) insertKey(box, button.dataset.key || "");
      return;
    }
    render();
  });
  app.addEventListener("input", (event) => {
    if (event.target.id === "finder") {
      view.query = event.target.value;
      const results = document.getElementById("results");
      if (results) results.innerHTML = renderSearch(view.query);
      return;
    }
    if (event.target.id === "code") {
      progress.drafts[view.id] = event.target.value;
      saveProgress();
    }
  });
  app.addEventListener("keydown", (event) => {
    if (event.target.id !== "code" || event.key !== "Tab") return;
    event.preventDefault();
    insertKey(event.target, event.shiftKey ? "outdent" : "indent");
  });
  render();
}

loadLegacy();
progress = loadProgress();
if (typeof document !== "undefined" && document.getElementById("app")) boot();
