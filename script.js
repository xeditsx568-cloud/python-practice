"use strict";

const KEY = "jarvisBuilder.v1";
const OLD_IDS = [
  "create", "greet", "input", "commands", "loop", "function", "allow", "open",
  "ollama-check", "ask-once", "unknown", "history", "save", "load", "speak",
  "listen", "remind", "window", "together"
];

function lines(list) {
  return list.join("\n");
}

function pack(id, title, optional, items) {
  return {
    id: id,
    title: title,
    optional: Boolean(optional),
    screens: items.map(function (item, index) {
      item.id = id + "-" + (index + 1);
      item.lesson = id;
      return item;
    })
  };
}

function say(text) {
  return { type: "say", text: text };
}

function show(text, code) {
  return { type: "show", text: text, code: code };
}

function task(text, hints, solution) {
  return { type: "try", text: text, hints: hints, solution: solution };
}

function run(text, command, hints) {
  return { type: "run", text: text, command: command, hints: hints || [] };
}

function see(text, output) {
  return { type: "see", text: text, output: output || "" };
}

const LESSONS = [
  pack("create", "A Python file", false, [
    say("A Python program lives in a file. JARVIS will be one file your computer can run."),
    say("The name ends in .py. That ending tells Cursor the file is Python."),
    show("notes.py is one example. Your assistant will use a different name.", "notes.py"),
    task("Create jarvis.py in the MyAIAssistant folder. Leave main.py unchanged.", [
      "Use File, then New File.",
      "Save the new file as jarvis.py in this project folder."
    ], "The file name is jarvis.py. It can be empty for now."),
    say("An empty file is enough here. The first line of Python comes next.")
  ]),
  pack("greet", "Showing text", false, [
    say("print shows a message in the terminal. JARVIS will use it every time it should say something."),
    say("The words go inside quotes. The quotes are part of the command, and they do not appear in the message."),
    show("This line says good morning. It is not the assistant.", "print(\"Good morning\")"),
    see("That example shows one line.", "Good morning"),
    say("JARVIS needs a greeting of its own. Use print, and write words that sound like the assistant."),
    task("In jarvis.py, write one print line that greets you.", [
      "The line starts with print.",
      "Put the greeting inside quotes."
    ], "print(\"JARVIS: Hello. I am online.\")"),
    say("Saving a file does not run it. Python runs the file only when you ask."),
    run("Open the terminal in Cursor. It should be in the MyAIAssistant folder.", "python jarvis.py", [
      "If python is not recognized, run py jarvis.py."
    ]),
    see("You should see your greeting, then the program ends. This page did not run it.", "JARVIS: Hello. I am online.")
  ]),
  pack("input", "Reading a line", false, [
    say("input pauses until you type a line and press Enter. That is how JARVIS will hear a command."),
    say("A variable is a name for a value. The line you type will be stored in one."),
    show("This desk asks for a name. JARVIS will ask for a command instead.", "name = input(\"Name: \")"),
    see("You type a name and press Enter. The program keeps it, but prints nothing else yet.", "Name: Ada"),
    say("JARVIS should show You: and store the line in command."),
    task("Under the greeting, add one line that asks with You: and stores the answer in command.", [
      "The variable is command, not name.",
      "input shows the prompt, then waits."
    ], "command = input(\"You: \")"),
    say("The program now waits, but it does not show what you typed. print can show words and a variable together."),
    show("The comma in print adds one space. This example uses name, not command.", "print(\"Hello\", name)"),
    see("If name holds Ada, that line shows both pieces.", "Hello Ada"),
    task("Add a line that prints JARVIS: You said and then command.", [
      "Keep the input line. Add print under it.",
      "Use a comma between the quoted words and command."
    ], "print(\"JARVIS: You said\", command)"),
    run("Run the file, type test, and press Enter.", "python jarvis.py"),
    see("You should see the greeting, the prompt, and then your words. This page did not run it.", lines([
      "JARVIS: Hello. I am online.",
      "You: test",
      "JARVIS: You said test"
    ]))
  ]),
  pack("commands", "Choosing a reply", false, [
    say("if runs the next line only when a test is true. JARVIS should not answer every sentence the same way."),
    say("The test ends with a colon. The line that belongs to it starts with four spaces."),
    show("This door opens only for yes. It is not the assistant.", lines([
      "if answer == \"yes\":",
      "    print(\"Door open\")"
    ])),
    see("If answer is yes, the message appears. Any other answer skips that line.", "Door open"),
    say("== compares two values. A single = stores a value. They are not the same."),
    say(".strip() removes spaces at the ends of what you typed. A stray space should not stop a match."),
    show("The prompt stays You: . strip runs after Enter.", "command = input(\"You: \").strip()"),
    task("Change your input line so it ends with .strip().", [
      "Keep command and the You: prompt.",
      "Add .strip() after the closing parenthesis."
    ], "command = input(\"You: \").strip()"),
    say(".lower() lets Hello and HELLO match hello. JARVIS should not miss a command because of capitals."),
    show("This is only the test. The print comes on the next indented line.", "command.lower() == \"hello\""),
    task("If the command is hello, print JARVIS: At your service. Replace the line that repeats what you typed.", [
      "The if line ends with a colon.",
      "Indent print with four spaces."
    ], lines([
      "if command.lower() == \"hello\":",
      "    print(\"JARVIS: At your service.\")"
    ])),
    say("else is the backup. It runs when the if test is false."),
    show("A closed door uses else. Your backup will be a JARVIS line.", lines([
      "if answer == \"yes\":",
      "    print(\"Door open\")",
      "else:",
      "    print(\"Door shut\")"
    ])),
    task("Add else under your hello test. It should print JARVIS: I heard you.", [
      "else ends with a colon.",
      "Indent its print the same way as the hello print."
    ], lines([
      "else:",
      "    print(\"JARVIS: I heard you.\")"
    ])),
    say("elif is a second test. Python checks it only when the first if was false."),
    show("This chooses a color. JARVIS will choose a help reply instead.", lines([
      "elif color == \"blue\":",
      "    print(\"Sky\")"
    ])),
    task("Before else, add elif for help. Print a line that mentions hello, help, and exit.", [
      "Compare command.lower() with help.",
      "elif sits between the hello test and else."
    ], lines([
      "elif command.lower() == \"help\":",
      "    print(\"JARVIS: Try hello, help, or exit.\")"
    ])),
    run("Run it three times: hello, then HELP, then status.", "python jarvis.py"),
    see("Each word should get its own reply. The program still ends after one command.", lines([
      "hello  ->  JARVIS: At your service.",
      "HELP   ->  JARVIS: Try hello, help, or exit.",
      "status ->  JARVIS: I heard you."
    ]))
  ]),
  pack("loop", "Staying open", false, [
    say("A loop repeats work. Without one, JARVIS answers once and then quits."),
    say("while True means keep going. The loop does not stop by itself."),
    show("This survey keeps asking. JARVIS will keep asking for a command.", lines([
      "while True:",
      "    answer = input(\"More? \")"
    ])),
    say("break leaves the loop. Printing a goodbye does not stop it."),
    show("This survey stops on n. Yours will stop on exit.", lines([
      "if answer.lower() == \"n\":",
      "    print(\"Survey closed\")",
      "    break"
    ])),
    say("continue skips the rest of this pass and asks again. A blank Enter should not get a reply."),
    task("Put the question and the replies inside while True. Stop on exit, and skip a blank line.", [
      "The greeting stays above the loop.",
      "Indent input, the tests, and the replies.",
      "break belongs under the exit test, on its own indented line."
    ], lines([
      "print(\"JARVIS: Hello. I am online.\")",
      "",
      "while True:",
      "    command = input(\"You: \").strip()",
      "    if command.lower() == \"exit\":",
      "        print(\"JARVIS: Goodbye.\")",
      "        break",
      "    if command == \"\":",
      "        continue",
      "    if command.lower() == \"hello\":",
      "        print(\"JARVIS: At your service.\")",
      "    elif command.lower() == \"help\":",
      "        print(\"JARVIS: Try hello, help, or exit.\")",
      "    else:",
      "        print(\"JARVIS: I heard you.\")"
    ])),
    run("Run it once. Type hello, then help, then exit.", "python jarvis.py", [
      "If it never ends, click the terminal and press Ctrl+C."
    ]),
    see("The greeting appears once. The replies follow. Goodbye ends the program.", lines([
      "JARVIS: Hello. I am online.",
      "You: hello",
      "JARVIS: At your service.",
      "You: exit",
      "JARVIS: Goodbye."
    ]))
  ]),
  pack("function", "A named reply", false, [
    say("A function is a named group of lines. reply will hold the answers, so the loop can stay short."),
    say("def starts a function. The name comes next, then parentheses and a colon."),
    show("This makes a label. JARVIS will make a reply instead.", lines([
      "def label(word):",
      "    return \"Item: \" + word"
    ])),
    say("return sends a value back. It does not print. The caller decides what to do with it."),
    task("Write reply(command). Return At your service for hello, the help sentence for help, and I heard you otherwise.", [
      "def reply(command): starts the function.",
      "Each return is indented inside reply.",
      "The last return is the backup, with no if."
    ], lines([
      "def reply(command):",
      "    if command.lower() == \"hello\":",
      "        return \"At your service.\"",
      "    if command.lower() == \"help\":",
      "        return \"Try hello, help, or exit.\"",
      "    return \"I heard you.\""
    ])),
    say("The loop should print whatever reply returns. The exit test stays in the loop, because that is what stops it."),
    task("Inside the loop, replace the hello, help, and else lines with one print that calls reply(command).", [
      "Leave the exit test and the blank-line test where they are.",
      "print can show words and a function result, separated by a comma."
    ], "    print(\"JARVIS:\", reply(command))"),
    run("Run the same test as before: hello, help, then exit.", "python jarvis.py"),
    see("The replies should be unchanged. The answers now live in reply. This page did not run it.", lines([
      "You: hello",
      "JARVIS: At your service.",
      "You: exit",
      "JARVIS: Goodbye."
    ]))
  ]),
  pack("allow", "Only two apps", false, [
    say("Starting a program is powerful. JARVIS should open only apps you listed, never a sentence someone typed."),
    say("import loads a tool Python does not keep available at the start. subprocess is the tool that starts a program."),
    show("This line only loads the tool. It does not open anything.", "import subprocess"),
    say("A dictionary pairs a word you choose with a value. Here the value will be a list holding the real program name."),
    show("This dictionary looks up a color. JARVIS will look up app names instead.", "colors = {\"sky\": \"blue\"}"),
    say("Popen starts a program from a list. Do not use shell=True. That can run more than the one program you named."),
    task("At the top, import subprocess. Under reply, add ALLOWED for notepad and calc, and open_app. Do not call it yet.", [
      "The keys are notepad and calc, not the .exe names.",
      "Each value is a list with one program name.",
      "If the name is missing, return a refusal. Do not call Popen."
    ], lines([
      "ALLOWED = {",
      "    \"notepad\": [\"notepad.exe\"],",
      "    \"calc\": [\"calc.exe\"],",
      "}",
      "",
      "def open_app(name):",
      "    if name not in ALLOWED:",
      "        return \"That app is not allowed.\"",
      "    subprocess.Popen(ALLOWED[name])",
      "    return \"Opening \" + name"
    ])),
    run("Run hello and then exit. No app should open.", "python jarvis.py"),
    see("hello still answers, and no app opens. Nothing was launched from this page.", "JARVIS: At your service.")
  ]),
  pack("open", "The open command", false, [
    say("split breaks a line into words. JARVIS can then tell the command apart from the app name."),
    show("This is the idea, using a cafe order. Your command will be open calc.", "\"tea cake\".split()"),
    see("split gives the words in order.", lines(["tea", "cake"])),
    say("The first word chooses the command. The second word is the name to look up."),
    task("At the start of reply, if the first word is open, call open_app with the second word. If they only type open, ask for notepad or calc.", [
      "parts = command.lower().split()",
      "Check parts[0] before you use parts[1].",
      "Return the result of open_app. Do not print inside reply."
    ], lines([
      "parts = command.lower().split()",
      "if parts and parts[0] == \"open\":",
      "    if len(parts) == 1:",
      "        return \"Say open notepad or open calc.\"",
      "    return open_app(parts[1])"
    ])),
    task("Change the help return so it also mentions open notepad and open calc.", [
      "The help test is already in reply.",
      "Keep the older commands in that sentence."
    ], "return \"Try hello, help, open notepad, open calc, or exit.\""),
    run("Run JARVIS. Type open calc, then open cmd, then exit.", "python jarvis.py"),
    see("Calculator should open, and the refusal should not open a window. This page did not launch either app.", lines([
      "You: open calc",
      "JARVIS: Opening calc",
      "You: open cmd",
      "JARVIS: That app is not allowed."
    ]))
  ]),
  pack("ollama-check", "The local model", false, [
    say("The model runs on your computer, in an app named Ollama. This phone cannot reach it."),
    say("qwen3:8b is already installed here, and main.py uses it. JARVIS will use that same model."),
    run("In the Cursor terminal, look at the installed models. Do not change jarvis.py yet.", "ollama list", [
      "If the command is missing, open Ollama from the Start menu and try again."
    ]),
    see("You should see a line that starts with qwen3:8b. ollama list on this computer showed that model.", "qwen3:8b")
  ]),
  pack("ask-once", "One model reply", false, [
    say("The model reads a list of messages. Each message has a role and some text."),
    say("system sets the behavior. user is the question. assistant will later be the reply."),
    show("This list asks a librarian, not JARVIS.", lines([
      "notes = [",
      "    {\"role\": \"system\", \"content\": \"You are a librarian.\"},",
      "    {\"role\": \"user\", \"content\": \"Suggest a short book.\"}",
      "]"
    ])),
    say("ollama.chat sends the list to the model. think=False asks qwen3 for the answer only."),
    say("The answer text comes back at response[\"message\"][\"content\"]. That shape was checked on this computer."),
    task("Add import ollama, MODEL, and ask_model. Do not call it from the loop yet.", [
      "MODEL = \"qwen3:8b\"",
      "The messages list is inside the function for now.",
      "Return the content. Do not print inside ask_model."
    ], lines([
      "import ollama",
      "",
      "MODEL = \"qwen3:8b\"",
      "",
      "def ask_model(command):",
      "    response = ollama.chat(",
      "        model=MODEL,",
      "        messages=[",
      "            {",
      "                \"role\": \"system\",",
      "                \"content\": \"You are JARVIS, a helpful assistant. Answer clearly and briefly.\",",
      "            },",
      "            {\"role\": \"user\", \"content\": command},",
      "        ],",
      "        think=False,",
      "    )",
      "    return response[\"message\"][\"content\"]"
    ])),
    say("One test line will prove the function. You will remove it afterward, so every start does not repeat the same question."),
    task("Just above the greeting, print a call to ask_model that asks for one short sentence.", [
      "print can call a function.",
      "The greeting line stays under the test."
    ], "print(ask_model(\"Reply with one short sentence.\"))"),
    run("Run the file and wait. The first reply can take a moment.", "python jarvis.py", [
      "If nothing appears, start the Ollama app and run it again.",
      "If Python complains about think, remove think=False and its comma."
    ]),
    see("A short sentence appears, then your greeting. The exact sentence will change. This page did not ask the model just now.", lines([
      "A short sentence from the model.",
      "JARVIS: Hello. I am online.",
      "You:"
    ])),
    task("Delete only that test print. Leave ask_model in the file.", [
      "The greeting should be the first thing that runs again.",
      "Do not delete the function."
    ], "Remove this line:\nprint(ask_model(\"Reply with one short sentence.\"))")
  ]),
  pack("unknown", "Unknown commands", false, [
    say("None means there is no local answer. It is a signal to the loop, not a sentence for the person."),
    show("This replaces the backup return. The hello and help returns stay.", "    return None"),
    task("Change the last line of reply from the I heard you return to return None.", [
      "Only the last return changes.",
      "hello and open must still return their own sentences."
    ], "    return None"),
    say("The loop has to notice None. If it prints the result directly, you will see the word None."),
    task("Replace the print of reply(command). Store the answer, ask the model when it is None, then print the answer.", [
      "answer = reply(command) comes first.",
      "The model call belongs under if answer is None.",
      "Print answer after that test."
    ], lines([
      "        answer = reply(command)",
      "        if answer is None:",
      "            answer = ask_model(command)",
      "        print(\"JARVIS:\", answer)"
    ])),
    run("Type hello, then ask what a variable is, then exit.", "python jarvis.py"),
    see("hello stays local. A normal question comes from the model. exit still stops the loop.", lines([
      "You: hello",
      "JARVIS: At your service.",
      "You: what is a variable?",
      "JARVIS: a short answer from the model"
    ]))
  ]),
  pack("history", "This conversation", false, [
    say("Each model call is separate. If you send only the new question, the model cannot use the one before."),
    say("append adds one item to the end of a list. JARVIS will add the question, then the answer."),
    show("This list remembers a shopping note. Your list will remember messages.", "notes.append(\"milk\")"),
    task("Create messages once, beside MODEL, with the system message. Change ask_model so it appends the question, calls the model with messages, appends the answer, and returns it.", [
      "The messages list is outside the function, so it survives the next call.",
      "Append the user message before ollama.chat.",
      "Append the assistant message before return."
    ], lines([
      "messages = [",
      "    {",
      "        \"role\": \"system\",",
      "        \"content\": \"You are JARVIS, a helpful assistant. Answer clearly and briefly.\",",
      "    }",
      "]",
      "",
      "def ask_model(command):",
      "    messages.append({\"role\": \"user\", \"content\": command})",
      "    response = ollama.chat(model=MODEL, messages=messages, think=False)",
      "    answer = response[\"message\"][\"content\"]",
      "    messages.append({\"role\": \"assistant\", \"content\": answer})",
      "    return answer"
    ])),
    run("In one run, say your name. Then ask what your name is.", "python jarvis.py"),
    see("The second answer can use the first. Quitting still forgets it. Saving comes next.", "The model repeats the name you gave.")
  ]),
  pack("save", "Saving the chat", false, [
    say("A file can keep the list after the program stops. json is a text form Python can write and read again."),
    say("with open closes the file for you. The mode \"w\" replaces the file each time."),
    show("This saves a shopping list. JARVIS will save messages instead.", lines([
      "with open(\"notes.json\", \"w\", encoding=\"utf-8\") as file:",
      "    json.dump(notes, file)"
    ])),
    task("Add import json. Add save_memory, which writes messages into memory.json.", [
      "import json goes with the other imports.",
      "json.dump needs the list and the open file."
    ], lines([
      "import json",
      "",
      "def save_memory():",
      "    with open(\"memory.json\", \"w\", encoding=\"utf-8\") as file:",
      "        json.dump(messages, file)"
    ])),
    task("Call save_memory at the end of ask_model, just before return answer.", [
      "The answer has already been appended.",
      "return answer stays as the last line."
    ], lines([
      "    save_memory()",
      "    return answer"
    ])),
    task("In the exit branch, call save_memory just before break.", [
      "It belongs under the exit test.",
      "Goodbye can still print first."
    ], lines([
      "        save_memory()",
      "        break"
    ])),
    run("Have a short model chat, type exit, then open memory.json in Cursor.", "python jarvis.py"),
    see("The file should contain the system message and the model turns. hello may be absent, because it never went to the model.", "memory.json is in the project folder.")
  ]),
  pack("load", "Loading the chat", false, [
    say("On the next start, the saved list should replace the fresh one. Otherwise JARVIS forgets again."),
    say("global lets a function replace the list the rest of the file uses. A missing file should not stop the start."),
    task("Add load_memory. A missing or broken file should leave the current messages alone.", [
      "global messages is the first line inside the function.",
      "except can catch FileNotFoundError and json.JSONDecodeError together."
    ], lines([
      "def load_memory():",
      "    global messages",
      "    try:",
      "        with open(\"memory.json\", encoding=\"utf-8\") as file:",
      "            loaded = json.load(file)",
      "    except (FileNotFoundError, json.JSONDecodeError):",
      "        return",
      "    if isinstance(loaded, list) and loaded:",
      "        messages = loaded"
    ])),
    task("Call load_memory() on the line before the greeting.", [
      "The call is not indented into the loop.",
      "If the greeting moved inside main later, the call moves with it."
    ], lines([
      "load_memory()",
      "print(\"JARVIS: Hello. I am online.\")"
    ])),
    run("Start JARVIS again and ask about the previous chat.", "python jarvis.py"),
    see("The model can use the saved turns. Delete memory.json later if you want a fresh start.", "The answer refers to the earlier chat.")
  ]),
  pack("speak", "Speaking", true, [
    say("This part is optional. If the install fails, skip ahead. Typing still works."),
    say("pyttsx3 uses a Windows voice already on the computer. The text should still print if speech fails."),
    run("Install the voice library in the terminal.", "pip install pyttsx3", [
      "If pip fails, leave the loop printing text and move on."
    ]),
    task("Add say(text). It prints JARVIS: and the text, then tries to speak. If speech fails, it just returns.", [
      "print comes before the try.",
      "engine.say speaks. runAndWait waits until the line finishes.",
      "except Exception means a voice problem does not crash JARVIS."
    ], lines([
      "def say(text):",
      "    print(\"JARVIS:\", text)",
      "    try:",
      "        import pyttsx3",
      "        engine = pyttsx3.init()",
      "        engine.say(text)",
      "        engine.runAndWait()",
      "    except Exception:",
      "        return"
    ])),
    task("In the loop, call say(answer) instead of print(\"JARVIS:\", answer).", [
      "Only the answer line changes.",
      "The goodbye print can stay as it is."
    ], "        say(answer)"),
    run("Run JARVIS and type hello.", "python jarvis.py"),
    see("You should still see the text. Speech was not run while this tutorial was written. Hearing it means the install worked on your machine.", "JARVIS: At your service.")
  ]),
  pack("listen", "Listening", true, [
    say("This part is optional, and harder. The keyboard remains the reliable way to talk to JARVIS."),
    say("Listening has two jobs: capture sound, then turn it into text. The simple recognizer here sends audio to Google, so it needs the internet. It is not your local model."),
    run("Install the speech library.", "pip install SpeechRecognition"),
    run("Then install the microphone library. Python 3.14 may not have a ready installer.", "pip install pyaudio", [
      "If this install fails, skip the rest of this lesson and leave input in the loop."
    ]),
    task("Add listen(). If the speech library is missing, use input. If the mic fails, say so and use input.", [
      "ImportError means the library is not installed.",
      "Print You: and the heard words so you can see them.",
      "Any other failure should fall back to typing."
    ], lines([
      "def listen():",
      "    try:",
      "        import speech_recognition as sr",
      "    except ImportError:",
      "        return input(\"You: \").strip()",
      "    recognizer = sr.Recognizer()",
      "    try:",
      "        with sr.Microphone() as source:",
      "            print(\"JARVIS: Listening...\")",
      "            audio = recognizer.listen(source, timeout=5, phrase_time_limit=8)",
      "        heard = recognizer.recognize_google(audio)",
      "        print(\"You:\", heard)",
      "        return heard",
      "    except Exception:",
      "        print(\"JARVIS: I could not hear that. Type instead.\")",
      "        return input(\"You: \").strip()"
    ])),
    task("In the loop, replace the input line with listen().", [
      "The rest of the loop still uses command.",
      "Do not remove exit or the model call."
    ], "    command = listen()"),
    run("Run JARVIS. Speak after Listening, or type if it asks you to.", "python jarvis.py"),
    see("You either see Listening and your words, or the usual You: prompt. The microphone was not tested for this tutorial.", "JARVIS: Listening...")
  ]),
  pack("remind", "Reminders", false, [
    say("A reminder is a line kept in a file. It does not need the model."),
    say("The mode \"a\" adds to the end of a file. \"w\" would erase what was already there."),
    show("This adds a score. JARVIS will add a reminder instead.", lines([
      "with open(\"scores.txt\", \"a\", encoding=\"utf-8\") as file:",
      "    file.write(score + \"\\n\")"
    ])),
    task("Add add_reminder and list_reminders, using reminders.txt.", [
      "write needs the note and a new line.",
      "FileNotFoundError means the file was never created.",
      "strip the file text so a blank file is treated as empty."
    ], lines([
      "def add_reminder(note):",
      "    with open(\"reminders.txt\", \"a\", encoding=\"utf-8\") as file:",
      "        file.write(note + \"\\n\")",
      "    return \"Reminder saved.\"",
      "",
      "def list_reminders():",
      "    try:",
      "        with open(\"reminders.txt\", encoding=\"utf-8\") as file:",
      "            notes = file.read().strip()",
      "    except FileNotFoundError:",
      "        return \"No reminders yet.\"",
      "    if notes == \"\":",
      "        return \"No reminders yet.\"",
      "    return notes"
    ])),
    say("split with 1 keeps the rest of the sentence together. A reminder can then contain spaces."),
    show("The first piece is the command. The second piece is the whole note.", "\"remind buy milk\".split(\" \", 1)"),
    see("You get the command, then the note.", lines(["remind", "buy milk"])),
    task("Inside reply, above return None, handle remind and reminders.", [
      "parts already exists from the open command.",
      "Use the original command for the note, so capitals in the note survive.",
      "These tests must be above return None."
    ], lines([
      "    if parts and parts[0] == \"remind\":",
      "        note = command.split(\" \", 1)",
      "        if len(note) == 1 or note[1].strip() == \"\":",
      "            return \"Say remind and then the note.\"",
      "        return add_reminder(note[1].strip())",
      "    if parts and parts[0] == \"reminders\":",
      "        return list_reminders()"
    ])),
    task("Update the help return so it mentions remind and reminders.", [
      "Only the help sentence changes."
    ], "return \"Try hello, help, open notepad, open calc, remind, reminders, or exit.\""),
    run("Type remind buy milk, then reminders, then exit.", "python jarvis.py"),
    see("The note is saved, then printed back. reminders.txt appears in the project folder.", lines([
      "You: remind buy milk",
      "JARVIS: Reminder saved.",
      "You: reminders",
      "JARVIS: buy milk"
    ]))
  ]),
  pack("window", "A window", false, [
    say("The terminal is one door. A window can be another door to the same functions. You do not write a second assistant."),
    say("def main holds the loop you already have. if __name__ means that loop runs when you start jarvis.py, not when another file imports it."),
    task("Move the greeting and the loop under def main. Do not paste a new loop over the one you have.", [
      "load_memory stays with the greeting.",
      "Delete the old copy that is left outside main, or it will run twice.",
      "The last two lines are not indented."
    ], lines([
      "def main():",
      "    load_memory()",
      "    print(\"JARVIS: Hello. I am online.\")",
      "    while True:",
      "        # Your existing loop stays here, indented.",
      "",
      "if __name__ == \"__main__\":",
      "    main()"
    ])),
    say("tkinter comes with Python and can open a window. An entry is where you type. A text box is where the chat appears."),
    task("Create jarvis_window.py. On Enter, call reply, then ask_model if the answer is None.", [
      "This is a new file. jarvis.py keeps the functions.",
      "exit can save memory and close the window.",
      "The window shows text. It does not use the mic or the speaker."
    ], lines([
      "import jarvis",
      "import tkinter as tk",
      "",
      "def on_send(event=None):",
      "    command = entry.get().strip()",
      "    entry.delete(0, tk.END)",
      "    if command == \"\":",
      "        return",
      "    log.insert(tk.END, \"You: \" + command + \"\\n\")",
      "    if command.lower() == \"exit\":",
      "        log.insert(tk.END, \"JARVIS: Goodbye.\\n\")",
      "        jarvis.save_memory()",
      "        root.destroy()",
      "        return",
      "    answer = jarvis.reply(command)",
      "    if answer is None:",
      "        answer = jarvis.ask_model(command)",
      "    log.insert(tk.END, \"JARVIS: \" + answer + \"\\n\\n\")",
      "    log.see(tk.END)",
      "",
      "jarvis.load_memory()",
      "root = tk.Tk()",
      "root.title(\"JARVIS\")",
      "root.geometry(\"420x520\")",
      "log = tk.Text(root, height=20, wrap=\"word\")",
      "log.pack(fill=\"both\", expand=True)",
      "entry = tk.Entry(root)",
      "entry.pack(fill=\"x\")",
      "entry.bind(\"<Return>\", on_send)",
      "entry.focus()",
      "root.mainloop()"
    ])),
    run("Start the window. python jarvis.py still starts the terminal version.", "python jarvis_window.py"),
    see("A window titled JARVIS should open. A question gets a reply, and the window may pause while the model thinks. This window was not opened while the tutorial was written.", "A window titled JARVIS.")
  ]),
  pack("together", "Your assistant", false, [
    say("reply handles the commands on your computer. ask_model handles everything else."),
    say("messages is the conversation. memory.json keeps the model turns after you quit."),
    say("Voice is optional. Leave main.py alone."),
    task("Run the terminal assistant and type hello.", [
      "Use jarvis.py, not the window, for this check."
    ], "python jarvis.py"),
    see("hello is answered locally. The model is not needed for that word.", "JARVIS: At your service."),
    task("Type open calc. Close Calculator when it appears.", [
      "Any name other than notepad or calc should be refused."
    ], "open calc"),
    see("You should see Opening calc, and Calculator should open. This page did not launch it.", "JARVIS: Opening calc"),
    task("Ask a question in your own words, then type exit.", [
      "Wait if the first model reply is slow."
    ], "exit"),
    see("The question is answered by qwen3:8b, then exit stops the program. This page cannot see that result.", "A model answer, then JARVIS: Goodbye.")
  ])
];

const SCREENS = [];
LESSONS.forEach(function (lesson) {
  lesson.screens.forEach(function (screen) {
    SCREENS.push(screen);
  });
});

let progress = { version: 2, place: SCREENS[0].id, done: {} };
const view = { hints: 0, solution: false, sheet: false };

function browserStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (error) {
    return null;
  }
}

function screenById(id) {
  for (let i = 0; i < SCREENS.length; i += 1) {
    if (SCREENS[i].id === id) return SCREENS[i];
  }
  return null;
}

function lessonById(id) {
  for (let i = 0; i < LESSONS.length; i += 1) {
    if (LESSONS[i].id === id) return LESSONS[i];
  }
  return LESSONS[0];
}

function lessonDone(lesson) {
  return lesson.screens.every(function (screen) {
    return Boolean(progress.done[screen.id]);
  });
}

function migrate(data) {
  const done = {};
  const oldDone = data.done && typeof data.done === "object" ? data.done : {};
  LESSONS.forEach(function (lesson) {
    if (!oldDone[lesson.id]) return;
    lesson.screens.forEach(function (screen) {
      done[screen.id] = true;
    });
  });
  const index = Number(data.place);
  const lessonId = OLD_IDS[index] || OLD_IDS[0];
  const lesson = lessonById(lessonId);
  return { version: 2, place: lesson.screens[0].id, done: done };
}

function loadProgress() {
  const fresh = { version: 2, place: SCREENS[0].id, done: {} };
  const store = browserStorage();
  const raw = store ? store.getItem(KEY) : null;
  if (!raw) return fresh;
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("shape");
    if (typeof data.place === "number") return migrate(data);
    const place = screenById(data.place) ? data.place : fresh.place;
    const done = data.done && typeof data.done === "object" && !Array.isArray(data.done) ? data.done : {};
    return { version: 2, place: place, done: done };
  } catch (error) {
    try {
      if (store && !store.getItem(KEY + ".unreadable")) store.setItem(KEY + ".unreadable", raw);
    } catch (ignored) {
      ignored;
    }
    return fresh;
  }
}

function saveProgress() {
  const store = browserStorage();
  if (store) store.setItem(KEY, JSON.stringify(progress));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, function (ch) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[ch];
  });
}

function current() {
  return screenById(progress.place) || SCREENS[0];
}

function indexOfCurrent() {
  return SCREENS.indexOf(current());
}

function goTo(id) {
  if (!screenById(id)) return;
  progress.place = id;
  view.hints = 0;
  view.solution = false;
  view.sheet = false;
  saveProgress();
  render();
}

function advance() {
  const screen = current();
  progress.done[screen.id] = true;
  const next = SCREENS[indexOfCurrent() + 1];
  if (next) progress.place = next.id;
  view.hints = 0;
  view.solution = false;
  saveProgress();
  render();
}

function buttonLabel(screen) {
  if (screen.type === "try") return "Done";
  if (screen.type === "run") return "Try it";
  return "Continue";
}

function codeBlock(code) {
  return "<div class=\"codebox\"><div class=\"codehead\"><button type=\"button\" data-act=\"copy\">Copy</button></div><pre>" + esc(code) + "</pre></div>";
}

function sheetHtml() {
  const here = current().lesson;
  const rows = LESSONS.map(function (lesson) {
    const tick = lessonDone(lesson) ? "<span class=\"tick\">Done</span>" : "";
    const currentAttr = lesson.id === here ? " aria-current=\"true\"" : "";
    const optional = lesson.optional ? " · optional" : "";
    return "<button type=\"button\" class=\"jump\" data-act=\"go\" data-go=\"" + lesson.id + "\"" + currentAttr + "><span>" + esc(lesson.title + optional) + "</span>" + tick + "</button>";
  }).join("");
  return "<div class=\"sheet\"><div class=\"panel\"><div class=\"handle\"></div>" + rows + "</div></div>";
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;
  const screen = current();
  const lesson = lessonById(screen.lesson);
  const index = indexOfCurrent();
  const localIndex = lesson.screens.findIndex(function (item) { return item.id === screen.id; });
  const width = Math.round(((localIndex + 1) / lesson.screens.length) * 100);
  const optional = lesson.optional ? " · optional" : "";
  let body = "<p>" + esc(screen.text) + "</p>";
  if (screen.code) body += codeBlock(screen.code);
  if (screen.command) body += codeBlock(screen.command);
  if (screen.output) body += "<pre>" + esc(screen.output) + "</pre>";
  const shownHints = (screen.hints || []).slice(0, view.hints);
  const hintHtml = shownHints.map(function (hint) {
    return "<p class=\"hint\">" + esc(hint) + "</p>";
  }).join("");
  const moreHints = screen.hints && view.hints < screen.hints.length;
  const extras = (moreHints || screen.solution)
    ? "<div class=\"extras\">" +
      (moreHints ? "<button type=\"button\" class=\"quiet\" data-act=\"hint\">Hint</button>" : "") +
      (screen.solution ? "<button type=\"button\" class=\"quiet\" data-act=\"solution\">" + (view.solution ? "Hide solution" : "Show solution") + "</button>" : "") +
      "</div>"
    : "";
  const solution = view.solution && screen.solution ? "<p class=\"solution-note\">One way to write it:</p>" + codeBlock(screen.solution) : "";
  const atEnd = index === SCREENS.length - 1 && progress.done[screen.id];
  app.innerHTML = "<main class=\"wrap\">" +
    "<header class=\"top\"><button type=\"button\" class=\"ghost\" data-act=\"back\"" + (index === 0 ? " disabled" : "") + ">Back</button><h1>JARVIS Builder</h1><button type=\"button\" class=\"ghost\" data-act=\"sheet\">Lessons</button></header>" +
    "<div class=\"meta\"><span>" + esc(lesson.title + optional) + "</span><span>" + (localIndex + 1) + " / " + lesson.screens.length + "</span></div>" +
    "<div class=\"progress\"><span style=\"width:" + width + "%\"></span></div>" +
    "<div class=\"story\">" + body + hintHtml + extras + solution + "</div></main>" +
    "<div class=\"dock\"><button type=\"button\" data-act=\"next\"" + (atEnd ? " disabled" : "") + ">" + (atEnd ? "Completed" : buttonLabel(screen)) + "</button></div>" +
    (view.sheet ? sheetHtml() : "");
  const dock = document.querySelector(".dock");
  const wrap = document.querySelector(".wrap");
  if (dock && wrap) wrap.style.paddingBottom = (dock.offsetHeight + 24) + "px";
}

function copyText(text, button) {
  const done = function () {
    const old = button.textContent;
    button.textContent = "Copied";
    setTimeout(function () { button.textContent = old; }, 1000);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  try { document.execCommand("copy"); } catch (error) { error; }
  area.remove();
  done();
}

function openLesson(id) {
  const lesson = lessonById(id);
  const open = lesson.screens.find(function (screen) { return !progress.done[screen.id]; }) || lesson.screens[0];
  goTo(open.id);
}

function onClick(event) {
  if (event.target.classList && event.target.classList.contains("sheet")) {
    view.sheet = false;
    render();
    return;
  }
  const el = event.target.closest("[data-act]");
  if (!el || el.disabled) return;
  const act = el.getAttribute("data-act");
  if (act === "copy") {
    const pre = el.parentElement.parentElement.querySelector("pre");
    if (pre) copyText(pre.textContent, el);
  } else if (act === "next") advance();
  else if (act === "back") {
    const prev = SCREENS[indexOfCurrent() - 1];
    if (prev) goTo(prev.id);
  } else if (act === "hint") {
    view.hints += 1;
    render();
  } else if (act === "solution") {
    view.solution = !view.solution;
    render();
  } else if (act === "sheet") {
    view.sheet = true;
    render();
  } else if (act === "go") openLesson(el.getAttribute("data-go"));
}

function boot() {
  progress = loadProgress();
  saveProgress();
  document.getElementById("app").addEventListener("click", onClick);
  render();
}

if (typeof document !== "undefined" && document.getElementById("app")) boot();
